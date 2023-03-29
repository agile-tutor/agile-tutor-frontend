import { useState } from "react"
import { alumnoService } from "../service/alumnoService"
import { Context } from "./Context"

export const Provider = ({ children }) => {

  const [checked, setChecked] = useState([
    { nombre: "Ada Lovelace", asistencia: false, porcentaje: 75 },
    { nombre: "Alan Turing", asistencia: false, porcentaje: 70 },
    { nombre: "Donald Knuth", asistencia: false, porcentaje: 76 },
    { nombre: "Dennis Ritchie", asistencia: true, porcentaje: 15 },
    { nombre: "Richard Stallman", asistencia: false, porcentaje: 8 },
    { nombre: "Bjarne Stroustrup", asistencia: false, porcentaje: 100 },
    { nombre: "Tim Berners-Lee", asistencia: false, porcentaje: 95 },
    { nombre: "Alan Cooper", asistencia: false, porcentaje: 25 },
    { nombre: "Linus Torvalds", asistencia: false, porcentaje: 50 }
  ])

  const value = {
    //estado
    checked,
    //funciones que afectan el estado
    updateAttendance: (target) => {
      const index = checked.findIndex(alumno => alumno.nombre === target.name)
      const newChecked = [...checked]
      newChecked[index] = { nombre: target.name, asistencia: target.checked }
      setChecked(newChecked)
    },
    saveAttendance: () => {
      console.log('guardando cambios')
      changeAcepted()
    },
  }

  const changeAcepted = async () => {
    await alumnoService.actualizarComision(checked)
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}