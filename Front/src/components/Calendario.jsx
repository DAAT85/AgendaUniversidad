import React, { useState, useEffect, useCallback } from "react";
import Swal from 'sweetalert2';

// Constantes
const API_URL = "http://localhost:3000";
const tiposVistaCalendar = ["dia", "semana", "mes", "año"];

export default function CalendarioPrincipal() {
    const hoy = new Date();
    const API_EVENTS_URL = `${API_URL}/api/events`;

    // Estado del Calendario
    const [vista, setVista] = useState("mes");
    const [fechaActual, setFechaActual] = useState(hoy);
    const [events, setEvents] = useState([]);

    // --- LÓGICA DE EVENTOS (Para mostrar puntos indicadores en los días) ---
    const fetchEvents = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(API_EVENTS_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();
            const rawData = result.events ?? result.data ?? result;

            if (Array.isArray(rawData)) {
                const soloAprobados = rawData.filter(ev => (ev.state || "").toLowerCase().trim() === 'aprobado');
                setEvents(soloAprobados);
            }
        } catch (error) {
            console.error("Error cargando eventos:", error);
        }
    }, [API_EVENTS_URL]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // --- LÓGICA DE NAVEGACIÓN ---
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

    // Estilos
    const colorPrimarioCalendar = "#CCDB94";
    const estiloBotonNav = { background: colorPrimarioCalendar, color: "#fff", border: "none", borderRadius: "6px", padding: "5px 12px" };

    return (
        <div className="container-fluid py-4" style={{ background: "#f8fdf9", minHeight: "100vh" }}>
            <div className="row">
                {/* ── SOLO COLUMNA IZQUIERDA: CALENDARIO ── */}
                <div className="col-lg-4 col-md-6 mx-auto">
                    <div className="card shadow-sm border-0 p-3" style={{ borderRadius: "15px" }}>
                        
                        {/* Navegación */}
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <button onClick={() => navegar(-1)} style={estiloBotonNav}>‹</button>
                            <span className="fw-bold text-dark" style={{ fontSize: "1rem" }}>
                                {vista === "año" ? fechaActual.getFullYear() : capitalizar(fechaActual.toLocaleDateString("es-MX", { month: "long", year: "numeric" }))}
                            </span>
                            <button onClick={() => navegar(1)} style={estiloBotonNav}>›</button>
                        </div>

                        {/* Selector Vistas */}
                        <div className="d-flex justify-content-center gap-1 mb-3">
                            {tiposVistaCalendar.map((v) => (
                                <button 
                                    key={v} 
                                    onClick={() => setVista(v)} 
                                    className="btn btn-sm" 
                                    style={{ 
                                        fontSize: '0.7rem', 
                                        background: vista === v ? colorPrimarioCalendar : "#f0f0f0", 
                                        color: vista === v ? "#fff" : "#666",
                                        borderRadius: "12px",
                                        border: "none"
                                    }}>
                                    {capitalizar(v)}
                                </button>
                            ))}
                        </div>

                        {/* Contenido según vista */}
                        <div className="calendar-body">
                            {vista === "dia" && (
                                <div className="text-center py-4">
                                    <h1 style={{ color: colorPrimarioCalendar, fontSize: "3.5rem" }}>{fechaActual.getDate()}</h1>
                                    <p className="text-muted">{capitalizar(fechaActual.toLocaleDateString("es-MX", { weekday: 'long' }))}</p>
                                    <div className="mt-3">
                                        {events.filter(e => compararFechas(fechaActual, e.date)).map(e => (
                                            <div key={e.id} className="small p-2 mb-1 rounded" style={{ background: "#f1f8e9", borderLeft: `3px solid ${colorPrimarioCalendar}` }}>
                                                {e.name} - {e.time}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {vista === "semana" && (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
                                    {obtenerDiasSemana().map((f, i) => (
                                        <div key={i} onClick={() => abrirDia(f)} className="text-center p-2 rounded" style={{ cursor: "pointer", background: f.toDateString() === hoy.toDateString() ? colorPrimarioCalendar : "#fafafa", color: f.toDateString() === hoy.toDateString() ? "#fff" : "#333" }}>
                                            <div style={{ fontSize: "0.6rem" }}>{f.toLocaleDateString("es-MX", { weekday: 'short' }).toUpperCase()}</div>
                                            <div className="fw-bold">{f.getDate()}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {vista === "mes" && (
                                <>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", marginBottom: "10px" }}>
                                        {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
                                            <div key={i} className="text-center fw-bold text-muted" style={{ fontSize: '0.65rem' }}>{d}</div>
                                        ))}
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
                                        {Array(primerDiaSemana).fill(null).map((_, i) => <div key={i} />)}
                                        {Array(diasMes).fill(null).map((_, i) => {
                                            const dia = i + 1;
                                            const fechaIterada = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), dia);
                                            const esHoy = fechaIterada.toDateString() === hoy.toDateString();
                                            const tieneEventos = events.some(e => compararFechas(fechaIterada, e.date));
                                            return (
                                                <div key={i} onClick={() => abrirDia(dia)} className="d-flex align-items-center justify-content-center" 
                                                    style={{ 
                                                        aspectRatio: "1/1", cursor: "pointer", borderRadius: "50%", 
                                                        background: esHoy ? colorPrimarioCalendar : "transparent", 
                                                        color: esHoy ? "#fff" : "#333", fontSize: '0.8rem', position: 'relative',
                                                        border: esHoy ? "none" : "1px solid #f0f0f0"
                                                    }}>
                                                    {dia}
                                                    {tieneEventos && !esHoy && <div style={{ width: '4px', height: '4px', background: colorPrimarioCalendar, borderRadius: '50%', position: 'absolute', bottom: '4px' }}></div>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {vista === "año" && (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <div key={i} onClick={() => { const n = new Date(fechaActual); n.setMonth(i); setFechaActual(n); setVista("mes"); }}
                                            className="text-center p-2 rounded small"
                                            style={{ cursor: "pointer", background: i === hoy.getMonth() && fechaActual.getFullYear() === hoy.getFullYear() ? "#f1f8e9" : "#fff", border: "1px solid #eee" }}>
                                            {capitalizar(new Date(0, i).toLocaleDateString("es-MX", { month: "short" }))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}