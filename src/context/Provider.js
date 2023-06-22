import { useEffect, useState } from "react"
import { alumnoService } from "../service/alumnoService"
import { tutorService } from "../service/tutorService"
import { Context } from "./Context"
import { AttendanceModel } from "../domain/attendanceModel"
import { StudentAttendanceDTO } from "../domain/studentAttendanceDTO"

export const Provider = ({ children }) => {

  const [allStudents, setAllStudents] = useState([]);
  const [checked, setChecked] = useState([]);
  //const [todb, setTodb] = useState(false);
  const [courses, setCourses] = useState([]);
  const [tutorCourses, setTutorCourses] = useState([]);
  const [tutorCoursesWithAverage, setTutorCoursesWithAverage] = useState([]);
  const [number, setNumber] = useState(0);
  const [tutorId, setTutorId] = useState(0);
  const [tutor, setTutor] = useState('');
  const [studentsOfTutor, setStudentsOfTutor] = useState([]);
  const percentCourse = {};
  const [studentAuth, setStudentAuth] = useState(false);

  const value = {
    //estado
    allStudents,
    courses,
    tutorCourses,
    checked,
    number,
    tutorId,
    studentsOfTutor,
    percentCourse,
    tutor,
    tutorCoursesWithAverage,
    studentAuth,
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
    updateTutorCoursesWithAverage: () => {
      console.log('actualizando comisiones de tutor');
      getAveragePercent();
    },
    getAllStudents: () => {
      console.log('obteniendo todos los alumnos');
      loadAllStudents();
    },
    getAllCourses: () => {
      console.log('obteniendo todos los cursos');
      loadAllCourses();
    },
    getAllCoursesFromTutor: (id) => {
      console.log('obteniendo todos los cursos del tutor');
      loadAllTutorCourses(id);
    },
    signUpTutor: (name, surname, email, password) => {
      console.log('registrando tutor');
      registerTutor(name, surname, email, password);
    },
    loginTutor: (email, password) => {
      console.log('inciando sesion de tutor');
      logIn(email, password);
    },
    logOutTutor: () => {
      setTutorId(0);
    },
    getStudentsOfTutor: (id) => {
      loadStudentsOfTutor(id);
    },
    getCoursePercent: (id) => {
      loadCoursePercent(id);
    },
    putStudentCourseChange: (studentId, courseId) => {
      changeAStudentToAnotherCourse(studentId, courseId);
    },
    addNewStudentToACourse: (newStudent) => {
      addStudentToCourse(newStudent);
    },
    checkStudentAuth: (email) => {
      console.log(email);
      setStudentAuth(!studentAuth);
      /*implementar el checkeo del email informado para permitir el acceso a la encuesta*/
    },
    saveSurvey: (studentSurvey) => {
      console.log(studentSurvey)
      /*implementar la persistencia de la encuesta*/
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
    await loadCourse(number)
  }

  const blockStudent = async (idStudent, blockedStatus) => {
    await alumnoService.blockStudent(idStudent, blockedStatus)
    await loadCourse(number)
  }

  const updateStudent = async (idStudent, student) => {
    await alumnoService.updateStudent(idStudent, student)
    await loadCourse(number)
  }

  const loadCourse = async (number) => {
    if (tutorId != 0) {
      try {
        console.log(number)
        const comision = await alumnoService.getComision(number)
        comision.map(alumno =>
          alumno.attendances.map(attendanceAsJson))
        setChecked(comision)
      } catch (error) {
        console.error(error)
      }
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

  const loadAllCourses = async () => {
    if (tutorId != 0) {
      try {
        const allCourses = await alumnoService.getAllCourses();
        setCourses(allCourses);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const loadAllTutorCourses = async (id) => {
    try {
      const allTutorCourses = await tutorService.getAllTutorCourses(id);
      setTutorCourses(allTutorCourses);
    } catch (error) {
      console.error(error);
    }
  }

  const registerTutor = async (name, surname, email, password) => {
    try {
      await tutorService.registerTutor(name, surname, email, password);
      setTutorId(0);
    } catch (error) {
      console.error(error);
    }
  }

  const logIn = async (email, password) => {
    setTutorCourses([]);
    try {
      const logedTutor = await tutorService.loginTutor(email, password);
      console.log(logedTutor)
      setTutorId(logedTutor.id);
      setTutor(logedTutor);
      await loadAllTutorCourses(logedTutor.id);
      console.log(tutorId);
      console.log(tutorCourses);
    } catch (error) {
      console.error(error);
    }
  }

  const setCourseId = async () => {
    try {
      await loadAllCourses();
    } catch (error) {
      console.error(error);
    }
  }

  const loadStudentsOfTutor = async (id) => {
    try {
      const students = await alumnoService.getStudentsOfTutor(id);
      console.log(students);
      setStudentsOfTutor(students);
    } catch (error) {
      console.error(error);
    }
  }

  const loadCoursePercent = async (id) => {
    try {
      const percent = await alumnoService.getCoursePercent(id);
      console.log(percent);
      percentCourse[id] = percent;
    } catch (error) {
      console.error(error);
    }
  }

  const changeAStudentToAnotherCourse = async (studentId, courseId) => {
    try {
      await tutorService.changeStudentCourse(studentId, courseId);
    } catch (error) {
      console.error(error);
    }
  }

  const addStudentToCourse = async (newStudent) => {
    try {
      await alumnoService.addNewStudentToACourse(newStudent);
    } catch (error) {
      console.error(error);
    }
  }

  const getAveragePercent = async () => {
    const coursesWithPercent = await Promise.all(
      tutorCourses.map(async (course) => {
        return { courseId: course.id, average: await alumnoService.getCoursePercent(course.id) }
      })
    )
    console.log(coursesWithPercent);
    setTutorCoursesWithAverage(coursesWithPercent);
  }

  useEffect(() => {
    setCourseId();
  }, []);
  /*
    useEffect(() => {
      loadCourse(number);
    }, [todb]);
  */
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}