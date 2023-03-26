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

    return (
        <div className='PorcentajeAsistencia' >
            Asistencia Requerida
            <form action="#">
                <p className="range-field">
                    <label className='porcentajeToShow'>{porcentaje}%</label>
                    <input type="range" id="test5" min="0" max="100" value={porcentaje} onChange={handleChange} />
                </p>
            </form>
            <div>
                Alumnos que no cumplen el requisito:
                {checked.map((alumno) => { return (<CardAlumno key={alumno.nombre} nombre={alumno.nombre} asistencia={alumno.asistencia} />) })}
            </div>
        </div>
    )
}

export default PorcentajeAsistencia;