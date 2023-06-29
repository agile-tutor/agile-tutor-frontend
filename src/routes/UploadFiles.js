import React from 'react';
import { useState, useEffect, useContext } from "react";
import { Context } from '../context/Context.js';
//import { Link } from "react-router-dom";
import Papa from 'papaparse';
import M from 'materialize-css/dist/js/materialize.min.js';

function UploadFiles() {

    const { tutors, getAllTutors, postNewStudents, createACourse, courseToCreate } = useContext(Context);
    const [parsedData, setParsedData] = useState([]);
    const [courseId, setCourseId] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [nameCourse, setNameCourse] = useState('');
    const [anyChange, setAnyChange] = useState(false)

    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: false,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results.data)
                setParsedData(results.data)
                setCourseId(results.data[0][3].split("-")[3])
                setNameCourse(results.data[0][3])
            },
        });
    };

    const saveCourse = async () => {
        let newCourse = {
            "id": parseInt(courseId),
            "name": nameCourse,
            "tutorId": parseInt(selectedOption)
        }
        createACourse(newCourse)
        setAnyChange(!anyChange);
        console.log(anyChange+"anychange")
        //        setAnyChange(true);
    };

    const postStudents = async () => {

        console.log(nameCourse);

        let newStudents = parsedData.map((value, index) => {
            console.log(value, index)
            console.log("courseToCreateId" + courseToCreate.id)
            return (
                {
                    "id": parseInt(index),
                    "name": value[1],
                    "surname": value[0],
                    "identifier": value[2],
                    "email": value[4],
                    "courseId": parseInt(courseToCreate.id)
                }
            )
        })
        postNewStudents(newStudents)
        //        setAnyChange(false)
    };

    useEffect(() => {
        let elems = document.querySelectorAll('.select');
        M.FormSelect.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);

    useEffect(() => {
        var elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {});
    }, []);

    useEffect(() => {
        getAllTutors();
    }, []);


    useEffect(() => {
        postStudents();
    }, [anyChange]);



    const handleTypeSelect = e => {
        e.preventDefault();
        console.log("dentroDeHanle" + e.target.value);
        setSelectedOption(e.target.value);
    };

    return (
        <div>
            <div className='titulo-tabla survey'> Cargar comisión a partir de un archivo </div>
            <form action="#" className="col s12">
                {!parsedData.length ?
                    <div className="row">
                        <div className="input-field col s12">
                            <div className="file-field input-field upload-csv">
                                <div className="btn uploadfiles">
                                    <span>Seleccionar Archivo</span>
                                    <input type="file" multiple accept=".csv" onChange={changeHandler} />
                                </div>
                                <div id='upload-file-input' className="file-path-wrapper">
                                    <input className="file-path validate" type="text" placeholder=" Seleccione el archivo a cargar" />
                                </div>
                                <h6>El archivo .csv debe contener "5 columnas" "sin encabezado". Las columnas deben seguir el siguiente orden: Apellido, Nombres, Identificacion, Comision, Email</h6>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="row">
                            <div className="input-field center col s10">
                                {tutors.length ?
                                    < div className="file-field input-field" id='tutor-file-field'>
                                        <select className="browser-default" value="" onChange={handleTypeSelect}>
                                            <option value="" disabled selected>Asigne un tutor a la comisión</option>
                                            {tutors.map((tutor) => {
                                                return <option value={tutor.id}>{tutor.id + " " + tutor.surname + " " + tutor.name}</option>
                                            })}
                                        </select>
                                        {console.log(selectedOption)/*
                            <div>
                                < label className="label-tutor-id"> tutor-id: {selectedOption} </label >
                            </div>
                        */}
                                    </div >
                                    :
                                    <h6 className='center'>"Ha ocurrido un error al cargar los tutores, vuelva a Loguearse"</h6>}
                            </div >
                        </div>
                        <div className="row">
                            <div className="input-field col s5">
                                <input
                                    type="text"
                                    placeholder="comision"
                                    id='tutor-file-field'
                                    value={courseId}
                                />
                                <label id='tutor-file-field' className="active" htmlFor="tutor-file-field">Comision</label>
                            </div >
                            <div className="input-field col s5">
                                <input
                                    type="text"
                                    placeholder="tutor"
                                    id='tutor-file-field'
                                    value={selectedOption}
                                />
                                <label id='tutor-file-field' className="active" htmlFor="tutor-file-field">Tutor-ID</label>
                            </div>
                        </div>
                    </div>
                }
            </form >
            {
                parsedData.length ?
                    <div>
                        <h6 className='titulo-tabla-alumnos-upload center'>Listado de alumnos a asignar a la comisión: {courseId} y al tutor: {selectedOption}</h6>
                        <table className='studentToUpload'>
                            <tr className='fila-comision-parametros-tabla'>
                                <td>
                                    Apellido
                                </td>
                                <td>
                                    Nombres
                                </td>
                                <td>
                                    Identificacion
                                </td>
                                <td>
                                    Comision
                                </td>
                                <td>
                                    Email
                                </td>
                            </tr>
                            {parsedData.map((value, index) => {
                                console.log(value)
                                return (
                                    <tr key={index}>
                                        <td>
                                            {value[0]}
                                        </td>
                                        <td>
                                            {value[1]}
                                        </td>
                                        <td>
                                            {value[2]}
                                        </td>
                                        <td>
                                            {courseId}
                                        </td>
                                        <td>
                                            {value[4]}
                                        </td>
                                    </tr>)
                            })}
                        </table>
                    </div>
                    : <h6 className='upload-csv-info center'>"Cargar un archivo .csv para visualizar la información"</h6>
            }
            {
                selectedOption != '' && courseId != 0 ?
                    <div class="fixed-action-btn">
                        <a class="btn-floating btn-large red-app" id="hover-btn" title="asignar comsión" onClick={() => saveCourse()}>
                            <i class="large material-icons">save</i>
                        </a>
                    </div>
                    : <div></div>
            }
        </div >

    )
}

export default UploadFiles