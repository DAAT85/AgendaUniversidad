import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Footer from "./components/Footer.jsx";
import './styles/Eventos.css'; 


const handleRegistro = (nombreEvento) => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Inicia sesión primero',
      text: 'Necesitas una cuenta para registrarte a un evento.',
      confirmButtonText: 'Ir al login',
      confirmButtonColor: '#1E8449',
    }).then(() => navigate('/login')); 
    return;
  }

};

function ContenedorEvento({ fecha, nombre, descripcion, hora }) {
  return (
    <div className="evento-item">
      <div className="evento-fecha-hora">
        <p className="evento-fecha">{fecha}</p>
        <p className="evento-hora">{hora}</p>
      </div>
      
      <div className="evento-info">
        <h3 className="evento-nombre">{nombre}</h3>
        <p className="evento-descripcion">{descripcion}</p>
      </div>
      
      <div className="evento-registro">
        <button 
          className="btn-registro"
          onClick={() => handleRegistro(nombre)}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}


function ListaEventos({ filtro = "Todos" }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {

        const response = await fetch("http://localhost:3000/api/events");

        const result = await response.json();
        setEvents(result.events || []);

      } catch (error) {
        console.log("Error", error);
        Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar los eventos" });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);


const eventosFiltrados = filtro === "Todos"
    ? events
    : events.filter(evento => evento.type === filtro);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando eventos...</p>;

  return (
    <>
      <div className="contenedor-pagina">
        <div className="lista-eventos-container">
    
          {eventosFiltrados.length === 0 
            ? <p style={{ textAlign: 'center' }}>No hay eventos disponibles para este escenario</p>
            : eventosFiltrados.map(evento => (
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
      <Footer />
    </>
  );
}

export default ListaEventos;