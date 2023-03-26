import React from 'react'

function CardAlumno({ nombre, asistencia }) {
    return (
        <div>
            <div className="row">
                <div className="col s12 m12">
                    <div className="card-panel teal">
                        <span className="white-text">{nombre} .
                            {asistencia.toString()}.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardAlumno