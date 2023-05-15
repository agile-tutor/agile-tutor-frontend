import { useContext, useEffect } from 'react';
import { Context } from '../context/Context.js';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';

function SelectComision({ action }) {

    const { getCourse } = useContext(Context)

    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);

    return (
        /*    <div className="passAttendanceTable">
                <h4 className="titulo-tabla" >  <i className="material-icons">pan_tool</i>Pasar Asistencia</h4>
    
                  <div>*/
        <div>
            <ul id="dropdownPassAtendance" className="dropdown-content">
                <li><Link to="/comision" onClick={() => getCourse(1)}>Comisión 1</Link></li>
                <li className="divider"></li>
                <li><Link to="/comision" onClick={() => getCourse(2)}>Comisión 2</Link></li>
                <li className="divider"></li>
                <li><Link to="/comision" onClick={() => getCourse(3)}>Comisión 3</Link></li>
            </ul>
            <ul className="xxxxxxx" >
                <li><Link className="dropdown-trigger" href="#!" data-target="dropdownPassAtendance"><i className="material-icons">pan_tool</i>{action}<i className="material-icons right">arrow_drop_down</i></Link></li>
            </ul>
        </div>
    )
}

export default SelectComision