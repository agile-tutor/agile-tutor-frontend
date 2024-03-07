import { useEffect, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import '../App.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import AlumnoModal from "./AlumnoModal";
import StudentCourseChangeModal from "./StudentCourseChangeModal";
import PropTypes from 'prop-types';

function AlumnoEdit({ courseId, nombre, apellido, identificacion, email, observaciones, id, blocked, clnametr, clicons, handleEditBlockStudent, handleEditUpdateStudent, handleEditChangeStudentCourse }) {

    const [name, setName] = useState(nombre);
    const [surname, setSurname] = useState(apellido);
    const [identifier, setIdentifier] = useState(identificacion);
    const [emailedit, setEmailedit] = useState(email);
    const [observations, setObservations] = useState(observaciones);

    const handleClickBlock = (id, value) => {
        handleEditBlockStudent(id, value)
    };

    const handleClickUpdate = () => {
        if (name === '' || surname === '' || identifier === '' || email === '') {
            M.toast({ html: 'Ingresar: nombre, apellido, identificador y email', classes: 'rounded red-app-semitr'});
        } else {
            const editedStudent = {
                "name": name,
                "surname": surname,
                "identifier": identifier,
                "email": emailedit,
                "observations": observations
            }
            handleEditUpdateStudent(id, editedStudent);
            M.toast({ html: `${name} ${surname} modificado exitosamente.`, classes: 'rounded blue-app-semitr'});
        }
    };

    const handleClickChangeStudentCourse = (destinyCourse) => {
        /*console.log("destinyCourse: " + destinyCourse)*/
        handleEditChangeStudentCourse(id, destinyCourse);
    };

    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, []);
    
    return (
        <tr className={clnametr} >
            <td id="descripcion-edicion-estudiante">{apellido}</td>
            <td id="descripcion-edicion-estudiante">{nombre}</td>
            <td id="descripcion-edicion-estudiante">
                {!blocked ?
                    <button idstudent={id} blockstatus={blocked.toString()} className="waves-effect waves-teal btn-flat" onClick={() => handleClickBlock(id, blocked)} ><i className='material-icons left'>lock_open</i></button>
                    : <button idstudent={id} blockstatus={blocked.toString()} className="waves-effect waves-teal btn-flat" onClick={() => handleClickBlock(id, blocked)} ><i className='material-icons left redicons'>lock_outline</i></button>
                }
            </td>
            <td id="descripcion-edicion-estudiante-editar">
                <div className='container section'>
                    <a className="waves-effect waves-teal btn-flat modal-trigger" href={"#modaledit" + id} ><i id="iconoBlock" className={clicons}
                    >mode_edit </i></a>
                    {/*console.log(id)*/}
                    <AlumnoModal key={id} studentid={id} courseId={courseId} name={name} surname={surname} identifier={identifier} emailedit={emailedit} observations={observations} setName={setName} setSurname={setSurname} setIdentifier={setIdentifier} setEmailedit={setEmailedit} setObservations={setObservations} handleClickUpdate={handleClickUpdate} />
                </div>
            </td>
            <td id="descripcion-edicion-estudiante">
                <div className='container section'>
                    <a className="waves-effect waves-teal btn-flat modal-trigger" href={"#modalchangecourse" + id} ><i id="iconoBlock" className={clicons}
                    >swap_horiz </i></a>
                    <StudentCourseChangeModal key={id} studentid={id} courseId={courseId} name={name} surname={surname} handleClickChangeStudentCourse={handleClickChangeStudentCourse} />
                </div>
            </td>
        </tr>
    )
}

AlumnoEdit.propTypes = {
    courseId: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired,
    identificacion: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    observaciones: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    blocked: PropTypes.bool.isRequired,
    clnametr: PropTypes.string.isRequired,
    clicons: PropTypes.string.isRequired,
    handleEditBlockStudent: PropTypes.func.isRequired,
    handleEditChangeStudentCourse: PropTypes.func.isRequired,
    handleEditUpdateStudent: PropTypes.func.isRequired,
  };

export default AlumnoEdit;