import { TutorModel } from '../domain/tutorModel';
import { REST_SERVER_URL } from './constants';
import M from "materialize-css";
import axios from "axios";

class TutorService {

    tutorAsJson(tutorJson) {
        return TutorModel.fromJson(tutorJson)
    }

    async registerTutor(name, surname, email, password) {
        try {
            const tutorJson = await axios.post(`${REST_SERVER_URL}/api/tutor/register`,
                {
                    "name": name,
                    "surname": surname,
                    "email": email,
                    "password": password
                },
            );
            M.toast({
                html: "Se ha creado su usuario satisfactoriamente",
                classes: "#388e3c green darken-2",
            });
            return tutorJson;
        } catch (err) {
            M.toast({ html: "Datos invalidos o el usuario ya existe", classes: "#c62828 red darken-3" });
            console.log(err);
        }
    }
}

export const tutorService = new TutorService()