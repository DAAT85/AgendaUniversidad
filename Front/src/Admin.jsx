import React, { useState } from "react";
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

function Admin() {
  const [events, setEvents] = useState([]);

  // ABRIR MODAL (CREAR / EDITAR)
  const openModal = (event = null, index = null) => {
    Swal.fire({
      title: event ? "Actualizar evento" : "Crear evento",
      html: `
        <input 
          id="input-name" 
          class="swal2-input" 
          placeholder="Nombre del evento"
          value="${event ? event.name : ""}"
        >

        <select id="input-escenario" class="swal2-select">
          ${escenarios
            .map(
              (e) =>
                `<option value="${e}" ${
                  event && event.escenario === e ? "selected" : ""
                }>${e}</option>`
            )
            .join("")}
        </select>

        <input 
          id="input-date" 
          type="date" 
          class="swal2-input"
          value="${event ? event.date : ""}"
        >

        <input 
          id="input-time" 
          type="time" 
          class="swal2-input"
          value="${event ? event.time : ""}"
        >

        <textarea 
          id="input-desc" 
          class="swal2-textarea" 
          placeholder="Descripción del evento"
        >${event ? event.desc : ""}</textarea>
      `,
      showCancelButton: true,
      confirmButtonText: event ? "Actualizar" : "Registrar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        return {
          name: document.getElementById("input-name").value,
          escenario: document.getElementById("input-escenario").value,
          date: document.getElementById("input-date").value,
          time: document.getElementById("input-time").value,
          desc: document.getElementById("input-desc").value,
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (event) {
          const updatedEvents = [...events];
          updatedEvents[index] = result.value;
          setEvents(updatedEvents);
        } else {
          setEvents([...events, result.value]);
        }
      }
    });
  };

  // DELETE
  const deleteEvent = (index) => {
    Swal.fire({
      title: "¿Eliminar evento?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        setEvents(events.filter((_, i) => i !== index));
      }
    });
  };

  return (
    <>
      <header style={{ padding: "1rem", background: "#222", color: "#fff" }}>
        <h1>Administrador de eventos</h1>
      </header>

      <main style={{ padding: "1rem", display: "grid", gap: "1rem" }}>
        {events.length === 0 && <p>No hay eventos creados</p>}

        {events.map((event, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px"
            }}
          >
            <h3>{event.name}</h3>

            <span
              style={{
                display: "inline-block",
                background: "#198754",
                color: "#fff",
                padding: "0.2rem 0.6rem",
                borderRadius: "6px",
                marginBottom: "0.5rem"
              }}
            >
              {event.escenario}
            </span>

            <p><strong>Fecha:</strong> {event.date}</p>
            <p><strong>Hora:</strong> {event.time}</p>
            <p>{event.desc}</p>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => openModal(event, index)}>
                Editar
              </button>
              <button onClick={() => deleteEvent(index)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </main>

      <footer style={{ padding: "1rem", textAlign: "center" }}>
        <button
          onClick={() => openModal()}
          style={{
            fontSize: "1.5rem",
            padding: "0.5rem 1rem"
          }}
        >
          +
        </button>
      </footer>
    </>
  );
}

export default Admin;
