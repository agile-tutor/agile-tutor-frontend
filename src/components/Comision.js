import 'materialize-css/dist/css/materialize.min.css'
import Alumno from './Alumno.js';

const listado = [{nombre:"James", asistencia:false},{nombre:"Elijah", asistencia:false},{nombre:"Oliver", asistencia:false},{nombre:"Noah", asistencia:true},{nombre:"Liam", asistencia:false},{nombre:"Ava", asistencia:false},{nombre:"Amelia", asistencia:false},{nombre:"Charlotte", asistencia:false},{nombre:"Emma", asistencia:false}]
/*
const [checked, setChecked] = useState (initialstate)

const handleClickCheckBox = ({ target }) => {
    setChecked({
        ...checked,
    })
}
*/
function Comision() {
    return (
      <div className="Comision">
      <table className="Comision-table responsive-table">
        <thead>
          <tr>
              <th>Estudiante</th>
              <th>Asistencia</th>
          </tr>
        </thead>

        <tbody>
          {listado.map((alumno) => {return (<Alumno nombre={alumno.nombre} asistencia={alumno.asistencia} setearAsistencia={()=>{} }/>)} )}
        </tbody>
      </table>
      </div>
    );
  }
  
  export default Comision;