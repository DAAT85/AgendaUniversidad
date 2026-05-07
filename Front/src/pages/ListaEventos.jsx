import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import '../styles/Eventos.css'; 

const handleRegistro = async (nombreEvento) => {  
  try {
    const response = await fetch(`http://localhost:3000/events`, {  
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
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#1E8449',
        timer: 5000,
        timerProgressBar: true,
      });

    } else {
      
      Swal.fire({
        title: 'Acceso Denegado',
        text: data.error || 'Inicia sesión para registrarte.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#E74C3C',
      });
    }

  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'No se pudo conectar con el servidor.',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }
};


function ContenedorEvento({ fecha, nombre, descripcion, hora }) {
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



        //Si algo paso, me lanza un nuevo error
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();


        setEvents(result.events || []); 


      } catch (error) {
        console.log("CATCH - Error:", error.message, error);
        Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar los eventos" });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando eventos...</p>;

  return (
    <div className="contenedor-pagina">
      <div className="lista-eventos-container">

        {events.length === 0 
          ? <p style={{ textAlign: 'center' }}>No hay eventos disponibles por el momento</p>
          : events.map(evento => (
              <ContenedorEvento
                key={evento.id}
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