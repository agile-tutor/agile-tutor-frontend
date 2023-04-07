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

          {withoutCheck.map((alumno) => {
            return (<Alumno key={alumno.id} id={alumno.id} id_asistencia={attendanceDay(alumno, diauno).id}
              nombre={alumno.name + " " + alumno.surname} asistencia={attendanceDay(alumno, diauno).attended} />)
          })}

          {withCheck.map((alumno) => {
            return (<Alumno key={alumno.id} id={alumno.id} id_asistencia={attendanceDay(alumno, diauno).id}
              nombre={alumno.name + " " + alumno.surname} asistencia={attendanceDay(alumno, diauno).attended} />)
          })}

        </tbody>
      </table>
      <button id='boton-save-attendance' className='btn waves-effect waves-light' type="submit" name='action' onClick={saveAttendance}>Guardar Asistencias
        <i className='material-icons right'>send</i>
      </button>
    </div>
  );
}

export default Comision;