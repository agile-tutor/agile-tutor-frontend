import { useContext, useEffect } from 'react';
import { Context } from '../context/Context.js';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';

function SelectComisionEdit({ action }) {

    const { getCourse, courses, getAllCourses } = useContext(Context)

    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);

    return (
        <div>
            {typeof (courses[0]) == "undefined" ? () => { getAllCourses } : () => { }}
            <ul id="dropdownComisionEdit" className="dropdown-content">
                {
                    courses.map((course) => {
                        return (
                            <div>
                                <li><Link key={course.id} to="/comisionEdit" onClick={() => getCourse(course.id)}>Comisión {course.id}</Link></li>
                                <li className="divider"></li>
                            </div>
                        )
                    })}
            </ul>
            <ul className="xxxxxxx" >
                <li><Link className="dropdown-trigger" href="#!" data-target="dropdownComisionEdit"><i className="material-icons">mode_edit</i>{action}<i className="material-icons right">arrow_drop_down</i></Link></li>
            </ul>
        </div>
    )
}

export default SelectComisionEdit