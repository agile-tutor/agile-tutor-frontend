import React, { useState } from 'react'

function SearchBar({ allStudents, getAllStudents, setResults }) {

    const [input, setInput] = useState("");

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

    return (
        <div className='search-page'>
            <div className="navbar">
                <h3 className="titulo-tabla">Buscar a un alumno:</h3>
                <nav className="nav-extended">
                    <div className="nav-wrapper">
                        <form>
                            <div className="input-field studentSearchInput">
                                <input placeholder="Digite para buscar" id="search-input" type="search" value={input} onChange={(e) => handleChange(e.target.value)} autoComplete="off"/>
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
{/*
                        <form>
                        <div className="input-field">
                            <input id="search" type="search" />
                            <label className="label-icon" htmlFor="search"><i id='lupasearch' className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
*/}

export default SearchBar