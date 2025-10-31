import React from "react";

function Footer (){
    return(
        <>
            <link 
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
                rel="stylesheet"
            />
            
            <footer className="position-fixed bottom-0 start-0 w-100 bg-dark text-light py-3">
                <div className="container">
                <div className="row">
                    <div className="col text-center">
                    <p className="mb-0">
                        ® Derechos Reservados Universidad de Colima. Página desarrollada por la Dirección General de Recursos Educativos.
                    </p>
                    </div>
                </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;