import { useEffect } from 'react'
//import Breadcrumbs from '../utils/Breadcrumbs.js';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';

function PassAttendance() {

    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);

    return (
        <div className="passAttendanceTable">
            {/*    <Breadcrumbs />*/}
            <h4 className="titulo-tabla" >  <i className="material-icons">pan_tool</i>Pasar Asistencia</h4>
            <ul id="dropdown1" className="dropdown-content">
                <li><Link to="/comision">Comisión 1</Link></li>
                <li><Link to="/comision">Comisión 2</Link></li>
                {//             <li className="divider"></li>
                }          <li><Link to="/comision">Comisión 3</Link></li>
            </ul>
            <ul className="xxxxxxx" >
                <li><Link className="dropdown-trigger" href="#!" data-target="dropdown1">Seleccionar Comision<i className="material-icons right">arrow_drop_down</i></Link></li>
            </ul>
        </div>
    )
}

export default PassAttendance