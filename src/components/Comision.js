import { useContext } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import Alumno from './Alumno.js';
import { Context } from '../context/Context.js';

function Comision() {

  const { checked, saveAttendance } = useContext(Context)

  /*
      useEffect(() => {
  
      })
  */
  const withoutCheck = checked.filter((alumno) => { return (!alumno.asistencia) });

  const withCheck = checked.filter((alumno) => { return (alumno.asistencia) });

  return (
    <div className="Comision">
      <h4 className="titulo-tabla" >Comision #666</h4>
      <table className="Comision-table strip">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {withoutCheck.map((alumno) => { return (<Alumno key={alumno.nombre} nombre={alumno.nombre} asistencia={alumno.asistencia} />) })}
          {withCheck.map((alumno) => { return (<Alumno key={alumno.nombre} nombre={alumno.nombre} asistencia={alumno.asistencia} />) })}        
        </tbody>
      </table>
      <button id='boton-save-attendance' className='btn waves-effect waves-light' type="submit" name='action' onClick={saveAttendance}>Guardar Asistencias
        <i className='material-icons right'>send</i>
      </button>
    </div>
  );
}

export default Comision;