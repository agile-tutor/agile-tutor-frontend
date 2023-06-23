import React from 'react';
import { useState } from "react";
import Papa from 'papaparse';


function UploadFiles() {

    const [parsedData, setParsedData] = useState([]);


    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: false,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results.data)
                setParsedData(results.data)
            },
        });
    };


    return (
        <div>
            <div className='titulo-tabla survey'> Cargar Alumnos a Comsión </div>
            <form action="#">
                <div className="file-field input-field">
                    <div className="btn uploadfiles">
                        <span>Seleccionar Archivo</span>
                        <input type="file" multiple accept=".csv" onChange={changeHandler} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload one or more files" />
                    </div>
                    <h6>El archivo .csv debe contener "6 columnas" "sin encabezado". Las columnas deben seguir el siguiente orden: Apellido, Nombres, Identificacion, Comision, Email</h6>
                </div>
            </form>
            <div>
                {parsedData.map((value, index) => {
                    console.log(value)
                    return (
                        <div key={index}>{value[0]+" - "+value[1]+" - "+value[2]+" - "+value[3]+" - "+value[4]}</div>
                    )
                }
                )}
            </div >
        </div >

    )
}

export default UploadFiles