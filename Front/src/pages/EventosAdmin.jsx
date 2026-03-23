import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const escenarios = [
    "Todos",
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



function EventosAdmin(){
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {

            const token = localStorage.getItem("token"); 
            const response = await fetch("http://localhost:3000/api/events", {
                headers: {
                '   Authorization': `Bearer ${token}` 
                }
            });
            const result = await response.json();
            setEvents(result.events || []); 
            } catch (error) {
                Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar los eventos" });
            }
        };
            fetchEvents();
        }, []);

        // Modal para editar los eventos
    const openModal = (event = null, index = null) => {
        Swal.fire({
            title: event ? "Actualizar evento" : "Crear evento",
            html: `
            <input 
            id="input-name" 
            class="swal2-input custom-input" 
            placeholder="Nombre del evento"
            value="${event ? event.name : ""}"
            >
    
        <select id="input-escenario" class="swal2-select custom-input">
            ${escenarios
            .map(
                (e) =>
                `<option value="${e}" ${
                    event && event.state === e ? "selected" : ""
                }>${e}</option>`
            )
            .join("")}
        </select>
    
        <select id="input-type" class="swal2-select custom-input">
            ${tipos
            .map(
                (t) =>
                `<option value="${t}" ${
                    event && event.type === t ? "selected" : ""
                }>${t}</option>`
            )
            .join("")}
        </select>
    
        <input 
            id="input-date" 
            type="date" 
            class="swal2-input custom-input"
            value="${event ? event.date : ""}"
        >
    
        <input 
            id="input-time" 
            type="time" 
            class="swal2-input custom-input"
            value="${event ? event.time : ""}"
        >
    
        <textarea 
            id="input-desc" 
            class="swal2-textarea custom-input" 
            placeholder="Descripción del evento"
        >${event ? event.description : ""}</textarea>
        `,
        background: "#f0fdf4",
        confirmButtonText: "Guardar ",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#6b7280",
        customClass: {
        popup: "green-modal",
        title: "green-title"
    },
    
    preConfirm: () => {
        const newEvent = {
        name: document.getElementById("input-name").value,
        state: document.getElementById("input-escenario").value,
        type: document.getElementById("input-type").value,
        date: document.getElementById("input-date").value,
        time: document.getElementById("input-time").value,
        description: document.getElementById("input-desc").value,
        };

        if (!newEvent.name || !newEvent.date || !newEvent.time || !newEvent.description) {
        Swal.showValidationMessage("Todos los campos son obligatorios.");
        return false;
        }

        const [hours, minutes] = newEvent.time.split(":").map(Number);
        const newTimeInMinutes = hours * 60 + minutes;

        const conflict = events.some((ev, i) => {
        if (event && i === index) return false;

        if (ev.state === newEvent.state && ev.date === newEvent.date) {
            const [h, m] = ev.time.split(":").map(Number);
            const existingTime = h * 60 + m;
            const difference = Math.abs(existingTime - newTimeInMinutes);
            return difference < 60;
        }

        return false;
        });

        if (conflict) {
        Swal.showValidationMessage("Ya existe un evento en ese escenario en ese horario");
        return false;
        }

        return newEvent;
    }
        }).then(async (result) => {
            if (result.isConfirmed) {
        
                // Fetch para actualizar un evento
                if (event) {
                try {
                    const response = await fetch(`http://localhost:3000/api/events/${event.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(result.value)
                    });
                    const data = await response.json();
                    const updatedEvents = [...events];
                    updatedEvents[index] = data.event;
                    setEvents(updatedEvents);
                    Swal.fire({ icon: "success", title: "Evento actualizado", timer: 1500, showConfirmButton: false });
                } catch (error) {
                    Swal.fire({ icon: "error", title: "Error", text: "No se pudo actualizar el evento" });
                }
        
                // Fetch para crear un evento
                } else {
                try {
                    const response = await fetch("http://localhost:3000/api/events", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(result.value)
                    });
                    const data = await response.json();
                    setEvents([...events, data.event]);
                    Swal.fire({ icon: "success", title: "Evento creado", timer: 1500, showConfirmButton: false });
                } catch (error) {
                    Swal.fire({ icon: "error", title: "Error", text: "No se pudo crear el evento" });
                }
                }
            }
            });
        };
    
      // Para eliminar un evento
    const deleteEvent = (index) => {
        Swal.fire({
        title: "¿Eliminar evento?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
        }).then(async (result) => {
        if (result.isConfirmed) {
            try {
            const eventToDelete = events[index];
            await fetch(`http://localhost:3000/api/events/${eventToDelete.id}`, {
                method: "DELETE"
            });
            setEvents(events.filter((_, i) => i !== index));
            Swal.fire({ icon: "success", title: "Evento eliminado", timer: 1500, showConfirmButton: false });
            } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar el evento" });
            }
        }
        });
    };
    return(
    <>
    <div className="d-flex justify-content-center align-items-center gap-2 my-3">
    <button
        onClick={() => openModal()}
        style={{
        fontSize: "1.5rem",
        width: "55px",
        height: "55px",
        borderRadius: "50%",
        border: "3px solid #c8a951",
        background: "#2d6a27",
        color: "#c8a951",
        cursor: "pointer",
        boxShadow: "0 6px 15px rgba(45,106,39,0.35)",
        transition: "all 0.2s"
        }}
        onMouseEnter={e => e.target.style.background = "#1e4d1a"}
        onMouseLeave={e => e.target.style.background = "#2d6a27"}
    >
        +
    </button>
    <span style={{ color: "#2d6a27", fontWeight: "600", fontSize: "0.9rem" }}>
        Nuevo evento
    </span>
    </div>

    <main
    style={{
        padding: "2rem",
        display: "grid",
        gap: "1.5rem",
        background: "#f0f7ee", 
        minHeight: "80vh"
    }}
    >
    {events.length === 0 && (
        <p style={{ textAlign: "center", color: "#6c757d" }}>
        No hay eventos creados
        </p>
    )}

    {events.map((event, index) => (
        <div
        key={event.id}
        style={{
            background: "#ffffff",
            padding: "1.5rem",
            borderRadius: "16px",
            borderLeft: "5px solid #2d6a27",   
            boxShadow: "0 8px 20px rgba(0,0,0,0.07)",
            transition: "transform 0.2s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
        <h3 style={{ marginTop: 0, color: "#1e4d1a" }}>{event.name}</h3>

        <div style={{ marginBottom: "0.8rem" }}>
            
            <span
            style={{
                display: "inline-block",
                background: "#c8a951",
                color: "#fff",
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
                fontSize: "0.8rem",
                marginRight: "0.5rem",
                fontWeight: "600"
            }}
            >
            {event.state}
            </span>

            
            <span
            style={{
                display: "inline-block",
                background: "#2d6a27",
                color: "#fff",
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: "600"
            }}
            >
            {event.type}
            </span>
        </div>

        <p><strong style={{ color: "#2d6a27" }}>Fecha:</strong> {event.date}</p>
        <p><strong style={{ color: "#2d6a27" }}>Hora:</strong> {event.time}</p>
        <p style={{ color: "#555" }}>{event.description}</p>

        <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem" }}>
            <button
            onClick={() => openModal(event, index)}
            style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "10px",
                border: "2px solid #2d6a27",
                background: "transparent",
                color: "#2d6a27",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.2s"
            }}
            onMouseEnter={e => {
                e.target.style.background = "#2d6a27";
                e.target.style.color = "#fff";
            }}
            onMouseLeave={e => {
                e.target.style.background = "transparent";
                e.target.style.color = "#2d6a27";
            }}
            >
            Editar
            </button>

            <button
            onClick={() => deleteEvent(index)}
            style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "10px",
                border: "2px solid #e74a3b",
                background: "transparent",
                color: "#e74a3b",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.2s"
            }}
            onMouseEnter={e => {
                e.target.style.background = "#e74a3b";
                e.target.style.color = "#fff";
            }}
            onMouseLeave={e => {
                e.target.style.background = "transparent";
                e.target.style.color = "#e74a3b";
            }}
            >
            Eliminar
            </button>
        </div>
        </div>
    ))}
    </main>

    <footer style={{ padding: "1rem", textAlign: "center", background: "#f0f7ee" }}>
    <small style={{ color: "#2d6a27", fontWeight: "500" }}>
        Universidad de Colima © {new Date().getFullYear()}
    </small>
    </footer>
    </>
    );
};


export default EventosAdmin;