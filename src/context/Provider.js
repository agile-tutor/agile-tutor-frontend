import { useEffect, useState } from "react"
import { alumnoService } from "../service/alumnoService"
import { Context } from "./Context"
import { AttendanceModel } from "../domain/attendanceModel"
import { StudentAttendanceDTO } from "../domain/studentAttendanceDTO"

export const Provider = ({ children }) => {

  const [allStudents, setAllStudents] = useState([]);
  const [checked, setChecked] = useState([]);
  const [todb, setTodb] = useState(false);
  const [number, setNumber] = useState(1);

  const value = {
    //estado
    allStudents,
    checked,
    number,
    //funciones que afectan el estado
    updateAttendance: (target, id_asistencia) => {
      const updatedChecked = checked.map(alumno =>
        alumno.id === (target.id * 1)
          ? { ...alumno, attendances: modifyAttendance(alumno.attendances, (target.checked), (id_asistencia)) }
          : alumno
      );
      setChecked(updatedChecked);
    },
    saveAttendance: (day) => {
      console.log('guardando cambios');
      updateAttendances(attendanceToStudentAttendanceDTO(checked, day), number);
    },
    getCourse: (number) => {
      console.log('cargando comision');
      loadCourse(number);
      setNumber(number);
    },
    blockUnblockStudent: (idStudent, blockedStatus) => {
      console.log('bloqueo/desbloqueo de estudiante');
      const updateBlocked = checked.map(alumno =>
        alumno.id === idStudent ? { ...alumno, bloqued: blockedStatus } : alumno);
      setChecked(updateBlocked);

      blockStudent(idStudent, blockedStatus);
    },
    updateStudent: (idStudent, student) => {
      console.log('actualizando estudiante editado');
      updateStudent(idStudent, student);
    },
    getAllStudents: () => {
      console.log('obteniendo todos los alumnos');
      loadAllStudents();
    }
  }

  const attendanceToStudentAttendanceDTO = (checked, day) => {
    const list = checked.map(alumno =>
      StudentAttendanceDTO.toJson(alumno.id, alumno.attendances.filter(attendance =>
        attendance.day == day)[0]))
    return list
  }

  const modifyAttendance = (attendances, check, id_asistencia) => {
    console.log(id_asistencia, check)
    //const checkString = check.toString()
    return attendances.map(attendance => attendance.id === id_asistencia
      ? { ...attendance, attended: check } : attendance)
  }

  const attendanceAsJson = (attendanceJson) => {
    return AttendanceModel.fromJson(attendanceJson)
  }

  const updateAttendances = async (updatedAttendances, number) => {
    await alumnoService.updateAttendances(updatedAttendances, number)
    setTodb(true)
  }

  const blockStudent = async (idStudent, blockedStatus) => {
    await alumnoService.blockStudent(idStudent, blockedStatus)
    setTodb(true)
  }

  const updateStudent = async (idStudent, student) => {
    await alumnoService.updateStudent(idStudent, student)
    setTodb(true)
  }

  const loadCourse = async (number) => {
    try {
      const comision = await alumnoService.getComision(number)
      comision.map(alumno =>
        alumno.attendances.map(attendanceAsJson))
      setChecked(comision)
    } catch (error) {
      console.error(error)
    }
  }

  const loadAllStudents = async () => {
    try {
      const allData = await alumnoService.getAllStudents();
      allData.map(alumno =>
        alumno.attendances.map(attendanceAsJson));
      setAllStudents(allData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadCourse(number);
  }, [todb])

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}