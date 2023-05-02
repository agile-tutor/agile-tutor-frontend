import axios from 'axios';
import { AlumnoModel } from '../domain/alumnoModel'
import { REST_SERVER_URL } from './constants'
import M from 'materialize-css/dist/js/materialize.min.js';

class AlumnoService {

  alumnoAsJson(alumnoJson) {
    return AlumnoModel.fromJson(alumnoJson)
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

  async blockStudent(id, blockedStatus) {
    let blockedstring = JSON.stringify(blockedStatus)
    console.log(blockedstring);
    try {
      const response = await axios({
        url: `${REST_SERVER_URL}/api/students/block/${id}`,
        method: 'PUT',
        data: {blocked: blockedstring},
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

  async actualizarComision(comision) {
    try {
      return await axios.put(`${REST_SERVER_URL}/comision/${comision.id}`, { listado: comision })
    } catch (e) {
      alert(e)
      console.error(e)
    }
  }
}

export const alumnoService = new AlumnoService()