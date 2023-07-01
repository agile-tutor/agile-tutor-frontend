import { useState } from "react";
import M from 'materialize-css/dist/js/materialize.min.js';

const NewStudentModal = ({ courseId, handleAddStudentToACourse }) => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [emailedit, setEmailedit] = useState('');
    const [observations, setObservations] = useState('');

    const handleAddStudent = async () => {
        if (name === '' || surname === '' || identifier === '' || emailedit === '') {
            M.toast({ html: 'Ingresar: nombre, apellido, identificador y email', classes: 'rounded red-app-semitr' });
        } else {
            const newStudent = {
                "name": name,
                "surname": surname,
                "identifier": identifier,
                "email": emailedit,
                "observations": observations,
                "courseId": courseId
            }
            /*console.log('handle click' + newStudent);*/
            handleAddStudentToACourse(newStudent);
            M.toast({ html: `${name} ${surname} agregado exitosamente.`, classes: 'rounded blue-app-semitr' });
        }
    }

    return (

        <div id={"modaladd"} className="modal">
            <div className="modal-content">
                <h4 id="modal-title">Ingrese los datos del estudiante:</h4>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input defaultValue={surname} onChange={(e) => setSurname(e.target.value)} id="last_name" type="text" className="validate" />
                                <label className="active" htmlFor="last_name">Apellido</label>
                            </div>
                            <div className="input-field col s6">
                                <input defaultValue={name} onChange={(e) => setName(e.target.value)} id="first_name" type="text" className="validate" />
                                <label className="active" htmlFor="first_name">Nombre</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input defaultValue={emailedit} onChange={(e) => setEmailedit(e.target.value)} id="email" type="email" className="validate" />
                                <label className="active" htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s4">
                                <input defaultValue={identifier} onChange={(e) => setIdentifier(e.target.value)} id="identifier" type="text" />
                                <label className="active" htmlFor="itentifier">Identificación</label>
                            </div>
                            <div>
                                <div className="input-field col s2">
                                    <input disabled value={courseId} id="courseid" type="text" className="validate" />
                                    <label className="active" htmlFor="itentifier">Comisión</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea defaultValue={observations} onChange={(e) => setObservations(e.target.value)} id="textarea1" className="materialize-textarea"></textarea>
                                <label className="active" htmlFor="textarea1">Observaciones</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
            <div className="modal-footer">
                <div>
                    <a href="#!" className="modal-close waves-effect waves btn-flat">Cancelar</a>
                    <a href="#!" onClick={() => { handleAddStudent(); }} className="modal-close waves-effect waves-green btn-flat">Aceptar</a>
                </div>
            </div>
        </div >);
};

export default NewStudentModal;