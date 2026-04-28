import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

function Quejas() {
  const [formData, setFormData] = useState({
    tipo: 'queja',
    nombre: '',
    email: '',
    mensaje: '',
  });

  const [enviando, setEnviando] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const selectRef = useRef(null);
  const submitBtnRef = useRef(null);

  const opciones = [
    { id: 'queja', label: 'Queja Formal',  },
    { id: 'sugerencia', label: 'Sugerencia de Mejora', },
    { id: 'felicitacion', label: 'Agradecimiento / Felicitación', }
  ];

  useEffect(() => {
    const clickFuera = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", clickFuera);
    return () => document.removeEventListener("mousedown", clickFuera);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);

    setTimeout(() => {
      Swal.fire({
        title: '¡Mensaje Enviado!',
        html: `Gracias por tu <b>${formData.tipo}</b>. Lo revisaremos pronto.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#CCDB94',
        didClose: () => { submitBtnRef.current?.focus(); }
      });

      setFormData({ tipo: 'queja', nombre: '', email: '', mensaje: '', });
      setEnviando(false);
    }, 800);
  };

  const opcionSeleccionada = opciones.find(o => o.id === formData.tipo);

  return (
    <>
      <main className="d-flex justify-content-center align-items-center py-5 px-3"
            style={{ background: "linear-gradient(135deg, #f0f7ee 0%, #e8f0e5 100%)", minHeight: "100vh" }}>
        
        <section className="w-100 p-4 p-md-5"
                 style={{ maxWidth: "600px", background: "#fff", borderRadius: "25px", borderTop: "8px solid #CCDB94", boxShadow: "0 15px 35px rgba(0,0,0,0.06)" }}>
          
          <div className="text-center mb-4">
             <h2 className="fw-bold mb-1" style={{ color: "#8b9c4d" }}>Quejas y Sugerencias</h2>
             <div style={{ height: "4px", width: "200px", background: "#CCDB94", margin: "10px auto", borderRadius: "2px" }}></div>
             <p className="text-muted small">Tu opinión nos ayuda a mejorar la experiencia universitaria.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* --- CUSTOM SELECT TIPO DE REPORTE --- */}
            <div className="mb-4 position-relative" ref={selectRef}>
              <label className="form-label small fw-bold text-uppercase" style={{ color: "#8b9c4d" }}>
                ¿Qué deseas reportar?
              </label>
              
              <div 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  padding: "12px 18px",
                  background: "#fff",
                  border: `2px solid ${isOpen ? '#CCDB94' : '#eee'}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  boxShadow: isOpen ? "0 0 0 4px rgba(204, 219, 148, 0.15)" : "none"
                }}
              >
                <span style={{ fontSize: "0.95rem" }}>
                  {opcionSeleccionada.icon} &nbsp; {opcionSeleccionada.label}
                </span>
                <span style={{ 
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", 
                  transition: "0.3s", color: "#CCDB94", fontSize: "0.8rem" 
                }}>▼</span>
              </div>

              {isOpen && (
                <div style={{
                  position: "absolute", top: "105%", left: 0, right: 0,
                  background: "white", borderRadius: "12px", border: "1px solid #eee",
                  zIndex: 1000, overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  animation: "fadeIn 0.2s ease-out"
                }}>
                  {opciones.map((opc) => (
                    <div 
                      key={opc.id}
                      onClick={() => {
                        setFormData({...formData, tipo: opc.id});
                        setIsOpen(false);
                      }}
                      style={{
                        padding: "12px 18px", cursor: "pointer", display: "flex", alignItems: "center",
                        background: formData.tipo === opc.id ? "#f0f7ee" : "white",
                        color: formData.tipo === opc.id ? "#8b9c4d" : "#444",
                        fontWeight: formData.tipo === opc.id ? "600" : "400",
                        fontSize: "0.95rem", transition: "0.2s"
                      }}
                      onMouseEnter={(e) => e.target.style.background = formData.tipo === opc.id ? "#f0f7ee" : "#f8f9fa"}
                      onMouseLeave={(e) => e.target.style.background = formData.tipo === opc.id ? "#f0f7ee" : "white"}
                    >
                      <span style={{ marginRight: "12px" }}>{opc.icon}</span>
                      {opc.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* --- CAMPOS NOMBRE Y EMAIL --- */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label small fw-bold text-uppercase" style={{ color: "#8b9c4d" }}>Nombre</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Opcional"
                       className="form-control" style={{ borderRadius: "12px", border: "2px solid #eee", padding: "10px" }} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label small fw-bold text-uppercase" style={{ color: "#8b9c4d" }}>Correo</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Opcional"
                       className="form-control" style={{ borderRadius: "12px", border: "2px solid #eee", padding: "10px" }} />
              </div>
            </div>

            {/* --- MENSAJE --- */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase" style={{ color: "#8b9c4d" }}>Detalles del mensaje</label>
              <textarea name="mensaje" rows="4" value={formData.mensaje} onChange={handleChange} required
                        placeholder="Escribe aquí tu reporte..." className="form-control"
                        style={{ borderRadius: "12px", border: "2px solid #eee", resize: "none", padding: "12px" }} maxLength="500" />
              <div className="text-end small mt-1 text-muted">{formData.mensaje.length} / 500</div>
            </div>

            {/* --- BOTÓN ENVIAR --- */}
            <button
              ref={submitBtnRef} type="submit" disabled={enviando} className="btn w-100 fw-bold py-3"
              style={{
                background: enviando ? "#d1d1d1" : "#CCDB94", color: "#4a5a1f", border: "none",
                borderRadius: "15px", fontSize: "1.1rem", transition: "0.3s"
              }}
            >
              {enviando ? "Enviando..." : "Enviar Reporte"}
            </button>
          </form>
        </section>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .form-control:focus {
          border-color: #CCDB94 !important;
          box-shadow: 0 0 0 4px rgba(204, 219, 148, 0.15) !important;
        }
      `}</style>
    </>
  );
}

export default Quejas;