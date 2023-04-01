import Logo from '../TIPLOGO.png';
import "../App.css";
import { useEffect } from 'react';
import { Link/*, useHistory*/ } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';


function NavBar() {

    useEffect(() => {
        var sidenav = document.querySelectorAll(".sidenav");
        M.Sidenav.init(sidenav, {});
    }, []);

    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo" ><img className="image-logo" src={Logo}></img></a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down" >
                        <li ><Link id='nav-var-web' to="/">Pasar Asistencia</Link></li>
                        <li ><Link id='nav-var-web' to="/attendancePercent">Configuración Asistencias</Link></li>
                        <li ><Link id='nav-var-web' to="/">Pasar Asistencia</Link></li>
                        <li ><Link id='nav-var-web' to="/attendancePercent">Configuración Asistencias</Link></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li ><Link id='nav-var-mob' to="/">Pasar Asistencia</Link></li>
                <li ><Link id='nav-var-mob' to="/attendancePercent">Configuración Asistencias</Link></li>
                <li ><Link id='nav-var-mob' to="/">Pasar Asistencia</Link></li>
                <li ><Link id='nav-var-mob' to="/attendancePercent">Configuración Asistencias</Link></li>
            </ul>
        </div>
    )
}

export default NavBar