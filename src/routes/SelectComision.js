import { useContext, useEffect } from 'react';
import { Context } from '../context/Context.js';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';

function SelectComision({ action, style }) {

    const { getCourse, courses, getAllCourses } = useContext(Context)

    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);

    return (
        <div>
            {typeof (courses[0]) == "undefined" ? () => { getAllCourses } : () => { }}
            <ul id={style} className="dropdown-content">
                {
                    courses.map((course) => {
                        return (
                            <div>
                                <li><Link key={course.id} to="/comision" onClick={() => getCourse(course.id)}>Comisión {course.id}</Link></li>
                                <li className="divider"></li>
                            </div>
                        )
                    })}
            </ul>
            <ul className={style} >
                <li><Link className="dropdown-trigger" href="#!" data-target={style}><i className="material-icons">pan_tool</i>{action}<i className="material-icons right">arrow_drop_down</i></Link></li>
            </ul>
        </div>
    )
}

export default SelectComision