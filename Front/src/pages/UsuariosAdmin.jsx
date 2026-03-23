import { useState, useEffect } from "react";

// Datos temporales hasta que se tenga la api de la universidad, quitar despes
const mockUsuarios = [
    { id: 1, nombre: "Aguayo", email: "juan@email.com", rol: "Admin" },
    { id: 2, nombre: "María López", email: "maria@email.com", rol: "Moderador" },
    { id: 3, nombre: "Carlos Ruiz", email: "carlos@email.com", rol: "Profesor" },
];

//Roles temporales, estos se traeran con la api, o sea qutar despues
const roles = ["Maestro", "Administrador", "Moderador"];


export function RolSelector({ usuarioId, rolActual, onCambiar }){
    const [open, setOpen] = useState(false);

    return(
    <>
        <div style={{ position: "relative", display: "inline-block" }}>

      {/* Dropdown */}
        <div
        onClick={() => setOpen(!open)}
        className="d-flex align-items-center gap-2 px-3 py-1 rounded fw-semibold"
        style={{
            background: "#2d6a27",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "20px",
            fontSize: "0.85rem",
            userSelect: "none",
            border: "2px solid #2d6a27",
            transition: "all 0.2s"
        }}
    >
        {rolActual}
        <span style={{ fontSize: "0.7rem", color: "#c8a951" }}>
            {open ? "▲" : "▼"}
        </span>
        </div>

      {/* Dropdown */}
        {open && (
        <div
            style={{
            position: "absolute",
            top: "110%",
            left: 0,
            background: "#fff",
            border: "2px solid #2d6a27",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            zIndex: 999,
            minWidth: "150px",
            overflow: "hidden"
        }}
        >
            {roles.map((rol) => (
            <div
                key={rol}
                onClick={() => {
                onCambiar(usuarioId, rol);
                setAbierto(false);
            }}
            className="px-3 py-2 fw-semibold"
            style={{  
                cursor: "pointer",
                fontSize: "0.85rem",
                color: rol === rolActual ? "#c8a951" : "#1e4d1a",
                background: rol === rolActual ? "#f0f7ee" : "#fff",
                borderLeft: rol === rolActual ? "4px solid #2d6a27" : "4px solid transparent",
                transition: "all 0.15s"
            }}
                onMouseEnter={e => e.currentTarget.style.background = "#f0f7ee"}
                onMouseLeave={e => e.currentTarget.style.background = rol === rolActual ? "#f0f7ee" : "#fff"}
            >
                {rol}
            </div>
        ))}
        </div>
    )}

    </div>
    </>
    );
}

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
                <RolSelector />
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default UsuariosAdmin;