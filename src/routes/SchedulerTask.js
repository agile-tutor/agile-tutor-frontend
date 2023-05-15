import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { alumnoService } from "../service/alumnoService"
import imageCard from "../TIPLOGO.png"

function SchedulerTask() {

  const [students, setStudents] = useState([])
  const [todb/*, setTodb*/] = useState(false)
  const [actualHour, setActualHour] = useState("")
  const [timeToNotify, setTimeToNotify] = useState("")

  useEffect(() => {
    loadNotifierAbsent()
  }, [todb])

  useEffect(() => {
    const timer = setTimeout(() => {
      setActualHour(getTime());
      setTimeToNotify(getTimeNotify());
    }, 1000);

    return () => clearTimeout(timer);
  });
  /*
    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );
  */
  const loadNotifierAbsent = async () => {
    try {
      const studentslist = await alumnoService.getNotifierAbsent()
      console.log(studentslist)
      setStudents(studentslist)
    } catch (error) {
      console.error(error)
      console.log(actualHour)
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
  let time = h + ":" + m + ":" + s;

  function getTime() {
    return time
  }

  const twentytwo = "22 horas"

  let setHourNotify = (h < 22 && s == 0 && m == 0) ? 22 - h : (h < 22) ? 21 - h : (s == 0 && m == 0) ? 46 - h : 45 - h
  let setMinNotify = (m == 0 && s == 0) ? 0 : s == 0 ? 60 - m : 59 - m
  let setSecondNotify = s == 0 ? 0 : 60 - s

  let timeNotify = addZero(setHourNotify) + "horas " + addZero(setMinNotify) + "minutos " + addZero(setSecondNotify) + "segundos";

  function getTimeNotify() {
    return timeNotify
  }

  return (
    <div>
      <nav>
        <div className="nav-wrapper bodytitulo">
          <div className="col s12">
            <Link to={"/"} className="breadcrumb bodytitulo">Tareas Programadas 1/1 Notificacion de ausencias </Link>
          </div>
        </div>
      </nav>
      {//      <h5 className="textSchedulerTask"><i className="material-icons iconSchedulerTask">access_time</i>Hora Actual: {actualHour}</h5>
      }     <h5 className="textSchedulerTask"><i className="material-icons iconSchedulerTask">send</i>Las notificaciones se enviarán a las: </h5>
      <h5 className="textSchedulerTask  hourTask">{twentytwo}</h5>
      <h5 className="textSchedulerTask"><i className="material-icons iconSchedulerTask">notifications_active</i>Tiempo estimado para notificar ausentes: </h5>
      <h5 className="textSchedulerTask hourTask">{timeToNotify === "" ? <div className="progress">
        <div className="indeterminate"></div>
      </div> : timeToNotify}</h5>
      <h4></h4>
      <h4>Alumnos a notificar:</h4>
      {
        ((students.length) === 0 || typeof (students) == "undefined") ?
          <p>"No existen alumnos pendientes de notificar por ausencias"</p> :
          students.map((alumno) => {
            return (
              <div className="row to-notify">
                <div className="col s12 m6">
                  <div className="card">
                    <div className="card-image">
                      <img src={imageCard} />
                      <span className="card-title">Card Title</span>
                      <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">notifications_off</i></a>
                    </div>
                    <div className="card-content">
                      <p>{alumno.name + " " + alumno.surname}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

export default SchedulerTask