import NavBar from './components/NavBar'
import Home from './Home'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom";
import Quejas from './pages/Quejas';
import Calendario from "./components/Calendario";
import Admin from './pages/Admin';
import ModeracionAdmin from './pages/ModeracionAdmin';
import ProtectedRoute from './components/ProtectedRoute.jsx'; 
import Calendarioy from "./components/Calendarioy";
import Escenarios from './components/Escenarios.jsx';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        {/* Ruta pública, cualquiera puede verla */}
        <Route 
          path="/" 
          element={
            <>
              
              <Calendario />
              <Home />
            </>
          } 
        />

        {/* Rutas protegidas, requieren token */}
        <Route path="/Quejas" element={
          <Quejas />
        }/>
        <Route path="/Escenarios" element={<Escenarios />} />
        <Route path="/Calendario" element={
          <Calendarioy />
        }/>

        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }/>

        <Route path="/mod" element={
          <ProtectedRoute>
            <ModeracionAdmin />
          </ProtectedRoute>
        }/>

      </Routes>

      <Footer />
    </>
  );
}

export default App;