import React from "react";
import './styles/Home.css'
import FilterIcon from './assets/Filter.svg';


function Home(){
    return(
    <>
        <header>
            <div className="container bg-light p-5 mt-4 rounded shadow-sm text-center" style={{ maxWidth: '600px' }}>
                <h1 className="text-success fw-bold mb-4">Calendarios de Eventos</h1>
                <h4 className="text-success mb-3">Seleccione escenario educativo a consultar</h4>

                {/* Contenedor con icono */}
                <div className="position-relative d-inline-block w-75 mx-auto">
                    <img
                    src={FilterIcon}
                    alt="Filtro"
                    style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '24px',
                        height: '24px',
                        pointerEvents: 'none'
                    }}
                />
                    <select className="form-select w-100 form-select-sm ps-5">
                        <option value="#">Todos</option>
                        <option value="#">Aula DGRE</option>
                        <option value="#">CIAM Colima 1</option>
                        <option value="#">CIAM Villa de Alvarez</option>
                        <option value="#">CIAM Tecoman</option>
                        <option value="#">CIAM Colima 2</option>
                        <option value="#">CIAM Coquimatlan</option>
                        <option value="#">CIAM Manzanillo</option>
                        <option value="#">Cabina para grabacion y video</option>
                    </select>
                </div>
            </div>
        </header>
            
            
        <main>

        </main>
    </>
    );
}


export default Home;