import { useEffect, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import '../App.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import EncuentroModal from "./EncuentroModal";

function EncuentroEdit({ id, dayUpstream, schedulerdayUpstream, titleUpstream, handleClickUpdateUpstream, handleClickDeleteUpstream }) {

    const [day, setDay] = useState(dayUpstream);
    const [title, setTitle] = useState(titleUpstream);
    const [schedulerday, setSchedulerday] = useState(schedulerdayUpstream);

    const handleClickUpdate = () => {
        if (day === '' || title === '' || schedulerday === '') {
            M.toast({ html: 'Ingresar: nro de encuentro, dia programado, y tematica', classes: 'rounded red-app-semitr' });
        } else {
            const editedEncuentro = {
                "day": day,
                "title": title,
                "date": schedulerday,
            }
            console.log('handle click' + editedEncuentro.day + editedEncuentro.title + editedEncuentro.schedulerday);
            handleClickUpdateUpstream(id, editedEncuentro);
        }
    };

    const handleClickDelete = () => {
        console.log('handle click' + id);
        handleClickDeleteUpstream(id);
    };

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, []);

    return (
        <tr /*className={clnametr}*/ >
            <td id="descripcion-edicion-estudiante">{day}</td>
            <td id="descripcion-edicion-estudiante">{title}</td>
            <td id="descripcion-edicion-estudiante">{schedulerday}</td>
            <td id="descripcion-edicion-estudiante-editar">
                <div className='container section'>
                    <a href={"#modalschedit" + id} className="waves-effect waves-teal btn-flat modal-trigger center"><i className="material-icons">edit</i></a>
                    <EncuentroModal key={id} id={id} day={day} schedulerday={schedulerday} title={title} setDay={setDay} setTitle={setTitle} setSchedulerday={setSchedulerday} handleClickUpdate={handleClickUpdate} />
                </div>
                <div>
                    <button meetingid={id} className="waves-effect waves-teal btn-flat center" onClick={() => handleClickDelete()} ><i className='material-icons left'>close</i></button>
                </div>
            </td>
        </tr>
    )
}

export default EncuentroEdit;