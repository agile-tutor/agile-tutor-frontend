import { useContext, useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import Alumno from './Alumno.js';
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
import M from 'materialize-css/dist/js/materialize.min.js';

function Comision() {

  const { studentsCourseWhithAttendanceMeeting, getStudentsFromCourseWhithAttendanceMeeting, encuentros, getAllMeetings, checked, saveAttendance, number, handleActiveSection/*, attendedDayCourse, getAttendedDays*/, getCourse, updateAttendance } = useContext(Context)
  const [diaToCheck, setDiaToCheck] = useState(0)
  const [title, setTitle] = useState("")
  const [disabled, setDisabled] = useState(false);
  const [absents, setAbsents] = useState([]);
  const [attended, setAttended] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [newChange, setNewChange] = useState(false);
  /*
    useEffect(() => {
      getAttendedDays(number);
    }, [number]);
  */
  /*
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
 */
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
    getAllMeetings();
  }, []);

  useEffect(() => {
    getCourse(number)
  }, [])

  useEffect(() => {
    completeStudentInfo()
  }, [studentsCourseWhithAttendanceMeeting, newChange])

  const handleChangeAttendance = (target) => {
    updateAttendance(target);
    setNewChange(!newChange);
  }

  const changeDay = (dia, titleOfDay) => {
    //  fxChangeColor(dia);
    getStudentsFromCourseWhithAttendanceMeeting(number, dia);
    setDiaToCheck(dia);
    setTitle(titleOfDay);
  }

  const completeStudentInfo = () => {
    if (studentsCourseWhithAttendanceMeeting.length > 0) {

      const studentsWithAttendance = checked.map((student) => {
        let sAttendance = studentsCourseWhithAttendanceMeeting.find(studenattendance => studenattendance.studentId === student.id).attendance
        return sAttendance != undefined ? { ...student, attendance: sAttendance } : student
      })
      setAttended(studentsWithAttendance.filter((student) =>
        student.attendance.attended && !student.blocked
      ))
      setAbsents(studentsWithAttendance.filter((student) =>
        !student.attendance.attended && !student.blocked
      ))
      setBlocked(studentsWithAttendance.filter((alumno) => {
        return (alumno.blocked === 'true') || (alumno.blocked === true)
      }))
    }
  }
  /*
    const presentDay = () => {
      return Math.min(attendedDayCourse.filter(attendedDay => !attendedDay.attended).map(attendedDay => attendedDay.day));
    }
   
    const pastPresentOFuture = (dia) => {
      console.log(attendedDayCourse[0] == undefined)
      if (attendedDayCourse == undefined || attendedDayCourse[0] == undefined || diaToCheck == 0 || diaToCheck == undefined) {
        return false
      } else {
        return attendedDayCourse.find(attendedDay => attendedDay.day == dia).attended;
      }
    }
  */
  /*
    const fxChangeColor = (dia) => {
      const days = [setColorBtn1, setColorBtn2, setColorBtn3, setColorBtn4, setColorBtn5, setColorBtn6];
      console.log(days[dia - 1]);
      days[dia - 1]("aliceBlue");
      //days.splice(dia - 1, 1).forEach((day) => { day("#1f849c") });
    }
  */
  // const anycheck = pastPresentOFuture(diaToCheck)

  const tooltips = () => {
    return (
      <div className="col s12">
        <ul className="tabs">
          {encuentros.map((meeting) =>
            <li key={meeting.day} className="tab col s2"><button className={`btn tooltipped ${/*presentDay() == meeting.day ? "daypresent" : pastPresentOFuture(meeting.day) ? "daypast" : "dayfuture"*/" "}`} id="boton-change-daycheck" data-position="top" data-tooltip={meeting.title} onClick={() => {
              changeDay(meeting.day, meeting.title)
            }}>{meeting.day}</button></li>
          )}
        </ul>
      </div>
    )
  }

  const studentsRow = (students) => {

    return (
      students.map((student) =>
        <Alumno key={student.id} id={student.id} nombre={student.surname + " " + student.name}
          asistencia={student.attendance.attended} clnametr={!student.blocked ? 'Fila-alumno' : 'Fila-alumno-block'} disablevalue={student.blocked || disabled} handleChange={handleChangeAttendance} />)
    )
  }

  return (
    /*(*//*attendedDayCourse == undefined || */diaToCheck == 0 || diaToCheck == undefined ?
      <div>
        <div className="titulo-tabla" ><i className="material-icons">pan_tool</i> Pasar Asistencias Comisión {number}</div>
        {checked.length === 0 /*|| !attendedDayCourse.length*/ ? <Preloader /> :
          <div className="Comision">
            <div className="row comision-table-body">
              {tooltips()}
            </div>
          </div>
        }
        <h2>Seleccione el nº de encuentro para continuar</h2>
      </div>
      :
      //    attendedDayCourse[0] == undefined) ? <h1>Seleccione el encuentro</h1>  :
      <div>
        <div className="titulo-tabla" ><i className="material-icons">pan_tool</i> Pasar Asistencias Comisión {number}</div>
        {checked.length === 0 /*|| !attendedDayCourse.length */ ? <Preloader /> :
          <div className="Comision">
            <div className="row comision-table-body">
              {tooltips()}
            </div>
            {disabled ? <a id='floating-btn' className="btn-floating btn-large waves-effect waves-light right" onClick={() => setDisabled(false)}><i className="material-icons">create</i></a> : <div></div>}
            <div className="comsion-table-title" > {diaToCheck}º Encuentro - {title} </div>
            {studentsCourseWhithAttendanceMeeting.length === 0 ? <Preloader /> :
              <table className="Comision-table strip">
                <thead>
                  <tr className='fila-comision-parametros-tabla'>
                    <th id="descripcion-estudiante">Tutorando</th>
                    <th id="descripcion-asistencias">Asistencia</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsRow(absents)}
                  {studentsRow(attended)}
                  {studentsRow(blocked)}
                </tbody>
              </table>
            }
            <button id='boton-save-attendance' className='btn waves-effect waves-light' type="submit" name='action' onClick={() => saveAttendance(diaToCheck) } onKeyDown={() => saveAttendance(diaToCheck) }>
              <i id="guardar-asistencias-boton" className='material-icons left'>save </i>  Guardar Asistencias
            </button>
          </div>}
      </div>
  );
}

export default Comision;