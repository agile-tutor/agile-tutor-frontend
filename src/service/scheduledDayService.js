import axios from 'axios';
import { ScheduledDayModel } from '../domain/scheduledDayModel'
import { REST_SERVER_URL } from './constants'
import data from '../meetingsJson.json';
import M from 'materialize-css/dist/js/materialize.min.js';

class ScheduledDayService {

    scheduledDayAsJson(scheduledDayJson) {
        return ScheduledDayModel.fromJson(scheduledDayJson)
    }

    async getAllMeetings() {

        try {
            const meetingsJson = await axios.get(
                `${REST_SERVER_URL}/api/meeting`,
                {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': 'true'
                    },
                    credentials: 'same-origin',
                })
            const meetings = meetingsJson.data.map(this.scheduledDayAsJson);
            return meetings.sort((a, b) => (a.day < b.day) ? -1 : 1);
        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }

    async addNewMeeting(newMeeting) {
        try {
            const meetingJson = await axios({
                url: `${REST_SERVER_URL}/api/meeting/register`,
                method: 'POST',
                data: JSON.stringify(newMeeting),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
            });
            /*console.log(meetingJson);*/
            const meeting = this.scheduledDayAsJson(meetingJson);
            M.toast({
                html: `Encuentro creado exitosamente`, classes: 'rounded blue-app-semitr'
            });
            return meeting;
        } catch (err) {
            M.toast({ html: "Datos invalidos o encuentro existente", classes: 'rounded red-app-semitr' });
            console.log(err);
        }
    }

    async updateMeeting(id, modifiedMeeting) {
        try {
            const meetingJson = await axios({
                url: `${REST_SERVER_URL}/api/meeting/${id}`,
                method: 'PUT',
                data: JSON.stringify(modifiedMeeting),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true'
                },
            })
            const meeting = this.scheduledDayAsJson(meetingJson);
            console.log(meetingJson);
            M.toast({ html: 'Encuentro actualizado con éxito!', classes: 'rounded blue-app-semitr' })
            return meeting
        } catch (e) {
            M.toast({ html: "Datos invalidos o encuentro existente", classes: 'rounded red-app-semitr' });
            console.error(e)
        }
    }

    async deleteMeeting(meetingId) {
        try {

            // Make a DELETE request to the API with the given ID
            const response = await axios({
                url: `${REST_SERVER_URL}/api/meeting/${meetingId}`,
                method: 'delete'
            });
            console.log(response.data);
            M.toast({ html: 'Encuentro eliminado!', classes: 'rounded blue-app-semitr' })
        } catch (error) {
            M.toast({ html: "Datos invalidos o encuentro inexistente", classes: 'rounded red-app-semitr' });
            // Log any errors that occur
            console.error(error);
        }
    }

    async getAllMeetingsLocal() {
        /*
                try {
                    const meetingsJson = await axios.get(
                        `${REST_SERVER_URL}/api/meetings`
                        , {
                        method: 'GET',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Credentials': 'true'
                        },
                        credentials: 'same-origin',
                    })
                    console.log(meetingsJson);
                    const meetings = meetingsJson.data.map(this.scheduledDayAsJson);
                    return meetings.sort((a, b) => (a.day < b.day) ? -1 : 1);
                } catch (error) {
                    console.error(error);
                    console.log(error);
                }*/
        let meetings = await data.map(this.scheduledDayAsJson);
        return meetings;
    }
}

export const scheduledDayService = new ScheduledDayService()