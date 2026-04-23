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

  const abrirDia = (fecha) => {
    const d = fecha instanceof Date ? fecha : new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fecha);
    setFechaActual(d);
    setVista("dia");
  };

  const estiloBotonNav = {
    background: "#1a3d17",
    color: "#f5c842",
    border: "1px solid #f5c842",
    borderRadius: "6px",
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
      {/* Navegación mes/año */}
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <button onClick={() => navegar(-1)} className="btn btn-sm" style={estiloBotonNav}>‹</button>
        <span className="fw-bold px-3 py-1 rounded shadow-sm text-white"
          style={{ background: "#1e4d1a", fontSize: "1rem", flex: 1, textAlign: "center" }}>
          {capitalizar(fechaActual.toLocaleDateString("es-MX", { month: "long", year: "numeric" }))}
        </span>
        <button onClick={() => navegar(1)} className="btn btn-sm" style={estiloBotonNav}>›</button>
      </div>

      {/* Botones de vista */}
      <div className="d-flex justify-content-center gap-1 mb-3">
        {["dia", "semana", "mes", "año"].map((v) => (
          <button key={v} onClick={() => setVista(v)} className="btn btn-xs fw-bold"
            style={{
              fontSize: "0.75rem",
              background: vista === v ? "#1e4d1a" : "transparent",
              color: vista === v ? "#ffffff" : "#1e4d1a",
              border: "1px solid #1e4d1a",
              borderRadius: "15px",
              padding: "2px 10px",
            }}>
            {capitalizar(v)}
          </button>
        ))}
      </div>

      {/* Cuadrícula del calendario */}
      <div className="p-3 bg-white shadow-sm"
        style={{ border: "1px solid #d1d1d1", borderRadius: "12px" }}>
        {vista === "mes" && (
          <>
            {/* Encabezado días de semana */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", marginBottom: "10px" }}>
              {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
                <div key={i} className="text-center fw-bold small"
                  style={{ color: "#1e4d1a", opacity: 0.8, fontSize: "0.7rem" }}>{d}</div>
              ))}
            </div>

            {/* Días del mes */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
              {Array(primerDiaSemana).fill(null).map((_, i) => <div key={i} />)}
              {Array(diasMes).fill(null).map((_, i) => {
                const dia = i + 1;
                const esHoy =
                  dia === hoy.getDate() &&
                  fechaActual.getMonth() === hoy.getMonth() &&
                  fechaActual.getFullYear() === hoy.getFullYear();
                return (
                  <div key={i} onClick={() => abrirDia(dia)}
                    className="d-flex align-items-center justify-content-center fw-semibold small"
                    style={{
                      aspectRatio: "1/1",
                      cursor: "pointer",
                      borderRadius: "50%",
                      border: "1px solid #eee",
                      background: esHoy ? "#1e4d1a" : "transparent",
                      color: esHoy ? "#fff" : "#1e4d1a",
                      fontSize: "0.8rem",
                    }}>
                    {dia}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {vista !== "mes" && (
          <div className="text-center py-4 small text-muted"
            style={{ border: "1px dashed #ccc", borderRadius: "8px" }}>
            Vista {vista} activada
          </div>
        )}
      </div>
    </div>
  );
}