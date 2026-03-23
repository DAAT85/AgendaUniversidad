import { PrismaClient } from "@prisma/client";
import e, { json } from "express";
import express from "express";
import validationEvent from "../middleware/validacionEstudiante.js";
import filterByDependence from "../middleware/filtrarDependencia.js"

//Se da de alta los metodos a usar
const prisma = new PrismaClient();
const router = express.Router();

//*Rutas

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
        //Se busca en el body el correo y contraseña del usuario
    const { email, password } = req.body;

    //Verifica si faltan campos
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    //Se busca en la tabla de user
    const user = await prisma.user.findUnique({
        where: { email }
    });

    //Si la contraseña no es correcta
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Datos incorrectos' });
    }

    //Se entrega el resultado
    return res.status(201).json({
        message: 'Inicio de sesión correcto',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });

    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//? Rutas de administrador

//*Se crea un evento
router.post('/events', async(req, res)=>{
    try{
        //Se busca en el body los parametros
        const {name, date, time, state, type, description} = req.body;

        //Validaciones si faltan campos
        if(!name || !date || !time || !state || !type || !description){
            console.log("Faltan parametros");
            return res.status(404).json({message: "Faltan parametros"})
        }

        //Aqui se crea el evento en la ruta
        const event = await prisma.events.create({
            data: {name, date, time, state, type, description}
        });

        //Se entrega el resultado
        res.status(201).json({
            message: "Se creó el evento",
            event: event
        });

    }catch(error){
        //Borrar el console.log cuando ya funcione bien para ahorrar memoria
        console.log(error);
        return res.status(500).json({error: 'Error al crear el evento'});
    }
})

//**Se obtiene los eventos
router.get('/events', async(req, res)=>{
    try{
        //Devuelve todos los eventos
        const events = await prisma.events.findMany({
            orderBy: {
                createdAt: 'desc' // los más recientes primero
            }
        });

        //Resultado final
        return res.status(201).json({
            message: "Eventos encontrados",
            events: events
        });

    }catch(error){
        //Borrar cuando ya este listo para ahorrar memomira
        console.log(error);
        return res.status(500).json({error: 'No se pudo encontrar el evento'})
    }
});

//*Se elimina un evento
router.delete('/events/:id', async(req, res)=>{
    try{
        //Se busca por id, se usa req.params cuando se usa una especificacion, por ser un parametro
        const {id} = req.params;

        //Validacion en caso de no haber proporcionado
        if(!id){
            console.log(`No se proporciono un ID`);
            return res.status(404).json({message: `No se proporciono un ID`});
        }
        
        //Se busca el evento 
        const event = await prisma.events.findUnique({
            where: {id: parseInt(id)}
        })
    

        //Valida si existe
        if(!event){
            return res.status(404).json({message: `No se encontro un ID ${id}`})

        }

        //Se entrega elimina llamando a la tabla y que metodo usar
        await prisma.events.delete({
            where: {id: parseInt(id)}
        })


        //Se entrega el resultado final
        return res.status(201).json({
            message: "Evento eliminado exitosamente",
            event: event // Se devuelve el evento eliminado
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({ error: "Error al eliminar el evento"});
    }
});

//* Se actualiza un evento
router.put('/events/:id', async(req, res)=>{
    try{
        //Se busca por id
        const {id} = req.params;

        //Lo que se va a actualizar
        const {name, date, time, description, state, type} = req.body;

        //Se busca el evento en la tabla
        const event = await prisma.events.findUnique({
            where: {id: parseInt(id)}
        });

        //Validacion si existe
        if(!event){
            console.log(`No se encontro un evento con ID ${id}`);
            return res.status(404).json({message: `No se encontro un evento con un ID ${id}`});
        };

        //Se actualiza el evento
        const update = await prisma.events.update({
            where: {id: parseInt(id)},
            data: {
                name,
                date,
                time,
                description,
                state,
                type
            }
        })


        //Se entrega resultado
        return res.status(201).json({
            message: "El evento se actualizo con exito",
            event: update
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error en actualizar el evento"})
    }
});

//?Rutas del Moderador

//Ruta de filtro
router.get('/moderator/events', filterByDependence, async (req, res) => {
    try {
        const events = await prisma.events.findMany({
            where: {
                dependence: req.userDependence // Solo trae eventos de su misma sede
            },
            orderBy: {
                createdAt: 'asc' // IMPORTANTE: El que solicitó primero aparece primero
            }
        });

        res.json({
            dependence: req.userDependence,
            events: events
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener eventos de moderación" });
    }
});

//?Rutas del profesor

//Aqui usara el middleware para saber si ya esta autenticado
router.post('/event-registrer', validationEvent, async(req, res)=>{
    try{
        //No hace falta colocar mas cosas, ya que el middleware se encargo de verificar
        return res.status(200).json({message: "Usuario registrado al evento"});
    }catch(error){
        console.log(error)
        return res.status(500).json({error: 'Hay un problema con la ruta en el servidor'})
    }
});

export default router;