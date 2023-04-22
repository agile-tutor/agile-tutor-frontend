import React from 'react'
import { Link } from 'react-router-dom';

function Breadcrumbs({ posicion0, posicion1, posicion2, route0, route1, route2 }) {

    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <Link to={route0} className="breadcrumb">{posicion0}</Link>
                        <Link to={route1} className="breadcrumb">{posicion1}</Link>
                        <Link to={route2} className="breadcrumb">{posicion2}</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Breadcrumbs