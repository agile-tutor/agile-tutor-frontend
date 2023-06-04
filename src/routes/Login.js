import React, { useState, /*useEffect, useContext*/ } from "react";
import { Link } from "react-router-dom";
import "../Login.css";
import M from "materialize-css";
import logo from "../TIPLOGO.png"
import axios from "axios";

const Login = () => {
    //  const history = useHistory();
    const [mail, setmail] = useState(null);
    const [password, setpassword] = useState(null);
    //  const { /*state, */dispatch } = useContext(userContext);

    const uploadFiedls = () => {
  /*  if (dni < 1000000) {
      M.toast({ html: "DNI Inválido", classes: "#c62828 red darken-3" });
    } else {
    */  axios.post("https://exposicion-virtual.herokuapp.com/login",
        {
            "password": password,
            "userName": mail
        },
    )
            .then(success => {
      /*    localStorage.setItem('nombre', success.data.nombre);
          localStorage.setItem('apellido', success.data.apellido);
          localStorage.setItem('tokenValido', success.headers.authorization);
          axios.defaults.headers['authorization'] = localStorage.getItem('tokenValido')
          localStorage.setItem("user", "usuario");
          dispatch({ type: "USER", payload: "user" });
       */   M.toast({
                html: "Bienvenido"/*`Bienvenido ${localStorage.nombre}`*/,
                classes: "#388e3c green darken-2",
            });
                console.log("success", success.headers.authorization);
                history.push("/");
            }
            )
            .catch(error => {
                console.log(error);
                M.toast({ html: "datos invalidos o el tutor no existe", classes: "#c62828 red darken-3" });
            });
    };

    const PostData = () => {
        if (!(mail && password)) {
            M.toast({ html: "Se deben ingresar los datos solicitados", classes: "#c62828 red darken-3" });
        } else {
            uploadFiedls();
        }
    };

    return (
        <div classname="loginRegisterCards">
            <div className="mycard hoverable">
                <div id="fondoTarjeta" className="card auth-card input-field tarjetaLogin">
                    <img alt="logo" className="logo-login" src={logo} />
                    <h5 className="warning sign center" > Ingrese sus datos para utilizar el sistema </h5>
                    <input
                        type="text hoverable"
                        id='inputLogin'
                        placeholder="Ingrese usuario"
                        value={mail}
                        onChange={(e) => setmail(e.target.value)}
                    />
                    <input
                        type="password hoverable"
                        id='inputLogin'
                        placeholder="Ingrese contraseña"
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