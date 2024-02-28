import { useContext, useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
//import Breadcrumbs from '../utils/Breadcrumbs.js';
import AlumnoEdit from './AlumnoEdit.js';
import M from 'materialize-css/dist/js/materialize.min.js';
import NewStudentModal from './NewStudentModal.js';

function ComisionEdit() {

    const { handleActiveSection, checked, number, blockUnblockStudent, updateStudent, getCourse, putStudentCourseChange, addNewStudentToACourse, getAllCourses } = useContext(Context);
    const [change, setChange] = useState(false);
    const [chargin, setChargin] = useState(false);

    const handleEditBlockStudent = async (id, status) => {
        blockUnblockStudent(id, !status)
        setChargin(true)
        await delay(1000);
        setChargin(false)
        setChange(!change)
    }

    const handleEditUpdateStudent = async (id, student) => {
        updateStudent(id, student)
        setChargin(true)
        await delay(1000);
        setChargin(false)
        setChange(!change)
    }

    const handleAddStudentToACourse = async (newStudent) => {
        addNewStudentToACourse(newStudent);
        setChargin(true)
        await delay(1000);
        setChargin(false)
        setChange(!change)
    }

    const handleEditChangeStudentCourse = async (studentId, courseId) => {
        putStudentCourseChange(studentId, courseId);
        setChargin(true);
        await delay(1000);
        setChargin(false)
        setChange(!change)
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    useEffect(() => {
        getCourse(number)
    }, [change])

    useEffect(() => {
        M.AutoInit();
    });

    useEffect(() => {
        handleActiveSection(1);
    }, []);

    useEffect(() => {
        getAllCourses();
    }, []);

    return (
        <div>
            <h4 className="titulo-tabla" ><i className="material-icons">mode_edit</i> Editar Comisión {+ number}</h4>
            <div> {checked.length === 0 ? <Preloader /> :
                <div className="Comision">
                    {chargin ?
                        <div id='chargin-mode' className="progress">
                            <div className="indeterminate"></div>
                        </div> :
                        <div id='chargin-mode'>
                        </div>
                    }
                    <table id="editComisionTable" className="Comision-table strip">
                        <thead>
                            <tr className='fila-comision-parametros-tabla'>
                                <th id="descripcion-edicion-estudiante">Apellido</th>
                                <th id="descripcion-edicion-estudiante">Nombre</th>
                                <th id="descripcion-edicion-estudiante">bloquear</th>
                                <th id="descripcion-edicion-estudiante">editar</th>
                                <th id="descripcion-edicion-estudiante">cambiar comisión</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                checked.map((alumno) => <AlumnoEdit key={alumno.id} courseId={alumno.courseId} id={alumno.id} apellido={alumno.surname} nombre={alumno.name} identificacion={alumno.identifier} email={alumno.email} blocked={alumno.blocked} observaciones={alumno.observations} clnametr={!alumno.blocked ? 'Fila-alumno' : 'Fila-alumno-block'} clicons={!alumno.blocked ? 'material-icons left' : 'material-icons left redicons'} handleEditBlockStudent={handleEditBlockStudent} handleEditUpdateStudent={handleEditUpdateStudent} handleEditChangeStudentCourse={handleEditChangeStudentCourse} />
                                )
                            }
                        </tbody>
                    </table>
                    <div className='container section'>
                        <a id='floating-btn' className="btn-floating btn-large waves-effect waves-light modal-trigger" href={"#modaladd"} ><i className="material-icons">group_add</i></a>
                        <NewStudentModal courseId={number} handleAddStudentToACourse={handleAddStudentToACourse} />
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default ComisionEdit