import { useContext, useState } from 'react';
import { Context } from '../context/Context.js';
import 'materialize-css/dist/css/materialize.min.css';
import SearchBar from '../components/SearchBar';
import SearchResultList from '../components/SearchResultList';

function Search() {

    const { allStudents, getAllStudents } = useContext(Context);
    const [results, setResults] = useState([]);

    return (
        <div>
            <SearchBar setResults={setResults} getAllStudents={getAllStudents} allStudents={allStudents} />
            <SearchResultList results={results} />
        </div>
    )
}

export default Search