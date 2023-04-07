export class AttendanceModel {
    constructor() {
        this.id = 0
        this.day = ''
        this.attended = ''
    }

    static fromJson(attendanceJson) {
        const result = Object.assign(new AttendanceModel(),
            attendanceJson,
            {
                id: (attendanceJson.id * 1),
                day: (attendanceJson.day * 1),
                attended: (attendanceJson.attended.toLowerCase() === 'true')
            }
        )
        return result
    }
}