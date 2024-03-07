import "../Dashboard.css";
import CourseChanges from "../components/CourseChanges";

function Dashboard() {

    return (
        <div className='dashboardcontent'>
            {
                <CourseChanges />
            }
        </div>
    )
}

export default Dashboard