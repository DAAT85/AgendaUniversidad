import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import '../styles/Quejas.css'; 
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

function Quejas() {
  const [formData, setFormData] = useState({
    tipo: 'queja',
    nombre: '',
    email: '',
    mensaje: '',
  });

  // Referencia para devolver el foco tras cerrar el modal
  const submitBtnRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    Swal.fire({
      title: '¡Mensaje Enviado!',
      html: `Gracias por tu <b>${formData.tipo}</b>. Lo revisaremos pronto.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#53A600',
      // Mejora A11Y: SweetAlert2 maneja el foco internamente, 
      // pero esto asegura que al cerrar regresemos al botón.
      didClose: () => {
        submitBtnRef.current?.focus();
      }
    });

    setFormData({
      tipo: 'queja',
      nombre: '',
      email: '',
      mensaje: '',
    });
  };

  return (
    <>
      <main 
        className="d-flex justify-content-center align-items-center py-5 px-3"
        style={{ background: "#f0f7ee", minHeight: "100vh" }}
      >
        <section 
          className="w-100 p-4"
          style={{
            maxWidth: "580px",
            background: "#fff",
            borderRadius: "20px",
            borderTop: "6px solid #2d6a27",
            borderBottom: "4px solid #c8a951",
            boxShadow: "0 8px 30px rgba(0,0,0,0.09)"
          }}
          aria-labelledby="form-title"
        >
          <h2 id="form-title" className="fw-bold mb-1" style={{ color: "#1e4d1a" }}>
            Quejas y Sugerencias
          </h2>
          <p id="form-description" className="mb-4" style={{ color: "#6c757d", fontSize: "0.9rem" }}>
            Tu opinión nos ayuda a mejorar. Por favor, sé específico con tu reporte.
          </p>

          <form onSubmit={handleSubmit} aria-describedby="form-description">

            {/* Tipo de reporte */}
            <div className="mb-3">
              <label htmlFor="tipo" className="form-label fw-semibold" style={{ color: "#2d6a27" }}>
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
              <label htmlFor="nombre" className="form-label fw-semibold" style={{ color: "#2d6a27" }}>
                Nombre <span aria-hidden="true" style={{ color: "#6c757d", fontWeight: 400 }}>(Opcional)</span>
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
                aria-label="Nombre completo (opcional)"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold" style={{ color: "#2d6a27" }}>
                Correo Electrónico <span aria-hidden="true" style={{ color: "#6c757d", fontWeight: 400 }}>(Opcional)</span>
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
                aria-label="Correo electrónico (opcional)"
              />
            </div>

            {/* Mensaje */}
            <div className="mb-4">
              <label htmlFor="mensaje" className="form-label fw-semibold" style={{ color: "#2d6a27" }}>
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
                aria-required="true"
              />
            </div>

            {/* Botón enviar */}
            <button
              ref={submitBtnRef}
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
              // Se recomienda usar CSS para hover en lugar de JS por temas de rendimiento y estados de foco
            >
              Enviar Reporte
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Quejas;