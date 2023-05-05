/* eslint-disable no-undef */
import React from 'react'
import { act, render, screen } from "@testing-library/react"
import Alumno from "./Alumno"
import { Context } from "../context/Context"
import userEvent from '@testing-library/user-event'

const renderAlumno = (defaultvalue) => {
    return render(
        <Context.Provider value={defaultvalue}>
            <table>
                <tbody>
                    <Alumno key={1} id={1} id_asistencia={2} nombre={'nombre'} asistencia={true} clnametr={'Fila-alumno'} disablevalue={false} />
                </tbody>
            </table>
        </Context.Provider>
    );
}

describe('Alumno', () => {
/*
    it('cuando se presiona el check 1 vez el estado es true', async () => {
        const value = {
            updateAttendance: () => { }
        }
        //Arrange
        renderAlumno(value)
        //Act
        await userEvent.click(screen.getByTestId("attendancebutton"))
        //Assert 
        expect(screen.getByTestId("attendancebutton").checked).toEqual(false)
    })
*/
    it('cuando se presiona el check 2 veces el estado es false', async () => {
        const value = {
            updateAttendance: () => { }
        }
        //Arrange
        renderAlumno(value)
        //Act
        act(() => { userEvent.click(screen.getByTestId("attendancebutton")) })
        act(() => { userEvent.click(screen.getByTestId("attendancebutton")) })
        //Assert 
        expect(screen.getByTestId("attendancebutton").checked).toEqual(true)
    })
})