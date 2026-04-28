import React, { useState } from "react";

export default function Calendario() {
  const hoy = new Date();
  const [vista, setVista] = useState("mes");
  const [fechaActual, setFechaActual] = useState(hoy);

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

  // Componente auxiliar para el mensaje de "sin eventos"
  const SinEventos = () => (
    <div className="text-center py-3 mt-3 small text-muted" 
         style={{ borderTop: "1px dashed #eee", fontStyle: "italic" }}>
      No hay eventos en est{vista === "semana" ? "a" : "e"} {vista}
    </div>
  );

  const estiloBotonNav = {
    background: "#C8D98E",
    color: "#faf8f3",
    border: "1px solid #C8D98E",
    borderRadius: "6px",
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <button onClick={() => navegar(-1)} className="btn btn-sm" style={estiloBotonNav}>‹</button>
        <span className="fw-bold px-3 py-1 rounded shadow-sm text-white"
          style={{ background: "#C8D98E", fontSize: "1rem", flex: 1, textAlign: "center" }}>
          {vista === "año" ? fechaActual.getFullYear() : capitalizar(fechaActual.toLocaleDateString("es-MX", { month: "long", year: "numeric" }))}
        </span>
        <button onClick={() => navegar(1)} className="btn btn-sm" style={estiloBotonNav}>›</button>
      </div>

      <div className="d-flex justify-content-center gap-1 mb-3">
        {["dia", "semana", "mes", "año"].map((v) => (
          <button key={v} onClick={() => setVista(v)} className="btn btn-xs fw-bold"
            style={{
              fontSize: "0.75rem",
              background: vista === v ? "#C8D98E" : "transparent",
              color: vista === v ? "#ffffff" : "#C8D98E",
              border: "1px solid #C8D98E",
              borderRadius: "15px",
              padding: "2px 10px",
            }}>
            {capitalizar(v)}
          </button>
        ))}
      </div>

      <div className="p-3 bg-white shadow-sm" style={{ border: "1px solid #d1d1d1", borderRadius: "12px" }}>
        
        {vista === "dia" && (
          <div className="text-center py-2">
            <h2 style={{ color: "#C8D98E", marginBottom: "0" }}>{fechaActual.getDate()}</h2>
            <p className="text-muted mb-0">{capitalizar(fechaActual.toLocaleDateString("es-MX", { weekday: 'long', month: 'long' }))}</p>
            <SinEventos />
          </div>
        )}

        {vista === "semana" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
              {obtenerDiasSemana().map((f, i) => (
                <div key={i} onClick={() => abrirDia(f)} className="text-center p-2 rounded" 
                  style={{ 
                    cursor: "pointer", 
                    background: f.toDateString() === hoy.toDateString() ? "#C8D98E" : "#f9f9f9",
                    color: f.toDateString() === hoy.toDateString() ? "#fff" : "#333"
                  }}>
                  <div style={{ fontSize: "0.6rem" }}>{f.toLocaleDateString("es-MX", { weekday: 'short' }).toUpperCase()}</div>
                  <div className="fw-bold">{f.getDate()}</div>
                </div>
              ))}
            </div>
            <SinEventos />
          </div>
        )}

        {vista === "mes" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", marginBottom: "10px" }}>
              {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
                <div key={i} className="text-center fw-bold small" style={{ color: "#0b0b07", opacity: 0.8, fontSize: "0.7rem" }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
              {Array(primerDiaSemana).fill(null).map((_, i) => <div key={i} />)}
              {Array(diasMes).fill(null).map((_, i) => {
                const dia = i + 1;
                const esHoy = dia === hoy.getDate() && fechaActual.getMonth() === hoy.getMonth() && fechaActual.getFullYear() === hoy.getFullYear();
                return (
                  <div key={i} onClick={() => abrirDia(dia)} className="d-flex align-items-center justify-content-center fw-semibold small"
                    style={{ aspectRatio: "1/1", cursor: "pointer", borderRadius: "50%", border: "1px solid #eee", background: esHoy ? "#C8D98E" : "transparent", color: esHoy ? "#fff" : "#0c0d0a", fontSize: "0.8rem" }}>
                    {dia}
                  </div>
                );
              })}
            </div>
            <SinEventos />
          </>
        )}

        {vista === "año" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} onClick={() => { const n = new Date(fechaActual); n.setMonth(i); setFechaActual(n); setVista("mes"); }}
                  className="text-center p-2 rounded small" 
                  style={{ cursor: "pointer", background: i === hoy.getMonth() && fechaActual.getFullYear() === hoy.getFullYear() ? "#C8D98E22" : "#f9f9f9", border: "1px solid #eee" }}>
                  {capitalizar(new Date(0, i).toLocaleDateString("es-MX", { month: "short" }))}
                </div>
              ))}
            </div>
            <SinEventos />
          </div>
        )}
      </div>
    </div>
  );
}