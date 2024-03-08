import { useState, useEffect } from "react";
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

const NewMeetingModal = ({ handleAddMeeting }) => {

    const [day, setDay] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const handleAdd = async () => {
        if (day === '' || title === '' || date === '') {
            M.toast({ html: 'Ingresar: encuentro, tematica, y dia programado', classes: 'rounded red-app-semitr' });
        } else {
            const newMeeting = {
                "title": title,
                "day": day,
                "date": date.target.value
            }
            console.log('handle click ' + newMeeting.day + " " + newMeeting.title + " " + newMeeting.date);
            handleAddMeeting(newMeeting);
            setDay('');
            setTitle('');
            setDate('');
        }
    }
    useEffect(() => {
        let elems = document.querySelectorAll('.datepicker');
        let options = {
            format: 'dd-mm-yyyy',
            i18n: {
                months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
                weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
                weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"],
                cancel: 'Cancelar',
                clear: 'Limpar',
                done: 'Ok'
            }
        };
        M.Datepicker.init(elems, options);
    }, []);

    return (

        <div id={"modalschadd"} className="modal">
            <div className="modal-content">
                <h4 id="modal-title">Ingrese los datos del encuentro:</h4>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input defaultValue={day} onChange={(e) => setDay(e.target.value)} id="day" type="text" className="validate" />
                                <label className="active" htmlFor="day">"Encuentro nro"</label>
                            </div>
                            <div className="input-field col s6">
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input defaultValue={title} onChange={(e) => setTitle(e.target.value)} id="title" type="text" className="validate" />
                                <label className="active" htmlFor="title">Tematica</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" className="datepicker" value={date} onSelect={setDate} />
                                <label className="active" htmlFor="textarea1">Fecha programada</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
            <div className="modal-footer">
                <div>
                    <a href="#!" className="modal-close waves-effect waves btn-flat">Cancelar</a>
                    <a href="#!" onClick={() => { handleAdd(); }} className="modal-close waves-effect waves-green btn-flat">Aceptar</a>
                </div>
            </div>
        </div >);
};

NewMeetingModal.propTypes = {
    handleAddMeeting: PropTypes.func.isRequired,
  };

export default NewMeetingModal;