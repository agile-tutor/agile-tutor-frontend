import { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import '../App.css';
//import AlumnoModal from './AlumnoModal';
import M from 'materialize-css/dist/js/materialize.min.js';

function AlumnoEdit({ nombre, apellido, identificacion, email, observaciones, id, blocked, clnametr, clicons, handleEditStudent }) {


    const handleClickBlock = (id, value) => {
        handleEditStudent(id, value)
    };
    /*
        const handleClickEdit = (id, value) => {
            console.log(id, value)
            //return <AlumnoModal />
            //    handleEditStudent(id, value)
        };
    */
    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, []);
    /*
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    });
*/
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
                    <a className="waves-effect waves-teal btn-flat modal-trigger" href="#modaledit"><i id="iconoBlock" className={clicons}
                    //onClick={() => handleClickEdit(id, blocked)}
                    >mode_edit </i></a>

                    <div id="modaledit" className="modal">
                        <div className="modal-content">
                            <h4>Modifique los datos actuales</h4>
                            <div className="row">
                                <form className="col s12">
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input defaultValue={apellido} id="last_name" type="text" className="validate" />
                                            <label className="active" for="last_name">Apellido</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input defaultValue={nombre} id="first_name" type="text" className="validate" />
                                            <label className="active" for="first_name">Nombre</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input defaultValue={email} id="email" type="email" className="validate" />
                                            <label className="active" for="email">Email</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input defaultValue={identificacion} id="first_name" type="number" /*className="validate"*/ />
                                            <label className="active" for="itentifier">identificacion</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea defaultValue={observaciones} id="textarea1" className="materialize-textarea"></textarea>
                                            <label className="active" for="textarea1">Observaciones</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Aceptar</a>
                        </div>
                    </div>
                </div>
            </td>
            <td id="descripcion-edicion-estudiante">
                <a className="waves-effect waves-teal btn-flat"><i id="iconoBlock" className={clicons}>swap_horiz </i></a>
            </td>
            {//    <td id="columna-observaciones">{observaciones/*+" "+id_asistencia+" "+asistencia*/+"Hello"}</td>
            }</tr>
    )
}

export default AlumnoEdit