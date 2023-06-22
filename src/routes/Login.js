import React, { useState, useContext } from "react";
import { Context } from '../context/Context.js';
import { Link } from "react-router-dom";
import "../Login.css";
import M from "materialize-css";
import logo from "../TIPLOGO.png"

const Login = () => {
    const [email, setemail] = useState(null);
    const [password, setpassword] = useState(null);
    const { loginTutor } = useContext(Context);

    const PostData = () => {
        if (!(email && password)) {
            M.toast({ html: "Se deben ingresar los datos solicitados", classes: "#c62828 red darken-3" });
        } else {
            loginTutor(email, password);
        }
    };

    return (
        <div className="loginRegisterCards">
            <div className="mycard">
                <div id="fondoTarjeta" className="card auth-card input-field tarjetaLogin hoverable">
                    <img alt="logo" className="logo-login" src={logo} />
                    <div className="warning-sign center" > Ingrese sus datos de acceso: </div>
                    <input
                        type="email hoverable"
                        id='inputLogin'
                        placeholder="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <input
                        type="password hoverable"
                        id='inputLogin'
                        placeholder="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <button
                        id="botonLogin"
                        className="btn waves-effect waves-light"
                        onClick={() => PostData()}
                    >
                        Ingresar
                    </button>
                    <h5 id="H5Register">
                        <tr />
                        <Link id="linkRegister" to="/register">¿No te encuentras registrado?</Link>
                    </h5>
                </div>
            </div>
        </div>)
};

export default Login;