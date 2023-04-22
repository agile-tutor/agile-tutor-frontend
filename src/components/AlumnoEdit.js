import React from 'react'
//import { useContext } from 'react';
//import { Context } from '../context/Context.js';
import 'materialize-css/dist/css/materialize.min.css';
import '../App.css';

function AlumnoEdit({ nombre, apellido, identificacion, email }) {
    return (
        <tr className='Fila-alumno' >
            <td id="columna-apellido">{apellido/*+" "+id_asistencia+" "+asistencia*/}</td>
            <td id="columna-nombre">{nombre/*+" "+id_asistencia+" "+asistencia*/}</td>
            <td id="columna-identificacion">{identificacion/*+" "+id_asistencia+" "+asistencia*/}</td>
            <td id="columna-email">{email/*+" "+id_asistencia+" "+asistencia*/}</td>
            {//    <td id="columna-observaciones">{observaciones/*+" "+id_asistencia+" "+asistencia*/+"Hello"}</td>
            }</tr>
    )
}

export default AlumnoEdit