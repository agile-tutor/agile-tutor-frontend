import { useEffect, useState, useContext } from 'react';
import { Context } from '../context/Context.js';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import logo from '../TIPLOGO.png';
import '../App.css';

function Survey() {

    const { studentAuth, checkStudentAuth, saveSurvey } = useContext(Context)

    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    const [isCheckedWiFi, setIsCheckedWiFi] = useState(false);
    const [isCheckedDatos, setIsCheckedDatos] = useState(false);
    const [isCheckedPc, setIsCheckedPc] = useState(false);
    const [isCheckedNotebook, setIsCheckedNotebook] = useState(false);
    const [isCheckedCelular, setIsCheckedCelular] = useState(false);
    const [isCheckedTablet, setIsCheckedTablet] = useState(false);

    const [entorno, setEntorno] = useState("Ns/Nc");
    const [exclusividad, setExclusividad] = useState("Ns/Nc");
    const [estado, setEstado] = useState("Ns/Nc");

    const [change, setChange] = useState(false);

    const [completeSurvey, setCompleteSurvey] = useState(false);

    const [submitIntent, setSubmitIntent] = useState(false);

    const handleRadioEntorno = e => {
        e.preventDefault();
        /*console.log("dentroDeHanle" + e.target.value);*/
        setEntorno(e.target.value);
    };
    const handleRadioExclusividad = e => {
        e.preventDefault();
        /*console.log("dentroDeHanle" + e.target.value);*/
        setExclusividad(e.target.value);
    };
    const handleRadioEstado = e => {
        e.preventDefault();
        /*console.log("dentroDeHanle" + e.target.value);*/
        setEstado(e.target.value);
    };

    const handleOnChangeWiFi = () => {
        setIsCheckedWiFi(!isCheckedWiFi);
    };

    const handleOnChangeDatos = () => {
        setIsCheckedDatos(!isCheckedDatos);
    };

    const handleOnChangePc = () => {
        setIsCheckedPc(!isCheckedPc);
    };

    const handleOnChangeNotebook = () => {
        setIsCheckedNotebook(!isCheckedNotebook);
    };

    const handleOnChangeCelular = () => {
        setIsCheckedCelular(!isCheckedCelular);
    };

    const handleOnChangeTablet = () => {
        setIsCheckedTablet(!isCheckedTablet);
    };

    const handleSubmitSurvey = () => {
        setSubmitIntent(true);
        if (city === '') {
            M.toast({ html: 'Ingresar su ciudad de residencia', classes: 'rounded red-app-semitr' });
        } else {
            const completeSurvey = {
                "ciudad": city,
                "wifi": isCheckedWiFi,
                "datos": isCheckedDatos,
                "pc": isCheckedPc,
                "notebook": isCheckedNotebook,
                "celular": isCheckedCelular,
                "tablet": isCheckedTablet,
                "entorno": entorno,
                "exclusividad": exclusividad,
                "estado": estado
            }
            /*console.log('handle submit' + completeSurvey);*/
            saveSurvey(email, completeSurvey);
            setCompleteSurvey(true);
        }
    };

    const PostStudentEmail = (e) => {
        e.preventDefault();
        /*console.log("checkemail" + email)*/
        if (email === "") {
            M.toast({ html: "Ingrese el email con el que se encuentra registrado", classes: 'rounded red-app-semitr' });
        } else {
            checkStudentAuth(email);
        }
    };

    useEffect(() => {
        setChange(!change)
    }, [entorno, exclusividad, estado])

    return (
        <div>
            {!completeSurvey ?
                <div>
                    <div className='titulo-tabla survey'> Encuesta socioambiental del ingresante </div>
                    <div className="row body-survey">
                        <form className="col s12">
                            {studentAuth ? <div></div> :
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="email" type="email" className="validate" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label htmlFor="email">Email</label>
                                        <button id='boton-emailcheck' className='btn waves-effect waves-light' type="submit" name='action' onClick={(e) => PostStudentEmail(e)}>
                                            <i id="boton-emailcheck" className='material-icons left'>send </i>Comprobar Email
                                        </button>
                                    </div>
                                </div>
                            }
                            {!studentAuth ? <div></div> :
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="city" type="text" className="validate" value={city}
                                            onChange={(e) => setCity(e.target.value)} required />
                                        <label htmlFor="city">Ciudad de residencia</label>
                                        {(submitIntent && !city) ?
                                            <p className='texto-campo-requerido right'>*Campo obligatorio. Debe ingresar la ciudad en la que reside</p>
                                            : <div></div>}
                                    </div>
                                </div>
                            }
                        </form>
                        {!studentAuth ? <div></div> :
                            <form action="#">
                                <div className='title-survey-param'>¿Cómo considera al entorno físico disponible en su hogar para estudiar?</div>
                                <p>
                                    <label>
                                        <input name="group3" type="radio" value="Bueno" checked={entorno == "Bueno"} onChange={handleRadioEntorno} />
                                        <span>Bueno</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="group3" type="radio" value="Regular" checked={entorno == "Regular"} onChange={handleRadioEntorno} />
                                        <span>Regular</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="group3" type="radio" value="Malo" checked={entorno == "Malo"} onChange={handleRadioEntorno} />
                                        <span>Malo</span>
                                    </label>
                                </p>
                                <div className="divider"></div>
                                <div className='title-survey-param'>¿Dispone de algún tipo de conexión a internet?</div>
                                <p>
                                    <label>
                                        <input type="checkbox" checked={isCheckedWiFi} onChange={handleOnChangeWiFi} />
                                        <span>Wifi</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input type="checkbox" checked={isCheckedDatos} onChange={handleOnChangeDatos} />
                                        <span>Datos</span>
                                    </label>
                                </p>
                                <div className="divider"></div>
                                <div className='title-survey-param'>¿Cuáles dispositivos cuenta en su hogar?</div>
                                <p>
                                    <label>
                                        <input type="checkbox" checked={isCheckedPc} onChange={handleOnChangePc} />
                                        <span>PC</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input type="checkbox" checked={isCheckedNotebook} onChange={handleOnChangeNotebook} />
                                        <span>Notebook</span>
                                    </label>
                                </p>                    <p>
                                    <label>
                                        <input type="checkbox" checked={isCheckedCelular} onChange={handleOnChangeCelular} />
                                        <span>Celular</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input type="checkbox" checked={isCheckedTablet} onChange={handleOnChangeTablet} />
                                        <span>Tablet</span>
                                    </label>
                                </p>
                                <div className="divider"></div>
                                <div className='title-survey-param'>¿Que tipo de acceso cuenta para el uso de la computadora?</div>
                                <p>
                                    <label>
                                        <input name="group1" type="radio" value="Exclusivo" checked={exclusividad == "Exclusivo"} onChange={handleRadioExclusividad} />
                                        <span>Exclusivo</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="group1" type="radio" value="Compartido" checked={exclusividad == "Compartido"} onChange={handleRadioExclusividad} />
                                        <span>Compartido</span>
                                    </label>
                                </p>
                                <div className="divider"></div>
                                <div className='title-survey-param'>¿Cuál diría que es el estado del equipo?</div>
                                <p>
                                    <label>
                                        <input name="group2" type="radio" value="Bueno" checked={estado == "Bueno"} onChange={handleRadioEstado} />
                                        <span>Bueno</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="group2" type="radio" value="Regular" checked={estado == "Regular"} onChange={handleRadioEstado} />
                                        <span>Regular</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="group2" type="radio" value="Malo" checked={estado == "Malo"} onChange={handleRadioEstado} />
                                        <span>Malo</span>
                                    </label>
                                </p>
                            </form>}
                        {!studentAuth ? <div></div> :
                            <button id='boton-survey' className='btn waves-effect waves-light' type="submit" name='action' onClick={() => handleSubmitSurvey()}>
                                <i id="guardar-asistencias-boton" className='material-icons left'>save </i>  Enviar Respuestas
                            </button>}
                    </div>
                </div> :
                <div>
                    <img src={logo} className="App-logo image-survey" alt="logo" />
                    <div className='thanksForSubmitSurvey center'>Gracias por su participación en la encuesta del taller de vida universitaria.</div>
                </div>}
        </div>
    )
}

export default Survey