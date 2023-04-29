export class StudentAttendanceDTO {
    constructor() {
        this.studentId = 0
        this.attendance = ''
    }

    static toJson(id, attendance) {
        const result = {
            studentId: id,
            attendance: attendance,
        }
        return result
    }
}