import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import '../App.css';
import CardAlumno from './CardAlumno';

function PorcentajeAsistencia() {

    const { checked } = useContext(Context);
    const [porcentaje, setPorcentaje] = useState(75);

    const handleChange = event => {
        setPorcentaje(event.target.value);

        console.log('value is:', event.target.value);
    };

    const dontPass = checked.filter((alumno) => { return (Number(alumno.attendancespercent) < porcentaje) });
    const pass = checked.filter((alumno) => { return (Number(alumno.attendancespercent) >= porcentaje) });
    return (
        <div className='porcentajeAsistencia' >
            <h4 className="titulo-tabla" >Configuración de Porcentaje requerido</h4>
            <form action="#">
                <p className="range-field">
                    <label className='porcentajeToShow'>{"Asistencia del " + porcentaje}%</label>
                    <input type="range" id="test5" min="0" max="100" value={porcentaje} onChange={handleChange} />
                </p>
            </form>
            <div>
                <h5>Alumnos que NO cumplen: </h5>
                {dontPass.map((alumno) => { return (<CardAlumno key={alumno.id} nombre={alumno.name + " " + alumno.surname} porcentaje={alumno.attendancespercent} porcentajeActual={porcentaje} />) })}
            </div>
            <div>
                <h5>Alumnos que cumplen: </h5>
                {pass.map((alumno) => { return (<CardAlumno key={alumno.id} nombre={alumno.name + " " + alumno.surname} porcentaje={alumno.attendancespercent} porcentajeActual={porcentaje} />) })}
            </div>
        </div>
    )
}

export default PorcentajeAsistencia;