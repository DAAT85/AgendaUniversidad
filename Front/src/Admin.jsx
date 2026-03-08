import { useState } from "react";
import EventosAdmin from "./EventosAdmin";
import UsuariosAdmin from "./UsuariosAdmin";

function Admin() {
  const [tab, setTab] = useState("eventos");

  return (
    <>
      <header
    className="px-4 py-3 text-white text-center"
    style={{
      background: "linear-gradient(135deg, #2d6a27 0%, #3d8a30 100%)",
      borderBottomLeftRadius: "20px",
      borderBottomRightRadius: "20px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      borderBottom: "4px solid #c8a951"  // línea dorada institucional
    }}
  >
    <p style={{ margin: 0, fontSize: "0.75rem", letterSpacing: "2px", color: "#c8a951" }}>
      UNIVERSIDAD DE COLIMA
    </p>
    <h1 style={{ margin: 0, fontWeight: "700" }}>Administrador de Eventos</h1>
    <p style={{ margin: 0, fontSize: "0.8rem", color: "#d4edda" }}>
      Estudia · Lucha · Trabaja
    </p>
  </header>

  <nav
    className="navbar navbar-expand-lg px-4"
    style={{
      backgroundColor: "#1e4d1a",
      borderBottom: "3px solid #c8a951"
    }}
  >
    <ul className="navbar-nav gap-3">
      <li className="nav-item">
        <button
          className="btn btn-link fw-semibold text-decoration-none"
          onClick={() => setTab("eventos")}
          style={{
            color: tab === "eventos" ? "#c8a951" : "#d4edda",
            borderBottom: tab === "eventos" ? "2px solid #c8a951" : "2px solid transparent",
            borderRadius: 0,
            paddingBottom: "4px",
            transition: "all 0.2s"
          }}
        >
          Eventos
        </button>
      </li>
      <li className="nav-item">
        <button
          className="btn btn-link fw-semibold text-decoration-none"
          onClick={() => setTab("usuarios")}
          style={{
            color: tab === "usuarios" ? "#c8a951" : "#d4edda",
            borderBottom: tab === "usuarios" ? "2px solid #c8a951" : "2px solid transparent",
            borderRadius: 0,
            paddingBottom: "4px",
            transition: "all 0.2s"
          }}
        >
          Usuarios
        </button>
      </li>
    </ul>
  </nav>

  {tab === "eventos" && <EventosAdmin />}
  {tab === "usuarios" && <UsuariosAdmin />}
    </>
  );
}

export default Admin;