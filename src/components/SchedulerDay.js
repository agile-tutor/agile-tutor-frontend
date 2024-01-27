import React from 'react'
import "../App.css"

function SchedulerDay() {
    return (
        <div>
            <div className="comsion-table-title" > Encuentros Programados del TVU </div>
            <ul className="collection">
                <li className="collection-item avatar">
                    <div className="avatarEncuentros circle center"> 1 </div>
                    <span className="title">Dia: 1</span>
                    <p>Titulo: "Presentación del taller de vida universitaria"<br />
                        Fecha: 10/02/2024
                    </p>
                    <div>
                        <div>
                            <a href="#!" className="secondary-content topalignament"><i className="material-icons">edit</i></a>
                        </div>
                        <div>
                            <a href="#!" className="secondary-content bottompalignament"><i className="material-icons">close</i></a>
                        </div>
                    </div>
                </li>
                <li className="collection-item avatar">
                    <div className="avatarEncuentros circle center"> 2 </div>
                    <span className="title">Dia: 2</span>
                    <p>Titulo: "Historia de la Universidad Argentina y de la UNQ"<br />
                        Fecha: 12/02/2024
                    </p>
                    <div>
                        <div>
                            <a href="#!" className="secondary-content topalignament"><i className="material-icons">edit</i></a>
                        </div>
                        <div>
                            <a href="#!" className="secondary-content bottompalignament"><i className="material-icons">close</i></a>
                        </div>
                    </div>
                </li>
                <li className="collection-item avatar">
                    <div className="avatarEncuentros circle center"> 3 </div>
                    <span className="title">Dia: 3</span>
                    <p>Titulo: "Regimen de estudios y estatuto universitario"<br />
                        Fecha: 14/02/2024
                    </p>
                    <div>
                        <div>
                            <a href="#!" className="secondary-content topalignament"><i className="material-icons">edit</i></a>
                        </div>
                        <div>
                            <a href="#!" className="secondary-content bottompalignament"><i className="material-icons">close</i></a>
                        </div>
                    </div>
                </li>
                <li className="collection-item avatar">
                    <div className="avatarEncuentros circle center"> 4 </div>
                    <span className="title">Dia: 4</span>
                    <p>Titulo: "Acto de recibimiento"<br />
                        Fecha: 17/02/2024
                    </p>
                    <div>
                        <div>
                            <a href="#!" className="secondary-content topalignament"><i className="material-icons">edit</i></a>
                        </div>
                        <div>
                            <a href="#!" className="secondary-content bottompalignament"><i className="material-icons">close</i></a>
                        </div>
                    </div>
                </li>
                <li className="collection-item avatar">
                    <div className="avatarEncuentros circle center"> 5 </div>
                    <span className="title">Dia: 5</span>
                    <p>Titulo: "La Educación Superior como derecho humano"<br />
                        Fecha: 19/02/2024
                    </p>
                    <div>
                        <div>
                            <a href="#!" className="secondary-content topalignament"><i className="material-icons">edit</i></a>
                        </div>
                        <div>
                            <a href="#!" className="secondary-content bottompalignament"><i className="material-icons">close</i></a>
                        </div>
                    </div>
                </li>
                <li className="collection-item avatar">
                    <div className="avatarEncuentros circle center"> 6  </div>
                    <span className="title">Dia: 6</span>
                    <p>Titulo: "Áreas, servicios y becas"<br />
                        Fecha: 21/02/2024
                    </p>
                    <div>
                        <div>
                            <a href="#!" className="secondary-content topalignament"><i className="material-icons">edit</i></a>
                        </div>
                        <div>
                            <a href="#!" className="secondary-content bottompalignament"><i className="material-icons">close</i></a>
                        </div>
                    </div>
                </li>
            </ul>
        </div >
    )
}

export default SchedulerDay