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


    static fromJson(studentAttendanceJson) {
        const result = Object.assign(new StudentAttendanceDTO(),
        studentAttendanceJson,
            {
                studentId: (studentAttendanceJson.studentId * 1),
                attendance: studentAttendanceJson.attendance
            }
        )
        return result
    }
}