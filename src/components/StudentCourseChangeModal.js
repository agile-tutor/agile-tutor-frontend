import SelectEntityToChange from './SelectEntityToChange';
import { useState, useContext, /*useEffect*/ } from "react";
import { Context } from '../context/Context.js';
import PropTypes from 'prop-types';

const StudentCourseChangeModal = ({ courseId, name, surname, studentid, handleClickChangeStudentCourse }) => {

    const [destinyCourse, setDestinyCourse] = useState(courseId);
    const { courses } = useContext(Context);

    return (

        <div id={"modalchangecourse" + studentid} className="modal">
            {/*console.log(studentid, courseId)*/}
            <div className="modal-content">
                <h4 id="modal-title">Seleccione la nueva comisión del tutorando:</h4>
                <div className="row">
                    <form className="col s12">
                        <div className="row dropdown-upper-row">
                            <div className="input-field col s5">
                                <input disabled value={surname} id="last_name" type="text" className="validate" />
                                <label className="active" htmlFor="last_name">Apellido</label>
                            </div>
                            <div className="input-field col s5">
                                <input disabled value={name} id="first_name" type="text" className="validate" />
                                <label className="active" htmlFor="first_name">Nombre</label>
                            </div>
                            <div className="input-field col s2">
                                <input disabled value={courseId} id="courseid" type="text" className="validate" />
                                <label className="active" htmlFor="courseid">Comisión Actual</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                            </div>
                            <div className="input-field col s6">
                                <SelectEntityToChange setDestinyEntity={setDestinyCourse} entityArray={courses} entityName={"Comisión"} />
                            </div>
                            <div className="input-field col s3">

                            </div>
                        </div>
                    </form>
                </div>
            </div >
            <div className="modal-footer">
                <div>
                    <a href="#!" className="modal-close waves-effect waves btn-flat">Cancelar</a>
                    <a href="#!" onClick={() => { handleClickChangeStudentCourse(destinyCourse); }} className="modal-close waves-effect waves-green btn-flat">Aceptar</a>
                </div>
            </div>
        </div >);
};

StudentCourseChangeModal.propTypes = {
    courseId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    studentid: PropTypes.number.isRequired,
    handleClickChangeStudentCourse: PropTypes.func.isRequired,
  };

export default StudentCourseChangeModal;