import { useContext, useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import Alumno from './Alumno.js';
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
import Breadcrumbs from '../utils/Breadcrumbs.js';
import M from 'materialize-css/dist/js/materialize.min.js';

function Comision() {

  const { checked, saveAttendance } = useContext(Context)
  const [diaToCheck, setDiaToCheck] = useState(1)

  useEffect(() => {
    M.Tabs.init();
  }, []);

  const changeDay = (dia) => {
    setDiaToCheck(dia)
  }


  //    console.log(checked[0].attendances[0].attended)

  const attendanceDay = (student, lookingForday) => {
    // console.log(student.name + " " + student.attendances.find(a => a.day === lookingForday).attended)
    return student.attendances.find(a => a.day === lookingForday)
  }

  //  const attended = (student, lookingForday) => {
  //    return student.attendances.find(a => a.day === lookingForday).attended
  //  }

  console.log(checked.map(alumno => alumno.attendances).flat().filter(attendance => attendance.day === diaToCheck))

  console.log(checked.filter((alumno) => (alumno.attendances.find(a => a.day === diaToCheck).attended === 'false')))
  console.log(checked.filter((alumno) => alumno.attendances.find(a => a.day === diaToCheck).attended === 'true'))
  const withoutCheck = checked.filter((alumno) =>
    (alumno.attendances.find(a => a.day === diaToCheck).attended === 'false')
    || (!alumno.attendances.find(a => a.day === diaToCheck).attended === true)
  );

  const withCheck = checked.filter((alumno) =>
    (alumno.attendances.find(a => a.day === diaToCheck).attended === 'true')
    || (alumno.attendances.find(a => a.day === diaToCheck).attended === true)
  );

  console.log(withoutCheck)
  console.log(withCheck)
  return (
    <div> {checked.length === 0 ? <Preloader /> :
      <div className="Comision">
        <Breadcrumbs posicion0={"Pasar Asistencias"} posicion1={"Comisión 1"} posicion2={"Dia " + diaToCheck} route0={"/passAttendance"} route1={"/comision"} />
        <h4 className="titulo-tabla" >Encuentro N°</h4>

        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(1)}>1</button></li>
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(2)}>2</button></li>
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(3)}>3</button></li>
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(4)}>4</button></li>
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(5)}>5</button></li>
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(6)}>6</button></li>
            </ul>
          </div>
        </div>

        <table className="Comision-table strip">
          <thead>
            <tr>
              <th id="descripcion-estudiante">Estudiante</th>
              <th id="descripcion-asistencias">Asistencia</th>
            </tr>
          </thead>
          <tbody>

            {withoutCheck.map((alumno) => {
              return (<Alumno key={alumno.id} id={alumno.id} id_asistencia={attendanceDay(alumno, diaToCheck).id}
                nombre={alumno.surname + " " + alumno.name} asistencia={attendanceDay(alumno, diaToCheck).attended} />)
            })}

            {withCheck.map((alumno) => {
              return (<Alumno key={alumno.id} id={alumno.id} id_asistencia={attendanceDay(alumno, diaToCheck).id}
                nombre={alumno.surname + " " + alumno.name} asistencia={attendanceDay(alumno, diaToCheck).attended} />)
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