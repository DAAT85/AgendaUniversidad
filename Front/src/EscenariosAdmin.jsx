import React, { useState } from "react"; 
import { RolSelector } from "./UsuariosAdmin";

// 1. Datos de prueba para ver algo en pantalla
const mockEscenarios = [
    { id: 1, nombre: "Auditorio Rectoría", date: "2024-05-20", time: "10:00", description: "Evento académico", state: "Activo", type: "Cerrado" },
    { id: 2, nombre: "Foro Pablo Silva", date: "2024-05-22", time: "18:00", description: "Concierto", state: "Pendiente", type: "Abierto" }
];

function EscenariosAdmin() {
    const [scenarios, setScenarios] = useState(mockEscenarios); 

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Escenarios registrados</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Tipo</th>
                        <th>Acciones</th> 
                    </tr>
                </thead>
                <tbody>
                    {scenarios.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.nombre}</td>
                            <td>{s.date}</td>
                            <td>{s.time}</td>
                            <td>{s.description}</td>
                            <td>{s.state}</td>
                            <td>{s.type}</td>
                            <td>
                                
                                <RolSelector />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EscenariosAdmin;