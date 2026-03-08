import React from "react";
import "./NavBar.css";
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
        Swal.fire('Sesión cerrada', '', 'success').then(()=>{
          navigate("/");
        });
      }
    });
  } else {
    // Si no ha iniciado sesión, abre el modal de login
    Swal.fire({
      title: 'Selecciona tu identidad',
      html: `
        <style>
          #btn-registrer {
            padding: 8px 16px;
            background-color: transparent;
            color: #53A600;
            border: none;
            border-bottom: 2px solid transparent;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          #btn-registrer:hover {
            border-bottom: 2px solid #53A600;
            color: #458a00;
          }
        </style>


        <div class="d-grid gap-3">
          <button id="btn-admin" class="btn btn-success">Administrador</button>
          <button id="btn-estudiante" class="btn btn-success">Profesor</button>
          <p>¿No te has registrado? <button id="btn-registrer" class="text-primary text-decoration-underline">Click aqui</button></p>
        </div>
      `,
      showConfirmButton: false,
      didOpen: () => {
        const btnAdmin = document.getElementById('btn-admin');
        const btnEstudiante = document.getElementById('btn-estudiante');
        const btnRegistrer = document.getElementById('btn-registrer');

        // Modal para Administrador
        btnAdmin.addEventListener('click', () => {
          openLoginModal('Administrador', 'admin');
        });

        // Modal para Estudiante
        btnEstudiante.addEventListener('click', () => {
          openLoginModal('Estudiante', 'student');
        });

        //Modal para registrarse
        btnRegistrer.addEventListener('click', () =>{
          openRegistrerModal('Estudiante', 'student')
        })
      }
    });
  }
};

