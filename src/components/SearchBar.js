import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function SearchBar({ allStudents, getAllStudents, setResults }) {

    const [input, setInput] = useState("");

    const handleChange = (value) => {
        setInput(value);
        const results = allStudents.filter((student) => {
            return (
                value && student && (student.name?.toLowerCase().includes(value)
                    || student.surname?.toLowerCase().includes(value))
            );
        });
        setResults(results);
    };

    useEffect(() => {
        getAllStudents();
    }, []);

    return (
        <div className='search-page'>
            <div className="navbar">
                <h3 className="titulo-tabla">Buscar a un alumno:</h3>
                <nav className="nav-extended">
                    <div className="nav-wrapper">
                        <form>
                            <div className="input-field studentSearchInput">
                                <input placeholder="Digite para buscar" id="search-input" type="search" value={input} onChange={(e) => handleChange(e.target.value)} autoComplete="off" />
                                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                <i className="material-icons">close</i>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>
        </div>
    )
}

SearchBar.propTypes = {
    allStudents: PropTypes.array.isRequired,
    getAllStudents: PropTypes.func.isRequired,
    setResults: PropTypes.func.isRequired,
};

export default SearchBar