import React, { useState, useContext, useEffect } from "react";
import { Context } from '../context/Context.js';
import { Link, useNavigate } from "react-router-dom";
import "../Login.css";
import M from "materialize-css";
import logo from "../TIPLOGO.png"

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const { loginTutor, tutor, handleActiveSection, tutorId } = useContext(Context);

    const [inputsVisible, setInputsVisible] = useState([false, false])

    const toggleInputVisibility = (index) => {
        if (index === 0) {
            setInputsVisible([!inputsVisible[0], inputsVisible[1]])
        } else {
            setInputsVisible([inputsVisible[0], !inputsVisible[1]])
        }
    }

    let navigate = useNavigate();

    const PostData = () => {
        if (!(email && password)) {
            M.toast({ html: "Se deben ingresar los datos solicitados", classes: 'rounded red-app-semitr' });
        } else {
            loginTutor(email, password);
        }
    };

    useEffect(() => {
        let elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {});
    }, []);

    useEffect(() => {
        handleActiveSection(99);
    }, []);

    useEffect(() => {
        if (tutorId !== 0 && tutor.email == "admin") {
            navigate(`/dashboard/`)
        }
    }, [tutor]);

    return (
        <div className="loginRegisterCards">
            <div className="mycard">
                <div id="fondoTarjeta" className="card auth-card input-field tarjetaLogin hoverable">
                    <img alt="logo" className="logo-login" src={logo} />
                    <div className="warning-sign center" > Ingrese sus credenciales: </div>
                    <input
                        type="email"
                        id='inputLogin'
                        placeholder="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <div className="row" id='inputLoginPassWidth'>
                        <input
                            type={inputsVisible[0] ? 'text' : 'password'}
                            placeholder="password"
                            className='valdiate col s5'
                            id='inputLoginPass'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <button id='btnLoginPass' className='col s1' onClick={() => toggleInputVisibility(0)} >
                            {inputsVisible[0] ? <i className="material-icons small iconwhite strikediag">remove_red_eye</i> :
                                <i className="material-icons small iconred">remove_red_eye</i>}
                        </button>
                        <br />
                    </div>
                    <button
                        id="botonLogin"
                        className="btn waves-effect waves-light"
                        onClick={() => PostData()}
                    >
                        Ingresar
                    </button>
                    <h5 id="H5Register">
                        <Link id="linkRegister" to="/register">¿No te encuentras registrado?</Link>
                    </h5>
                </div>
            </div>
        </div >)
};

export default Login;