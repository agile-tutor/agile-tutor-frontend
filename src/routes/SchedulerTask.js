import { useEffect, useState } from "react"
import { alumnoService } from "../service/alumnoService"
import imageCard from "../TIPLOGO.png"

function SchedulerTask() {

  const [students, setStudents] = useState([])
  const [todb/*, setTodb*/] = useState(false)

  useEffect(() => {
    loadNotifierAbsent()
  }, [todb])

  const loadNotifierAbsent = async () => {
    try {
      const studentslist = await alumnoService.getNotifierAbsent()
      console.log(studentslist)
      setStudents(studentslist)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>Alumnos a notificar:
      {
        students.length === 0 ?
          <p>"No existen alumnos pendientes de notificar por ausencias"</p> :
          students.map((alumno) => {
            { console.log(alumno.email) }
            return (
              <div class="row">
                <div class="col s12 m6">
                  <div class="card">
                    <div class="card-image">
                      <img src={imageCard} />
                      <span class="card-title">Card Title</span>
                      <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">clear</i></a>
                    </div>
                    <div class="card-content">
                      <p>{alumno.name + " " + alumno.surname}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

export default SchedulerTask