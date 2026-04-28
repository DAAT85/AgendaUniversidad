import React from 'react'

const listaEscenarios = [
    {
      titulo: "Aula DGRE",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc1803201611215642.jpg",
      aforo: "16 personas",
      ubicacion: "Edificio de Recursos Educativos (antes Medios Didácticos) - Campus Colima. Av. Universidad #333. Col. Las Víboras C.P. 28040 Colima, Col.",
      responsable: "Salvador Mata Rodríguez",
      correo: "matall@ucol.mx",
      telefono: "+52 (312) 316 1093 ext 35604",
      servicios: "Clases, cursos y visitas",
      web: "http://portal.ucol.mx/dgre/"
    },
    {
      titulo: "CIAM Colima 1",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc18032016112209669.jpg", 
      aforo: "40 personas",
      ubicacion: "Edificio CIAM - Campus Colima, Área de la Salud. Av. Universidad #333. Col. Las Víboras C.P. 28040 Colima, Col.",
      responsable: "Jorge A. Cedeño (T.M.)",
      correo: "ciam_colima@ucol.mx",
      telefono: "n/a",
      servicios: "Clases, cursos y visitas",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "CIAM Colima 2",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc18032016112254530.jpg",
      aforo: "24 personas",
      ubicacion: "Edificio de Formación Docente - Campus Colima. Av. Universidad #333. Col. Las Víboras C.P. 28040 Colima, Col.",
      responsable: "José Luis Mondragón Virgen",
      correo: "ciam_colima2@ucol.mx",
      telefono: "n/a",
      servicios: "clases, visitas, cursos",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "CIAM Coquimatlán",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc18032016112304547.jpg",
      aforo: "40 personas",
      ubicacion: "Edificio CIAM-CUICA - Campus Coquimatlán Carr. Colima-Coquimatlán Km 9, C.P. 28400 Coquimatlán, Col.",
      responsable: "Juan Manuel Calvillo Ramos",
      correo: "ciam_coqui@ucol.mx",
      telefono: "+52 (312) 316 1000 ext. 51060",
      servicios: "clases, visitas y cursos",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "CIAM Manzanillo",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc18032016112314174.jpg",
      aforo: "40 personas",
      ubicacion: " Centro de Tecnología Educativa - Campus El Naranjo. Kilometro 20 carretera Manzanillo-Cihuatlán, C.P. 28860, Manzanillo, Col.",
      responsable: "Ramón Castillo Baltazar",
      correo: "ciam_manzanillo@ucol.mx",
      telefono: "+52 (312) 316 1000 ext. 53250",
      servicios: "clases, visitas, cursos",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "CIAM Tecoman",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc07042016105029910.jpg",
      aforo: "40 personas",
      ubicacion: "Centro de Tecnología Educativa - Campus Tecomán Km. 40 Autopista Colima-Manzanillo. Crucero de Tecomán. CP.28100, Tecomán, Col.",
      responsable: "Manuel Gutierrez Gómez",
      correo: "ciam_tecoman@ucol.mx",
      telefono: "+52 (312) 316 1000 ext. 52353",
      servicios: "Clases, visitas y cursos",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "CIAM Villa de Álvarez",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_esc07042016104956732.jpg",
      aforo: "24 personas",
      ubicacion: "Edificio de Posgrado - Campus Villa de Álvarez. Josefa Ortiz de Domínguez # 64, C.P. 28970, Villa",
      responsable: "Jorge Yasmil Sandoval Amezcua",
      correo: "ciam_villa@ucol.mx",
      telefono: "+52 (312) 316 1000 ext. 50060",
      servicios: "Clases, visitas y cursos",
      web: "http://ciam.ucol.mx/portal/index.php"
    },
    {
      titulo: "Cabina para grabación de audio y video",
      imagen: "https://dgre2.ucol.mx/agenda/app/views/images/escenarios/foto_video.jpg",
      aforo: "5 personas",
      ubicacion: "Edificio de Recursos Educativos (antes Medios Didácticos) - Campus Colima. Av. Universidad #333. Col. Las Víboras C.P. 28040 Colima, Col.",
      responsable: "Ramón Genel",
      correo: " genel@ucol.mx",
      telefono: "+(52) 312 316 1093",
      servicios: " Área de grabación de video, Cabina de grabación de audio",
      web: " https://portal.ucol.mx/dgred/"
    },
  ];

function Escenarios() {
  return (
      <div className="col-lg-8 col-md-7">
          <h5 className="mb-4 fw-bold" style={{ color: "#CCDB94x", borderLeft: "5px solid #CCDB94", paddingLeft: "15px", marginTop: "20px", marginLeft: "15px" }}>
            Detalles de Escenarios
          </h5>
          
          {listaEscenarios.map((esc, index) => (
            <div key={index} className="card shadow-sm border-0 mb-4" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e0e0e0" }}>
              <div className="py-2 px-3 fw-bold" style={{ background: "#f8f9fa", borderBottom: "1px solid #eee", color: "#333", fontSize: "0.95rem",marginLeft: "15px", marginRight: "15px" }}>
                {esc.titulo}
              </div>
              <div className="row g-0 p-3 bg-white">
                <div className="col-xl-4 col-lg-5">
                  <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                    <img src={esc.imagen} alt={esc.titulo} className="img-fluid" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                    <div style={{ height: '4px', background: '#CCDB94', width: '100%', position: 'absolute', bottom: 0 }}></div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 px-3 mt-3 mt-lg-0">
                  <div className="list-group list-group-flush" style={{ fontSize: "0.82rem" }}>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">💻</span> <div><strong>Aforo:</strong> {esc.aforo}</div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">📍</span> <div style={{lineHeight: '1.2'}}><strong>Ubicación:</strong> {esc.ubicacion}</div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">👤</span> <div><strong>Responsable:</strong> {esc.responsable}</div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">✉️</span> <div><strong>Correo:</strong> <a href={`mailto:${esc.correo.trim()}`} className="text-decoration-none">{esc.correo}</a></div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">📞</span> <div><strong>Teléfono:</strong> {esc.telefono}</div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">⚙️</span> <div><strong>Servicios:</strong> {esc.servicios}</div>
                    </div>
                    <div className="list-group-item d-flex align-items-start border-0 bg-transparent px-0 py-1">
                      <span className="me-2">🌐</span> <div><strong>Sitio web:</strong> <a href={esc.web.trim()} target="_blank" rel="noreferrer" className="text-decoration-none">{esc.web}</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
  )
}

export default Escenarios
