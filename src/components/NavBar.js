import Logo from '../TIPLOGO.png';
import "../App.css";
import { useEffect, useState, useContext } from 'react';
import { Link/*, useHistory*/ } from 'react-router-dom';
import { Context } from '../context/Context.js';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchResultList from '../components/SearchResultList.js'
import SelectComision from '../routes/SelectComision';
import SelectComisionEdit from '../routes/SelectComisionEdit';

function NavBar() {

    const [input, setInput] = useState("");
    const { allStudents, getAllStudents } = useContext(Context);
    const [results, setResults] = useState([]);

    const handleChange = (value) => {
        getAllStudents();
        setInput(value);
        const results = allStudents.filter((student) => {
            return (
                value && student &&
                (
                    student.name && student.name.toLowerCase().includes(value)
                    || student.surname && student.surname.toLowerCase().includes(value)
                )
            );
        });
        setResults(results);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            M.toast({ html: 'Se presiono Enter' });
        }
      };
    useEffect(() => {
        var sidenav = document.querySelectorAll(".sidenav");
        M.Sidenav.init(sidenav, {});
    }, []);

    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);

    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo" ><img className="image-logo" src={Logo}></img></Link>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down" >
                        {//            <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Seleccionar Comision<i className="material-icons right">arrow_drop_down</i></a></li>
                        }
                        <SelectComision action="Pasar Asistencia" />
                        <SelectComisionEdit action="Editar Comision" />
                        <li ><Link className="navbar-item" id='nav-var-web' to="/attendancePercent"><i className="material-icons">settings</i>Porcentaje Asistencia</Link></li>
                        <li ><Link className="navbar-item" id='nav-var-web' to="/tasks"><i className="material-icons">schedule</i>Tareas Programadas</Link></li>
                        <li >
                            <form>
                                <div className="input-field">
                                    <input id="search" type="search" value={input} onChange={(e) => handleChange(e.target.value)} onKeyDown={handleKeyDown}/>
                                    <label className="label-icon" htmlFor="search"><i id='lupasearch' className="material-icons">search</i></label>
                                    <i className="material-icons" onClick={() => handleChange("")}>close</i>
                                </div>
                            </form>
                            <SearchResultList results={results} />
                        </li>
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
                <li ><Link id='nav-var-mob' to="/search"><i className="material-icons">search</i>Buscar</Link></li>
            </ul>
        </div>
    )
}

/*                            <div className="col s4">
                                <form className="form-inline" onSubmit={handleSubmit}>
                                    <input className="form-control sm-2" onKeyPress={event => event.key === 'Enter'} onChange={(e) => setTextSearch(e.target.value)} value={textsearch} id='inputSearch' type="search" placeholder="Buscar" aria-label="Search" />
                                </form>
                            </div>
                            <div className="col s2">
                                <Link to={textsearch ? `/resultsearch/${textsearch}` : "/resultsearch/_"}>
                                    <i className="small material-icons left" id="iconSearch" onClick={() => setTextSearch("")}>search</i>
                                </Link>
                            </div> */
export default NavBar