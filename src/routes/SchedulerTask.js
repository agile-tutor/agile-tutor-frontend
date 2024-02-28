import { useContext, useEffect, useState } from "react";
import { Context } from '../context/Context.js';
import { alumnoService } from "../service/alumnoService"
import { tutorService } from "../service/tutorService"
import EmailModal from "../components/EmailModal";
import M from 'materialize-css/dist/js/materialize.min.js';

function SchedulerTask() {

  const [students, setStudents] = useState([]);
  const [todb, setTodb] = useState(false);
  /*const [actualHour, setActualHour] = useState("");*/
  const [timeToNotify, setTimeToNotify] = useState("");
  const [absentMessageSubject, setAbsentMessageSubject] = useState("");
  const [absentMessageBody, setAbsentMessageBody] = useState("");
  const { tutorId, handleActiveSection } = useContext(Context);

  useEffect(() => {
    loadNotifierAbsent()
  }, [todb])

  useEffect(() => {
    const timer = setTimeout(() => {
      /*setActualHour(getTime());*/
      setTimeToNotify(getTimeNotify());
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    (async () => {
      const message = await tutorService.getAbsentMessage(tutorId)
      setAbsentMessageSubject(message.subject);
      setAbsentMessageBody(message.body);
    })();
  }, [])

  useEffect(() => {
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  }, []);

  useEffect(() => {
    handleActiveSection(3);
  }, []);

  const handleClickUpdateEmailTemplate = async () => {
    try {
      if (absentMessageSubject === '' || absentMessageBody === '') {
        M.toast({ html: 'Ingresar asunto y cuerpo del mensaje', classes: 'rounded red-app-semitr' });
      } else {
        const absentEmail = {
          "subject": absentMessageSubject,
          "body": absentMessageBody
        }
        /*console.log('handle click' + absentEmail);*/
        const emailTemplate = await tutorService.updateNotifierAbsent(absentEmail, tutorId);
        console.log(emailTemplate)
        M.toast({ html: `El email ha sido modificado exitosamente.`, classes: 'rounded blue-app-semitr' });
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickDeleteAbsentNotification = async (alumnoId) => {
    try {
      /*console.log('handle click' + alumnoId);*/
      await tutorService.removeAbsentNotifierStudent(alumnoId, tutorId);
      setTodb(!todb)
    } catch (error) {
      console.error(error)
    }
  }
  /*
    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );
  */
  const loadNotifierAbsent = async () => {
    try {
      const studentslist = await alumnoService.getNotifierAbsent(tutorId)
      /*console.log(studentslist)*/
      setStudents(studentslist)
    } catch (error) {
      console.error(error)
      /*console.log(actualHour)*/
    }
  }

  function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
  }

  const d = new Date();
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let s = addZero(d.getSeconds());
  //  let time = h + ":" + m + ":" + s;
  /*
    function getTime() {
      return time
    }
  */
  const twentytwo = "22:00 horas"

  let setHourNotify = (h < 22 && s == 0 && m == 0) ? 22 - h : (h < 22) ? 21 - h : (s == 0 && m == 0) ? 46 - h : 45 - h
  let setMinNotify = (m == 0 && s == 0) ? 0 : s == 0 ? 60 - m : 59 - m
  let setSecondNotify = s == 0 ? 0 : 60 - s

  let timeNotify = addZero(setHourNotify) + "hh " + addZero(setMinNotify) + "mm " + addZero(setSecondNotify) + "ss";

  function getTimeNotify() {
    return timeNotify
  }

  return (
    <div>
      <div className="titulo-tabla" ><i className="material-icons">schedule</i> Tareas Programadas 1/1 Notificacion de ausencias </div>
      {//      <h5 className="textSchedulerTask"><i className="material-icons iconSchedulerTask">access_time</i>Hora Actual: {actualHour}</h5>
      }
      <div className='course-container vhmargintop'>
        <div className="parametro-schedulertask row">
          <span className="textSchedulerTask col s6"><i className="material-icons iconSchedulerTask">send</i>Las notificaciones se enviarán a las: </span>
          <span className="textSchedulerTask hourTask center col s5">{twentytwo}</span>
        </div>
        <div className="parametro-schedulertask row">
          <span className="textSchedulerTask col s6"><i className="material-icons iconSchedulerTask">notifications_active</i>Próximo envio programado dentro de : </span>
          {timeToNotify !== "" ?
            <span className="textSchedulerTask hourTask center col s5">
              {timeToNotify}</span> :
            <div className="progress">
              <div className="indeterminate"></div>
            </div>}
          <h4></h4>
        </div>
      </div>
      <div className="course-container row">
        <div className="titulo-email-template col s12 center">Personalice el email que se envía:</div>
        <div className="row">
          <div className="col s3"></div>
          <div className="col s3 center titulo-emailaenviar">Email modelo:</div>
          <div className="col s3 center emailicon">
            <a className="waves-effect waves-teal btn-flat modal-trigger" href={"#modalemail" + tutorId} ><i id="mail_outline" className='material-icons'
            >mail_outline</i></a>
            {/*console.log(tutorId)*/}
            <EmailModal key={tutorId} tutorId={tutorId} subject={absentMessageSubject} body={absentMessageBody} setSubject={setAbsentMessageSubject} setBody={setAbsentMessageBody} handleClickUpdateEmailTemplate={handleClickUpdateEmailTemplate} />
          </div>
          <div className="col s3"></div>
        </div>
      </div>
      {
        (typeof (students) == "undefined" || (students.length) === 0) ?
          <p className="titulo-email-template col s12 center">"No existen alumnos pendientes de notificar por ausencias"</p> :
          <div className="scheduler-task-title center" >Alumnos a notificar:
            <div className="marginbt5vh center" >
              <div className=" center" >
                {students.map((alumno) =>
                  <div key={alumno.id} className="to-notify">
                    <div className="card">
                      <div className="card-content">
                        <div className="email-card-container">
                          <i className="material-icons">face</i><span>{" " + alumno.name + " " + alumno.surname}</span>
                        </div>
                        <div className="email-card-container">
                          <i className="material-icons">school</i><span> Comisión {alumno.courseId}</span>
                        </div>
                        <a className="btn-floating halfway-fab waves-effect waves-light" onClick={() => handleClickDeleteAbsentNotification(alumno.id)}><i className="material-icons dont-notify">notifications_off</i></a>
                        <div className="email-card-container">
                          <i className="material-icons">email</i><span> {alumno.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default SchedulerTask