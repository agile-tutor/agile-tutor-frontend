import React, { useState } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import logo from "../TIPLOGO.png";
import axios from "axios";

const SignUp = () => {
    const [name, setname] = useState(null);
    const [surname, setsurname] = useState(null);
    const [email, setemail] = useState(null);
    const [password, setpassword] = useState(null);

    const uploadFiedls = () => {

        axios.post("https://exposicion-virtual.herokuapp.com/register",
            {
                "name": name,
                "surname": surname,
                "email": email,
                "password": password
            },
        )
            .then((res) => {
                console.log(res)
                if (!res.ok) {
                    M.toast({ html: "Datos invalidos o el usuario ya existe", classes: "#c62828 red darken-3" });
                } else {
                    M.toast({
                        html: "Se ha creado su usuario satisfactoriamente",
                        classes: "#388e3c green darken-2",
                    });
                    history.push("/login");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const PostData = () => {
        if (!(name && surname && email && password)) {
            M.toast({ html: "Se deben ingresar los datos solicitados", classes: "#c62828 red darken-3" });
        } else {
            uploadFiedls();
        }
    };

    return (
        <div>
            <nav>
                <div className="nav-wrapper bodytitulo">
                    <div className="col s12">
                        <Link to={"/"} className="breadcrumb bodytitulo">Ingrese sus datos para el registro en el sistema</Link>
                    </div>
                </div>
            </nav>
            <div classname="loginRegisterCards">
                <div className="mycard hoverable">
                    <div id="fondoTarjetaLogin" className="card auth-card input-field">
                        <img alt='logo' className="logo-login" src={logo} />

                        <input
                            type="text hoverable"
                            placeholder="Ingrese nombre"
                            id='inputLogin'
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                        <input
                            type="text hoverable"
                            placeholder="Ingrese apellido"
                            id='inputLogin'
                            value={surname}
                            onChange={(e) => setsurname(e.target.value)}
                        />
                        <input
                            type="email hoverable"
                            placeholder="Ingrese email"
                            id='inputLogin'
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <input
                            type="password hoverable"
                            placeholder="Ingrese password"
                            id='inputLogin'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
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
        </div>)
};

export default SignUp;