import NavBar from './NavBar'
import Home from './Home'
import Footer from './Footer'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Quejas from './Quejas';
import Calendario from "./Calendario";
import Admin from "./Admin"; // 👈 NUEVO

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <div 
                className="container bg-light p-5 mt-4 rounded shadow-sm text-center"
                style={{ maxWidth: '600px' }}
              >
                <h1 className="text-success fw-bold mb-4">
                  Calendarios de Eventos
                </h1>
              </div>

              <Calendario />
              <Home />
            </>
          } 
        />

        <Route 
          path="/Quejas" 
          element={<Quejas />} 
        />

        <Route 
          path="/Calendario" 
          element={<Calendario />} 
        />

        {/* 👇 RUTA ADMIN */}
        <Route 
          path="/Admin" 
          element={<Admin />} 
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
