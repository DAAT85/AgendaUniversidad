//?Middleware de verificar si el estudiante a iniciado sesion y se registro al evento
//Siempre al crear un middleware se necesita un req, res y next

const validationEvent = (req, res, next)=>{

    //Se asigan el token que ya fue autorizado a esta variable, buscando en los headers
    const token = req.headers['authorization'];

    if(!token){
        return res.status(404).json({error: "Acceso denegado. Se necesita inicar sesion primero"});
    }

    next(); //Esto es para que ya prosiga, es decir, aqui acaba el middleware
}

export default validationEvent