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

        const user = await prisma.user.create({
            data: {name, email, password, dependence}
        });

        // 201 = creado correctamente
        res.status(201).json(user); 
    }catch(error){
        //Error en caso de algo
        console.log(error)
        res.status(500).json({ error: "Error al registrar el estudiante" });
    }
});


//Ya con los roles
router.post('/login', async (req, res) => {
    try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Datos incorrectos' });
    }

    res.status(200).json({
        message: 'Inicio de sesión correcto',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//? Rutas de administrador

router.post('/createEvent', async(req, res)=>{
    try{
        const [name, date, time, description] = req.body;
        //Validacion
        if(!name || !date || !time || !description){
            console.log("Faltan parametros");
            res.status(404).json({message: "Faltan parametros"})
        }
    }catch(error){
        //Borrar el console.log cuando ya funcione bien para ahorrar memoria
        console.log(error);
        res.status(500).json({error: 'Error al crear el evento'});
    }
})

export default router;