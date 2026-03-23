import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // npm i jwt-decode

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" />;
    }

    // Verifica si el token expiró
    try {
        const decoded = jwtDecode(token);
        const expirado = decoded.exp * 1000 < Date.now();
        if (expirado) {
            localStorage.clear();
            return <Navigate to="/" />;
        }
    } catch (error) {
        localStorage.clear();
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;