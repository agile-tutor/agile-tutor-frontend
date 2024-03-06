import { useContext, useEffect } from 'react';
import { Context } from '../context/Context.js';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ComisionDropdown({ action, style, route, icon }) {

    const { getCourse, tutorCourses/*, getAllCoursesFromTutor, tutorId*/ } = useContext(Context)

    useEffect(() => {
        let elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);
    /*
        useEffect(() => {
            getAllCoursesFromTutor(tutorId)
        }, []);
    */
    return (
        <div>
            <ul id={style} className="dropdown-content">
                {
                    tutorCourses.map((course) =>
                        <div key={course.id}>
                            <li><Link className='sidenav-close' key={course.id} to={route} onClick={() => getCourse(course.id)}>Comisión {course.id}</Link></li>
                            <li className="divider"></li>
                        </div>
                    )}
            </ul>
            <ul className={style} >
                <li><Link className="dropdown-trigger" href="#!" data-target={style}><i className="material-icons">{icon}</i>{action}<i className="material-icons right">arrow_drop_down</i></Link></li>
            </ul>
        </div>
    )
}

ComisionDropdown.propTypes = {
    route: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default ComisionDropdown