import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import '../App.css';
import CardAlumno from './CardAlumno';

function PorcentajeAsistencia() {

    const { tutorCourses, tutorCoursesWithAverage, tutorId, getAllCoursesFromTutor, studentsOfTutor, getStudentsOfTutor, updateTutorCoursesWithAverage } = useContext(Context);
    const [porcentaje, setPorcentaje] = useState(75);
    const [viewsettings, setViewsettings] = useState(false)

    const handleChange = event => {
        setPorcentaje(event.target.value);
        console.log('value is:', event.target.value);
    };

    const handleView = () => {
        setViewsettings(!viewsettings)
    };

    useEffect(() => {
        getStudentsOfTutor(tutorId);
        updateTutorCoursesWithAverage();
    }, [tutorCourses]);

    useEffect(() => {
        getAllCoursesFromTutor(tutorId);
    }, []);

    const courseContainer = () => {
        { console.log("incoursecontainer " + tutorCourses) }
        return (tutorCourses.map((element => {
            return (
                < div className='course-container' >
                    {
                        console.log("sinFilter " + tutorCoursesWithAverage == undefined || !tutorCoursesWithAverage.length ? tutorCoursesWithAverage.find(course => course.courseId == element.id) : '')
                    }
                    <div className='course-container-title'>
                        <span>
                            <h5 className='parametro-tabla' key={element.id}>Comisión {element.id}</h5>
                        </span>
                        {
                            tutorCoursesWithAverage == undefined || !tutorCoursesWithAverage.length ? <div></div> :
                                <span>
                                    <h5 className='parametro-tabla'>Asistecia promedio: {

                                        !tutorCoursesWithAverage.find(course => course.courseId == element.id)
                                            ? '0%' :
                                            tutorCoursesWithAverage.find(course => course.courseId == element.id).average} %</h5>
                                </span>
                        }
                    </div>
                    <div>
                        <div className="percent-container row center">
                            <div className="col s12 center">
                                <div className='attended-title col s5'>Estudiante</div>
                                <div className='attended-title col s2'>Porcentaje</div>
                                <div className='attended-title col s4'>Aprobado</div>
                            </div>
                        </div>
                        {dontPass.filter((alumno) => alumno.courseId == element.id).map((alumno) => { return (<CardAlumno key={alumno.id} nombre={alumno.name + " " + alumno.surname} porcentaje={alumno.attendancespercent} porcentajeActual={porcentaje} />) })}
                    </div>
                    <div>
                        {pass.filter((alumno) => alumno.courseId == element.id).map((alumno) => { return (<CardAlumno key={alumno.id} nombre={alumno.name + " " + alumno.surname} porcentaje={alumno.attendancespercent} porcentajeActual={porcentaje} />) })}
                    </div>
                </div >
            )
        })))
    };

    const dontPass = studentsOfTutor.filter((alumno) => { return (Number(alumno.attendancespercent) < porcentaje) });
    const pass = studentsOfTutor.filter((alumno) => { return (Number(alumno.attendancespercent) >= porcentaje) });
    return (
        <div>
            <nav>
                <div className="nav-wrapper bodytitulo">
                    <div className="col s12">
                        <Link to={"/"} className="breadcrumb bodytitulo">Porcentaje de Asistencia: {porcentaje}%</Link>
                    </div>
                </div>
            </nav>

            <div className='porcentajeAsistencia' >
                <h5 className="percentEditOption center" ><i className="material-icons" onClick={() => handleView()}>settings</i>Configurar porcentaje requerido
                    {viewsettings ?
                        <form action="#">
                            <p className="range-field">
                                <label className='porcentajeToShow'>{"Asistencia del " + porcentaje}%</label>
                                <input type="range" id="test5" min="0" max="100" value={porcentaje} onChange={handleChange} />
                            </p>
                        </form>
                        : <div></div>}
                </h5>
                <div>
                    {courseContainer()
                    }
                </div>
            </div>
        </div>
    )
}

export default PorcentajeAsistencia;