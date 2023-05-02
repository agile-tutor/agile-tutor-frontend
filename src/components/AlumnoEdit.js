import React from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import '../App.css';

function AlumnoEdit({ nombre, apellido, identificacion, email, id, blocked, clnametr, clicons, handleEditStudent }) {


    const handleClickEdit = (id, value) => {
        handleEditStudent(id, value)
    };

    return (

        <tr className={clnametr} >
            <td id="columna-apellido">{apellido}</td>
            <td id="columna-nombre">{nombre}</td>
            <td id="columna-identificacion">{identificacion}</td>
            <td id="columna-email">{email}</td>
            <td id="columna-bloquear">
                {!blocked ?
                    <button idstudent={id} blockstatus={blocked} className="waves-effect waves-teal btn-flat" onClick={() => handleClickEdit(id, blocked)} ><i className='material-icons left'>lock_open</i></button>
                    : <button idstudent={id} blockstatus={blocked} className="waves-effect waves-teal btn-flat" onClick={() => handleClickEdit(id, blocked)} ><i className='material-icons left greyicons'>lock_outline</i></button>
                }
            </td>
            <td id="columna-editar">
                <a class="waves-effect waves-teal btn-flat"><i id="iconoBlock" className={clicons}>mode_edit </i></a>
            </td>
            <td id="columna-cambiar-de-comision">
                <a class="waves-effect waves-teal btn-flat"><i id="iconoBlock" className={clicons}>swap_horiz </i></a>
            </td>
            {//    <td id="columna-observaciones">{observaciones/*+" "+id_asistencia+" "+asistencia*/+"Hello"}</td>
            }</tr>
    )
}

export default AlumnoEdit