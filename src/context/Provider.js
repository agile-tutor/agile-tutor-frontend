import { useEffect, useState } from "react"
import { alumnoService } from "../service/alumnoService"
import { Context } from "./Context"
import { AttendanceModel } from "../domain/attendanceModel"

export const Provider = ({ children }) => {

  const [checked, setChecked] = useState([])
  const [todb, setTodb] = useState(false)

  const value = {
    //estado
    checked,
    //funciones que afectan el estado
    updateAttendance: (target, id_asistencia) => {
      const updatedChecked = checked.map(alumno =>
        alumno.id === (target.id * 1)
          ? { ...alumno, attendances: modifyAttendance(alumno.attendances, (target.checked), (id_asistencia)) }
          : alumno
      )
      setChecked(updatedChecked)
    },
    saveAttendance: () => {
      console.log('guardando cambios')
      updateAttendances(checked.map(alumno => alumno.attendances).flat())
    },
  }

  const modifyAttendance = (attendances, check, id_asistencia) => {
    console.log(id_asistencia, check)
    return attendances.map(attendance => attendance.id === id_asistencia
      ? { ...attendance, attended: check } : attendance)
  }

  const attendanceAsJson = (attendanceJson) => {
    return AttendanceModel.fromJson(attendanceJson)
  }

  const updateAttendances = async (updatedAttendances) => {
    await alumnoService.updateAttendances(updatedAttendances)
    setTodb(true)
  }

  const loadComision = async () => {
    try {
      const comision = await alumnoService.getComision()
      console.log(comision)
      let asistencias = comision.map(alumno => alumno.attendances).flat()
      console.log(asistencias.filter(attendance => attendance.day === 1))
      comision.map(alumno =>
        alumno.attendances.map(attendanceAsJson))
      setChecked(comision)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadComision()
  }, [todb])

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}