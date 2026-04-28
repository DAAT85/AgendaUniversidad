import React from "react";
import "../styles/NavBar.css";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"; 

function NavBar() {
  //Para el cambio de estilo de boton y que cambie a "Cerrar sesion"
  const [activo, setActivo] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
  if (activo) {
    // Si ya inició sesión, pregunta si quiere cerrar
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        setActivo(false); // Cierra sesión
        localStorage.clear(); //Esto limpia el token una vez que se cierre sesion
        Swal.fire('Sesión cerrada', '', 'success').then(()=>{
          navigate("/");
        });
      }
    });
  } else {
    // Si no ha iniciado sesión, abre el modal de login
    openLoginModal();
  }
};


const openLoginModal = () => {
  Swal.fire({
  title: `<span style="color: #CCDB94; font-weight: bold;">Acceso al Sistema</span>`,
  html: `
    <style>
      /* Contenedor principal */
      .swal2-popup {
        border-radius: 15px !important;
        padding: 2rem !important;
      }
      /* Logo institucional */
      .login-logo {
        width: 80px;
        margin-bottom: 15px;
      }
      /* Estilo de los inputs */
      .swal2-container input.custom-input {
        height: 45px;
        width: 100%;
        margin: 8px 0;
        font-size: 0.95rem;
        padding: 0 15px;
        border: 1.5px solid #e0e0e0;
        border-radius: 8px;
        box-sizing: border-box;
        transition: all 0.3s;
      }
      .swal2-container input.custom-input:focus {
        border-color: #CCDB94;
        box-shadow: 0 0 0 2px rgba(30, 77, 26, 0.2);
        outline: none;
      }
      /* Botón personalizado */
      .btn-ucol {
        background-color: #CCDB94 !important;
        color: white !important;
        border: none !important;
        padding: 12px !important;
        border-radius: 8px !important;
        font-weight: bold !important;
        width: 100%;
        margin-top: 15px;
        transition: background 0.3s;
      }
      .btn-ucol:hover {
        background-color: #143512 !important;
      }
      .login-footer {
        font-size: 0.8rem;
        color: #666;
        margin-top: 15px;
      }
    </style>

    <div class="text-center">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_de_la_Universidad_de_Colima.svg" class="login-logo" alt="Ucol Logo">
      <p style="color: #666; margin-bottom: 20px;">Dirección General de Recursos Educativos</p>
      
      <div class="text-start">
        <label style="font-size: 0.8rem; color: #CCDB94; font-weight: 600; margin-left: 5px;">Correo Universitario</label>
        <input type="email" id="swal-input-email" class="custom-input" placeholder="ejemplo@ucol.mx">
        
        <label style="font-size: 0.8rem; color: #CCDB94; font-weight: 600; margin-left: 5px; margin-top: 10px; display: block;">Contraseña</label>
        <input type="password" id="swal-input-password" class="custom-input" placeholder="••••••••">
      </div>
      
      <button id="btn-login" class="btn-ucol">INGRESAR</button>
      
      <div class="login-footer">
        © Universidad de Colima
      </div>
    </div>
  `,
    showConfirmButton: false,
    didOpen: () => {
      const btnLogin = document.getElementById('btn-login');

      btnLogin.addEventListener('click', async () => {
        const email = document.getElementById('swal-input-email').value;
        const password = document.getElementById('swal-input-password').value;

        // Validar campos vacíos
        if (!email || !password) {
          Swal.showValidationMessage('Por favor completa todos los campos');
          return;
        }

        try {
          // Mostrar loading
          Swal.showLoading();

          const response = await fetch(`http://localhost:3000/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });

          const result = await response.json();

          if (response.ok) {
            // Login exitoso
              localStorage.setItem('token', result.token);
              localStorage.setItem('role', result.user.role);

            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido!',
              text: `Hola ${result.user?.name || result.admin?.name || result.name}`,
              confirmButtonColor: '#C8D98E'
            }).then(()=>{
              navigate("/admin");
            })

            setActivo(true);

          } else {
            // Error de credenciales
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: result.error || 'Credenciales incorrectas',
              confirmButtonColor: '#C8D98E'
            });
          }

        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor',
            confirmButtonColor: '#C8D98E'
          });
        }
      });
    }
  });
};

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "4px solid #C8D98E",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
      }}
    >
  <div
    className="d-flex align-items-center justify-content-between px-4 py-2 flex-wrap gap-3"
  >

    {/* Logo + Texto */}
    <Link to="/" className="d-flex align-items-center text-decoration-none gap-2">
      <img
        src="/udc.png"
        alt="Logo UdeC"
        style={{ height: "55px", objectFit: "contain" }}
      />
      <div>
        <h1
          className="mb-0 fw-bold"
          style={{ color: "#0b0f0b", fontSize: "1rem", letterSpacing: "0.5px" }}
        >
          Universidad de Colima
        </h1>
        <p
          className="mb-0"
          style={{ color: "#2d6a27", fontSize: "0.72rem", letterSpacing: "0.3px" }}
        >
          Dirección General de Recursos Educativos
        </p>
      </div>
    </Link>

    {/* Links de navegación */}
    <nav className="d-flex gap-4">
      <Link
        to="/Calendario"
        className="text-decoration-none fw-semibold"
        style={{ color: "#C8D98E", fontSize: "0.85rem", letterSpacing: "1px" }}
        onMouseEnter={e => e.target.style.color = "#2d6a27"}
        onMouseLeave={e => e.target.style.color = "#C8D98E"}
      >
        CALENDARIO
      </Link>

      <Link
        to="/Escenarios"
        className="text-decoration-none fw-semibold"
        style={{ color: "#C8D98E", fontSize: "0.85rem", letterSpacing: "1px" }}
        onMouseEnter={e => e.target.style.color = "#2d6a27"}
        onMouseLeave={e => e.target.style.color = "#C8D98E"}
        >
        ESCENARIOS
        </Link>
      <Link
        to="/Quejas"
        className="text-decoration-none fw-semibold"
        style={{ color: "#C8D98E", fontSize: "0.85rem", letterSpacing: "1px" }}
        onMouseEnter={e => e.target.style.color = "#2d6a27"}
        onMouseLeave={e => e.target.style.color = "#C8D98E"}
      >
        QUEJAS Y SUGERENCIAS
      </Link>
    </nav>

    {/* Botón Ingresar / Cerrar sesión */}
    <button
      onClick={openModal}
      className="btn btn-sm fw-semibold"
      style={{
        background: activo ? "transparent" : "#C8D98E",
        color: activo ? "#e74a3b" : "#fff",
        border: activo ? "2px solid #e74a3b" : "2px solid #C8D98E",
        borderRadius: "20px",
        padding: "0.4rem 1.2rem",
        transition: "all 0.2s"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = activo ? "#e74a3b" : "#C8D98E";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = activo ? "transparent" : "#C8D98E";
        e.currentTarget.style.color = activo ? "#e74a3b" : "#fff";
      }}
    >
      {activo ? "Cerrar sesión" : "Ingresar"}
    </button>

  </div>
</header>
  );
}

export default NavBar;