import { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../App.css';
import PropTypes from 'prop-types';

function EncuentroModal({ id, day, schedulerday, title, setDay, setTitle, setSchedulerday, handleClickUpdate, handleAddScheduler }) {

  const [sdate, setSDate] = useState(schedulerday);

  useEffect(() => {
    let elems = document.querySelectorAll('.datepicker');
    let options = {
      format: 'dd-mm-yyyy',
      //      defaultDate: toDate(schedulerday),
      //      setDefaultDate: true,
      i18n: {
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
        weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"],
        cancel: 'Cancelar',
        done: 'Ok'
      }
    };
    M.Datepicker.init(elems, options);
  }, []);

  const handleChange = (date) => {
    console.log('this.state.date' + date.val);
    console.log(date.target.value);
    if (date.target.value == 'undefined') {
      M.toast({ html: 'Ingresar: dia programado', classes: 'rounded red-app-semitr' });
    } else {
      setSDate(date.target.value);
    }
  };

  const handleClickUpdateW = () => {
    setSchedulerday(sdate);
    console.log("sdate" + sdate + "schdate" + schedulerday)
    handleClickUpdate();
  }
  /*
    const toDate = (dateStr) => {
      let parts = dateStr.split("-")
      return new Date(parts[2], parts[1] - 1, parts[0])
  }
  */
  return (
    <div id={"modalschedit" + id} className="modal">
      <div className="modal-content">
        {handleClickUpdate == null && handleAddScheduler == null ?
          <h4 id="modal-title">Datos del encuentro:</h4>
          :
          handleAddScheduler == null ?
            <h4 id="modal-title">Edite los datos del encuentro:</h4>
            :
            <h4 id="modal-title">Ingrese los datos del encuentro:</h4>
        }
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                {handleClickUpdate == null && handleAddScheduler == null ?
                  <input disabled value={day} id="day" type="text" className="validate" />
                  :
                  <input defaultValue={day} onChange={(e) => setDay(e.target.value)} id="day" type="text" className="validate" />
                }
                <label className="active" htmlFor="day">Dia</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                {handleClickUpdate == null && handleAddScheduler == null ?
                  <input disabled value={title} id="title" type="text" className="validate" />
                  :
                  <input defaultValue={title} onChange={(e) => setTitle(e.target.value)} id="title" type="text" className="validate" />
                }
                <label className="active" htmlFor="title">Tematica</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                {handleClickUpdate == null && handleAddScheduler == null ?
                  <input disabled value={schedulerday} id="schedulerday" type="text" className="validate" />
                  :
                  <input type="text" className="datepicker" select={sdate} onSelect={handleChange} />
                }
                <label className="active" htmlFor="schedulerday">Fecha estipulada</label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        {handleClickUpdate == null && handleAddScheduler == null ?
          <a href="#!" className="modal-close waves-effect waves btn-flat">Cerrar</a>
          :
          handleAddScheduler == null ?
            <div>
              <a href="#!" className="modal-close waves-effect waves btn-flat">Cancelar</a>
              <a href="#!" onClick={() => { handleClickUpdateW(); }} className="modal-close waves-effect waves-green btn-flat">Aceptar</a>
            </div>
            :
            <div>
              <a href="#!" className="modal-close waves-effect waves btn-flat">Cancelar</a>
              <a href="#!" onClick={() => { handleAddScheduler(); }} className="modal-close waves-effect waves-green btn-flat">Aceptar</a>
            </div>
        }
      </div>
    </div>);
}

EncuentroModal.propTypes = {
  id: PropTypes.number.isRequired,
  day: PropTypes.string.isRequired,
  schedulerday: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setDay: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setSchedulerday: PropTypes.func.isRequired,
  handleClickUpdate: PropTypes.func.isRequired,
  handleAddScheduler: PropTypes.func.isRequired,
};

export default EncuentroModal;