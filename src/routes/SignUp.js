import React, { useContext, useState } from "react";
import { Context } from '../context/Context.js';
import { Link } from "react-router-dom";
import M from "materialize-css";
import logo from "../TIPLOGO.png";

const SignUp = () => {
    const [name, setname] = useState(null);
    const [surname, setsurname] = useState(null);
    const [email, setemail] = useState(null);
    const [password, setpassword] = useState(null);
    const [passwordcheck, setpasswordcheck] = useState(null);

    const { signUpTutor } = useContext(Context);

    const PostData = () => {
        if (!(name && surname && email && password)) {
            M.toast({ html: "Se deben ingresar los datos solicitados", classes: "#c62828 red darken-3" });
        } else {
            if (!(password == passwordcheck)) {
                M.toast({ html: "La contraseña ingresada no coincide", classes: "#c62828 red darken-3" });
            } else {
                signUpTutor(name, surname, email, password);
            }
        }
    };

    return (
        <div className="main-login-register" >
            < div className="loginRegisterCards" >
                <div className="mycard">
                    <div id="fondoTarjeta" className="card auth-card input-field tarjetaSignUp hoverable">
                        <img alt='logo' className="logo-login" src={logo} />
                        <div className="warning-sign center" > Ingrese sus datos para registrarse: </div>
                        <input
                            type="text hoverable"
                            placeholder="nombre"
                            id='inputLogin'
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                        <input
                            type="text hoverable"
                            placeholder="apellido"
                            id='inputLogin'
                            value={surname}
                            onChange={(e) => setsurname(e.target.value)}
                        />
                        <input
                            type="email hoverable"
                            placeholder="email"
                            id='inputLogin'
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <input
                            type="password hoverable"
                            placeholder="password"
                            id='inputLogin'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        <input
                            type="password hoverable"
                            placeholder="reingrese password"
                            id='inputLogin'
                            value={passwordcheck}
                            onChange={(e) => setpasswordcheck(e.target.value)}
                        />
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