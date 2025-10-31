import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//Importacion de librerias de forma global
import 'bootstrap/dist/css/bootstrap.min.css';
import "animate.css/animate.min.css";



//Aqui usualmente no se le mueve nada, yo dire cuando le muevas

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
