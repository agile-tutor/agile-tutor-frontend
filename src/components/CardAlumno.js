import React from 'react';
import "../App.css";
import PropTypes from 'prop-types';

function CardAlumno({ nombre, porcentaje, porcentajeActual, studentCompleteSurvey, studentId }) {

    return (
        <div>
            {/*console.log(porcentaje)*/}
            <div className="row card-alumno center">
                <div className="col s12 m12 center">
                    <div className={"card-panel teal " + (porcentaje < porcentajeActual ? 'tealRed' : 'tealGreen')}>
                        <div className="white-text col s4">{nombre}</div>
                        <div className="white-text col s2">{" " + porcentaje}%</div>
                        <div className="white-text col s2">{porcentaje < porcentajeActual
                            ? <i className="material-icons block-icon">block</i>
                            : <i className="material-icons check-icon">check</i>}
                        </div>
                        <div className="white-text col s2">{studentCompleteSurvey(studentId) ?
                            <i className="material-icons block-icon">assignment</i>
                            : <div></div>
                        }</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CardAlumno.propTypes = {
    nombre: PropTypes.string.isRequired,
    porcentaje: PropTypes.number.isRequired,
    porcentajeActual: PropTypes.number.isRequired,
    studentCompleteSurvey: PropTypes.bool.isRequired,
    studentId: PropTypes.number.isRequired,
};

export default CardAlumno;