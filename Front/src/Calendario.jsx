import React, { useState } from "react";
import "./Calendario.css";

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

  //  MODIFICADO: aceptar fecha completa desde semana
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
    <div className="calendario-container">

      <div className="controles">
        <button onClick={() => cambiarAño(-1)}>« Año</button>
        <button onClick={() => cambiarMes(-1)}>‹ Mes</button>

        <span className="titulo">
          {capitalizar(
            fechaActual.toLocaleDateString("es-MX", {
              month: "long",
              year: "numeric",
            })
          )}
        </span>

        <button onClick={() => cambiarMes(1)}>Mes ›</button>
        <button onClick={() => cambiarAño(1)}>Año »</button>
      </div>

      <div className="vistas-btns">
        <button onClick={() => setVista("dia")}>Día</button>
        <button onClick={() => setVista("semana")}>Semana</button>
        <button onClick={() => setVista("mes")}>Mes</button>
        <button onClick={() => setVista("año")}>Año</button>
      </div>

      {/* ---------- VISTA DÍA ---------- */}
      {vista === "dia" && (
        <div className="vista-dia">
          <h3>
            {capitalizar(
              fechaActual.toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            )}
          </h3>
          <p>No hay eventos este día.</p>
        </div>
      )}

      {/* ---------- VISTA SEMANA ---------- */}
      {vista === "semana" && (
        <div className="semana-grid">
          {semanaActual.map((d, i) => (
            <div
              key={i}
              className="dia-semana"
              onClick={() => abrirDia(d)}  
            >
              <strong>
                {capitalizar(
                  d.toLocaleDateString("es-MX", { weekday: "short" })
                )}{" "}
                {d.getDate()}
              </strong>
            </div>
          ))}
        </div>
      )}

      {/* ---------- VISTA MES ---------- */}
      {vista === "mes" && (
        <div className="mes-grid">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
            <div key={d} className="header-dia">{d}</div>
          ))}

          {Array(primerDiaSemana)
            .fill(null)
            .map((_, i) => (
              <div key={"vacio" + i} className="dia vacio"></div>
            ))}

          {Array(diasMes)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="dia"
                onClick={() => abrirDia(i + 1)}
              >
                {i + 1}
              </div>
            ))}
        </div>
      )}

      {/* ---------- VISTA AÑO ---------- */}
      {vista === "año" && (
        <div className="ano-grid">
          {Array(12)
            .fill(null)
            .map((_, m) => (
              <div
                key={m}
                className="mes-cuadro"
                onClick={() => {
                  const nueva = new Date(fechaActual);
                  nueva.setMonth(m);
                  setFechaActual(nueva);
                  setVista("mes");
                }}
              >
                {capitalizar(
                  new Date(0, m).toLocaleDateString("es-MX", {
                    month: "long",
                  })
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
