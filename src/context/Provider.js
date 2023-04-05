import { useEffect, useState } from "react"
import { alumnoService } from "../service/alumnoService"
import { Context } from "./Context"

export const Provider = ({ children }) => {

  const [checked, setChecked] = useState([/*
    { nombre: "Ada Lovelace", asistencia: false, porcentaje: 75 },
    { nombre: "Alan Turing", asistencia: false, porcentaje: 70 },
    { nombre: "Donald Knuth", asistencia: false, porcentaje: 76 },
    { nombre: "Dennis Ritchie", asistencia: true, porcentaje: 15 },
    { nombre: "Richard Stallman", asistencia: false, porcentaje: 8 },
    { nombre: "Bjarne Stroustrup", asistencia: false, porcentaje: 100 },
    { nombre: "Tim Berners-Lee", asistencia: false, porcentaje: 95 },
    { nombre: "Alan Cooper", asistencia: false, porcentaje: 25 },
    { nombre: "Linus Torvalds", asistencia: false, porcentaje: 50 }
    Alumno("Ale", "Fariña", "012", "ale@gmail.com", mutableSetOf(), 0.0, ""))
*/])

  const value = {
    //estado
    checked,
    //funciones que afectan el estado
    updateAttendance: (target) => {
      console.log(checked, target.checked)
      const updatedChecked = checked.map(alumno =>
        alumno.id === (target.id * 1)
          ? { ...alumno, attendances: target.checked }
          : alumno
      );
      checked.forEach(alumno => console.log(alumno.id))
      setChecked(updatedChecked)
    },
    saveAttendance: () => {
      console.log('guardando cambios')
      changeAcepted()
    },
  }

  const changeAcepted = async () => {
    await alumnoService.actualizarComision(checked)
  }

  const loadComision = async () => {
    try {
      const comision = await alumnoService.getComision()
      console.log(comision)
      setChecked(comision)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadComision()
  }, [])

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}