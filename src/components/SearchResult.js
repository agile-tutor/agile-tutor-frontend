import { useEffect } from "react";
import M from 'materialize-css/dist/js/materialize.min.js';
import AlumnoModal from "./AlumnoModal";
import PropTypes from 'prop-types';

function SearchResult({ result }) {

    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, []);

    return (
        <div className='container section resultsearchname'>
            <a className='waves-effect waves-teal btn-flat modal-trigger search-result' href={"#modaledit" + result.id}>{result.surname.toLowerCase() + " " + result.name.toLowerCase()}</a>
            <AlumnoModal key={result.id} courseId={result.courseId} studentid={result.id} name={result.name} surname={result.surname} identifier={result.identifier} emailedit={result.email} observations={result.observations} setName={() => { }} setSurname={() => { }} setIdentifier={() => { }} setEmailedit={() => { }} setObservations={() => { }} />
            <div className="divider"></div>
        </div>
    )
}

SearchResult.propTypes = {
    result: PropTypes.object.isRequired,
  };

export default SearchResult 