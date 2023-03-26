import { useContext } from 'react';
import { Context } from '../context/Context.js';
import 'materialize-css/dist/css/materialize.min.css';
import '../App.css';

function Alumno({ nombre, asistencia }) {

  const { updateAttendance } = useContext(Context)

  const handleChangeAttendance = ({ target }) => {
    updateAttendance(target);
  }

  return (
    <tr className='Fila-alumno' >
      <td>{nombre}</td>
      <td>
        <label>
          {console.log(nombre, asistencia)}
          {asistencia ?
            <input name={nombre} type="checkbox" className="filled-in" checked="checked" onChange={handleChangeAttendance} />
            :
            <input name={nombre} type="checkbox" className="filled-in" onChange={handleChangeAttendance} />}
          <span>✔</span>
        </label>
      </td>
    </tr>
  );
}

export default Alumno;