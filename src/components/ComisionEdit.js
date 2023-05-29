import { useContext, useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
import Breadcrumbs from '../utils/Breadcrumbs.js';
import AlumnoEdit from './AlumnoEdit.js';
import M from 'materialize-css/dist/js/materialize.min.js';

function ComisionEdit() {

    const { checked, number, blockUnblockStudent, updateStudent, getCourse } = useContext(Context)
    const [change, setChange] = useState(false)
    const [chargin, setChargin] = useState(false)

    const handleEditBlockStudent = async (id, status) => {
        console.log(id)
        console.log(status)
        blockUnblockStudent(id, !status)
        setChargin(true)
        await delay(1000);
        setChargin(false)
        setChange(!change)
    }

    const handleEditUpdateStudent = async (id, student) => {
        console.log(id)
        console.log(student)
        updateStudent(id, student)
        setChargin(true)
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

    return (
        <div>
            <div> {checked.length === 0 ? <Preloader /> :
                <div className="Comision">
                    <Breadcrumbs posicion1={"Editar Comisión"} posicion2={"Comisión " + number} posicion0={"Home"} />
                    <h4 className="titulo-tabla" >Editar Comisión</h4>
                    <h5 id='titulo-encuentro'>-</h5>
                    {chargin ?
                        <div id='chargin-mode' className="progress">
                            <div className="indeterminate"></div>
                        </div> :
                        <div id='chargin-mode'>
                        </div>
                    }
                    <table id="editComisionTable" className="Comision-table strip">
                        <thead>
                            <tr>
                                <th id="descripcion-edicion-estudiante">Apellido</th>
                                <th id="descripcion-edicion-estudiante">Nombre</th>
                                <th id="descripcion-edicion-estudiante">bloquear</th>
                                <th id="descripcion-edicion-estudiante">editar</th>
                                <th id="descripcion-edicion-estudiante">cambiar comisión</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                checked.sort((a, b) => {
                                    if (a.surname === b.surname) {
                                        return a.name < b.name ? -1 : 1
                                    } else {
                                        return a.surname < b.surname ? -1 : 1
                                    }
                                }).map((alumno) => { return (<AlumnoEdit key={alumno.id} icourseId={alumno.courseId} id={alumno.id} apellido={alumno.surname} nombre={alumno.name} identificacion={alumno.identifier} email={alumno.email} blocked={alumno.blocked} observaciones={alumno.observations} clnametr={!alumno.blocked ? 'Fila-alumno' : 'Fila-alumno-block'} clicons={!alumno.blocked ? 'material-icons left' : 'material-icons left greyicons'} handleEditBlockStudent={handleEditBlockStudent} handleEditUpdateStudent={handleEditUpdateStudent} />) })

                            }
                            {/* id, nombre, apellido, indentificacion, email, observaciones */}
                        </tbody>
                    </table>
                    <a id='floating-btn' className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></a>
                </div>}
            </div>


        </div>
    )
}

export default ComisionEdit