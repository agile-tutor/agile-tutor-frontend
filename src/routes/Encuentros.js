import { useContext, useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import { Context } from '../context/Context.js';
import Preloader from '../utils/Preloader.js';
import EncuentroEdit from '../components/EncuentroEdit.js';
import NewMeetingModal from '../components/NewMeetingModal.js';
import "../App.css"

function Encuentros() {

    const { encuentros, updateMeeting, getAllMeetings, addNewMeeting, meetingToCreate, deleteMeeting } = useContext(Context);
    const [change, setChange] = useState(false);
    const [chargin, setChargin] = useState(false);

    const handleEditUpdateMeeting = async (id, meeting) => {
        console.log(id)
        console.log(meeting)
        updateMeeting(id, meeting)
        console.log("vuelta" + meeting)
        setChargin(true)
        await delay(1000);
        setChargin(false)
        setChange(!change)
    }

    const handleAddMeeting = async (newMeeting) => {
        addNewMeeting(newMeeting);
        setChargin(true)
        await delay(1000);
        setChargin(false)
        setChange(!change)
    }

    const handleDeleteMeeting = async (id) => {
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

    return (
        <div>
            <h4 className="titulo-tabla" >Encuentros Programados del TVU</h4>
            <div> {(typeof encuentros === "undefined" || encuentros == undefined) ?
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
                            {
                                (encuentros.length !== 0) ?
                                    encuentros.map((encuentro) => <EncuentroEdit key={encuentro.id} id={encuentro.id} dayUpstream={encuentro.day} titleUpstream={encuentro.title} schedulerdayUpstream={encuentro.date} handleClickUpdateUpstream={handleEditUpdateMeeting} handleClickDeleteUpstream={handleDeleteMeeting} />
                                    ) :
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