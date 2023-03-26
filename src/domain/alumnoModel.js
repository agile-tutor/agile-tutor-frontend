export class AlumnoModel {
  constructor(){
    this.id = 0
    this.nombre = ''
    this.attendance = ''
  }

  static fromJson(alumnoJson) {
    const result = Object.assign(new AlumnoModel(),
      alumnoJson,
      { nombre: alumnoJson.nombre, attendance: alumnoJson.attendance }
    )  
    return result
  }
}
