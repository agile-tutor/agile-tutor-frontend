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
  return (
    <div className="Comision">
      <table className="Comision-table strip">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {checked.map((alumno) => { return (<Alumno key={alumno.nombre} nombre={alumno.nombre} asistencia={alumno.asistencia} />) })}
        </tbody>
      </table>
      <button className='btn waves-effect waves-light' type="submit" name='action' onClick={saveAttendance}>Guardar Asistencias
        <i className='material-icons right'>send</i>
      </button>
    </div>
  );
}

export default Comision;