import React from "react";
import "./NavBar.css";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

function NavBar() {
  const openModal = ()=>{
    Swal.fire({
      title: 'Iniciar Sesión', 
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
      <div class="d-grid gap-3">
        <input 
          id="swal-input-email" 
          class="swal2-input" 
          placeholder="Correo o Número de Cuenta (ej. usuario@ucol.mx)"
          type="text" 
        >
        <input 
          id="swal-input-password" 
          class="swal2-input" 
          placeholder="Contraseña"
          type="password"
        >
        <button id="btn-login" class="btn btn-success">Iniciar sesión</button>

        <p class="text-muted text-center">
          No te has registrado aún, <a id="swal-register-link" class="fw-bold">Regístrate</a>
        </p>

      </div>
    `,
      showConfirmButton: false,
      didOpen: () => {
        // Aquí va el código del fetch cuando se abre el modal
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

            const response = await fetch('http://localhost:3000/api/login', {
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
                text: `Hola ${result.student.name}`,
                confirmButtonColor: '#53A600'
              });
              
              
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
  }

  return (
    <header className="navbar-custom">
      <div className="navbar-container">
        
        <div className="navbar-left">
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img
              src="/udc.png"
              alt="Logo UdeC"
              className="navbar-logo"
            />
            <div className="navbar-text ms-2">
              <h1 className="navbar-title mb-0">Universidad de Colima</h1>
              <p className="navbar-subtitle mb-0">Dirección General de Recursos Educativos</p>
            </div>
          </Link>
        </div>

        <nav className="navbar-menu">
          <Link to="#" className="nav-link"> CALENDARIO </Link>
          <Link to="/Quejas" className="nav-link"> QUEJAS Y SUGERENCIAS </Link>   
        </nav>

        <div className="navbar-right">
          <button onClick={openModal} className="navbar-btn">Iniciar sesión</button>
        </div>
        
      </div>
      <hr className="navbar-divider" />
    </header>
  );
}

export default NavBar;