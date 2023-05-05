import React from 'react'
import "../App.css"

function CardAlumno({ nombre, porcentaje, porcentajeActual }) {

    return (
        <div>
            {console.log(porcentaje)}
            <div className="row">
                <div className="col s12 m12">
                    <div className={"card-panel teal " + (porcentaje < porcentajeActual ? 'tealRed' : 'tealGreen')}>
                        <span className="white-text">{nombre} |
                            {" " + porcentaje}%.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardAlumno;