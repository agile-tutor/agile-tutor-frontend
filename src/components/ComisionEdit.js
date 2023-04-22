import { useContext/*, useEffect, useState */ } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
//import Alumno from './Alumno.js';
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
import Breadcrumbs from '../utils/Breadcrumbs.js';
import AlumnoEdit from './AlumnoEdit.js';

function ComisionEdit() {

    const { checked } = useContext(Context)

    console.log(checked[0])

    return (
        <div>
            <div> {checked.length === 0 ? <Preloader /> :
                <div className="Comision">
                    <Breadcrumbs posicion1={"Editar Comisión"} posicion2={"Comisión 1"} posicion0={"Home"} route0={"/"} route1={"/editCourse"} />
                    <h4 className="titulo-tabla" >Editar Comisión</h4>
                    <table id="editComisionTable" className="Comision-table strip">
                        <thead>
                            <tr>
                                <th /*id="descripcion-asistencias"*/>Apellido</th>
                                <th /*id="descripcion-estudiante"*/>Nombre</th>
                                <th /*id="descripcion-estudiante"*/>NroID</th>
                                <th /*id="descripcion-asistencias"*/>Email</th>
                                {//            <th /*id="descripcion-estudiante"*/>Observaciones</th> 
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {checked.map((alumno) => { return (<AlumnoEdit key={alumno.id} id={alumno.id} apellido={alumno.surname} nombre={alumno.name} identificacion={alumno.identifier} email={alumno.email} />) })}
                            {/* id, nombre, apellido, indentificacion, email, observaciones */}
                        </tbody>
                    </table>
                    <button id='boton-save-attendance' className='btn waves-effect waves-light' type="submit" name='action'/* onClick={saveAttendance}*/>
                        <i id="guardar-asistencias-boton" className='material-icons left'>save </i>  Guardar Asistencias
                    </button>
                </div>}
            </div>


        </div>
    )
}

export default ComisionEdit