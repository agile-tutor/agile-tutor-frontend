import { useEffect, useState } from "react";
import M from 'materialize-css/dist/js/materialize.min.js';
import AlumnoModal from "./AlumnoModal";

function SearchResultList({ results }) {

    const [studentSelected, setStudentSelected] = useState('');

    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, []);

    return (
        <div>
            <div className='container section resultsearchname' >
                {results.map((result, id) => {
                    <div>
                        <a className='waves-effect waves-teal btn-flat search-result' href={"#modaledit" + studentSelected.id} key={id} onClick={() => { setStudentSelected(result) }}> {result.surname.toLowerCase() + " " + result.name.toLowerCase()}</a>
                        {/*console.log(result.id+"resultIDSearch")*/}
                        <div className="divider"></div>
                    </div>
                })}
            </div>
            <div >
                <a className='waves-effect waves-teal btn-flat modal-trigger search-result' href={"#modaledit" + studentSelected.id}></a>
                <AlumnoModal key={studentSelected.id} courseId={studentSelected.courseId} studentid={studentSelected.id} name={studentSelected.name} surname={studentSelected.surname} identifier={studentSelected.identifier} emailedit={studentSelected.email} observations={studentSelected.observations} setName={() => { }} setSurname={() => { }} setIdentifier={() => { }} setEmailedit={() => { }} setObservations={() => { }} />
            </div>
        </div>
    )
}

export default SearchResultList