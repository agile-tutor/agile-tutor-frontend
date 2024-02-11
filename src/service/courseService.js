import axios from 'axios';
import { AlumnoModel } from '../domain/alumnoModel'
import { CourseModel } from '../domain/courseModel';
import { REST_SERVER_URL } from './constants'
import { StudentAttendanceDTO } from '../domain/studentAttendanceDTO';
//import M from 'materialize-css/dist/js/materialize.min.js';


class CourseService {

    alumnoAsJson(alumnoJson) {
        return AlumnoModel.fromJson(alumnoJson)
    }

    courseAsJson(courseJson) {
        return CourseModel.fromJson(courseJson)
    }

    studentAttendanceAsJson(studentAttendanceJson) {
        return StudentAttendanceDTO.fromJson(studentAttendanceJson)
    }

    async getStudentFromCourseWhitAttendanceMeetingDay(courseid, meetingday) {

        try {
            const alumnosJson = await axios.get(`${REST_SERVER_URL}/api/course/students/attended/${courseid}/${meetingday}`, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                credentials: 'same-origin',
            })
            return alumnosJson.data.map(this.studentAttendanceAsJson);
        } catch (error) {
            console.error(error);
        }
    }
    /*
    /api/course/attended/{course}/{meetingday}
    */

}

export const courseService = new CourseService()