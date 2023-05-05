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
                    <Link to="/" className="brand-logo" ><img className="image-logo" src={Logo}></img></Link>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down" >
                        <li ><Link id='nav-var-web' to="/passAttendance">Pasar Asistencia</Link></li>
                        <li ><Link id='nav-var-web' to="/editCourse">Editar Comision</Link></li>
                        <li ><Link id='nav-var-web' to="/attendancePercent">Porcentaje Asistencia</Link></li>
                        <li ><Link id='nav-var-web' to="/tasks">Tareas Programadas</Link></li>
                        <li ><Link id='nav-var-web' to="/search">Buscar</Link></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav sidenav-close" id="mobile-demo">
                <li ><Link id='nav-var-mob' to="/"><i className="material-icons">home</i>Home</Link></li>
                <li ><Link id='nav-var-mob' to="/passAttendance"><i className="material-icons">pan_tool</i>Pasar Asistencia</Link></li>
                <li ><Link id='nav-var-mob' to="/editCourse"><i className="material-icons">mode_edit</i>Editar Comision</Link></li>
                <li ><Link id='nav-var-mob' to="/attendancePercent"><i className="material-icons">settings</i>Porcentaje Asistencia</Link></li>
                <li ><Link id='nav-var-mob' to="/tasks"><i className="material-icons">schedule</i>Tareas Programadas</Link></li>
                {/*<li><a className="dropdown-trigger" href="#!" data-target="dropdown2">Comision<i className="material-icons right">arrow_drop_down</i></a></li>*/}
            </ul>
        </div>
    )
}

export default NavBar