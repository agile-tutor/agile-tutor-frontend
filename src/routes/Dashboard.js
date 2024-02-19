import "../Dashboard.css";
//import { Link } from "react-router-dom";
import CourseChanges from "../components/CourseChanges";

function Dashboard() {
/*
    const panel = (name, route, icon) => {
        return <div className='dashboardpanel'>{name}
            <Link title="subir .CSV" to={route} >
                <i className="large material-icons">{icon}</i>
            </Link>
        </div>
    }
*/
    return (
        <div className='dashboardcontent'>
            {
                //panel("3.cargar alumnos", "/uploadFiles", "publish")
                <CourseChanges />
            }
        </div>
    )
}

export default Dashboard