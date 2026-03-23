import React, { useState, useEffect } from "react";

//?Solo se va a mostrar, con cierto inicio de sesion
//Se simula el usuario logueado (Moderador asignado al CIAM)
const usuarioLogueado = {
    nombre: "Moderador 1",
    rol: "Moderador",
    sedeAsignada: "CIAM Colima" 
};

//Datos de ejemplo con fechas de solicitud y ubicaciones
const mockSolicitudes = [
    { id: 101, titulo: "Congreso Médico", lugar: "CIAM Colima", fechaEvento: "2024-06-15", hora: "09:00", solicitadoEn: "2024-05-01 10:00", estado: "pendiente" },
    { id: 102, titulo: "Taller de Yoga", lugar: "CIAM Colima", fechaEvento: "2024-06-15", hora: "09:00", solicitadoEn: "2024-05-01 11:30", estado: "pendiente" }, // Conflicto con el 101
    { id: 103, titulo: "Charla Tech", lugar: "Polideportivo", fechaEvento: "2024-06-15", hora: "10:00", solicitadoEn: "2024-05-02 09:00", estado: "pendiente" },
];

function ModeracionAdmin() {
    const [eventos, setEventos] = useState(mockSolicitudes);

    //Fetch para filtrar los eventos, segun a donde pertenezca
    useEffect(() => {
    const fetchModeratorEvents = async () => {
        // Obtenemos el ID del usuario que guardamos al loguearnos
        const userId = localStorage.getItem("userId"); 

        const response = await fetch('http://localhost:3000/moderator/events', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-id': userId //  Aquí le decimos al server quién es el moderador, despues implementar JWT
            }
        });
        const data = await response.json();
        setEventos(data.events);
    };

    fetchModeratorEvents();
}, []);

    const eventosFiltrados = eventos.filter(ev => ev.lugar === usuarioLogueado.sedeAsignada);

    const handleDecision = (id, nuevoEstado) => {
        setEventos(eventos.map(ev => ev.id === id ? { ...ev, estado: nuevoEstado } : ev));
        alert(`Evento ${nuevoEstado === 'aprobado' ? 'Aprobado' : 'Rechazado'}`);
    };

    return (
    <div style={{ padding: "2rem" }}>
        <div className="alert alert-info">
            <strong>Moderador:</strong> {usuarioLogueado.nombre} | <strong>Sede:</strong> {usuarioLogueado.sedeAsignada}
        </div>

        <h3>Solicitudes Pendientes</h3>
        <p className="text-muted">Revisa quién solicitó primero para resolver conflictos de horario.</p>

        <table className="table table-hover align-middle">
            <thead className="table-dark">
            <tr>
                <th>Evento</th>
                <th>Fecha Evento</th>
                <th>Hora</th>
                <th>Solicitado el (Prioridad)</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        {eventosFiltrados.map((ev, index) => {
            // Lógica simple para resaltar posibles conflictos de horario
            const tieneConflicto = eventosFiltrados.some(
                other => other.id !== ev.id && other.fechaEvento === ev.fechaEvento && other.hora === ev.hora
            );

            return (
                <tr key={ev.id} style={{ borderLeft: tieneConflicto ? "5px solid #dc3545" : "5px solid #198754" }}>
                    <td>
                        <strong>{ev.titulo}</strong>
                        {tieneConflicto && <span className="badge bg-danger ms-2">Conflicto de Horario</span>}
                    </td>
                    <td>{ev.fechaEvento}</td>
                    <td>{ev.hora}</td>
                    <td className="small text-muted">{ev.solicitadoEn}</td>
                    <td>
                        <span className={`badge ${ev.estado === 'pendiente' ? 'bg-warning' : ev.estado === 'aprobado' ? 'bg-success' : 'bg-danger'}`}>
                            {ev.estado.toUpperCase()}
                        </span>
                    </td>
                    <td>
                    <div className="btn-group btn-group-sm">
                    <button 
                        className="btn btn-success" 
                        onClick={() => handleDecision(ev.id, 'aprobado')}
                        disabled={ev.estado !== 'pendiente'}
                    >
                        Aprobar
                    </button>
                    <button 
                        className="btn btn-danger" 
                        onClick={() => handleDecision(ev.id, 'rechazado')}
                        disabled={ev.estado !== 'pendiente'}
                    >
                        Rechazar
                    </button>
                </div>
                </td>
                </tr>
            );
            })}
        </tbody>
    </table>
    </div>
);
}

export default ModeracionAdmin;