import { useContext, useState, useEffect } from 'react';
import { Context } from '../context/Context';
import '../App.css';
import CardAlumno from './CardAlumno';

function PorcentajeAsistencia() {

    const { tutor, tutorCourses, tutorCoursesWithAverage, tutorId, studentsOfTutor, getStudentsOfTutor, updateTutorCoursesWithAverage, studentSurvey, getAllSurveys, handleActiveSection, porcentajeActual, changePercent } = useContext(Context);
    const [viewsettings, setViewsettings] = useState(false);

    const handleChange = event => {
        changePercent(event.target.value);
    };

    const handleView = () => {
        setViewsettings(!viewsettings)
    };

    const studentCompleteSurvey = (studentId) => {
        return studentSurvey.some(id => id === studentId)
    };

    function unionArrays(a, b) {
        let c = a.concat(b).sort();
        let res = c.filter((value, pos) => { return c.indexOf(value) == pos; });
        return res
    }

    useEffect(() => {
        getStudentsOfTutor(tutorId);
        updateTutorCoursesWithAverage();
    }, [tutorCourses]);

    useEffect(() => {
        getAllSurveys();
    }, []);

    const courseContainer = () => {
        return (tutorCourses.map((element =>
            < div key={element.id} className='course-container' >
                {
                    /*    console.log("sinFilter " + tutorCoursesWithAverage == undefined || !tutorCoursesWithAverage.length ? tutorCoursesWithAverage.find(course => course.courseId == element.id) : '')*/
                }
                <div className='course-container-title'>
                    <span>
                        <h5 className='parametro-tabla'>Comisión {element.id}</h5>
                    </span>
                    {
                        tutorCoursesWithAverage?.length ?
                            <span>
                                <h5 className='parametro-tabla'>Asistecia promedio: {

                                    !tutorCoursesWithAverage.find(course => course.courseId == element.id)
                                        ? '0%' :
                                        Math.round(tutorCoursesWithAverage.find(course => course.courseId == element.id).average * 100) / 100}%</h5>
                            </span>
                            :
                            <div>
                            </div>
                    }
                    <span>
                        <h5 className='parametro-tabla' key={element.id}>Cantidad de Aprobados:
                            {" "}{pass.filter((alumno) => alumno.courseId == element.id).length}
                        </h5>
                    </span>
                    <span>
                        <h5 className='parametro-tabla' key={element.id}>Encuestas completadas:
                            {" "}{
                                unionArrays(dontPass, pass).filter((alumno) => (alumno.courseId == element.id) &&
                                    studentCompleteSurvey(alumno.id)).length
                                //                  pass.filter((alumno) => alumno.courseId == element.id && !studentSurvey.some(n2 => alumno.courseId == n2))
                            }
                        </h5>
                    </span>
                </div>
                <div>
                    <div className="percent-container row center">
                        <div className="col s12 center">
                            <div className='attended-title col s4'>Estudiante</div>
                            <div className='attended-title col s2'>Porcentaje</div>
                            <div className='attended-title col s2'>Aprobado</div>
                            <div className='attended-title col s2'>Encuesta</div>
                        </div>
                        {//assignment
                        }                        </div>
                    {dontPass.filter((alumno) => alumno.courseId == element.id).map((alumno) => <CardAlumno key={alumno.id} nombre={alumno.name + " " + alumno.surname} porcentaje={alumno.attendancespercent} porcentajeActual={porcentajeActual} studentCompleteSurvey={studentCompleteSurvey} studentId={alumno.id} />)}
                </div>
                <div>
                    {pass.filter((alumno) => alumno.courseId == element.id).map((alumno) => <CardAlumno key={alumno.id} nombre={alumno.name + " " + alumno.surname} porcentaje={alumno.attendancespercent} porcentajeActual={porcentajeActual} studentCompleteSurvey={studentCompleteSurvey} studentId={alumno.id} />)}
                </div>
                <div className='parametro-final-tabla right'>
                    Total alumnos:
                    {" "}
                    {dontPass.filter((alumno) => alumno.courseId == element.id).length +
                        pass.filter((alumno) => alumno.courseId == element.id).length
                    }
                </div>
            </div >
        )))
    };

    useEffect(() => {
        handleActiveSection(2);
    }, []);

    const dontPass = (studentsOfTutor === undefined) ? [] : studentsOfTutor.filter((alumno) => { return (Number(alumno.attendancespercent) < porcentajeActual) })

    const pass = (studentsOfTutor === undefined) ? [] : studentsOfTutor.filter((alumno) => { return (Number(alumno.attendancespercent) >= porcentajeActual) })

    return (
        <div>
            <div className="titulo-tabla" ><i className="material-icons">show_chart</i> Estado de Comisiones</div>
            <div className="col s12">
                <p className="porcentaje-asistencia-parametro-tritulo">Porcentaje de Asistencia Requerido para la aprobación del TVU: {porcentajeActual}%</p>
            </div>

            <div className='porcentajeAsistencia' >
                {tutor.email == "admin" ?
                    <div className="percentEditOption center" ><button onClick={() => handleView()} onKeyDown={() => handleView()} ><i className="material-icons" >settings</i></button>Configurar porcentaje requerido
                        {viewsettings ?
                            <form action="#">
                                <p className="range-field">
                                    <label className='porcentajeToShow'>{"Nivel de asistencias requeridas " + porcentajeActual}%</label>
                                    <input type="range" id="test5" min="0" max="100" value={porcentajeActual} onChange={handleChange} />
                                </p>
                            </form>
                            : <div></div>}
                    </div>
                    : <div></div>}
                <div>
                    {courseContainer()
                    }
                </div>
            </div>
        </div>
    )
}

export default PorcentajeAsistencia;