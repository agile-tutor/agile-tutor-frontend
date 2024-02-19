import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context.js';
import SelectEntityToChange from './SelectEntityToChange.js';

function CourseChanges() {

    const { putTutorCourseChange, getAllCourses, getAllTutors, courses, tutors, tutorsCourses, getTutorCourse } = useContext(Context);

  //  const destinyTutor = useState([]);
    const [change, setChange] = useState(false)

    /*
        const tutorFromCourse = (courseId) => {
            console.log(tutorsCourses)
            return tutorsCourses[courseId].name
        }

    const abc = () => {
        return tutorsCourses.map((tutorcourse) => tutorcourse.courseid + tutorcourse.tutor)
    }
    */

    //    const handleClickChangeTutorCourse = (destinyTutor) => {
    /*console.log("destinyCourse: " + destinyCourse)*/
    //        handleEditChangeTutorCourse(id, destinyTutor);
    //   };

    useEffect(() => {
        getAllCourses();
        getAllTutors();
    }, []);

    useEffect(() => {

        console.log(courses && tutorsCourses)
        console.log(courses)
        console.log(tutorsCourses)
        

        if (courses && tutorsCourses/* && (tutorsCourses.length != courses.length)*/) {
            courses.forEach((course => { getTutorCourse(course.id) }))
        }
        console.log(tutorsCourses)
    }, [change]);

    const courseDetails = () => {
        return (
            courses.map((course) => {
                //            getTutorCourse(course.id);
                return tutorsCourses.length == courses.length ?
                    courseRow(course)
                    : <tr>
                        <td></td>
                        <td></td>
                    </tr>
            }))
    }

    const courseRow = (course) => {

        const setDestinyTutor = (tutorId) => {
            const tutorIdAsNumber = tutorId * 1
     //       console.log({ courseid: course.id, tutorid: tutorIdAsNumber })
    //        destinyTutor.push({ courseid: course.id, tutorid: tutorIdAsNumber })
            putTutorCourseChange(tutorIdAsNumber, course.id)
            setChange(!change)
        }
        console.log(tutorsCourses)
        const tutordetails = tutorsCourses.find((tutorcourse) => tutorcourse.courseid == course.id).tutor
        return <tr key={course.id}>
            <td className='dashboardcontent'>
                <div>{course.name}</div>
                <div>{" Tutor Actual: " + tutordetails.id + " " + tutordetails.name}</div>
            </td>
            <td className='dashboardcontent'>
                <SelectEntityToChange setDestinyEntity={setDestinyTutor} entityArray={tutors} entityName={"Tutor"} />
                {/*destinyTutor != undefined && destinyTutor.length > 0  ? destinyTutor.find((coursetutor) => coursetutor.courseid == course.id).tutorid : ""*/}
            </td>
        </tr>
    }


    return (
        <div>
            {courses && tutorsCourses ?
                <table className='dashboardpanel'>
                    <tbody>
                        <tr>
                            <th>Nombre de la comisión</th>
                            <th>Nombre del tutor</th>
                        </tr>
                        {courseDetails()}
                    </tbody>
                </table>
                :
                <div>
                </div>
            }
        </div >
    )
}

export default CourseChanges