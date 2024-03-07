import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

Breadcrumbs.propTypes = {
    posicion0: PropTypes.string.isRequired,
    posicion1: PropTypes.string.isRequired,
    posicion2: PropTypes.string.isRequired,
  };

export default Breadcrumbs