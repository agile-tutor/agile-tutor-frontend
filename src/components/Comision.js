import { useContext } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import Alumno from './Alumno.js';
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
import Breadcrumbs from '../utils/Breadcrumbs.js';

function Comision() {

  const { checked, saveAttendance } = useContext(Context)

  //    console.log(checked[0].attendances[0].attended)
  const diauno = 1

  const attendanceDay = (student, lookingForday) => {
    // console.log(student.name + " " + student.attendances.find(a => a.day === lookingForday).attended)
    return student.attendances.find(a => a.day === lookingForday)
  }

  //  const attended = (student, lookingForday) => {
  //    return student.attendances.find(a => a.day === lookingForday).attended
  //  }

  console.log(checked.map(alumno => alumno.attendances).flat().filter(attendance => attendance.day === diauno))

  console.log(checked.filter((alumno) => (alumno.attendances.find(a => a.day === diauno).attended === 'false')))
  console.log(checked.filter((alumno) => alumno.attendances.find(a => a.day === diauno).attended === 'true'))
  const withoutCheck = checked.filter((alumno) =>
    (alumno.attendances.find(a => a.day === diauno).attended === 'false')
    || (!alumno.attendances.find(a => a.day === diauno).attended === true)
  );

  const withCheck = checked.filter((alumno) =>
    (alumno.attendances.find(a => a.day === diauno).attended === 'true')
    || (alumno.attendances.find(a => a.day === diauno).attended === true)
  );

  console.log(withoutCheck)
  console.log(withCheck)
  return (
    <div> {checked.length === 0 ? <Preloader /> :
      <div className="Comision">
        <Breadcrumbs />
        <h4 className="titulo-tabla" >Comisión 1</h4>
        <table className="Comision-table strip">
          <thead>
            <tr>
              <th id="descripcion-estudiante">Estudiante</th>
              <th id="descripcion-asistencias">Asistencia</th>
            </tr>
          </thead>
          <tbody>

            {withoutCheck.map((alumno) => {
              return (<Alumno key={alumno.id} id={alumno.id} id_asistencia={attendanceDay(alumno, diauno).id}
                nombre={alumno.surname + " " + alumno.name} asistencia={attendanceDay(alumno, diauno).attended} />)
            })}

            {withCheck.map((alumno) => {
              return (<Alumno key={alumno.id} id={alumno.id} id_asistencia={attendanceDay(alumno, diauno).id}
                nombre={alumno.surname + " " + alumno.name} asistencia={attendanceDay(alumno, diauno).attended} />)
            })}

          </tbody>
        </table>
        <button id='boton-save-attendance' className='btn waves-effect waves-light' type="submit" name='action' onClick={saveAttendance}>
          <i id="guardar-asistencias-boton" className='material-icons left'>save </i>  Guardar Asistencias
        </button>
      </div>}
    </div>
  );
}

export default Comision;