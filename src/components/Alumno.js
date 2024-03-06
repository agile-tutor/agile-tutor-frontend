import 'materialize-css/dist/css/materialize.min.css';
import '../App.css';
import PropTypes from 'prop-types';

function Alumno({ id, nombre, asistencia, clnametr, disablevalue, handleChange }) {



  const handleChangeAttendance = ({ target }) => {
    handleChange(target);
  }

  return (
    <tr className={clnametr} >
      <td id="columna-apellidonombre">{nombre}</td>
      <td id="columna-check">
        <label>
          {
            (asistencia === true) || (asistencia === "true") ?
              <input data-testid="attendancebutton" id={id} name={nombre} type="checkbox" className="filled-in" checked="checked" onChange={handleChangeAttendance} disabled={disablevalue} />
              :
              <input data-testid="attendancebutton" id={id} name={nombre} type="checkbox" className="filled-in" checked={false} onChange={handleChangeAttendance} disabled={disablevalue} />
          }
          <span>✔</span>
        </label>
      </td>
    </tr>
  );
}

Alumno.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  asistencia: PropTypes.bool.isRequired,
  clnametr: PropTypes.string.isRequired,
  disablevalue: PropTypes.bool.isRequired,
};

export default Alumno;