const EmailModal = ({ tutorId, subject, body, setSubject, setBody, handleClickUpdateEmailTemplate }) => {

    return (
        <div id={"modalemail" + tutorId} className="modal">
            <div className="modal-content">
                <h4 id="modal-title">Datos del email a enviar:</h4>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col 10 center">
                                <input defaultValue={subject} onChange={(e) => setSubject(e.target.value)} id="subject_email" type="text" className="validate" />
                                <label className="active" htmlFor="subject_email">Subject</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input disabled value="Buenas noches *nombre-Tutorando*" id="body_1era_linea" type="text" className="validate disable" />
                                <label className="active" htmlFor="body_1era_linea">Body-1Era-Linea</label>
                            </div>
                            <div className="input-field col s12">
                                <textarea defaultValue={body} onChange={(e) => setBody(e.target.value)} id="textarea-body" type="textarea" className="materialize-textarea validate" />
                                <label className="active" htmlFor="textarea">Body</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal-footer">
                <div>
                    <a href="#!" className="modal-close waves-effect waves-red btn-flat">Cancelar</a>
                    <a href="#!" onClick={() => { handleClickUpdateEmailTemplate(); }} className="modal-close waves-effect waves-green btn-flat">Modificar</a>
                </div>
            </div>
        </div>);
};

export default EmailModal;