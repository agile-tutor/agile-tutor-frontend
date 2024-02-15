import { useContext, useEffect/*, useState*/ } from 'react';
import { Context } from '../context/Context.js';

function CourseChanges() {

    const { /*putTutorCourseChange,*/ getAllCourses, courses, tutorsCourses, getTutorCourse } = useContext(Context);
    /*
        const tutorFromCourse = (courseId) => {
            console.log(tutorsCourses)
            return tutorsCourses[courseId].name
        }

    const abc = () => {
        return tutorsCourses.map((tutorcourse) => tutorcourse.courseid + tutorcourse.tutor)
    }
    */

    useEffect(() => {
        getAllCourses()
    }, [])

    return (
        <div>
            <div>
                {courses ? courses.map((course) => {
                    getTutorCourse(course.id)
                    return <div>{course.name}
                        {/*+{tutorFromCourse(course.id)*/}
                    </div>
                }
                )
                    : <div></div>
                }
            </div>
            <div>
                {tutorsCourses ? tutorsCourses.length : <div></div>}
                {tutorsCourses.map((tutorcourse) => tutorcourse.courseid + tutorcourse.tutor.name)}
            </div>
        </div>
    )
}

export default CourseChanges