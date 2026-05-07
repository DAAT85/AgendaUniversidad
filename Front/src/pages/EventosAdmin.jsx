import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const escenarios = [
    "Aula DGRE",
    "CIAM Colima 1",
    "CIAM Villa de Álvarez",
    "CIAM Tecoman",
    "CIAM Colima 2",
    "CIAM Coquimatlan",
    "CIAM Manzanillo",
    "Cabina para grabacion y video"
];

const tipos = ["Conferencia", "Taller", "Curso", "Cultural", "Deportivo", "Otro"];

function EventosAdmin() {
    const [events, setEvents] = useState([]);
    const API_URL = "http://localhost:3000/api/events";

    // Cargar eventos al iniciar
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(API_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();
            
            // Ajuste para manejar diferentes estructuras de respuesta
            const data = result.events || result.data || result;
            setEvents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al cargar:", error);
            Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar los eventos" });
        }
    };

    const openModal = (event = null, index = null) => {
        Swal.fire({
            title: event ? "Actualizar evento" : "Crear evento",
            html: `
            <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
                <label style="font-weight: bold; color: #2d6a27;">Nombre</label>
                <input id="input-name" class="swal2-input" style="margin: 0; width: 100%;" value="${event ? event.name : ""}">
                
                <label style="font-weight: bold; color: #2d6a27;">Sede (Dependencia)</label>
                <select id="input-dependence" class="swal2-select" style="margin: 0; width: 100%;">
                    ${escenarios.map(e => `<option value="${e}" ${event && event.dependence === e ? "selected" : ""}>${e}</option>`).join("")}
                </select>
                
                <label style="font-weight: bold; color: #2d6a27;">Tipo</label>
                <select id="input-type" class="swal2-select" style="margin: 0; width: 100%;">
                    ${tipos.map(t => `<option value="${t}" ${event && event.type === t ? "selected" : ""}>${t}</option>`).join("")}
                </select>
                
                <div style="display: flex; gap: 10px;">
                    <div style="flex: 1;">
                        <label style="font-weight: bold; color: #2d6a27;">Fecha</label>
                        <input id="input-date" type="date" class="swal2-input" style="margin: 0; width: 100%;" value="${event ? event.date : ""}">
                    </div>
                    <div style="flex: 1;">
                        <label style="font-weight: bold; color: #2d6a27;">Hora</label>
                        <input id="input-time" type="time" class="swal2-input" style="margin: 0; width: 100%;" value="${event ? event.time : ""}">
                    </div>
                </div>
                
                <label style="font-weight: bold; color: #2d6a27;">Descripción</label>
                <textarea id="input-desc" class="swal2-textarea" style="margin: 0; width: 100%;">${event ? event.description : ""}</textarea>
            </div>
            `,
            background: "#f0fdf4",
            confirmButtonText: "Guardar",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            preConfirm: () => {
                const formData = {
                    name: document.getElementById("input-name").value,
                    dependence: document.getElementById("input-dependence").value,
                    type: document.getElementById("input-type").value,
                    date: document.getElementById("input-date").value,
                    time: document.getElementById("input-time").value,
                    description: document.getElementById("input-desc").value,
                };

                if (!formData.name || !formData.date || !formData.time) {
                    Swal.showValidationMessage("Nombre, fecha y hora son obligatorios.");
                    return false;
                }
                return formData;
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                const method = event ? "PUT" : "POST";
                const url = event ? `${API_URL}/${event.id}` : API_URL;

                try {
                    const response = await fetch(url, {
                        method: method,
                        headers: { 
                            "Content-Type": "application/json", 
                            "Authorization": `Bearer ${token}` 
                        },
                        body: JSON.stringify(result.value)
                    });

                    if (!response.ok) throw new Error("Fallo en la petición");

                    const savedEvent = await response.json();
                    
                    // Actualizar estado local para evitar refrescar manualmente
                    if (event) {
                        const updatedList = [...events];
                        updatedList[index] = savedEvent;
                        setEvents(updatedList);
                    } else {
                        setEvents(prev => [savedEvent, ...prev]);
                    }

                    Swal.fire({ icon: "success", title: "Guardado", timer: 1500, showConfirmButton: false });
                } catch (error) {
                    Swal.fire({ icon: "error", title: "Error", text: "No se pudo procesar la solicitud" });
                }
            }
        });
    };

    const deleteEvent = (id, index) => {
        Swal.fire({
            title: "¿Eliminar evento?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            confirmButtonColor: "#e74a3b",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch(`${API_URL}/${id}`, {
                        method: "DELETE",
                        headers: { "Authorization": `Bearer ${token}` }
                    });

                    if (response.ok) {
                        setEvents(events.filter((_, i) => i !== index));
                        Swal.fire({ icon: "success", title: "Eliminado", timer: 1500, showConfirmButton: false });
                    }
                } catch (error) {
                    Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar" });
                }
            }
        });
    };

    return (
        <div style={{ background: "#f0f7ee", minHeight: "100vh" }}>
            <div className="d-flex justify-content-center align-items-center gap-3 py-4">
                <button
                    onClick={() => openModal()}
                    style={{
                        fontSize: "2rem", width: "60px", height: "60px", borderRadius: "50%",
                        border: "none", background: "#2d6a27", color: "#fff", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                > + </button>
                <h2 style={{ color: "#2d6a27", margin: 0, fontWeight: "700" }}>Gestión de Eventos</h2>
            </div>

            <main style={{
                padding: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "1.5rem", maxWidth: "1200px", margin: "0 auto"
            }}>
                {events.length === 0 ? (
                    <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#6c757d" }}>No hay eventos registrados.</p>
                ) : (
                    events.map((event, index) => (
                        <div key={event.id || index} style={{
                            background: "#fff", padding: "1.5rem", borderRadius: "16px",
                            borderLeft: "6px solid #2d6a27", boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3 style={{ color: "#1e4d1a" }}>{event.name}</h3>
                                <span style={{ background: "#e8f5e9", color: "#2d6a27", padding: "4px 10px", borderRadius: "8px", fontSize: "0.8rem" }}>
                                    {event.state?.toUpperCase() || 'PENDIENTE'}
                                </span>
                            </div>
                            <p><strong>📍 Sede:</strong> {event.dependence}</p>
                            <p><strong>📅 Fecha:</strong> {event.date}</p>
                            <p><strong>⏰ Hora:</strong> {event.time}</p>
                            
                            <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                                <button onClick={() => openModal(event, index)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid #2d6a27", background: "none", color: "#2d6a27", cursor: "pointer" }}>Editar</button>
                                <button onClick={() => deleteEvent(event.id, index)} style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid #e74a3b", background: "none", color: "#e74a3b", cursor: "pointer" }}>Eliminar</button>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
}

export default EventosAdmin;