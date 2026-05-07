import React, { useState, useEffect, useCallback } from "react";

export default function Calendario() {
  const hoy = new Date();
  const [vista, setVista] = useState("mes");
  const [fechaActual, setFechaActual] = useState(hoy);
  const [events, setEvents] = useState([]);

  // ← useCallback para poder reusar la función en el intervalo
  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/events");
      const result = await response.json();
      setEvents(result.events || []);
    } catch (error) {
      console.error("Error cargando eventos:", error);
    }
  }, []);

  useEffect(() => {
    fetchEvents(); // Carga inicial

    // ← Refresca cada 15 segundos para mostrar eventos recién aprobados
    const interval = setInterval(fetchEvents, 15000);
    return () => clearInterval(interval); // Limpia al desmontar
  }, [fetchEvents]);

  const compararFechas = (fechaJS, fechaString) => {
    const f1 = fechaJS.toISOString().split('T')[0];
    return f1 === fechaString;
  };

  const capitalizar = (txt) => txt.charAt(0).toUpperCase() + txt.slice(1);

  const navegar = (direccion) => {
    const nuevaFecha = new Date(fechaActual);
    if (vista === "dia") nuevaFecha.setDate(fechaActual.getDate() + direccion);
    else if (vista === "semana") nuevaFecha.setDate(fechaActual.getDate() + (direccion * 7));
    else if (vista === "mes") nuevaFecha.setMonth(fechaActual.getMonth() + direccion);
    else if (vista === "año") nuevaFecha.setFullYear(fechaActual.getFullYear() + direccion);
    setFechaActual(nuevaFecha);
  };

  const obtenerDiasDelMes = () => new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0).getDate();
  const diasMes = obtenerDiasDelMes();
  const primerDiaSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1).getDay();

  const abrirDia = (fecha) => {
    const d = fecha instanceof Date ? fecha : new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fecha);
    setFechaActual(d);
    setVista("dia");
  };

  const obtenerDiasSemana = () => {
    const inicio = new Date(fechaActual);
    inicio.setDate(fechaActual.getDate() - fechaActual.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(inicio);
      d.setDate(inicio.getDate() + i);
      return d;
    });
  };

  const estiloBotonNav = { background: "#CCDB94", color: "#fffffb", border: "1px solid #CCDB94", borderRadius: "6px" };

  const listaEscenarios = [
    {
      titulo: "Aula DGRE",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc1803201611215642.jpg",
      aforo: "16 personas",
      ubicacion: "Edificio de Recursos Educativos (antes Medios Didácticos) - Campus Colima. Av. Universidad #333. Col. Las Víboras C.P. 28040 Colima, Col.",
      responsable: "Salvador Mata Rodríguez",
      correo: "matall@ucol.mx",
      telefono: "+52 (312) 316 1093 ext 35604",
      servicios: "Clases, cursos y visitas",
      web: "http://portal.ucol.mx/dgre/"
    },
    {
      titulo: "CIAM Colima 1",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc18032016112209669.jpg", 
      aforo: "40 personas",
      ubicacion: "Edificio CIAM - Campus Colima, Área de la Salud. Av. Universidad #333. Col. Las Víboras C.P. 28040 Colima, Col.",
      responsable: "Jorge A. Cedeño (T.M.)",
      correo: "ciam_colima@ucol.mx",
      telefono: "n/a",
      servicios: "Clases, cursos y visitas",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "CIAM Colima 2",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc18032016112254530.jpg",
      aforo: "24 personas",
      ubicacion: "Edificio de Formación Docente - Campus Colima. Av. Universidad #333. Col. Las Víboras C.P. 28040 Colima, Col.",
      responsable: "José Luis Mondragón Virgen",
      correo: "ciam_colima2@ucol.mx",
      telefono: "n/a",
      servicios: "clases, visitas, cursos",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "CIAM Coquimatlán",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc18032016112304547.jpg",
      aforo: "40 personas",
      ubicacion: "Edificio CIAM-CUICA - Campus Coquimatlán Carr. Colima-Coquimatlán Km 9, C.P. 28400 Coquimatlán, Col.",
      responsable: "Juan Manuel Calvillo Ramos",
      correo: "ciam_coqui@ucol.mx",
      telefono: "+52 (312) 316 1000 ext. 51060",
      servicios: "clases, visitas y cursos",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "CIAM Manzanillo",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc18032016112314174.jpg",
      aforo: "40 personas",
      ubicacion: " Centro de Tecnología Educativa - Campus El Naranjo. Kilometro 20 carretera Manzanillo-Cihuatlán, C.P. 28860, Manzanillo, Col.",
      responsable: "Ramón Castillo Baltazar",
      correo: "ciam_manzanillo@ucol.mx",
      telefono: "+52 (312) 316 1000 ext. 53250",
      servicios: "clases, visitas, cursos",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "CIAM Tecoman",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc07042016105029910.jpg",
      aforo: "40 personas",
      ubicacion: "Centro de Tecnología Educativa - Campus Tecomán Km. 40 Autopista Colima-Manzanillo. Crucero de Tecomán. CP.28100, Tecomán, Col.",
      responsable: "Manuel Gutierrez Gómez",
      correo: "ciam_tecoman@ucol.mx",
      telefono: "+52 (312) 316 1000 ext. 52353",
      servicios: "Clases, visitas y cursos",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "CIAM Villa de Álvarez",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc07042016104956732.jpg",
      aforo: "24 personas",
      ubicacion: "Edificio de Posgrado - Campus Villa de Álvarez. Josefa Ortiz de Domínguez # 64, C.P. 28970, Villa",
      responsable: "Jorge Yasmil Sandoval Amezcua",
      correo: "ciam_villa@ucol.mx",
      telefono: "+52 (312) 316 1000 ext. 50060",
      servicios: "Clases, visitas y cursos",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "Cabina para grabación de audio y video",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_video.jpg",
      aforo: "5 personas",
      ubicacion: "Edificio de Recursos Educativos (antes Medios Didácticos) - Campus Colima. Av. Universidad #333. Col. Las Víboras C.P. 28040 Colima, Col.",
      responsable: "Ramón Genel",
      correo: " genel@ucol.mx",
      telefono: "+(52) 312 316 1093",
      servicios: " Área de grabación de video, Cabina de grabación de audio",
      web: " https://portal.ucol.mx/dgred/"
    },
  ];

  return (
    <div className="container-fluid py-4 px-lg-5">
      <div className="row align-items-start">
        
        {/* ── COLUMNA IZQUIERDA: CALENDARIO (STICKY) ── */}
        <div className="col-lg-4 col-md-5 mb-4" 
             style={{ 
               position: "sticky", 
               top: "20px",
               zIndex: 10,
               alignSelf: "flex-start" 
             }}>
          <div className="p-1">
            <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
              <button onClick={() => navegar(-1)} className="btn btn-sm" style={estiloBotonNav}>‹</button>
              <span className="fw-bold px-3 py-1 rounded shadow-sm text-white" style={{ background: "#CCDB94", fontSize: "0.9rem", flex: 1, textAlign: "center" }}>
                {vista === "año" ? fechaActual.getFullYear() : capitalizar(fechaActual.toLocaleDateString("es-MX", { month: "long", year: "numeric" }))}
              </span>
              <button onClick={() => navegar(1)} className="btn btn-sm" style={estiloBotonNav}>›</button>
            </div>

            <div className="d-flex justify-content-center gap-1 mb-3">
              {["dia", "semana", "mes", "año"].map((v) => (
                <button key={v} onClick={() => setVista(v)} className="btn btn-xs fw-bold" style={{ fontSize: '0.75rem', background: vista === v ? "#CCDB94" : "transparent", color: vista === v ? "#ffffff" : "#CCDB94", border: "1px solid #CCDB94", borderRadius: "15px", padding: "2px 10px" }}>
                  {capitalizar(v)}
                </button>
              ))}
            </div>

            <div className="p-3 bg-white shadow-sm" style={{ border: "1px solid #d1d1d1", borderRadius: "12px" }}>
              
              {/* VISTA DÍA */}
              {vista === "dia" && (
                <div className="py-2">
                  <div className="text-center">
                    <h2 style={{ color: "#CCDB94", marginBottom: "0" }}>{fechaActual.getDate()}</h2>
                    <p className="text-muted small mb-3">{capitalizar(fechaActual.toLocaleDateString("es-MX", { weekday: 'long', month: 'long' }))}</p>
                  </div>
                  <div style={{ borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
                    {events.filter(e => compararFechas(fechaActual, e.date)).length > 0 ? (
                      events.filter(e => compararFechas(fechaActual, e.date)).map(e => (
                        <div key={e.id} className="p-2 mb-2 rounded" style={{ background: "#f9fbf2", borderLeft: "3px solid #CCDB94", fontSize: "0.8rem" }}>
                          <strong>{e.name}</strong> <br/>
                          <span className="text-muted">🕒 {e.time} - {e.state}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-2 small text-muted">No hay eventos en este día</div>
                    )}
                  </div>
                </div>
              )}

              {/* VISTA SEMANA */}
              {vista === "semana" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
                    {obtenerDiasSemana().map((f, i) => {
                      const tieneEventos = events.some(e => compararFechas(f, e.date));
                      return (
                        <div key={i} onClick={() => abrirDia(f)} className="text-center p-1 rounded" style={{ cursor: "pointer", background: f.toDateString() === hoy.toDateString() ? "#CCDB94" : "#f9f9f9", color: f.toDateString() === hoy.toDateString() ? "#fff" : "#333", position: 'relative' }}>
                          <div style={{ fontSize: "0.55rem" }}>{f.toLocaleDateString("es-MX", { weekday: 'short' }).toUpperCase()}</div>
                          <div className="fw-bold small">{f.getDate()}</div>
                          {tieneEventos && <div style={{ width: '4px', height: '4px', background: '#CCDB94', borderRadius: '50%', margin: '0 auto' }}></div>}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {events.filter(e => obtenerDiasSemana().some(d => compararFechas(d, e.date))).length > 0 ? (
                       events.filter(e => obtenerDiasSemana().some(d => compararFechas(d, e.date))).map(e => (
                        <div key={e.id} className="small mb-1" style={{ fontSize: '0.75rem' }}>• {e.date.split('-')[2]}: <strong>{e.name}</strong></div>
                       ))
                    ) : (
                      <div className="text-center py-4 small text-muted" style={{border: '1px dashed #ccc', borderRadius: '8px'}}>No hay eventos en esta semana</div>
                    )}
                  </div>
                </>
              )}

              {/* VISTA MES */}
              {vista === "mes" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", marginBottom: "10px" }}>
                    {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
                      <div key={i} className="text-center fw-bold small" style={{ color: "#CCDB94", opacity: 0.8, fontSize: '0.7rem' }}>{d}</div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
                    {Array(primerDiaSemana).fill(null).map((_, i) => <div key={i} />)}
                    {Array(diasMes).fill(null).map((_, i) => {
                      const dia = i + 1;
                      const fechaIterada = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), dia);
                      const tieneEventos = events.some(e => compararFechas(fechaIterada, e.date));
                      const esHoy = fechaIterada.toDateString() === hoy.toDateString();
                      
                      return (
                        <div key={i} onClick={() => abrirDia(dia)} className="d-flex flex-column align-items-center justify-content-center fw-semibold small" style={{ aspectRatio: "1/1", cursor: "pointer", borderRadius: "50%", border: "1px solid #eee", background: esHoy ? "#CCDB94" : "transparent", color: esHoy ? "#fff" : "#1e4d1a", fontSize: '0.8rem', position: 'relative' }}>
                          {dia}
                          {tieneEventos && !esHoy && (
                            <div style={{ width: '3px', height: '3px', background: '#CCDB94', borderRadius: '50%', position: 'absolute', bottom: '3px' }}></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* VISTA AÑO */}
              {vista === "año" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i} onClick={() => { const n = new Date(fechaActual); n.setMonth(i); setFechaActual(n); setVista("mes"); }}
                        className="text-center p-2 rounded small" 
                        style={{ cursor: "pointer", background: i === hoy.getMonth() && fechaActual.getFullYear() === hoy.getFullYear() ? "#CCDB9422" : "#f9f9f9", border: "1px solid #eee", fontSize: '0.7rem' }}>
                        {capitalizar(new Date(0, i).toLocaleDateString("es-MX", { month: "short" }))}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── COLUMNA DERECHA: ESCENARIOS (SCROLL LARGO) ── */}
        <div className="col-lg-8 col-md-7">
          <h5 className="mb-4 fw-bold" style={{ color: "#CCDB94", borderLeft: "5px solid #CCDB94", paddingLeft: "15px" }}>
            Detalles de Escenarios
          </h5>
          
          {listaEscenarios.map((esc, index) => (
            <div key={index} className="card shadow-sm border-0 mb-4" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e0e0e0" }}>
              <div className="py-2 px-3 fw-bold" style={{ background: "#f8f9fa", borderBottom: "1px solid #eee", color: "#333", fontSize: "0.95rem" }}>
                {esc.titulo}
              </div>
              <div className="row g-0 p-3 bg-white">
                <div className="col-xl-4 col-lg-5">
                  <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                    <img src={esc.imagen} alt={esc.titulo} className="img-fluid" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                    <div style={{ height: '4px', background: '#CCDB94', width: '100%', position: 'absolute', bottom: 0 }}></div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 px-3 mt-3 mt-lg-0">
                  <div className="list-group list-group-flush" style={{ fontSize: "0.82rem" }}>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">💻</span> <div><strong>Aforo:</strong> {esc.aforo}</div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">📍</span> <div style={{lineHeight: '1.2'}}><strong>Ubicación:</strong> {esc.ubicacion}</div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">👤</span> <div><strong>Responsable:</strong> {esc.responsable}</div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">✉️</span> <div><strong>Correo:</strong> <a href={`mailto:${esc.correo.trim()}`} className="text-decoration-none">{esc.correo}</a></div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">📞</span> <div><strong>Teléfono:</strong> {esc.telefono}</div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">⚙️</span> <div><strong>Servicios:</strong> {esc.servicios}</div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">🌐</span> <div><strong>Sitio web:</strong> <a href={esc.web.trim()} target="_blank" rel="noreferrer" className="text-decoration-none">{esc.web}</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}