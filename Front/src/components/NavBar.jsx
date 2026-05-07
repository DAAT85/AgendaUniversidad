import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "../styles/NavBar.css";

function NavBar() {
  const [activo, setActivo] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setActivo(true);
      setUserRole(role);
    }
  }, []);

  const openModal = () => {
    if (activo) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          setActivo(false);
          setUserRole(null);
          localStorage.clear();
          Swal.fire('Sesión cerrada', '', 'success').then(() => {
            navigate("/");
          });
        }
      });
    } else {
      openLoginModal();
    }
  };

  const goToPanel = () => {
    if (userRole === "ADMIN") navigate("/admin");
    else if (userRole === "MOD") navigate("/mod");
    else navigate("/");
  };

  const openLoginModal = () => {
    Swal.fire({
      title: `<span style="color: #CCDB94; font-weight: bold;">Acceso al Sistema</span>`,
      html: `
        <style>
          .swal2-popup { border-radius: 15px !important; padding: 2rem !important; }
          .login-logo { width: 80px; margin-bottom: 15px; }
          .swal2-container input.custom-input { height: 45px; width: 100%; margin: 8px 0; padding: 0 15px; border: 1.5px solid #e0e0e0; border-radius: 8px; box-sizing: border-box; }
          .btn-ucol { background-color: #CCDB94 !important; color: white !important; border-radius: 8px !important; font-weight: bold !important; width: 100%; margin-top: 15px; padding: 12px !important; border: none; cursor: pointer; }
        </style>
        <div class="text-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Logo_de_la_Universidad_de_Colima.svg" class="login-logo">
          <div class="text-start">
            <label style="font-size: 0.8rem; color: #CCDB94; font-weight: 600;">Correo Universitario</label>
            <input type="email" id="swal-input-email" class="custom-input" placeholder="ejemplo@ucol.mx">
            <label style="font-size: 0.8rem; color: #CCDB94; font-weight: 600; display: block; margin-top: 10px;">Contraseña</label>
            <input type="password" id="swal-input-password" class="custom-input" placeholder="••••••••">
          </div>
          <button id="btn-login" class="btn-ucol">INGRESAR</button>
        </div>
      `,
      showConfirmButton: false,
      didOpen: () => {
        const btnLogin = document.getElementById('btn-login');
        btnLogin.addEventListener('click', async () => {
          const email = document.getElementById('swal-input-email').value;
          const password = document.getElementById('swal-input-password').value;
          if (!email || !password) {
            Swal.showValidationMessage('Completa todos los campos');
            return;
          }
          try {
            Swal.showLoading();
            const response = await fetch(`http://localhost:3000/api/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            if (response.ok) {
              localStorage.setItem('token', result.token);
              localStorage.setItem('role', result.user.role);
              setActivo(true);
              setUserRole(result.user.role);
              Swal.fire({ icon: 'success', title: '¡Bienvenido!', confirmButtonColor: '#C8D98E' }).then(() => {
                if (result.user.role === "MOD") navigate("/mod");
                else navigate("/admin");
              });
            } else {
              Swal.fire({ icon: 'error', title: 'Error', text: result.error });
            }
          } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error de conexión' });
          }
        });
      }
    });
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        
        {/* Logo y Nombre de la Institución */}
        <Link to="/" className="navbar-logo-section">
          <img src="/udc.png" alt="Logo UdeC" className="navbar-logo-img" />
          <div className="navbar-text">
            <h1 className="navbar-title">Universidad de Colima</h1>
            <p className="navbar-subtitle">Dirección General de Recursos Educativos</p>
          </div>
        </Link>

        {/* Grupo de Navegación y Acciones (Derecha) */}
        <div className="navbar-actions-group">
          <nav className="nav-links-container">
            <Link to="/Calendario" className="nav-link-item">CALENDARIO</Link>
            <Link to="/Escenarios" className="nav-link-item">ESCENARIOS</Link>
            <Link to="/Quejas" className="nav-link-item">QUEJAS</Link>
          </nav>

          <div className="navbar-buttons-container">
            {activo && (
              <button onClick={goToPanel} className="btn-navbar-gestion">
                GESTIONAR {userRole}
              </button>
            )}

            <button 
              onClick={openModal} 
              className={`btn-navbar-auth ${activo ? 'btn-logout' : 'btn-login'}`}
            >
              {activo ? "Cerrar sesión" : "Ingresar"}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}

export default NavBar;