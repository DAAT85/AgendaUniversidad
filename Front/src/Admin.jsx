import React from "react";
import Swal from "sweetalert2";


function Admin(){
    //Aqui ira un creador de eventos

    const openModal = ()=>{
        //Modal para crear el evento (Es necesario manipular el dom porque es sweetalert)
        Swal.fire({
            title: "Crea un evento",
            html:`
                <input type="text" placeholder="Nombre del evento" class="swal2-input" id="input-name" requiered>
                <input type="date" placeholder="Fecha del evento" class="swal2-input" id="input-date" requiered>
                <input type="text" placeholder="Hora del evento" class="swal2-input" id="input-time" requiered>
                <textarea id="input-coment" class="swal2-textarea" placeholder="Descripcion del Evento"></textarea>
            `,
            showCancelButton: true,
            confirmButtonText: 'Registrar',
            cancelButtonText: 'Cancelar',
        });
    };

    //Se agarra los valores de los input
    const inputName = document.getElementById("input-name").value;
    const inputDate = document.getElementById("input-date").value;
    const inputTime = document.getElementById("input-time").value;
    return(
    <>
        <header>
            <h1>Administrador de eventos</h1>
        </header>
        <main>
            {/*Aqui cargaran los eventos con fetch */}
        </main>

        <footer>
            {/*Boton para agregar */}
            <button onClick={openModal}>+</button>
        </footer>
    </>
    );
}

export default Admin;