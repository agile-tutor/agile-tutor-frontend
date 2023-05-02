import { useContext, useEffect } from 'react';
import { Context } from '../context/Context.js';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';

function SelectComision() {

    const { getCourse } = useContext(Context)

    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);

    return (
        <div className="passAttendanceTable">
            <h4 className="titulo-tabla" >  <i className="material-icons">mode_edit</i>Editar Comisión</h4>
            <ul id="dropdown1" className="dropdown-content">
                <li><Link to="/comisionEdit" onClick={() => getCourse(1)}>Comisión 1</Link></li>
                <li><Link to="/comisionEdit" onClick={() => getCourse(2)}>Comisión 2</Link></li>
                {//             <li className="divider"></li>
                }          <li><Link to="/comisionEdit" onClick={() => getCourse(3)}>Comisión 3</Link></li>
            </ul>
            <ul className="xxxxxxx" >
                <li><Link className="dropdown-trigger" href="#!" data-target="dropdown1">Seleccionar Comision<i className="material-icons right">arrow_drop_down</i></Link></li>
            </ul>
        </div>
    )
}

export default SelectComision