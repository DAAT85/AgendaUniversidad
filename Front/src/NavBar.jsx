import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo y título */}
        <div className="navbar-left">
          <img
            src="./public/udc.png"
            alt="Logo UdeC"
            className="navbar-logo"
          />
          <div className="navbar-text">
            <h1>Universidad de Colima</h1>
            <p>Dirección General de Recursos Educativos</p>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav className="navbar-menu">
          <a href="#" className="active">CALENDARIO</a>
          <a href="#">SOLICITAR ESCENARIO</a>
          <a href="#">ESCENARIOS DISPONIBLES</a>
          <a href="#">QUEJAS Y SUGERENCIAS</a>
        </nav>
      </div>
    </header>
  );
}
export default NavBar;
