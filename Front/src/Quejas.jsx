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
    
    <div
  className="d-flex justify-content-center align-items-center py-5 px-3"
  style={{ background: "#f0f7ee", minHeight: "100vh" }}
>
  <div
    className="w-100 p-4"
    style={{
      maxWidth: "580px",
      background: "#fff",
      borderRadius: "20px",
      borderTop: "6px solid #2d6a27",
      borderBottom: "4px solid #c8a951",
      boxShadow: "0 8px 30px rgba(0,0,0,0.09)"
    }}
  >

    {/* Título */}
    <h2 className="fw-bold mb-1" style={{ color: "#1e4d1a" }}>
      Quejas y Sugerencias
    </h2>
    <p className="mb-4" style={{ color: "#6c757d", fontSize: "0.9rem" }}>
      Tu opinión nos ayuda a mejorar. Por favor, sé específico con tu reporte.
    </p>

    <form onSubmit={handleSubmit}>

      {/* Tipo de reporte */}
      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ color: "#2d6a27" }}>
          ¿Qué deseas reportar?
        </label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          required
          className="form-select"
          style={{ borderColor: "#2d6a27", borderRadius: "10px" }}
        >
          <option value="queja">Queja Formal</option>
          <option value="sugerencia">Sugerencia de Mejora</option>
          <option value="felicitacion">Agradecimiento / Felicitación</option>
        </select>
      </div>

      {/* Nombre */}
      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ color: "#2d6a27" }}>
          Nombre <span style={{ color: "#6c757d", fontWeight: 400 }}>(Opcional)</span>
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej. Diego Sanchez"
          className="form-control"
          style={{ borderColor: "#2d6a27", borderRadius: "10px" }}
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ color: "#2d6a27" }}>
          Correo Electrónico <span style={{ color: "#6c757d", fontWeight: 400 }}>(Opcional)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ej. correo@ucol.mx"
          className="form-control"
          style={{ borderColor: "#2d6a27", borderRadius: "10px" }}
        />
      </div>

      {/* Mensaje */}
      <div className="mb-4">
        <label className="form-label fw-semibold" style={{ color: "#2d6a27" }}>
          Detalle de la Queja/Sugerencia
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Describe tu situación o propuesta de manera clara y concisa."
          required
          className="form-control"
          style={{ borderColor: "#2d6a27", borderRadius: "10px", resize: "vertical" }}
        />
      </div>

      {/* Botón enviar */}
      <button
        type="submit"
        className="btn w-100 fw-bold"
        style={{
          background: "#2d6a27",
          color: "#fff",
          border: "2px solid #2d6a27",
          borderRadius: "20px",
          padding: "0.6rem",
          fontSize: "1rem",
          transition: "all 0.2s"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "#1e4d1a";
          e.currentTarget.style.borderColor = "#c8a951";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "#2d6a27";
          e.currentTarget.style.borderColor = "#2d6a27";
        }}
      >
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