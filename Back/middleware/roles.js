
const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        const { role } = req.usuario;

        if (!rolesPermitidos.includes(role)) {
        return res.status(403).json({ 
            error: `Acceso denegado. Se requiere: ${rolesPermitidos.join(' o ')}` 
        });
        }

        next();
    };
};

export default verificarRol;