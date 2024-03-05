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
            /*(tutor.data)*/
            M.toast({
                html: `El tutor ${tutorJson.data.name} se ha creado satisfactoriamente`, classes: 'rounded blue-app-semitr'
            });
            return tutor;
        } catch (err) {
            M.toast({ html: "Datos invalidos o el tutor ya existe", classes: 'rounded red-app-semitr' });
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
            /*(tutor.data)*/
            M.toast({
                html: `Bienvenido ${tutor.data.name}`, classes: 'rounded blue-app-semitr'
            });
            return tutor.data;
            //                    ("success", success.headers.authorization);
            //                    history.push("/");
        } catch (err) {
            M.toast({ html: "Datos invalidos o el tutor no existe", classes: 'rounded red-app-semitr' });
        }
    }

    async getAllTutorCourses(id) {
        if (id == 0) { return [] } else {
            try {
                const coursesJson = await axios.get(`${REST_SERVER_URL}/api/tutor/courses/${id}`, {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: {
                        /*'Access-Control-Allow-Origin': '*',*/
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    credentials: 'same-origin',
                })
                /*(coursesJson);*/
                const courses = coursesJson.data.map(this.courseAsJson);
                return courses.sort((a, b) => (a.id < b.id) ? -1 : 1);
            } catch (error) {
                console.error(error);
            }
        }
    }

    async updateNotifierAbsent(updtadedEmail, tutorId) {
        // let studentstring = JSON.stringify(student)
        //(student);
        try {
            const absentMessageJson = await axios({
                url: `${REST_SERVER_URL}/api/tutor/absentmessage/${tutorId}`,
                method: 'PUT',
                mode: 'no-cors',
                headers: {
                    /*'Access-Control-Allow-Origin': '*',*/
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                credentials: 'same-origin',
                data: updtadedEmail,
            })
            /*(absentMessageJson);*/
            const absentMessage = absentMessageJson.data;
            /*console.log(absentMessage);*/
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
            /*console.log(course.data)*/
            M.toast({
                html: `El tutorando no sera notificado por su ausencia.`, classes: 'rounded blue-app-semitr'
            });
            return course.data;
        } catch (err) {
            M.toast({ html: "Un error ha ocurrido durante el proceso", classes: 'rounded red-app-semitr' });
            console.log(err);
        }
    }

    async getAbsentMessage(tutorId) {
        try {
            const absentMessageJson = await axios.get(`${REST_SERVER_URL}/api/tutor/absentmessage/${tutorId}`, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    /*'Access-Control-Allow-Origin': '*',*/
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                credentials: 'same-origin',
            })
            /*console.log(absentMessageJson);*/
            const absentMessage = absentMessageJson.data;
            /*console.log(absentMessage);*/
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
                    /*'Access-Control-Allow-Origin': '*',*/
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
            }
            );
            const responseData = response.data;
            console.log(responseData)
            M.toast({
                html: `El tutorando se ha cambiado de comisión satisfactoriamente`, classes: 'rounded blue-app-semitr'
            });
        } catch (err) {
            M.toast({ html: "Ha ocurrido un error durante el cambio de comisión", classes: 'rounded red-app-semitr' });
            console.log(err);
        }
    }

    async getTutorFromCourse(courseId) {
        try {
            const tutorJson = await axios.get(`${REST_SERVER_URL}/api/course/tutor/${courseId}`, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    /*'Access-Control-Allow-Origin': '*',*/
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                credentials: 'same-origin',
            })
            return this.tutorAsJson(tutorJson.data);
        } catch (err) {
            M.toast({ html: "Datos invalidos o la comision no existe", classes: 'rounded red-app-semitr' });
            console.log(err);
        }
    }

    async changeTutorCourse(tutorId, courseId) {
        try {
            const response = await axios({
                url: `${REST_SERVER_URL}/api/tutor/course/move/${tutorId}/${courseId}`,
                method: 'PUT',
                data: {},
                headers: {
                    /*'Access-Control-Allow-Origin': '*',*/
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
            }
            );
            const responseData = response.data;
            console.log(responseData)
            M.toast({
                html: `El tutor se ha asignado a la comisión satisfactoriamente`, classes: 'rounded blue-app-semitr'
            });
        } catch (err) {
            M.toast({ html: "Ha ocurrido un error durante el cambio de tutor", classes: 'rounded red-app-semitr' });
            console.log(err);
        }
    }

    async getAllTutors() {
        try {
            const tutorsJson = await axios.get(`${REST_SERVER_URL}/api/tutor`, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    /*'Access-Control-Allow-Origin': '*',*/
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                credentials: 'same-origin',
            })
            /*console.log(tutorsJson);*/
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
                    /*'Access-Control-Allow-Origin': '*',*/
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                credentials: 'same-origin',
            })
            /*console.log(surveys.data);*/
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
            /*console.log(course.data)*/
            M.toast({
                html: `La comisión se ha creado satisfactoriamente`, classes: 'rounded blue-app-semitr'
            });
            return course.data;
        } catch (err) {
            M.toast({ html: "Datos invalidos o la comisión ya existe", classes: 'rounded red-app-semitr' });
            console.log(err);
        }
    }
/*
    async attendedAtDays(courseId) {
        try {
            const surveys = await axios.get(`${REST_SERVER_URL}/api/course/attended/${courseId}`, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
                credentials: 'same-origin',
            })
            /*console.log(surveys.data);
            //const tutors = tutorsJson.data.map(this.tutorAsJson);
            return surveys.data;
        } catch (error) {
            console.error(error);
        }
    }*/
}

export const tutorService = new TutorService()