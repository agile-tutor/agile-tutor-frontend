import React from 'react'
import { Link } from 'react-router-dom';

function Breadcrumbs({ posicion0, posicion1, posicion2 }) {

    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12 breadcrumb-main">
                        <Link to={"/"} className="breadcrumb">{posicion0}</Link>
                        <Link to={"/"} className="breadcrumb">{posicion1}</Link>
                        <Link to={"/"} className="breadcrumb">{posicion2}</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Breadcrumbs