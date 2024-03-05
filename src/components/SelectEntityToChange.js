import { useState/*, useContext*/, useEffect } from "react";
//import { Context } from '../context/Context.js';
import '../App.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const SelectEntityToChange = ({ setDestinyEntity, entityArray, entityName }) => {

    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
        let elems = document.querySelectorAll('.select');
        M.FormSelect.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);

    const handleTypeSelect = e => {
        e.preventDefault();
        setSelectedOption(e.target.value);
        setDestinyEntity(e.target.value)
    };

    return (
        (entityArray != undefined || entityArray?.length) ?
            < div className="input-field" >
                <select className="browser-default" value="" onChange={handleTypeSelect}>
                    <option value="" disabled /*selected*/>Seleccione {entityName}</option>
                    {console.log(entityArray)}
                    {
                        entityArray.map((entity) =>
                            <option key={entity.id} value={entity.id}>{entity.id} {entity.name}</option>
                        )
                    }
                </select>
                {<div className="input-field center col s12" id="course-destiny-field">
                    <input disabled value={selectedOption} id="entityid" type="text" className="validate" />
                    <label className="active" htmlFor="entityid"> {entityName} Destino: </label>
                </div>

                } </div >
            :
            <div></div>
    );
};

export default SelectEntityToChange;