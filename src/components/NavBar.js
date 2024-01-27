import Logo from '../TIPLOGO.png';
import "../App.css";
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context.js';
import M from 'materialize-css/dist/js/materialize.min.js';
import SearchResultList from '../components/SearchResultList.js'
import SelectComision from '../routes/SelectComision';
import SelectComisionEdit from '../routes/SelectComisionEdit';

function NavBar() {

    const [input, setInput] = useState("");
    const { allStudents, getAllStudents, tutor, tutorId, logOutTutor, activeSection } = useContext(Context);
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
            M.toast({ html: 'Se presiono Enter', classes: 'rounded'});
        }
    };

    useEffect(() => {
        let sidenav = document.querySelectorAll(".sidenav");
        M.Sidenav.init(sidenav, {});
    }, []);

    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);

    return (
        <header>
            {/*console.log(activeSection[0], activeSection[1], activeSection[2], activeSection[3])*/}
            <div className={`navbar-fixed${tutorId != 0 ? '' : " hide"}`}>
                <nav>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo" ><img className="image-logo" src={Logo}></img></Link>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons hamburguer-color">menu</i></a>
                        <ul className="right hide-on-med-and-down" >
                            <li className={activeSection[0] ? "active" : ""}><SelectComision action="Pasar Asistencia" style="dropdownPassAtendance nav-var-web" /></li>
                            <li className={activeSection[1] ? "active" : ""}><SelectComisionEdit action="Editar Comision" style="dropdownComisionEdit nav-var-web" /></li>
                            <li className={activeSection[2] ? "active" : ""}><Link className="navbar-item" id='nav-var-web' to="/attendancePercent"><i className="material-icons">show_chart</i>Estado de Comisiones</Link></li>
                            <li className={activeSection[3] ? "active" : ""}><Link className="navbar-item" id='nav-var-web' to="/tasks"><i className="material-icons">schedule</i>Tareas Programadas</Link></li>
                            <li className='searchComponent'>
                                <form>
                                    <div className="input-field">
                                        <input id="search" type="search" value={input} onBlur={() => handleChange("")} onChange={(e) => handleChange(e.target.value)} onKeyDown={handleKeyDown} autoComplete="off" />
                                        <label className="label-icon iconsearch" htmlFor="search"><i id='lupasearch' className="material-icons">search</i></label>
                                        <i className="material-icons iconsearch" onClick={() => handleChange("")}>close</i>
                                    </div>
                                </form>
                                <SearchResultList results={results} />
                            </li>
                            <li >
                                <div>
                                    <Link className="navbar-item"  title="click to LOGOUT" id='nav-var-web' to="/" onClick={() => logOutTutor()} ><i className="material-icons">person_pin</i>  <br style={{position: 'fixed' }} />{tutor? tutor.name: ''}</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div >
            <ul className="sidenav sidenav" id="mobile-demo">
                <li ><Link id='nav-var-mob' to="/"><i className="material-icons">home</i>Home</Link></li>
                <div className="divider"></div>
                <div>
                    <SelectComision action="Pasar Asistencia" style="dropdownPassAtendanceMob nav-var-mob" />
                    <div className="divider"></div>
                    <SelectComisionEdit action="Editar Comision" style="dropdownComisionEditMob nav-var-mob" />
                    <div className="divider"></div>
                </div>
                <li ><Link id='nav-var-mob' to="/attendancePercent"><i className="material-icons">show_chart</i>Estado de Comisiones</Link></li>
                <div className="divider"></div>
                <li ><Link id='nav-var-mob' to="/tasks"><i className="material-icons">schedule</i>Tareas Programadas</Link></li>
                <div className="divider"></div>
                <li >
                    <Link id='nav-var-mob' to="/search"><i className="material-icons">search</i>Buscar</Link>
                    {/* <form>
                        <div className="input-field">
                            <input id="search" type="search" value={input} onChange={(e) => handleChange(e.target.value)} onKeyDown={handleKeyDown} autoComplete="off" />
                            <label className="label-icon" htmlFor="search"><i id='lupasearch' className="material-icons">search</i></label>
                            <i className="material-icons" onClick={() => handleChange("")}>close</i>
                        </div>
                    </form>
                    <SearchResultList results={results} />*/}
                </li>
            </ul>
        </header >
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