import React, { useState, useEffect, useCallback } from "react";
import Swal from 'sweetalert2';

const API_URL = "http://localhost:3000/api";

function ModeracionAdmin() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({ nombre: "", rol: "", sedeAsignada: "" });

    const fetchModeratorEvents = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/moderator/events`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            // Solo cargamos los pendientes para moderar
            const pendientes = (data.events || []).filter(ev => ev.state === 'pendiente');
            setEventos(pendientes);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/me`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) {
                const data = await res.json();
                setCurrentUser({ nombre: data.name, rol: data.role, sedeAsignada: data.dependence });
            }
        };
        fetchUser();
        fetchModeratorEvents();
    }, [fetchModeratorEvents]);

    const handleDecision = async (id, nuevoEstado) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/events/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ state: nuevoEstado })
            });

            if (response.ok) {
                // Eliminamos de la lista visual inmediatamente
                setEventos(prev => prev.filter(ev => ev.id !== id));
                
                Swal.fire({
                    icon: 'success',
                    title: `Evento ${nuevoEstado}`,
                    text: nuevoEstado === 'aprobado' ? 'Ahora es visible para todos.' : 'Ha sido descartado.',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudo actualizar', 'error');
        }
    };

    const createTestEvent = async () => {
        const token = localStorage.getItem("token");
        await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                name: 'Prueba de Filtro',
                date: '2026-10-10',
                time: '10:00',
                state: 'pendiente',
                type: 'Prueba',
                description: 'Si lo rechazas, debe desaparecer de la principal.',
                dependence: currentUser.sedeAsignada || "General"
            })
        });
        fetchModeratorEvents();
    };

    if (loading) return <div className="p-5 text-center">Cargando...</div>;

    return (
        <div style={{ padding: "2rem", background: "#f8f9fa", minHeight: "100vh" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 style={{ color: "#2d6a27" }}>Panel de Moderación</h2>
                <button className="btn btn-dark shadow-sm" onClick={createTestEvent}>+ Crear Prueba Pendiente</button>
            </div>

            <div className="card shadow-sm border-0">
                <table className="table table-hover mb-0">
                    <thead style={{ background: "#2d6a27", color: "#fff" }}>
                        <tr>
                            <th>Evento</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.length === 0 ? (
                            <tr><td colSpan="2" className="text-center py-4">No hay nada pendiente.</td></tr>
                        ) : (
                            eventos.map(ev => (
                                <tr key={ev.id}>
                                    <td><strong>{ev.name}</strong><br/><small>{ev.date} - {ev.time}</small></td>
                                    <td className="text-center">
                                        <button className="btn btn-success btn-sm me-2" onClick={() => handleDecision(ev.id, 'aprobado')}>Aprobar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDecision(ev.id, 'rechazado')}>Rechazar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModeracionAdmin;