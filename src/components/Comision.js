import { useContext, useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import Alumno from './Alumno.js';
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
import Breadcrumbs from '../utils/Breadcrumbs.js';
import M from 'materialize-css/dist/js/materialize.min.js';

function Comision() {

  const { checked, saveAttendance, number } = useContext(Context)
  const [diaToCheck, setDiaToCheck] = useState(1)
  useEffect(() => {
    M.Tabs.init();
  }, []);

  const changeDay = (dia) => {
    setDiaToCheck(dia)
  }

  const attendanceDay = (student, lookingForday) => {
    return student.attendances.find(a => a.day === lookingForday)
  }

  console.log(checked.map(alumno => alumno.attendances).flat().filter(attendance => attendance.day === diaToCheck))

  console.log(checked.filter((alumno) => (alumno.attendances.find(a => a.day === diaToCheck).attended === 'false')))
  console.log(checked.filter((alumno) => alumno.attendances.find(a => a.day === diaToCheck).attended === 'true'))

  const withoutCheck = checked.filter((alumno) =>
    ((alumno.attendances.find(a => a.day === diaToCheck).attended === 'false')
      || (!alumno.attendances.find(a => a.day === diaToCheck).attended === true))
    && (alumno.blocked === 'false' || !alumno.blocked === true)
  );

  const withCheck = checked.filter((alumno) =>
    ((alumno.attendances.find(a => a.day === diaToCheck).attended === 'true')
      || (alumno.attendances.find(a => a.day === diaToCheck).attended === true))
    && (alumno.blocked === 'false' || !alumno.blocked === true)
  );
  const blocked = checked.filter((alumno) =>
    (alumno.blocked === 'true')
    || (alumno.blocked === true)
  );

  console.log(withoutCheck)
  console.log(withCheck)
  return (
    <div> {checked.length === 0 ? <Preloader /> :
      <div className="Comision">
        <Breadcrumbs posicion0={"Pasar Asistencias"} posicion1={"Comisión " + number} posicion2={"Dia " + diaToCheck} route0={"/passAttendance"} route1={"/comision"} />
        <h4 className="titulo-tabla" >Encuentro N° {diaToCheck} </h4>

        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(1)}>Presentación</button></li>
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(2)}>HistoriaUNQ</button></li>
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(3)}>EducaciónSuperior</button></li>
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(4)}>Acto</button></li>
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(5)}>DerechoHumano</button></li>
              <li className="tab col s2"><button id='boton-change-daycheck' onClick={() => changeDay(6)}>Servicios</button></li>
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
                nombre={alumno.surname + " " + alumno.name} asistencia={attendanceDay(alumno, diaToCheck).attended} clnametr={!alumno.blocked ? 'Fila-alumno' : 'Fila-alumno-block'} disablevalue={alumno.blocked ? true : false} />)
            })}

            {withCheck.map((alumno) => {
              return (<Alumno key={alumno.id} id={alumno.id} id_asistencia={attendanceDay(alumno, diaToCheck).id}
                nombre={alumno.surname + " " + alumno.name} asistencia={attendanceDay(alumno, diaToCheck).attended} clnametr={!alumno.blocked ? 'Fila-alumno' : 'Fila-alumno-block'} disablevalue={alumno.blocked ? true : false} />)
            })}

            {blocked.map((alumno) => {
              return (<Alumno key={alumno.id} id={alumno.id} id_asistencia={attendanceDay(alumno, diaToCheck).id}
                nombre={alumno.surname + " " + alumno.name} asistencia={attendanceDay(alumno, diaToCheck).attended} clnametr={!alumno.blocked ? 'Fila-alumno' : 'Fila-alumno-block'} disablevalue={alumno.blocked ? true : false} />)
            })}

          </tbody>
        </table>
        <button id='boton-save-attendance' className='btn waves-effect waves-light' type="submit" name='action' onClick={() => saveAttendance(diaToCheck)}>
          <i id="guardar-asistencias-boton" className='material-icons left'>save </i>  Guardar Asistencias
        </button>
      </div>}
    </div>
  );
}

export default Comision;