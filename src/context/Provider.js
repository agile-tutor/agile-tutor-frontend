import { useState } from "react"
import { alumnoService } from "../service/alumnoService"
import { Context } from "./Context"

export const Provider = ({ children }) => {

  const [checked, setChecked] = useState([{ nombre: "Ada Lovelace", asistencia: false }, { nombre: "Alan Turing", asistencia: false }, { nombre: "Donald Knuth", asistencia: false }, { nombre: "Dennis Ritchie", asistencia: true }, { nombre: "Richard Stallman", asistencia: false }, { nombre: "Bjarne Stroustrup", asistencia: false }, { nombre: "Tim Berners-Lee", asistencia: false }, { nombre: "Alan Cooper", asistencia: false }, { nombre: "Linus Torvalds", asistencia: false }])

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