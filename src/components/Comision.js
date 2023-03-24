import {useState} from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import Alumno from './Alumno.js';

const listado = [{nombre:"James Rodriguez", asistencia:false},{nombre:"Elijah", asistencia:false},{nombre:"Oliver", asistencia:false},{nombre:"Noah", asistencia:true},{nombre:"Liam", asistencia:false},{nombre:"Ava", asistencia:false},{nombre:"Amelia", asistencia:false},{nombre:"Charlotte", asistencia:false},{nombre:"Emma", asistencia:false}]

function Comision() {

    const [checked, setChecked] = useState (listado)

    const handleClickCheckBox = ({ target }) => {
        const index = listado.findIndex(alumno => alumno.nombre === target.name);       
        const newChecked = [...checked] 
        newChecked[index] = {nombre:target.name, asistencia:target.checked}
        setChecked(newChecked)
    }

    const saveAttendance = () => {

    } 
/*
    useEffect(() => {

    })
*/
    return (
      <div className="Comision">
      <table className="Comision-table striped">
        <thead>
          <tr>
              <th>Estudiante</th>
              <th>Asistencia</th>
          </tr>
        </thead>

        <tbody>
          {checked.map((alumno) => {return (<Alumno key={alumno.nombre } nombre={alumno.nombre} asistencia={alumno.asistencia} setearAsistencia={handleClickCheckBox}/>)} )}
        </tbody>
      </table>
      <button className='btn waves-effect waves-light' type="submit" name='action'>Guardar Asistencias
        <i className='material-icons right'>send</i> 
      </button>
      </div>
    );
  }
  
  export default Comision;