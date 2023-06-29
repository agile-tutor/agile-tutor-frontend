export class AlumnoRegisterModel {
  constructor() {
    this.id = 0
    this.name = ''
    this.surname = ''
    this.identifier = ''
    this.email = ''
    this.courseId = 0
  }

  static fromJson(alumnoRegisterJson) {
    const result = Object.assign(new AlumnoRegisterModel(),
      alumnoRegisterJson,
      {
        id: (alumnoRegisterJson.id * 1),
        name: alumnoRegisterJson.name,
        surname: alumnoRegisterJson.surname,
        identifier: alumnoRegisterJson.identifier,
        email: alumnoRegisterJson.email,
        courseId: alumnoRegisterJson.courseId
      }
    )
    return result
  }
}
