import axios from 'axios';
import { AlumnoModel } from '../domain/alumnoModel'
import { CourseModel } from '../domain/courseModel';
import { REST_SERVER_URL } from './constants'
import M from 'materialize-css/dist/js/materialize.min.js';

class AlumnoService {

  alumnoAsJson(alumnoJson) {
    return AlumnoModel.fromJson(alumnoJson)
  }

  courseAsJson(courseJson) {
    return CourseModel.fromJson(courseJson)
  }

  async getComision(number) {

    try {
      const alumnosJson = await axios.get(`${REST_SERVER_URL}/api/course/students/${number}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(alumnosJson);
      const alumnos = alumnosJson.data.map(this.alumnoAsJson);
      return alumnos.sort((a, b) => (a.surname < b.surname) ? -1 : 1);
    } catch (error) {
      console.error(error);
    }
  }

  async getAllStudents() {

    try {
      const alumnosJson = await axios.get(`${REST_SERVER_URL}/api/students`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(alumnosJson);
      const alumnos = alumnosJson.data.map(this.alumnoAsJson);
      return alumnos.sort((a, b) => (a.surname < b.surname) ? -1 : 1);
    } catch (error) {
      console.error(error);
    }
  }

  async getAllCourses() {

    try {
      const coursesJson = await axios.get(`${REST_SERVER_URL}/api/course`, {
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
/*
  async updateAttendances(attendances, course) {
    console.log(attendances);
    let asistencias = JSON.stringify(attendances)
    console.log(asistencias);
    try {
      const response = await axios({
        url: `${REST_SERVER_URL}/api/students/attendances/update/${course}`,
        method: 'POST',
        data: asistencias,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
      })
      M.toast({ html: 'Asistencias actualizadas con éxito!' })
      return response
    } catch (e) {
      alert(e)
      console.error(e)
    }
  }
*/
async updateAttendances(attendances, courseId) {
  console.log(attendances);
  let asistencias = JSON.stringify(attendances)
  console.log(asistencias);
  try {
    const response = await axios({
      url: `${REST_SERVER_URL}/api/course/students/attendances/update/${courseId}`,
      method: 'PUT',
      data: asistencias,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      },
    })
    M.toast({ html: 'Asistencias actualizadas con éxito!' })
    return response
  } catch (e) {
    alert(e)
    console.error(e)
  }
}

  async blockStudent(id, blockedStatus) {
    let blockedstring = JSON.stringify(blockedStatus)
    console.log(blockedstring);
    try {
      const response = await axios({
        url: `${REST_SERVER_URL}/api/students/block/${id}`,
        method: 'PUT',
        data: { blocked: blockedstring },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
      })
      M.toast({ html: 'Alumno actualizado con éxito!' })
      return response
    } catch (e) {
      alert(e)
      console.error(e)
    }
  }

  async getNotifierAbsent() {

    try {
      const alumnosJson = await axios.get(`${REST_SERVER_URL}/api/students/toNotify`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(alumnosJson);
      const alumnos = alumnosJson.data.map(this.alumnoAsJson);
      return alumnos.sort((a, b) => (a.surname < b.surname) ? -1 : 1);
    } catch (error) {
      console.error(error);
    }
  }


  async updateCourse(comision) {
    try {
      return await axios.put(`${REST_SERVER_URL}/comision/${comision.id}`, { listado: comision })
    } catch (e) {
      alert(e)
      console.error(e)
    }
  }

  async getStudent(id) {

    try {
      const alumnoJson = await axios.get(`${REST_SERVER_URL}/api/students/${id}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
        credentials: 'same-origin',
      })
      console.log(alumnoJson);
      const alumno = this.alumnoAsJson(alumnoJson);
      return alumno;
    } catch (error) {
      console.error(error);
    }
  }

  async updateStudent(id, student) {
   // let studentstring = JSON.stringify(student)
    console.log(student);
    try {
      const response = await axios({
        url: `${REST_SERVER_URL}/api/students/${id}`,
        method: 'PUT',
        data: student ,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true'
        },
      })
      M.toast({ html: 'Alumno actualizado con éxito!' })
      return response
    } catch (e) {
      alert(e)
      console.error(e)
    }
  }
}

export const alumnoService = new AlumnoService()