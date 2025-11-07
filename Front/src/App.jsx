//Aqui se importan solo los componentes y se colocan abajo
import NavBar from './NavBar'
import Home from './Home'
import Footer from './Footer'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Quejas from './Quejas';


//Aqui solo se colocan los componentes para mas orden
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Quejas" element={<Quejas/>} />
    </Routes>
    </>
  )
}

export default App
