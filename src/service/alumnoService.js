import axios from 'axios';
import { AlumnoModel } from '../domain/alumnoModel'
import { REST_SERVER_URL } from './constants'

class AlumnoService {

  alumnoAsJson(alumnoJson) {
    return AlumnoModel.fromJson(alumnoJson)
  }

  async getComision(/*id*/) {

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
      return alumnos.sort((a, b) => (a.nombre < b.nombre) ? -1 : 1);
    } catch (error) {
      console.error(error);
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