import axios from 'axios';
import { AlumnoModel } from '../domain/alumnoModel'
const REST_SERVER_URL = "http://localhost:5000"
class AlumnoService {


  //const postContent = ( id) => axios.post('http://localhost:7000/user/fav', { id: id }, { headers: { Authorization: localStorage.getItem('Token') } })

  alumnoAsJson(alumnoJson) {
    return AlumnoModel.fromJson(alumnoJson)
  }

  async getComision(id) {
    const alumnosJson = await axios.get(`${REST_SERVER_URL}/comision/${id}`)
    const alumnos = alumnosJson.data.map(this.alumnoAsJson)
    return alumnos.sort((a, b) => (a.nombre < b.nombre) ? -1 : 1)
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