export class AlumnoModel {
  constructor() {
    this.id = 0
    this.name = ''
    this.surname = ''
    this.identifier = ''
    this.email = ''
    this.attendances = []
    this.attendancespercent = 0.0
    this.observations = ''
    this.blocked = false
  }

  static fromJson(alumnoJson) {
    const result = Object.assign(new AlumnoModel(),
      alumnoJson,
      {
        id: (alumnoJson.id * 1),
        name: alumnoJson.name,
        surname: alumnoJson.surname,
        identifier: alumnoJson.identifier,
        email: alumnoJson.email,
        attendances: alumnoJson.attendances,
        attendancespercent: Number(alumnoJson.attendancepercentage),
        observations: alumnoJson.observations,
        blocked: alumnoJson.blocked
      }
    )
    return result
  }
}
