import { useContext, useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import Alumno from './Alumno.js';
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
//import Breadcrumbs from '../utils/Breadcrumbs.js';
import M from 'materialize-css/dist/js/materialize.min.js';

function Comision() {

  const { checked, saveAttendance, number, handleActiveSection, attendedDayCourse, getAttendedDays } = useContext(Context)
  const [diaToCheck, setDiaToCheck] = useState(1)
  const [title, setTitle] = useState("Presentación del taller de vida universitaria")
  const [disabled, setDisabled] = useState(false);
  /*const [colorBtn1, setColorBtn1] = useState("#1f849c")
  const [colorBtn2, setColorBtn2] = useState("#1f849c")
  const [colorBtn3, setColorBtn3] = useState("#1f849c")
  const [colorBtn4, setColorBtn4] = useState("#1f849c")
  const [colorBtn5, setColorBtn5] = useState("#1f849c")
  const [colorBtn6, setColorBtn6] = useState("#1f849c")
*/
  useEffect(() => {
    getAttendedDays(number);
  }, [number]);

  useEffect(() => {
    M.Tabs.init();
  }, []);

  useEffect(() => {
    var elems = document.querySelectorAll('.tooltipped');
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
  /*
    console.log(withoutCheck)
    console.log(withCheck)
  */

  return (
    (attendedDayCourse[0] == undefined) ? <div></div> :
      <div>
        <h4 className="titulo-tabla" >Pasar Asistencias Comisión {number}</h4>
        {checked.length === 0 || !attendedDayCourse.length ? <Preloader /> :
          <div className="Comision">
            <div className="row comision-table-body">
              <div className="col s12">
                {console.log(attendedDayCourse)}
                {//              <h5 id='titulo-encuentro' >---------------------------------</h5>
                }             <ul className="tabs">
                  <li className="tab col s2"><button className={`btn tooltipped ${presentDay() == 1 ? "daypresent" : pastPresentOFuture(1) ? "daypast" : "dayfuture"}`} id="boton-change-daycheck" data-position="top" data-tooltip="Presentación del taller de vida universitaria" onClick={() => changeDay(1, "Presentación del taller de vida universitaria")}>1</button></li>
                  <li className="tab col s2"><button className={`btn tooltipped ${presentDay() == 2 ? "daypresent" : pastPresentOFuture(2) ? "daypast" : "dayfuture"}`} id="boton-change-daycheck" data-position="top" data-tooltip="Historia de la Universidad Argentina y de la UNQ" onClick={() => changeDay(2, "Historia de la Universidad Argentina y de la UNQ")}>2</button></li>
                  <li className="tab col s2"><button className={`btn tooltipped ${presentDay() == 3 ? "daypresent" : pastPresentOFuture(3) ? "daypast" : "dayfuture"}`} id="boton-change-daycheck" data-position="top" data-tooltip="Regimen de estudios y estatuto universitario" onClick={() => changeDay(3, "Regimen de estudios y estatuto universitario")}>3</button></li>
                  <li className="tab col s2"><button className={`btn tooltipped ${presentDay() == 4 ? "daypresent" : pastPresentOFuture(4) ? "daypast" : "dayfuture"}`} id="boton-change-daycheck" data-position="top" data-tooltip="Acto de recibimiento" onClick={() => changeDay(4, "Acto de recibimiento")}>4</button></li>
                  <li className="tab col s2"><button className={`btn tooltipped ${presentDay() == 5 ? "daypresent" : pastPresentOFuture(5) ? "daypast" : "dayfuture"}`} id="boton-change-daycheck" data-position="top" data-tooltip="La Educación Superior como derecho humano" onClick={() => changeDay(5, "La Educación Superior como derecho humano")}>5</button></li>
                  <li className="tab col s2"><button className={`btn tooltipped ${presentDay() == 6 ? "daypresent" : pastPresentOFuture(6) ? "daypast" : "dayfuture"}`} id="boton-change-daycheck" data-position="top" data-tooltip="Áreas, servicios y becas" onClick={() => changeDay(6, "Áreas, servicios y becas")}>6</button></li>
                </ul>
              </div>
            </div>
            {disabled ? <a id='floating-btn' className="btn-floating btn-large waves-effect waves-light right" onClick={() => setDisabled(false)}><i className="material-icons">create</i></a> : <div></div>}
            <div className="comsion-table-title" > Encuentro N° {diaToCheck} - {title} </div>
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