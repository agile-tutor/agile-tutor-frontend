import { useState, useContext, useEffect } from "react";
import { Context } from '../context/Context.js';
//import Select from "react-select";
import '../App.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const SelectCourseToChange = ({ setDestinyCourse }) => {

    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
        let elems = document.querySelectorAll('.select');
        M.FormSelect.init(elems, { inDuration: 300, outDuration: 225 });
    }, []);

    const handleTypeSelect = e => {
        e.preventDefault();
        console.log("dentroDeHanle" + e.target.value);
        setSelectedOption(e.target.value);
        setDestinyCourse(e.target.value)
    };

    const { getAllCourses, courses } = useContext(Context);

    useEffect(() => {
        getAllCourses();
    }, []);


    return (
        courses.length ?
            < div className="input-field" >
                {/*<div >        {console.log(courses)}{
                <Select
                    options={courses}
                    onChange={handleTypeSelect}
                    value={courses.filter(function (course) {
                        return course.name === selectedOption;
                    })}
                    label="Single select"
                    style={styles.select}
                    className="styled-select"
                />}
                </div>*/}


                <select className="browser-default" value="" onChange={handleTypeSelect}>
                    <option value="" disabled selected>Seleccione una comisión</option>
                    {courses.map((course) => {
                        return <option value={course.id}>{course.id}</option>
                    })}
                </select>
                {
                    <div>
                        < label className="label-course-id"> Comisión Destino: {selectedOption} </label >
                    </div>
                } </div >
            :
            <div></div>
    );
};

export default SelectCourseToChange;