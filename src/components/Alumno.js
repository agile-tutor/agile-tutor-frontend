import 'materialize-css/dist/css/materialize.min.css';
import '../App.css';

function Alumno({nombre, asistencia, setearAsistencia}) {
    return (
          <tr className='Fila-alumno' >
            <td>{nombre}</td>
            <td>      
              <label>
              {console.log(nombre, asistencia)}
                { asistencia ? 
                  <input name={nombre} type="checkbox" className="filled-in" checked="checked" onChange={setearAsistencia} />
                  : 
                  <input name={nombre} type="checkbox" className="filled-in" onChange={setearAsistencia} />}
                <span>✔</span>
              </label>
            </td>
          </tr>
    );
  }
  
  export default Alumno;