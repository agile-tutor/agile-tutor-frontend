import { TutorModel } from '../domain/tutorModel';
import { CourseModel } from '../domain/courseModel';
import { REST_SERVER_URL } from './constants';
import M from "materialize-css";
import axios from "axios";

class TutorService {

    tutorAsJson(tutorJson) {
        return TutorModel.fromJson(tutorJson)
    }

    courseAsJson(courseJson) {
        return CourseModel.fromJson(courseJson)
    }

    async registerTutor(name, surname, email, password) {
        try {
            const tutorJson = await axios.post(`${REST_SERVER_URL}/api/tutor/register`,
                {
                    "name": name,
                    "surname": surname,
                    "email": email,
                    "password": password
                },
            );
            const tutor = this.tutorAsJson(tutorJson);
            console.log(tutor.data)
            M.toast({
                html: `El tutor ${tutorJson.data.name} se ha creado satisfactoriamente`,
                classes: "#388e3c green darken-2",
            });
            return tutor;
        } catch (err) {
            M.toast({ html: "Datos invalidos o el usuario ya existe", classes: "#c62828 red darken-3" });
            console.log(err);
        }
    }

    async loginTutor(email, password) {
        try {
            const tutorJson = await axios.post(`${REST_SERVER_URL}/api/tutor/login`,
                {
                    "password": password,
                    "email": email
                },
            );
            const tutor = this.tutorAsJson(tutorJson);
            console.log(tutor.data)
            M.toast({
                html: `Bienvenido ${tutor.data.name}`,
                classes: "#388e3c green darken-2",
            });
            return tutor.data;
            //                    console.log("success", success.headers.authorization);
            //                    history.push("/");
        } catch (err) {
            console.log(err);
            M.toast({ html: "datos invalidos o el tutor no existe", classes: "#c62828 red darken-3" });
        }
    }

    async getAllTutorCourses(id) {
        if (id == 0) { return [] } else {
            try {
                const coursesJson = await axios.get(`${REST_SERVER_URL}/api/tutor/courses/${id}`, {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    credentials: 'same-origin',
                })
                console.log(coursesJson);
                const courses = coursesJson.data.map(this.courseAsJson);
                console.log(courses);
                return courses.sort((a, b) => (a.id < b.id) ? -1 : 1);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async updateNotifierAbsent(updtadedEmail, tutorId) {
        // let studentstring = JSON.stringify(student)
        //console.log(student);
        try {
            const absentMessageJson = await axios({
                url: `${REST_SERVER_URL}/api/tutor/absentmessage/${tutorId}`,
                method: 'PUT',
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                credentials: 'same-origin',
                data: updtadedEmail,
            })
            console.log(absentMessageJson);
            const absentMessage = absentMessageJson.data;
            console.log(absentMessage);
            return absentMessage;
        } catch (error) {
            alert(error)
            console.error(error);
        }
    }

    async removeAbsentNotifierStudent(alumnoId, tutorId) {
        try {
            const course = await axios.post(`${REST_SERVER_URL}/api/tutor/absent/${tutorId}/${alumnoId}`,
                {},
            );
            console.log(course.data)
            M.toast({
                html: `el tutorando no sera notificado por su ausencia.`,
                classes: "#388e3c green darken-2",
            });
            return course.data;
        } catch (err) {
            M.toast({ html: "Un error ha ocurrido en el proceso", classes: "#c62828 red darken-3" });
            console.log(err);
        }
    }

    async getAbsentMessage(tutorId) {
        try {
            const absentMessageJson = await axios.get(`${REST_SERVER_URL}/api/tutor/absentmessage/${tutorId}`, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                credentials: 'same-origin',
            })
            console.log(absentMessageJson);
            const absentMessage = absentMessageJson.data;
            console.log(absentMessage);
            return absentMessage;
        } catch (error) {
            console.error(error);
        }
    }

    async changeStudentCourse(studentId, courseId) {
        try {
            const response = await axios({
                url: `${REST_SERVER_URL}/api/tutor/students/move/${studentId}/${courseId}`,
                method: 'PUT',
                data: {},
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
            }
            );
            const responseData = response.data;
            console.log(responseData)
            M.toast({
                html: `El tutorando se ha cambiado de comisión satisfactoriamente`,
                classes: "#388e3c green darken-2",
            });
        } catch (err) {
            M.toast({ html: "Ha ocurrido un error durante el cambio de comisión", classes: "#c62828 red darken-3" });
            console.log(err);
        }
    }

    async getAllTutors() {
        try {
            const tutorsJson = await axios.get(`${REST_SERVER_URL}/api/tutor`, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                credentials: 'same-origin',
            })
            console.log(tutorsJson);
            const tutors = tutorsJson.data.map(this.tutorAsJson);
            return tutors.sort((a, b) => (a.surname < b.surname) ? -1 : 1);
        } catch (error) {
            console.error(error);
        }
    }

    async loadSurveys() {
        try {
            const surveys = await axios.get(`${REST_SERVER_URL}/api/tutor/survey`, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                credentials: 'same-origin',
            })
            console.log(surveys.data);
            //const tutors = tutorsJson.data.map(this.tutorAsJson);
            return surveys.data.sort((a, b) => (a.studentId < b.studentId) ? -1 : 1);
        } catch (error) {
            console.error(error);
        }
    }

    async addNewCourse(newCourse) {
        try {
            const course = await axios.post(`${REST_SERVER_URL}/api/course/register`,
                newCourse,
            );
            console.log(course.data)
            M.toast({
                html: `La comisión ${course.name} se ha creado satisfactoriamente`,
                classes: "#388e3c green darken-2",
            });
            return course.data;
        } catch (err) {
            M.toast({ html: "Datos invalidos o el curso ya existe", classes: "#c62828 red darken-3" });
            console.log(err);
        }
    }
}

export const tutorService = new TutorService()