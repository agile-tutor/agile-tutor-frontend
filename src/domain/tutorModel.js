export class TutorModel {
    constructor() {
        this.id = 0
        this.name = ''
        this.surname = ''
        this.email = ''
    }

    static fromJson(tutorJson) {
        const result = Object.assign(new TutorModel(),
            tutorJson,
            {
                id: (tutorJson.id * 1),
                name: tutorJson.name,
                surname: tutorJson.surname,
                email: tutorJson.email
            }
        )
        return result
    }
}
