import { useEffect } from "react";
import M from 'materialize-css/dist/js/materialize.min.js';
import AlumnoModal from "./AlumnoModal";

function SearchResult({ result }) {

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, []);

    return (
        <div className='container section'>
            <a className='waves-effect waves-teal btn-flat modal-trigger search-result' href={"#modaledit" + result.id} /*onClick={(e) => alert("click on " + result.name + e)}*/>{result.surname + " " + result.name}</a>
            <AlumnoModal key={result.id} studentid={result.id} name={result.name} surname={result.surname} identifier={result.identifier} emailedit={result.email} observations={result.observations} setName={()=>{}} setSurname={()=>{}} setIdentifier={()=>{}} setEmailedit={()=>{}} setObservations={()=>{}} />
        </div>
    )
}

export default SearchResult 