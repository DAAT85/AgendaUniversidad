import { PrismaClient } from "@prisma/client";
import express from "express";


const prisma = new PrismaClient();
const router = express.Router();
//Rutas

//?Ruta de log in

router.post('/register', async (req, res)=>{
    try{
        const {name, email, password, dependence } = req.body;

        //Validacion de campos
        if (!name || !email || !password || !dependence) {
            return res.status(400).json({ error: "Faltan campos requeridos" });
        }

        const student = await prisma.student.create({
            data: {name, email, password, dependence}
        });

        // 201 = creado correctamente
        res.status(201).json(student); 
    }catch(error){
        //Error en caso de algo
        res.status(500).json({ error: "Error al registrar el estudiante" });
    }
});

router.post('/login', async (req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).json({ error: 'Email y contraseña son requeridos'});
        }


        //Es para traer solo uno, a comparacion de findMany()
        const student = await prisma.student.findUnique({
            where: { email: email }
        });

        //Verificacion si existe
        if(!student || student.password !== password){
            return res.status(401).json({ error: 'Datos incorrectos' })
        }

        res.status(200).json({message: 'Se inicio sesion correctamente', student});
    }catch(error){
        res.status(404).json({error: "Usuario no encontrado"});
    }
});



export default router;