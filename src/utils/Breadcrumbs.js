import React from 'react'
import { Link } from 'react-router-dom';

function Breadcrumbs() {
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <Link to="/" className="breadcrumb">Home</Link>
                        <Link to="/passAttendance" className="breadcrumb">Pasar Asistencias</Link>
                        <Link to="/"  className="breadcrumb">Comisión1</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Breadcrumbs