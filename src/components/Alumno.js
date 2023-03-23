import 'materialize-css/dist/css/materialize.min.css'


function Alumno({nombre, asistencia, setearAsistencia}) {
    return (
      <div className="Alumno">
          <tr>
            <td>{nombre}</td>
            <td>      
              <label>
              {console.log(nombre, asistencia)}
                { asistencia ? 
                  <input type="checkbox" class="filled-in" checked="checked" disabled = "disabled" />
                  : 
                  <input type="checkbox" class="filled-in" />}
                <span>✔</span>
              </label>
            </td>
          </tr>
      </div>
    );
  }
  
  export default Alumno;