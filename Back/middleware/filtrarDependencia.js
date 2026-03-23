// Middleware para identificar al moderador y su dependencia
const filterByDependence = async (req, res, next) => {
    try {
        const userId = req.headers['user-id']; // El frontend enviará el ID del moderador aquí

        if (!userId) return res.status(403).json({ error: "No se proporcionó identificación de usuario" });

        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });

        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        // Guardamos la dependencia en el objeto 'req' para que la ruta la use
        req.userDependence = user.dependence;
        req.userRole = user.role;
        next();
    } catch (error) {
        res.status(500).json({ error: "Error en el middleware de filtro" });
    }
};

export default filterByDependence;