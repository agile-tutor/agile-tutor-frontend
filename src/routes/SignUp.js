import React, { useContext, useState, useEffect } from "react";
import { Context } from '../context/Context.js';
import { Link } from "react-router-dom";
import M from "materialize-css";
import logo from "../TIPLOGO.png";

const SignUp = () => {
    const [name, setname] = useState('');
    const [surname, setsurname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [passwordcheck, setpasswordcheck] = useState('');

    const [inputsVisible, setInputsVisible] = useState([false, false])

    const toggleInputVisibility = (index) => {
        if (index === 0) {
            setInputsVisible([!inputsVisible[0], inputsVisible[1]])
        } else {
            setInputsVisible([inputsVisible[0], !inputsVisible[1]])
        }
    }

    const { signUpTutor, handleActiveSection } = useContext(Context);

    const PostData = () => {
        if (!(name && surname && email && password)) {
            M.toast({ html: "Se deben ingresar los datos solicitados", classes: 'rounded red-app-semitr' });
        } else {
            if (!(password == passwordcheck)) {
                M.toast({ html: "La contraseña ingresada no coincide", classes: 'rounded red-app-semitr' });
            } else {
                signUpTutor(name, surname, email, password);
                cleanForm();
            }
        }
    };

    const cleanForm = () => {
        setname("");
        setsurname("");
        setemail("");
        setpassword("");
        setpasswordcheck("");
    }

    useEffect(() => {
        handleActiveSection(98);
    }, []);

    return (
        <div className="main-login-register" >
            < div className="loginRegisterCards" >
                <div className="mycard">
                    <div id="fondoTarjeta" className="card auth-card input-field tarjetaSignUp hoverable">
                        <img alt='logo' className="logo-login" src={logo} />
                        <div className="warning-sign center" > Ingrese sus datos para el registro: </div>
                        <input
                            type="text"
                            placeholder="nombre"
                            id='inputLogin'
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="apellido"
                            id='inputLogin'
                            value={surname}
                            onChange={(e) => setsurname(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="email"
                            id='inputLogin'
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
                                {inputsVisible[0] ? <i className="material-icons small iconwhite strikediag">remove_red_eye</i> : <i className="material-icons small iconred">remove_red_eye</i>}
                            </button>
                            <br />
                        </div>
                        <div className="row" id='inputLoginPassWidth'>
                            <input
                                type={inputsVisible[1] ? 'text' : 'password'}
                                placeholder="reingrese password"
                                className='valdiate col s5'
                                id='inputLoginPass'
                                value={passwordcheck}
                                onChange={(e) => setpasswordcheck(e.target.value)}
                            />
                            <button id='btnLoginPass' className='col s1' onClick={() => toggleInputVisibility(1)} >
                                {inputsVisible[1] ? <i className="material-icons small iconwhite strikediag">remove_red_eye</i> : <i className="material-icons small iconred">remove_red_eye</i>}
                            </button>
                            <br />
                        </div>
                        <button
                            id="botonLogin"
                            className="btn waves-effect waves-light"
                            onClick={() => PostData()}
                        >
                            Registrar
                        </button>
                        <h5 id="H5Register">
                            <Link id="linkRegister" to="/">¿Ya te encuentras registrado?</Link>
                        </h5>
                    </div>
                </div>
            </div>
        </div >)
};

export default SignUp;