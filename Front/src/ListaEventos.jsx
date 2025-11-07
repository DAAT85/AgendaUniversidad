import React from 'react';
import Swal from 'sweetalert2';
import './Eventos.css'; 

const handleRegistro = (nombreEvento) => {
  Swal.fire({
    title: '¡Registro Exitoso!',
    html: `Te has registrado con éxito al evento:<br><b>${nombreEvento}</b>. <br>¡Revisa tu correo para más detalles!`,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#1E8449', 
    timer: 5000, 
    timerProgressBar: true,
  });
};


function ContenedorEvento({ id, fecha, nombre, descripcion, hora }) {
  // Al hacer clic, llamamos a handleRegistro y le pasamos el nombre
  return (
    <div className="evento-item">
      {/* Columna Izquierda: Fecha y Hora */}
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

function ListaEventos() {
  // Ejemplos
  const eventosEjemplo = [
    {
      id: 1,
      fecha: '08 Nov',
      hora: '10:00 AM',
      nombre: 'Conferencia de Programación Avanzada',
      descripcion: 'Sesión para desarrolladores web.',
    },
    {
      id: 2,
      fecha: '15 Nov',
      hora: '04:00 PM',
      nombre: 'Taller de Machine Learning',
      descripcion: 'Introducción a modelos de ML con Python y Scikit-learn.',
    },
  ];

  return (

    <div className="contenedor-pagina">
      <div className="lista-eventos-container">
        {eventosEjemplo.map(evento => (
          <ContenedorEvento key={evento.id} {...evento} />
        ))}
      </div>
      
    </div>
  );
}

export default ListaEventos;