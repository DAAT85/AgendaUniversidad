import React, { useState, useEffect, useCallback } from "react";
import Swal from 'sweetalert2';

const API_URL = "http://localhost:3000/api";

function ModeracionAdmin() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState({
        nombre: "",
        rol: "",
        sedeAsignada: ""
    });
    const [errorMessage, setErrorMessage] = useState('');

    // Obtener eventos pendientes para el moderador
    const fetchModeratorEvents = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/moderator/events`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 403) {
                setErrorMessage("No tienes permisos de moderador.");
                setEventos([]);
                return;
            }

            const data = await response.json();
            // Filtramos por si acaso el backend enviara algo que no sea 'pendiente'
            const pendientes = (data.events || []).filter(ev => ev.state === 'pendiente');
            setEventos(pendientes);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error al cargar la moderación');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchCurrentUser = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentUser({
                    nombre: data.name,
                    rol: data.role,
                    sedeAsignada: data.dependence
                });
            }
        } catch (error) {
            console.error('Error user:', error);
        }
    }, []);

    useEffect(() => {
        fetchCurrentUser();
        fetchModeratorEvents();
    }, [fetchCurrentUser, fetchModeratorEvents]);

    // ESTA ES LA FUNCIÓN CLAVE CORREGIDA
    const handleDecision = async (id, nuevoEstado) => {
        const accion = nuevoEstado === 'aprobado' ? 'Aprobar' : 'Rechazar';
        
        // Confirmación antes de proceder
        const confirm = await Swal.fire({
            title: `¿${accion} evento?`,
            text: `Vas a marcar este evento como ${nuevoEstado}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: nuevoEstado === 'aprobado' ? '#2d6a27' : '#d33',
            confirmButtonText: `Sí, ${nuevoEstado}`
        });

        if (!confirm.isConfirmed) return;

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

            if (!response.ok) throw new Error("Error al actualizar");

            // ELIMINAR DE LA LISTA: Independientemente de si es aprobado o rechazado,
            // ya no es una "solicitud pendiente", por lo que se quita del estado local.
            setEventos(prev => prev.filter(ev => ev.id !== id));

            Swal.fire({
                icon: 'success',
                title: nuevoEstado === 'aprobado' ? 'Evento Aprobado' : 'Evento Rechazado',
                text: `El evento ha sido ${nuevoEstado} y quitado de tu lista.`,
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire('Error', 'No se pudo actualizar el estado', 'error');
        }
    };

    const createTestEvent = async () => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`${API_URL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: 'Evento de Prueba Moderación',
                    date: '2026-06-15',
                    time: '12:00',
                    state: 'pendiente',
                    type: 'Taller',
                    description: 'Prueba de flujo de moderador.',
                    dependence: currentUser.sedeAsignada
                })
            });
            fetchModeratorEvents();
        } catch (e) { console.log(e); }
    };

    if (loading) return <div className="p-5 text-center">Cargando solicitudes...</div>;

    return (
        <div style={{ padding: "2rem", background: "#f8f9fa", minHeight: "100vh" }}>
            <div className="alert shadow-sm" style={{ background: "#fff", borderLeft: "5px solid #2d6a27" }}>
                <strong>Moderador:</strong> {currentUser.nombre} | <strong>Sede:</strong> {currentUser.sedeAsignada}
            </div>

            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h2 style={{ color: "#2d6a27", fontWeight: "700" }}>Panel de Moderación</h2>
                    <p className="text-muted">Gestiona las solicitudes de tu dependencia.</p>
                </div>
                <button className="btn btn-success shadow-sm" onClick={createTestEvent}>
                    + Crear Prueba
                </button>
            </div>

            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead style={{ background: "#2d6a27", color: "#fff" }}>
                            <tr>
                                <th>Evento</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventos.length === 0 ? (
                                <tr><td colSpan="4" className="text-center py-4 text-muted">No hay solicitudes pendientes por ahora.</td></tr>
                            ) : (
                                eventos.map((ev) => (
                                    <tr key={ev.id}>
                                        <td>
                                            <div className="fw-bold">{ev.name}</div>
                                            <small className="text-muted">{ev.type}</small>
                                        </td>
                                        <td>{ev.date}</td>
                                        <td>{ev.time} h</td>
                                        <td className="text-center">
                                            <div className="btn-group">
                                                <button 
                                                    className="btn btn-outline-success btn-sm" 
                                                    onClick={() => handleDecision(ev.id, 'aprobado')}
                                                >
                                                    Aprobar
                                                </button>
                                                <button 
                                                    className="btn btn-outline-danger btn-sm" 
                                                    onClick={() => handleDecision(ev.id, 'rechazado')}
                                                >
                                                    Rechazar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ModeracionAdmin;