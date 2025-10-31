//Aqui se importan solo los componentes y se colocan abajo
import NavBar from './NavBar'
import Home from './Home'
import Footer from './Footer'
import './App.css'


//Aqui solo se colocan los componentes para mas orden
function App() {
  return (
    <>
      <NavBar /> 
      <Home />
      <Footer />
    </>
  )
}

export default App
