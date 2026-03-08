import { useState, useEffect } from "react";

// Datos temporales hasta que se tenga la api de la universidad
const mockUsuarios = [
    { id: 1, nombre: "Aguayo", email: "juan@email.com", rol: "Admin" },
    { id: 2, nombre: "María López", email: "maria@email.com", rol: "Moderador" },
    { id: 3, nombre: "Carlos Ruiz", email: "carlos@email.com", rol: "Profesor" },
];

function UsuariosAdmin() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        //!Quitar despues ya que se tenga la api de la universidad
        setUsuarios(mockUsuarios);

        //** Aqui estara la api de la universidad

        // const response = await fetch('');
        // const data = response.json()
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
        <h2>Usuarios registrados</h2>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
            </tr>
            </thead>
            <tbody>
            {usuarios.map((u) => (
                <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default UsuariosAdmin;