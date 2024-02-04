import { useContext, useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import Alumno from './Alumno.js';
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
import M from 'materialize-css/dist/js/materialize.min.js';

function Comision() {

  const { encuentros, getAllMeetings, checked, saveAttendance, number, handleActiveSection, attendedDayCourse, getAttendedDays } = useContext(Context)
  const [diaToCheck, setDiaToCheck] = useState(1)
  const [title, setTitle] = useState("Seleccione el encuentro")
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    getAttendedDays(number);
  }, [number]);

  useEffect(() => {
    M.Tabs.init();
  }, []);

  useEffect(() => {
    let elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems);
  }, []);

  useEffect(() => {
    handleActiveSection(0);
  }, []);

  useEffect(() => {
    if (pastPresentOFuture(diaToCheck)) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
    if (attendedDayCourse != undefined) {
      presentDay()
    }
  }, [diaToCheck]);

  useEffect(() => {
    getAllMeetings();
  }, []);

  const changeDay = (dia, titleOfDay) => {
    //  fxChangeColor(dia);
    setDiaToCheck(dia);
    setTitle(titleOfDay);
  }

  const presentDay = () => {
    return Math.min(attendedDayCourse.filter(attendedDay => !attendedDay.attended).map(attendedDay => attendedDay.day));
  }

  const pastPresentOFuture = (dia) => {
    console.log(attendedDayCourse[0] == undefined)
    if (attendedDayCourse[0] == undefined) {
      return false
    } else {
      return attendedDayCourse.find(attendedDay => attendedDay.day == dia).attended;
    }
  }

  /*
    const fxChangeColor = (dia) => {
      const days = [setColorBtn1, setColorBtn2, setColorBtn3, setColorBtn4, setColorBtn5, setColorBtn6];
      console.log(days[dia - 1]);
      days[dia - 1]("aliceBlue");
      //days.splice(dia - 1, 1).forEach((day) => { day("#1f849c") });
    }
  */
  const attendanceDay = (student, lookingForday) => {
    return student.attendances.find(a => a.day === lookingForday)
  }

  /*console.log(checked.map(alumno => alumno.attendances).flat().filter(attendance => attendance.day === diaToCheck))

  console.log(checked.filter((alumno) => (alumno.attendances.find(a => a.day === diaToCheck).attended === 'false')))
  console.log(checked.filter((alumno) => alumno.attendances.find(a => a.day === diaToCheck).attended === 'true'))*/

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

  // const anycheck = pastPresentOFuture(diaToCheck)

  const tooltips = () => {
    return (
      <div className="col s12">
        <ul className="tabs">
          {encuentros.map((meeting) => {
            return (<li className="tab col s2"><button className={`btn tooltipped ${presentDay() == meeting.day ? "daypresent" : pastPresentOFuture(meeting.day) ? "daypast" : "dayfuture"}`} id="boton-change-daycheck" data-position="top" data-tooltip={meeting.title} onClick={() => changeDay(meeting.day, meeting.title)}>{meeting.day}</button></li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    (attendedDayCourse[0] == undefined) ? <div></div> :
      <div>
        <div className="titulo-tabla" ><i className="material-icons">pan_tool</i> Pasar Asistencias Comisión {number}</div>
        {checked.length === 0 || !attendedDayCourse.length ? <Preloader /> :
          <div className="Comision">
            <div className="row comision-table-body">
              {tooltips()}
            </div>
            {disabled ? <a id='floating-btn' className="btn-floating btn-large waves-effect waves-light right" onClick={() => setDisabled(false)}><i className="material-icons">create</i></a> : <div></div>}
            <div className="comsion-table-title" > {diaToCheck}º Encuentro - {title} </div>
            <table className="Comision-table strip">
              <thead>
                <tr className='fila-comision-parametros-tabla'>
                  <th id="descripcion-estudiante">Tutorando</th>
                  <th id="descripcion-asistencias">Asistencia</th>
                </tr>
              </thead>
              <tbody>

                {withoutCheck.map((alumno) => {
                  return (<Alumno key={alumno.id} id={alumno.id} id_asistencia={attendanceDay(alumno, diaToCheck).id}
                    nombre={alumno.surname + " " + alumno.name} asistencia={attendanceDay(alumno, diaToCheck).attended} clnametr={!alumno.blocked ? 'Fila-alumno' : 'Fila-alumno-block'} disablevalue={alumno.blocked || disabled ? true : false} />)
                })}

                {withCheck.map((alumno) => {
                  return (<Alumno key={alumno.id} id={alumno.id} id_asistencia={attendanceDay(alumno, diaToCheck).id}
                    nombre={alumno.surname + " " + alumno.name} asistencia={attendanceDay(alumno, diaToCheck).attended} clnametr={!alumno.blocked ? 'Fila-alumno' : 'Fila-alumno-block'} disablevalue={alumno.blocked || disabled ? true : false} />)
                })}

                {blocked.map((alumno) => {
                  return (<Alumno key={alumno.id} id={alumno.id} id_asistencia={attendanceDay(alumno, diaToCheck).id}
                    nombre={alumno.surname + " " + alumno.name} asistencia={attendanceDay(alumno, diaToCheck).attended} clnametr={!alumno.blocked ? 'Fila-alumno' : 'Fila-alumno-block'} disablevalue={alumno.blocked || disabled ? true : false} />)
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