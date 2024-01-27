import { useContext, useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
//import Breadcrumbs from '../utils/Breadcrumbs.js';
import EncuentroEdit from './EncuentroEdit.js';
//import M from 'materialize-css/dist/js/materialize.min.js';
import NewMeetingModal from './NewMeetingModal.js';
import "../App.css"

function Encuentros() {

    const { encuentros, updateMeeting, getAllMeetings, addNewMeeting, meetingToCreate, deleteMeeting } = useContext(Context);
    const [change, setChange] = useState(false);
    const [chargin, setChargin] = useState(false);

    const handleEditUpdateMeeting = async (id, meeting) => {
        console.log(id)
        console.log(meeting)
        updateMeeting(id, meeting)
        console.log("vuelta"+meeting)
        setChargin(true)
        await delay(1000);
        setChargin(false)
        setChange(!change)
    }

    const handleAddMeeting = async (newMeeting) => {
        /*console.log('handle click' + newMeeting);*/
        addNewMeeting(newMeeting);
        setChargin(true)
        await delay(1000);
        setChargin(false)
        setChange(!change)
    }

    const handleDeleteMeeting = async (id) => {
        /*console.log('handle click' + newMeeting);*/
        deleteMeeting(id);
        setChargin(true)
        await delay(1000);
        setChargin(false)
        setChange(!change)
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    useEffect(() => {
        getAllMeetings();
    }, [meetingToCreate]);
/*
    useEffect(() => {
        M.AutoInit();
    });
*/
    return (
        <div>
            <h4 className="titulo-tabla" >Encuentros Programados del TVU</h4>
            <div> {(typeof encuentros === "undefined"/* || encuentros.length === 0*/) ?
                <Preloader /> :
                <div className="Comision">
                    {chargin ?
                        <div id='chargin-mode' className="progress">
                            <div className="indeterminate"></div>
                        </div> :
                        <div id='chargin-mode'>
                        </div>
                    }
                    <table id="editComisionTable" className="Comision-table strip">
                        <thead>
                            <tr className='fila-comision-parametros-tabla'>
                                <th id="descripcion-edicion-estudiante">Dia</th>
                                <th id="descripcion-edicion-estudiante">Tematica</th>
                                <th id="descripcion-edicion-estudiante">Fecha estipulada</th>
                                <th id="descripcion-edicion-estudiante">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            { /*
                                encuentrosa,=> {
          === b.surname) {
                                        return a.name < b.name ? -1 : 1
                                    } else {
                                        return a.surname < b.surname ? -1 : 1
                                     }
                                }).map((alumno) => { return (<AlumnoEdit key={alumno.id} courseId={alumno.courseId} id={alumno.id} apellido={alumno.surname} nombre={alumno.name} identificacion={alumno.identifier} email={alumno.email} blocked={alumno.blocked} observaciones={alumno.observations} clnametr={!alumno.blocked ? 'Fila-alumno' : 'Fila-alumno-block'} clicons={!alumno.blocked ? 'material-icons left' : 'material-icons left redicons'} handleEditBlockStudent={handleEditBlockStudent} handleEditUpdateMeeting={handleEditUpdateMeeting} handleEditChangeStudentCourse={handleEditChangeStudentCourse} />) })
                            */  }

                            {
                                (encuentros == undefined) ? <Preloader /> :
                                    (encuentros.length !== 0) ?
                                        encuentros.map((encuentro) => { return (<EncuentroEdit key={encuentro.id} id={encuentro.id} dayUpstream={encuentro.day} titleUpstream={encuentro.title} schedulerdayUpstream={encuentro.date} handleClickUpdateUpstream={handleEditUpdateMeeting} handleClickDeleteUpstream={handleDeleteMeeting} />) }) :
                                        <tr></tr>
                            }
                        </tbody>
                    </table>{
                        (encuentros.length === 0) ?
                            <h2>"No existen encuentros programados"</h2> :
                            <div></div>
                    }
                </div>}
            </div>
            <div className='container section'>
                <a id="floating-btn" className="btn-floating btn-large waves-effect modal-trigger right" href={"#modalschadd"} ><i className="material-icons">add</i></a>
                <NewMeetingModal handleAddMeeting={handleAddMeeting} />
            </div>
        </div>
    )
}

export default Encuentros