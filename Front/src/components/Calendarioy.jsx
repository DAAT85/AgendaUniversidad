import React, { useState, useEffect } from "react";

export default function Calendario() {
  const hoy = new Date();
  const [vista, setVista] = useState("mes");
  const [fechaActual, setFechaActual] = useState(hoy);
  const [events, setEvents] = useState([]); // Estado para los eventos de la API

  // 1. Cargar eventos desde la API al montar el componente
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/events");
        const result = await response.json();
        setEvents(result.events || []);
      } catch (error) {
        console.error("Error cargando eventos:", error);
      }
    };
    fetchEvents();
  }, []);

  // Función para normalizar fechas y comparar solo Año-Mes-Día
  const compararFechas = (fechaJS, fechaString) => {
    // fechaString viene como "YYYY-MM-DD" desde el input date del admin
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

  const obtenerDiasSemana = () => {
    const inicio = new Date(fechaActual);
    inicio.setDate(fechaActual.getDate() - fechaActual.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(inicio);
      d.setDate(inicio.getDate() + i);
      return d;
    });
  };

  const abrirDia = (fecha) => {
    const d = fecha instanceof Date ? fecha : new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fecha);
    setFechaActual(d);
    setVista("dia");
  };

  // Filtrar eventos para la vista actual (Día o Semana)
  const eventosDelDia = events.filter(e => compararFechas(fechaActual, e.date));
  
  const diasSemana = obtenerDiasSemana();
  const eventosDeLaSemana = events.filter(e => {
    return diasSemana.some(d => compararFechas(d, e.date));
  });

  const estiloBotonNav = { background: "#C8D98E", color: "#faf8f3", border: "1px solid #C8D98E", borderRadius: "6px" };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
      {/* Selector de Navegación y Vistas (Igual que antes) */}
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <button onClick={() => navegar(-1)} className="btn btn-sm" style={estiloBotonNav}>‹</button>
        <span className="fw-bold px-3 py-1 rounded shadow-sm text-white" style={{ background: "#C8D98E", fontSize: "1rem", flex: 1, textAlign: "center" }}>
          {vista === "año" ? fechaActual.getFullYear() : capitalizar(fechaActual.toLocaleDateString("es-MX", { month: "long", year: "numeric" }))}
        </span>
        <button onClick={() => navegar(1)} className="btn btn-sm" style={estiloBotonNav}>›</button>
      </div>

      <div className="d-flex justify-content-center gap-1 mb-3">
        {["dia", "semana", "mes", "año"].map((v) => (
          <button key={v} onClick={() => setVista(v)} className="btn btn-xs fw-bold" style={{ fontSize: "0.75rem", background: vista === v ? "#C8D98E" : "transparent", color: vista === v ? "#ffffff" : "#C8D98E", border: "1px solid #C8D98E", borderRadius: "15px", padding: "2px 10px" }}>{capitalizar(v)}</button>
        ))}
      </div>

      <div className="p-3 bg-white shadow-sm" style={{ border: "1px solid #d1d1d1", borderRadius: "12px" }}>
        
        {/* VISTA DÍA */}
        {vista === "dia" && (
          <div className="py-2">
            <div className="text-center mb-3">
                <h2 style={{ color: "#C8D98E", marginBottom: "0" }}>{fechaActual.getDate()}</h2>
                <p className="text-muted mb-0">{capitalizar(fechaActual.toLocaleDateString("es-MX", { weekday: 'long', month: 'long' }))}</p>
            </div>
            {eventosDelDia.length > 0 ? (
              eventosDelDia.map(e => (
                <div key={e.id} style={{ borderLeft: "4px solid #C8D98E", padding: "8px 12px", background: "#f9fbf2", borderRadius: "8px", marginBottom: "8px" }}>
                  <div className="fw-bold" style={{ fontSize: "0.9rem" }}>{e.name}</div>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>🕒 {e.time} hrs - {e.state}</div>
                </div>
              ))
            ) : <p className="text-center text-muted small italic">No hay eventos para este día</p>}
          </div>
        )}

        {/* VISTA SEMANA */}
        {vista === "semana" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", marginBottom: "15px" }}>
              {diasSemana.map((f, i) => {
                const tieneEventos = events.some(e => compararFechas(f, e.date));
                return (
                  <div key={i} onClick={() => abrirDia(f)} className="text-center p-2 rounded" style={{ cursor: "pointer", background: f.toDateString() === hoy.toDateString() ? "#C8D98E" : "#f9f9f9", color: f.toDateString() === hoy.toDateString() ? "#fff" : "#333", position: "relative" }}>
                    <div style={{ fontSize: "0.6rem" }}>{f.toLocaleDateString("es-MX", { weekday: 'short' }).toUpperCase()}</div>
                    <div className="fw-bold">{f.getDate()}</div>
                    {tieneEventos && <div style={{ width: "4px", height: "4px", background: "#C8D98E", borderRadius: "50%", margin: "2px auto" }} />}
                  </div>
                );
              })}
            </div>
            <div className="mt-3">
                <h6 className="small fw-bold text-muted border-bottom pb-1">Eventos de la semana:</h6>
                {eventosDeLaSemana.length > 0 ? (
                    eventosDeLaSemana.map(e => (
                        <div key={e.id} className="small mb-1">📅 {e.date.split('-')[2]} - <strong>{e.name}</strong></div>
                    ))
                ) : <p className="text-muted small">Sin eventos esta semana</p>}
            </div>
          </div>
        )}

        {/* VISTA MES */}
        {vista === "mes" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", marginBottom: "10px" }}>
              {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
                <div key={i} className="text-center fw-bold small" style={{ opacity: 0.8, fontSize: "0.7rem" }}>{d}</div>
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
                  <div key={i} onClick={() => abrirDia(dia)} className="d-flex flex-column align-items-center justify-content-center fw-semibold small"
                    style={{ aspectRatio: "1/1", cursor: "pointer", borderRadius: "50%", background: esHoy ? "#C8D98E" : "transparent", color: esHoy ? "#fff" : "#0c0d0a", fontSize: "0.8rem", position: "relative", border: "1px solid #eee" }}>
                    {dia}
                    {tieneEventos && !esHoy && (
                        <div style={{ position: "absolute", bottom: "4px", width: "4px", height: "4px", background: "#C8D98E", borderRadius: "50%" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}