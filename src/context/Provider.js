import { /*useEffect,*/ useState } from "react"
import { alumnoService } from "../service/alumnoService"
import { tutorService } from "../service/tutorService"
import { courseService } from "../service/courseService"
import { scheduledDayService } from "../service/scheduledDayService"
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
  const [tutors, setTutors] = useState([]);
  const [tutorsCourses, setTutorsCourses] = useState([]);
  const [studentsOfTutor, setStudentsOfTutor] = useState([]);
  const [studentsCourseWhithAttendanceMeeting, setStudentsCourseWhithAttendanceMeeting] = useState([]);
  const percentCourse = {};
  const [studentAuth, setStudentAuth] = useState(false);
  const [allSurveys, setAllSurveys] = useState([]);
  const [studentSurvey, setStudentSurvey] = useState([]);
  const [activeSection, setActiveSection] = useState([false, false, false, false])
  const [courseToCreate, setCourseToCreate] = useState('')
  const [meetingToCreate, setMeetingToCreate] = useState('')
  const [porcentajeActual, setPorcentajeActual] = useState(75)
  //const [attendedDayCourse, setAttendedDayCourse] = useState([]);
  const [encuentros, setEncuentros] = useState([]);


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
    tutors,
    allSurveys,
    studentSurvey,
    activeSection,
    courseToCreate,
    meetingToCreate,
    porcentajeActual,
    //  attendedDayCourse,
    encuentros,
    studentsCourseWhithAttendanceMeeting,
    tutorsCourses,
    //funciones que afectan el estado
    updateAttendance: (target) => {

      const modAttendance = (attendance, bool) => {
        attendance.attended = bool
        return attendance
      }
      const attendanceUpdated = studentsCourseWhithAttendanceMeeting.map(alumno =>
        alumno.studentId === (target.id * 1)
          ? { ...alumno, attendance: modAttendance(alumno.attendance, target.checked) }
          : alumno
      );
      setStudentsCourseWhithAttendanceMeeting(attendanceUpdated);
    },
    saveAttendance: (day) => {
      console.log('guardando cambios');
      updateAttendances(studentAttendanceDtoToJson(studentsCourseWhithAttendanceMeeting), number, day);
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
      setTutor('');
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
    getTutorCourse: (courseId) => {
      getTutorFromCourse(courseId);
    },
    putTutorCourseChange: (turorId, courseId) => {
      changeTutorFromCourse(turorId, courseId);
    },
    addNewStudentToACourse: (newStudent) => {
      addStudentToCourse(newStudent);
    },
    checkStudentAuth: (email) => {
      checkIfExistStudent(email);
    },
    saveSurvey: (email, studentSurvey) => {
      postStudentSurvey(email, studentSurvey);
    },
    getAllTutors: () => {
      console.log("getting all tutors");
      setAllTutors();
    },
    getAllSurveys: () => {
      console.log("obteniendo todas las encuestas completadas")
      loadAllSurveys();
    },
    getAllMeetings: () => {
      console.log("obteniendo todas los encuentros")
      loadAllMeetings();
    },
    handleActiveSection: (num) => {
      /*console.log("indicando pestana activa" + "num:" + num)*/
      let updateActiveSection = [false, false, false, false]
      if (-1 < num < 4) {
        updateActiveSection[num] = true;
        setActiveSection(updateActiveSection);
      }
    },
    postNewStudents: (studentsRegister) => {
      console.log("asignando los estudiantes a la comision");
      postStudentsRegister(studentsRegister);
    },
    createACourse: (newCourse) => {
      console.log("creando comision y asignando un tutor");
      postCourseRegister(newCourse);
    },
    addNewMeeting: (newMeeting) => {
      console.log("creando encuentro");
      postMeetingRegister(newMeeting);
    },
    updateMeeting: (idMeeting, meeting) => {
      console.log('actualizando encuentro');
      updateMeeting(idMeeting, meeting);
    },
    deleteMeeting: (meetingId) => {
      console.log('eliminando encuentro');
      deleteMeeting(meetingId);
    },
    clearCourseToCreate: () => {
      setCourseToCreate('')
    },
    changePercent: (porcentaje) => {
      setPorcentajeActual(porcentaje)
    },/*
    getAttendedDays: (ncourse) => {
      attendedAtDays(ncourse);
    },*/
    getStudentsFromCourseWhithAttendanceMeeting: (courseid, meetingday) => {
      loadStudentsFromCourseWhithAttendanceMeeting(courseid, meetingday)
    }
  }

  const studentAttendanceDtoToJson = (studentAttendanceDto) => {
    const studentAttendanceJson = studentAttendanceDto.map(dto =>
      StudentAttendanceDTO.toJson(dto.studentId, dto.attendance))

    return studentAttendanceJson
  }

  const attendanceAsJson = (attendanceJson) => {
    return AttendanceModel.fromJson(attendanceJson)
  }

  const updateAttendances = async (updatedAttendances, number, day) => {
    await alumnoService.updateAttendances(updatedAttendances, number, day)
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
        const comision = await alumnoService.getComision(number)
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

  const loadAllTutors = async () => {
    if (tutor.email == "admin") {
      try {
        const allTutors = await tutorService.getAllTutors();
        setTutors(allTutors);
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

  const loadAllMeetings = async () => {
    try {
      const allMeetings = await scheduledDayService.getAllMeetings();
      setEncuentros(allMeetings);
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
    setTutor('');
    setTutorId(0);
    try {
      const logedTutor = await tutorService.loginTutor(email, password);
      /*console.log(logedTutor)*/
      setTutorId(logedTutor.id);
      setTutor(logedTutor);
      await loadAllTutorCourses(logedTutor.id);
      await loadAllCourses();
      /*console.log(tutorId);
      console.log(tutorCourses);*/
    } catch (error) {
      console.error(error);
    }
  }
/*
  const setAllCourses = async () => {
    try {
      await loadAllCourses();
    } catch (error) {
      console.error(error);
    }
  }
*/
  const setAllTutors = async () => {
    try {
      await loadAllTutors();
    } catch (error) {
      console.error(error);
    }
  }

  const loadStudentsOfTutor = async (id) => {
    try {
      const students = await alumnoService.getStudentsOfTutor(id);
      /*console.log(students);*/
      setStudentsOfTutor(students);
    } catch (error) {
      console.error(error);
    }
  }

  const loadCoursePercent = async (id) => {
    try {
      const percent = await alumnoService.getCoursePercent(id);
      /*console.log(percent);*/
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

  const getTutorFromCourse = async (courseId) => {
    let tutorsCourseSetted = tutorsCourses;
    try {
      let tutor = await tutorService.getTutorFromCourse(courseId);
      console.log({ courseid: courseId, tutor: tutor })
      if (tutorsCourses.some((tutorcourse) => { return tutorcourse.courseid == courseId })) {
        tutorsCourseSetted = tutorsCourses.filter((tutorcourse) => tutorcourse.courseid != courseId);
      }
      tutorsCourseSetted.push({ courseid: courseId, tutor: tutor })
    } catch (error) {
      console.error(error);
    }
    console.log(tutorsCourseSetted);
    setTutorsCourses(tutorsCourseSetted);
  }

  const changeTutorFromCourse = async (tutorId, courseId) => {
    try {
      await tutorService.changeTutorCourse(tutorId, courseId);
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
    /*console.log(coursesWithPercent);*/
    setTutorCoursesWithAverage(coursesWithPercent);
  }
  /*
    const getCourseByName = async (name) => {
      try {
        const newCourse = await alumnoService.getCourseByName(name);
        console.log("newCourse"+newCourse);
        setCourseToCreate(newCourse);
    } catch (error) {
      console.error(error);
    }
  }
  */
  const checkIfExistStudent = async (email) => {
    try {
      const exist = await alumnoService.checkIfExistEmail(email);
      if (exist) {
        setStudentAuth(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const postStudentSurvey = async (email, completeSurvey) => {
    try {
      await alumnoService.addNewSurveyResponse(email, completeSurvey);
    } catch (error) {
      console.error(error);
    }
  }

  const loadAllSurveys = async () => {
    try {
      const allSurveys = await tutorService.loadSurveys();
      setAllSurveys(allSurveys);
      const studentsWhoCompleteSurvey = allSurveys.map((survey) => { return (survey.studentId) })
      setStudentSurvey(studentsWhoCompleteSurvey)

    } catch (error) {
      console.error(error);
    }
  }

  const postStudentsRegister = async (studentsRegister) => {
    try {
      await alumnoService.addNewStudents(studentsRegister);
      /*console.log("comision lista? parted"+courseToCreate)
      console.log("comision lista - alumnos a guardar"+studentsRegister)*/
      setCourseToCreate('');
    } catch (error) {
      console.error(error);
    }
  }

  const postCourseRegister = async (newCourse) => {
    try {
      const neWCourse = await tutorService.addNewCourse(newCourse);
      console.log(neWCourse == undefined)
      neWCourse == undefined ? setCourseToCreate('') : setCourseToCreate(neWCourse);
      /*console.log("comision lista"+courseToCreate)*/
    } catch (error) {
      console.error(error);
    }
  }

  const postMeetingRegister = async (newMeeting) => {
    try {
      const registeredMeeting = await scheduledDayService.addNewMeeting(newMeeting);
      console.log(registeredMeeting == undefined)
      setMeetingToCreate(newMeeting)
    } catch (error) {
      console.error(error);
    }
  }

  const updateMeeting = async (idMeeting, meeting) => {
    let modifiedMeeting = '';
    try {
      modifiedMeeting = await scheduledDayService.updateMeeting(idMeeting, meeting)
    } catch (error) {
      console.error(error);
    }
    setMeetingToCreate(modifiedMeeting)
  }

  const deleteMeeting = async (meetingId) => {
    try {
      await scheduledDayService.deleteMeeting(meetingId)
    } catch (error) {
      console.error(error);
    }
    setMeetingToCreate('')
  }
  /*
    const attendedAtDays = async (courseId) => {
      try {
        const attendedDays = await tutorService.attendedAtDays(courseId);
        console.log(attendedDays);
        setAttendedDayCourse(attendedDays);
      } catch (error) {
        console.error(error);
      }
    }
  */
  const loadStudentsFromCourseWhithAttendanceMeeting = async (courseid, meetingday) => {
    try {
      const studentsWhithAttended = await courseService.getStudentFromCourseWhitAttendanceMeetingDay(courseid, meetingday);
      setStudentsCourseWhithAttendanceMeeting(studentsWhithAttended);
    } catch (error) {
      console.error(error);
    }
  }

/*
  useEffect(() => {
    setAllCourses();
  }, [tutorId]);
  *//*
    useEffect(() => {
      attendedAtDays(number);
    }, []);
  */
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}