const openRegistrerModal = (userType) => {
  Swal.fire({
    title: `Registro - ${userType}`,
    html: `
      <style>
        .swal2-container .swal2-content {
          padding: 1rem 0;
        }
        .swal2-container input.swal2-input,
        .swal2-container select.swal2-select {
          height: 40px;
          margin: 10px 0;
          font-size: 1rem;
          padding: 0 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
        }
        .swal2-container input.swal2-input:focus,
        .swal2-container select.swal2-select:focus {
          border-color: #53A600;
          box-shadow: 0 0 0 1px #53A600;
          outline: none;
        }
        .autocomplete-container {
          position: relative;
          width: 100%;
        }
        .autocomplete-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin: 4px 0 0 0;
          padding: 0;
          list-style: none;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          max-height: 200px;
          overflow-y: auto;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 9999;
          display: none;
        }
        .autocomplete-dropdown.show {
          display: block;
        }
        .autocomplete-dropdown li {
          padding: 10px 12px;
          cursor: pointer;
          border-bottom: 1px solid #eee;
        }
        .autocomplete-dropdown li:last-child {
          border-bottom: none;
        }
        .autocomplete-dropdown li:hover,
        .autocomplete-dropdown li.selected {
          background-color: #f0f0f0;
        }
      </style>
      <div class="d-grid gap-2">
        <input type="text" id="swal-input-name" class="swal2-input" placeholder="Nombre completo">
        
        <div class="autocomplete-container">
          <input type="text" id="swal-input-dependencia" class="swal2-input" placeholder="Dependencia (Facultad telematica) autocomplete="off">
          <ul id="autocomplete-dropdown" class="autocomplete-dropdown"></ul>
        </div>
        
        <input type="email" id="swal-input-email" class="swal2-input" placeholder="Correo electrónico">
        <input type="password" id="swal-input-password" class="swal2-input" placeholder="Contraseña">
        <button id="btn-register" class="btn btn-success mt-3">Registrarse</button>
      </div>
    `,
    showConfirmButton: false,
    didOpen: () => {
      // Opciones de dependencias
      const dependencias = [
        'Facultad de Arquitectura y Diseño',
        'Facultad de Ciencias',
        'Facultad de Ciencias Biológicas y Agropecuarias',
        'Facultad de Ciencias Marinas',
        'Facultad de Ciencias Políticas y Sociales',
        'Facultad de Ciencias Químicas',
        'Facultad de Ciencias de la Educación',
        'Facultad de Comercio Exterior',
        'Facultad de Contabilidad y Administración de Colima',
        'Facultad de Contabilidad y Administración de Manzanillo',
        'Facultad de Contabilidad y Administración de Tecomán',
        'Facultad de Derecho',
        'Facultad de Economía',
        'Facultad de Enfermería',
        'Facultad de Filosofía',
        'Facultad de Ingeniería Civil',
        'Facultad de Ingeniería Electromecánica',
        'Facultad de Telematica',
        'Facultad de Psicologia'
      ];

      const inputDependencia = document.getElementById('swal-input-dependencia');
      const dropdown = document.getElementById('autocomplete-dropdown');
      let selectedIndex = -1;

      // Función para filtrar y mostrar opciones
      function filterOptions(value) {
        if (!value.trim()) {
          dropdown.classList.remove('show');
          dropdown.innerHTML = '';
          return;
        }

        const filtered = dependencias.filter(dep =>
          dep.toLowerCase().includes(value.toLowerCase())
        );

        if (filtered.length > 0) {
          dropdown.innerHTML = filtered.map((dep, index) => 
            `<li data-index="${index}">${dep}</li>`
          ).join('');
          dropdown.classList.add('show');
          selectedIndex = -1;
        } else {
          dropdown.classList.remove('show');
          dropdown.innerHTML = '';
        }
      }

      // Función para seleccionar opción
      function selectOption(text) {
        inputDependencia.value = text;
        dropdown.classList.remove('show');
        dropdown.innerHTML = '';
        selectedIndex = -1;
      }

      // Event listener para input
      inputDependencia.addEventListener('input', (e) => {
        filterOptions(e.target.value);
      });

      // Event listener para click en opciones
      dropdown.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
          selectOption(e.target.textContent);
        }
      });

      // Navegación con teclado
      inputDependencia.addEventListener('keydown', (e) => {
        const items = dropdown.querySelectorAll('li');
        
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (selectedIndex < items.length - 1) {
            selectedIndex++;
            updateSelection(items);
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (selectedIndex > 0) {
            selectedIndex--;
            updateSelection(items);
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (selectedIndex >= 0 && items[selectedIndex]) {
            selectOption(items[selectedIndex].textContent);
          }
        } else if (e.key === 'Escape') {
          dropdown.classList.remove('show');
        }
      });

      function updateSelection(items) {
        items.forEach((item, index) => {
          if (index === selectedIndex) {
            item.classList.add('selected');
            item.scrollIntoView({ block: 'nearest' });
          } else {
            item.classList.remove('selected');
          }
        });
      }

      const btnRegister = document.getElementById('btn-register');

      btnRegister.addEventListener('click', async () => {
        const name = document.getElementById('swal-input-name').value;
        const dependence = document.getElementById('swal-input-dependencia').value;
        const email = document.getElementById('swal-input-email').value;
        const password = document.getElementById('swal-input-password').value;

        // Validar campos vacíos
        if (!name || !dependence || !email || !password) {
          Swal.showValidationMessage('Por favor completa todos los campos');
          return;
        }

        try {
          // Mostrar loading
          Swal.showLoading();

          const response = await fetch(`http://localhost:3000/api/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              name, 
              dependence,
              email, 
              password 
            })
          });

          const result = await response.json();

          if (response.ok) {
            // Registro exitoso
            Swal.fire({
              icon: 'success',
              title: '¡Registro exitoso!',
              text: `Bienvenido ${name}`,
              confirmButtonColor: '#53A600'
            });
          } else {
            // Error en el registro
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: result.error || 'No se pudo completar el registro',
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

const openLoginModal = (userType) => {
  Swal.fire({
    title: `Inicio de Sesión - ${userType}`,
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
            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido!',
              text: `Hola ${result.user?.name || result.admin?.name || result.name}`,
              confirmButtonColor: '#53A600'
            }).then(()=>{
              navigate("/admin")
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