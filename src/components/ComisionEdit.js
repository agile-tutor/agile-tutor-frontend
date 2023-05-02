import { useContext, useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
import Breadcrumbs from '../utils/Breadcrumbs.js';
import AlumnoEdit from './AlumnoEdit.js';

function ComisionEdit() {

    const { checked, number, blockUnblockStudent, getCourse } = useContext(Context)

    const [change, setChange] = useState(false)

    const handleEditStudent = async (id, status) => {
        console.log(id)
        console.log(status)
        blockUnblockStudent(id, !status)
        await delay(1000);
        setChange(!change)
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    useEffect(() => {
        getCourse(number)
    }, [change])

    return (
        <div>
            <div> {checked.length === 0 ? <Preloader /> :
                <div className="Comision">
                    <Breadcrumbs posicion1={"Editar Comisión"} posicion2={"Comisión " + number} posicion0={"Home"} route0={"/"} route1={"/editCourse"} />
                    <h4 className="titulo-tabla" >Editar Comisión</h4>
                    <table id="editComisionTable" className="Comision-table strip">
                        <thead>
                            <tr>
                                <th /*id="descripcion-estudiante"*/>Apellido</th>
                                <th /*id="descripcion-estudiante"*/>Nombre</th>
                                <th /*id="descripcion-estudiante"*/>NroID</th>
                                <th /*id="descripcion-estudiante"*/>Email</th>
                                <th /*id="descripcion-estudiante"*/>bloquear</th>
                                <th /*id="descripcion-estudiante"*/>editar</th>
                                <th /*id="descripcion-estudiante"*/>cambiar de comisión</th>
                                {//            <th /*id="descripcion-estudiante"*/>Observaciones</th> 
                                }
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
                                }).map((alumno) => { return (<AlumnoEdit key={alumno.id} id={alumno.id} apellido={alumno.surname} nombre={alumno.name} identificacion={alumno.identifier} email={alumno.email} blocked={alumno.blocked} clnametr={!alumno.blocked ? 'Fila-alumno' : 'Fila-alumno-block'} clicons={!alumno.blocked ? 'material-icons left' : 'material-icons left greyicons'} handleEditStudent={handleEditStudent} />) })

                            }
                            {/* id, nombre, apellido, indentificacion, email, observaciones */}
                        </tbody>
                    </table>
                    <a id='add-student-btn' className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></a>
                </div>}
            </div>


        </div>
    )
}

export default ComisionEdit