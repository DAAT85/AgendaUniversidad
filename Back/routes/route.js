import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import validationEvent from "../middleware/validacionEstudiante.js";
import filterByDependence from "../middleware/filtrarDependencia.js";
import verificarToken from "../middleware/auth.js";
import verificarRol from "../middleware/roles.js";

dotenv.config();
const prisma = new PrismaClient();
const router = express.Router();

// --- AUTENTICACIÓN ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: 'Error en el login' });
    }
});

// --- EVENTOS ---

// 1. Obtener eventos públicos (SOLO aprobados - para ListaEventos)
router.get('/events', async (req, res) => {
    try {
        const events = await prisma.events.findMany({
            where: { state: 'aprobado' },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ events });
    } catch (error) {
        console.error("Error Prisma:", error);
        res.status(500).json({ error: 'Error al obtener eventos' });
    }
});

// 1.a Obtener TODOS los eventos (para panel Admin - sin filtro de estado)
router.get('/admin/events', verificarToken, async (req, res) => {
    try {
        const events = await prisma.events.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ events });
    } catch (error) {
        console.error("Error Prisma:", error);
        res.status(500).json({ error: 'Error al obtener eventos' });
    }
});

// 1.b Obtener datos del usuario actual
router.get('/me', verificarToken, async (req, res) => {
    try {
        const userId = req.user?.id || req.usuario?.id;
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            dependence: user.dependence
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener datos de usuario' });
    }
});

// 2. Obtener eventos para Moderador (filtro por dependencia, solo pendientes)
router.get('/moderator/events', verificarToken, filterByDependence, async (req, res) => {
    try {
        const events = await prisma.events.findMany({
            where: {
                dependence: req.userDependence,
                state: 'pendiente'
            }
        });
        res.json({ events });
    } catch (error) {
        res.status(500).json({ error: 'Error en la carga de moderación' });
    }
});

// 3. Crear Evento
router.post('/events', verificarToken, async (req, res) => {
    try {
        const { name, date, time, state, type, description, dependence } = req.body;
        const newEvent = await prisma.events.create({
            data: {
                name,
                date,
                time,
                state: state || 'aprobado',
                type,
                description,
                dependence
            }
        });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error al crear:", error);
        res.status(500).json({ error: 'Error al crear evento' });
    }
});

// 4. Actualizar TODO el evento (para el botón Editar del Admin)
router.put('/events/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, date, time, description, type, dependence } = req.body;
        const updated = await prisma.events.update({
            where: { id: parseInt(id) },
            data: { name, date, time, description, type, dependence }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo actualizar el evento' });
    }
});

// 5. Actualizar solo Estado (para el Moderador)
router.patch('/events/:id/status', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { state } = req.body;

        const updated = await prisma.events.update({
            where: { id: parseInt(id) },
            data: { state }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar estado' });
    }
});

// 6. Eliminar Evento
router.delete('/events/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.events.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
});

export default router;