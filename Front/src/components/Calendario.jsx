import React, { useState } from "react";
import "../styles/Calendario.css"

export default function Calendario() {
  const hoy = new Date();
  const [vista, setVista] = useState("mes");
  const [fechaActual, setFechaActual] = useState(hoy);

  const capitalizar = (txt) => txt.charAt(0).toUpperCase() + txt.slice(1);

  const cambiarMes = (incremento) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setMonth(fechaActual.getMonth() + incremento);
    setFechaActual(nuevaFecha);
  };

  const cambiarAño = (incremento) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setFullYear(fechaActual.getFullYear() + incremento);
    setFechaActual(nuevaFecha);
  };

  const obtenerDiasDelMes = () => {
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();
    return new Date(año, mes + 1, 0).getDate();
  };

  const diasMes = obtenerDiasDelMes();
  const primerDiaSemana = new Date(
    fechaActual.getFullYear(),
    fechaActual.getMonth(),
    1
  ).getDay();

  const semanaActual = (() => {
    const inicioSemana = new Date(fechaActual);
    inicioSemana.setDate(fechaActual.getDate() - fechaActual.getDay());

    return [...Array(7)].map((_, i) => {
      const d = new Date(inicioSemana);
      d.setDate(inicioSemana.getDate() + i);
      return d;
    });
  })();


  const abrirDia = (fecha) => {
    if (fecha instanceof Date) {
      setFechaActual(fecha);
    } else {
      setFechaActual(
        new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fecha)
      );
    }
    setVista("dia");
  };

  return (
    <div className="container py-4">

  {/* Controles de navegación */}
  <div className="d-flex justify-content-center align-items-center gap-2 mb-3 flex-wrap">
    <button
      onClick={() => cambiarAño(-1)}
      className="btn btn-sm fw-semibold"
      style={{ background: "#1e4d1a", color: "#c8a951", border: "1px solid #c8a951" }}
    >
      « Año
    </button>
    <button
      onClick={() => cambiarMes(-1)}
      className="btn btn-sm fw-semibold"
      style={{ background: "#1e4d1a", color: "#c8a951", border: "1px solid #c8a951" }}
    >
      ‹ Mes
    </button>

    <span
      className="fw-bold px-3 py-1 rounded"
      style={{ background: "#2d6a27", color: "#fff", fontSize: "1rem", letterSpacing: "1px" }}
    >
      {capitalizar(fechaActual.toLocaleDateString("es-MX", { month: "long", year: "numeric" }))}
    </span>

    <button
      onClick={() => cambiarMes(1)}
      className="btn btn-sm fw-semibold"
      style={{ background: "#1e4d1a", color: "#c8a951", border: "1px solid #c8a951" }}
    >
      Mes ›
    </button>
    <button
      onClick={() => cambiarAño(1)}
      className="btn btn-sm fw-semibold"
      style={{ background: "#1e4d1a", color: "#c8a951", border: "1px solid #c8a951" }}
    >
      Año »
    </button>
  </div>

  {/* Botones de vista */}
  <div className="d-flex justify-content-center gap-2 mb-4">
    {["dia", "semana", "mes", "año"].map((v) => (
      <button
        key={v}
        onClick={() => setVista(v)}
        className="btn btn-sm fw-semibold"
        style={{
          background: vista === v ? "#c8a951" : "transparent",
          color: vista === v ? "#fff" : "#2d6a27",
          border: "2px solid #2d6a27",
          borderRadius: "20px",
          minWidth: "70px",
          transition: "all 0.2s"
        }}
      >
        {v.charAt(0).toUpperCase() + v.slice(1)}
      </button>
    ))}
  </div>

  {/* Vista Día */}
  {vista === "dia" && (
    <div
      className="text-center p-4 rounded"
      style={{ background: "#fff", border: "2px solid #2d6a27", borderRadius: "16px" }}
    >
      <h3 style={{ color: "#1e4d1a" }}>
        {capitalizar(fechaActual.toLocaleDateString("es-MX", {
          day: "numeric", month: "long", year: "numeric"
        }))}
      </h3>
      <p style={{ color: "#6c757d" }}>No hay eventos este día.</p>
    </div>
  )}

  {/* Vista Semana */}
  {vista === "semana" && (
    <div className="row g-2">
      {semanaActual.map((d, i) => (
        <div key={i} className="col" onClick={() => abrirDia(d)}>
          <div
            className="text-center p-3 rounded fw-semibold"
            style={{
              background: "#fff",
              border: "2px solid #2d6a27",
              borderRadius: "12px",
              color: "#1e4d1a",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#2d6a27";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#1e4d1a";
            }}
          >
            <div style={{ fontSize: "0.75rem" }}>
              {capitalizar(d.toLocaleDateString("es-MX", { weekday: "short" }))}
            </div>
            <div style={{ fontSize: "1.3rem" }}>{d.getDate()}</div>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* Vista Mes */}
  {vista === "mes" && (
    <div
      className="p-3 rounded"
      style={{ background: "#fff", border: "2px solid #2d6a27", borderRadius: "16px" }}
    >
      {/* Headers días */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "4px" }}>
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
          <div
            key={d}
            className="text-center fw-bold py-1"
            style={{ color: "#c8a951", fontSize: "0.8rem" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
        {Array(primerDiaSemana).fill(null).map((_, i) => (
          <div key={"vacio" + i} />
        ))}
        {Array(diasMes).fill(null).map((_, i) => (
          <div
            key={i}
            onClick={() => abrirDia(i + 1)}
            className="text-center py-2 rounded fw-semibold"
            style={{
              cursor: "pointer",
              color: "#1e4d1a",
              border: "1px solid #d4edda",
              borderRadius: "8px",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#2d6a27";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#1e4d1a";
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Vista Año */}
  {vista === "año" && (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
      {Array(12).fill(null).map((_, m) => (
        <div
          key={m}
          onClick={() => {
            const nueva = new Date(fechaActual);
            nueva.setMonth(m);
            setFechaActual(nueva);
            setVista("mes");
          }}
          className="text-center py-3 rounded fw-semibold"
          style={{
            background: "#fff",
            border: "2px solid #2d6a27",
            borderRadius: "12px",
            color: "#1e4d1a",
            cursor: "pointer",
            transition: "all 0.2s",
            textTransform: "capitalize"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#2d6a27";
            e.currentTarget.style.color = "#c8a951";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#1e4d1a";
          }}
        >
          {capitalizar(new Date(0, m).toLocaleDateString("es-MX", { month: "long" }))}
        </div>
      ))}
    </div>
  )}

</div>
  );
}
