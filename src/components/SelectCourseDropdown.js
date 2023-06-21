import { useContext, useEffect } from 'react';
import { Context } from '../context/Context.js';
//import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';

function SelectCourseDropdown({ action, style, setDestinyCourse }) {

    const { getAllCourses, courses } = useContext(Context)


    useEffect(() => {
        getAllCourses();
    }, []);
/*
    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);
*/
    return (
        <div>
            <ul id={style} className="dropdown-content dropdown-change-course-list">
                {console.log(courses)}
                {
                    courses.map((course) => {
                        return (
                            <div>
                                <li><Link key={course.id} onClick={() => setDestinyCourse(course.id)}>Comisión {course.id}</Link></li>
                                <li className="divider"></li>
                            </div>
                        )
                    })}
            </ul>
            <ul className={style} >
                <li><Link className="dropdown-trigger" href="#!" data-target={style}>{/*<i className="material-icons">pan_tool</i>*/}{action}<i className="material-icons right">arrow_drop_down</i></Link></li>
            </ul>
        </div>
    )
}

export default SelectCourseDropdown