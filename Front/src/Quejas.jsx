import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Quejas.css'; 
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

function Quejas() {
  const [formData, setFormData] = useState({
    tipo: 'queja',
    nombre: '',
    email: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Datos enviados:", formData);


    Swal.fire({
      title: '¡Mensaje Enviado!',
      html: `Gracias por tu <b>${formData.tipo}</b>. Lo revisaremos pronto.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#53A600', 
    });

    // Resetear formulario
    setFormData({
      tipo: 'queja',
      nombre: '',
      email: '',
      mensaje: '',
    });
  };

  return (
    <>
    <NavBar />
    <div className="quejas-container">
      <div className="quejas-card">
        <h2 className="quejas-title" style={{ color: '#53A600' }}>Quejas y Sugerencias</h2>
        <p className="quejas-subtitle">Tu opinión nos ayuda a mejorar. Por favor, sé específico con tu reporte.</p>

        <form onSubmit={handleSubmit} className="quejas-form">
          {/* Campo Tipo de Reporte */}
          <div className="form-group">
            <label htmlFor="tipo">¿Qué deseas reportar?</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="queja">Queja Formal</option>
              <option value="sugerencia">Sugerencia de Mejora</option>
              <option value="felicitacion">Agradecimiento / Felicitación</option>
            </select>
          </div>
          
          {/* Campo Nombre (Opcional) */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre (Opcional)</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Diego Sanchez"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico (Opcional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej. correo@ucol.mx"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mensaje">Detalle de la Queja/Sugerencia</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Describe tu situación o propuesta de manera clara y concisa."
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Enviar Reporte
          </button>
        </form>
      </div>
    </div>
    
    <Footer />
    </>

    
  );
}

export default Quejas;