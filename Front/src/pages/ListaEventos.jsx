import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../styles/Eventos.css'; 

const API_URL = "http://localhost:3000"; 

const handleRegistro = async (nombreEvento) => {  
  try {
    const response = await fetch(`${API_URL}/api/events`, {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` 
      },
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: '¡Registro Exitoso!',
        html: `Te has registrado con éxito al evento:<br><b>${nombreEvento}</b>.`,
        icon: 'success',
        confirmButtonColor: '#1E8449',
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        title: 'Acceso Denegado',
        text: data.error || 'Inicia sesión para registrarte.',
        icon: 'error',
        confirmButtonColor: '#E74C3C',
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'No se pudo conectar con el servidor.',
      icon: 'error',
    });
  }
};

function ContenedorEvento({ id, fecha, nombre, descripcion, hora }) {
  const fechaISO = fecha ? fecha.split('/').reverse().join('-') : "";

  return (
    <article className="evento-item" aria-labelledby={`evento-${id}`}>
      <header className="evento-fecha-hora">
        <time dateTime={fechaISO} className="evento-fecha">{fecha}</time>
        <span className="evento-hora">{hora}</span>
      </header>
      
      <div className="evento-info">
        <h2 id={`evento-${id}`} className="evento-nombre">{nombre}</h2>
        <p className="evento-descripcion">{descripcion}</p>
      </div>
      
      <div className="evento-registro">
        <button 
          className="btn-registro"
          onClick={() => handleRegistro(nombre)}
          aria-label={`Registrarse en el evento: ${nombre}`}
        >
          Registrarse
        </button>
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
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const result = await response.json();
        const rawData = result.events ?? result.data ?? result;
        
        // --- CAMBIO CLAVE AQUÍ ---
        // Filtramos para que SOLO se muestren los aprobados.
        // Si el estado es 'rechazado' o 'pendiente', se excluye de la lista.
        if (Array.isArray(rawData)) {
          const soloAprobados = rawData.filter(ev => ev.state === 'aprobado');
          setEvents(soloAprobados);
        } else {
          setEvents([]);
        }
        // -------------------------

      } catch (error) {
        console.error("Error al cargar eventos:", error);
        Swal.fire({ 
            icon: "error", 
            title: "Error", 
            text: "No se pudieron sincronizar los eventos" 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p>Cargando eventos disponibles...</p>
    </div>
  );

  return (
    <div className="contenedor-pagina">
      <div className="lista-eventos-container">
        {events.length === 0 
          ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No hay eventos disponibles por el momento.</p>
            </div>
          )
          : events.map(evento => (
              <ContenedorEvento
                key={evento.id}
                id={evento.id}
                fecha={evento.date}
                hora={evento.time}
                nombre={evento.name}
                descripcion={evento.description}
              />
            ))
        }
      </div>
    </div>
  );
}

export default ListaEventos;