import NavBar from './components/NavBar'
import Home from './Home'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom";
//?Importaciones para las rutas
import Quejas from './pages/Quejas';
import Calendario from "./components/Calendario";
import Admin from './pages/Admin';
import ModeracionAdmin from './pages/ModeracionAdmin';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route 
          path="/" 
          element={
            <>
            <div className="container bg-light p-5 mt-4 rounded shadow-sm text-center" style={{ maxWidth: '600px' }}>
                <h1 className="text-success fw-bold mb-4">Calendarios de Eventos</h1></div>
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

        <Route
          path='/admin'
          element={<Admin />}
        />

        <Route 
          path='/mod'
          element={<ModeracionAdmin />}
          />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
