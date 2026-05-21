import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../styles/Eventos.css'; 

const API_URL = "http://localhost:3000"; 

// Agregamos la prop "lugar"
function ContenedorEvento({ id, fecha, nombre, descripcion, hora, lugar }) {
  return (
    <article className="evento-item">
      <header className="evento-fecha-hora">
        <time className="evento-fecha">{fecha}</time>
        <span className="evento-hora">{hora}</span>
      </header>
      <div className="evento-info">
        <h2 className="evento-nombre">{nombre}</h2>
        {/* Mostramos el lugar con un estilo distintivo */}
        <p className="evento-lugar"><strong>Lugar:</strong> {lugar || "Sede Universitaria"}</p>
        <p className="evento-descripcion">{descripcion}</p>
      </div>
      <div className="evento-registro">
        <button className="btn-registro">Registrarse</button>
      </div>
    </article>
  );
}

function ListaEventos() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {        
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/api/events`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const result = await response.json();
        const rawData = result.events ?? result.data ?? result;
        
        if (Array.isArray(rawData)) {
          const soloAprobados = rawData.filter(ev => {
            const statusLimpio = (ev.state || "").toLowerCase().trim();
            return statusLimpio === 'aprobado';
          });
          setEvents(soloAprobados);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="p-5 text-center">Cargando eventos...</div>;

  return (
    <div className="contenedor-pagina" style={{ padding: "2rem" }}>
      <h1 className="text-center mb-4" style={{ color: "#2d6a27" }}>Cartelera Universitaria</h1>
      <div className="lista-eventos-container">
        {events.length === 0 ? (
          <p className="text-center w-100">No hay eventos aprobados en este momento.</p>
        ) : (
          events.map(evento => (
            <ContenedorEvento
              key={evento.id}
              id={evento.id}
              fecha={evento.date}
              hora={evento.time}
              nombre={evento.name}
              descripcion={evento.description}
              // Pasamos la propiedad del lugar (ajusta 'place' según tu API)
              lugar={evento.place || evento.location} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ListaEventos;