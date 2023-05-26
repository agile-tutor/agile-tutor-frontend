import { useEffect, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import '../App.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import AlumnoModal from "./AlumnoModal";

function AlumnoEdit({ nombre, apellido, identificacion, email, observaciones, id, blocked, clnametr, clicons, handleEditBlockStudent, handleEditUpdateStudent }) {

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
            M.toast({ html: 'Ingresar: nombre, apellido, identificador y email' });
        } else {
            const editedStudent = {
                "name": name,
                "surname": surname,
                "identifier": identifier,
                "email": emailedit,
                "observations": observations
            }
            console.log('handle click' + editedStudent);
            handleEditUpdateStudent(id, editedStudent);
            M.toast({ html: `${name} ${surname} modificado exitosamente.` });
        }
    };

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, []);

    return (
        <tr className={clnametr} >
            <td id="descripcion-edicion-estudiante">{apellido}</td>
            <td id="descripcion-edicion-estudiante">{nombre}</td>
            {/*   <td id="columna-identificacion">{identificacion}</td>
            <td id="columna-email">{email}</td> */}
            <td id="descripcion-edicion-estudiante">
                {!blocked ?
                    <button idstudent={id} blockstatus={blocked} className="waves-effect waves-teal btn-flat" onClick={() => handleClickBlock(id, blocked)} ><i className='material-icons left'>lock_open</i></button>
                    : <button idstudent={id} blockstatus={blocked} className="waves-effect waves-teal btn-flat" onClick={() => handleClickBlock(id, blocked)} ><i className='material-icons left greyicons'>lock_outline</i></button>
                }
            </td>
            <td id="descripcion-edicion-estudiante-editar">
                <div className='container section'>
                    <a className="waves-effect waves-teal btn-flat modal-trigger" href={"#modaledit" + id} ><i id="iconoBlock" className={clicons}
                    //onClick={() => handleClickEdit(id, blocked)}
                    >mode_edit </i>{id}</a>
                    {console.log(id)}
                    <AlumnoModal key={id} studentid={id} name={name} surname={surname} identifier={identifier} emailedit={emailedit} observations={observations} setName={setName} setSurname={setSurname} setIdentifier={setIdentifier} setEmailedit={setEmailedit} setObservations={setObservations} handleClickUpdate={handleClickUpdate} />
                </div>
            </td>
            <td id="descripcion-edicion-estudiante">
                <a className="waves-effect waves-teal btn-flat"><i id="iconoBlock" className={clicons}>swap_horiz </i></a>
            </td>
            {//    <td id="columna-observaciones">{observaciones/*+" "+id_asistencia+" "+asistencia*/+"Hello"}</td>
            }</tr>
    )
}

export default AlumnoEdit;