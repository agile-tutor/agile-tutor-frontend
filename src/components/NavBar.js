import React from 'react'
import Logo from '../TIPLOGO.png'
import "../App.css"

function NavBar() {
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo" ><img className="image-logo" src={Logo}></img></a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down" >
                        <li><a id='nav-var-web' href="sass.html">Asistencia</a></li>
                        <li><a id='nav-var-web' href="badges.html">Cumplimiento</a></li>
                        <li><a id='nav-var-web' href="collapsible.html">Javascript</a></li>
                        <li><a id='nav-var-web' href="mobile.html">Mobile</a></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
            </ul>
        </div>
    )
}

export default NavBar