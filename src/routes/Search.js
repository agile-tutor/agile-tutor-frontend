import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'

function Search() {
    return (
        <div className="navbar">
            <h3 className="titulo-tabla">Buscar un alumno:</h3>
            <nav className="nav-extended">
                <div className="nav-wrapper">
                    <form>
                        <div className="input-field">
                            <input id="search" type="search" />
                            <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Search