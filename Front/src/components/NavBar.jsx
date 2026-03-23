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
    title: `Inicio de Sesión`,
    html: `
      <style>
        .swal2-container .swal2-content {
          padding: 1rem 0;
        }
        .swal2-container input.swal2-input {
          height: 40px;
          margin: 10px 0;
          font-size: 1rem;
          padding: 0 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .swal2-container input.swal2-input:focus {
          border-color: #53A600;
          box-shadow: 0 0 0 1px #53A600;
        }
      </style>
      <div class="d-grid gap-2">
        <input type="email" id="swal-input-email" class="swal2-input" placeholder="Correo electrónico">
        <input type="password" id="swal-input-password" class="swal2-input" placeholder="Contraseña">
        <button id="btn-login" class="btn btn-success mt-3">Iniciar Sesión</button>
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
              confirmButtonColor: '#53A600'
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
              confirmButtonColor: '#53A600'
            });
          }

        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor',
            confirmButtonColor: '#53A600'
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
        borderBottom: "4px solid #c8a951",
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
          style={{ color: "#1e4d1a", fontSize: "1rem", letterSpacing: "0.5px" }}
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
        style={{ color: "#2d6a27", fontSize: "0.85rem", letterSpacing: "1px" }}
        onMouseEnter={e => e.target.style.color = "#c8a951"}
        onMouseLeave={e => e.target.style.color = "#2d6a27"}
      >
        CALENDARIO
      </Link>
      <Link
        to="/Quejas"
        className="text-decoration-none fw-semibold"
        style={{ color: "#2d6a27", fontSize: "0.85rem", letterSpacing: "1px" }}
        onMouseEnter={e => e.target.style.color = "#c8a951"}
        onMouseLeave={e => e.target.style.color = "#2d6a27"}
      >
        QUEJAS Y SUGERENCIAS
      </Link>
    </nav>

    {/* Botón Ingresar / Cerrar sesión */}
    <button
      onClick={openModal}
      className="btn btn-sm fw-semibold"
      style={{
        background: activo ? "transparent" : "#2d6a27",
        color: activo ? "#e74a3b" : "#fff",
        border: activo ? "2px solid #e74a3b" : "2px solid #2d6a27",
        borderRadius: "20px",
        padding: "0.4rem 1.2rem",
        transition: "all 0.2s"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = activo ? "#e74a3b" : "#1e4d1a";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = activo ? "transparent" : "#2d6a27";
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