
import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // { id, nombre, rol }
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

export default verificarToken;