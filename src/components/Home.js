import React, { useState } from 'react';
import Firebase from "../database/firebase";

const Home = () => {

    const state ={
        sesiones: [
            {
                cancelada: "si",
                cobrada: "",
                fecha: "",
                hora: "",
                id: "",
                importe:"",
                observacion: ""
            },
            {
                cancelada: "si",
                cobrada: "",
                fecha: "",
                hora: "",
                id: "",
                importe:"",
                observacion: ""
            }
        ]
    }


    return (
        <table>
            <thead><tr>
                <th>cancelada</th>
                <th>cobrada</th>
                <th>fecha</th>
                <th>hora</th>
                <th>id</th>
                <th>importe</th>
                <th>observacion</th>
                </tr></thead>
            <tbody>
                {
                state.sesiones.map((objeto, id) =>{
                        return<tr key = {id}>
                            <td>{objeto.cancelada}</td>
                            <td>{objeto.cobrada}</td>
                            <td>{objeto.fecha}</td>
                            <td>{objeto.hora}</td>
                            <td>{objeto.id}</td>
                            <td>{objeto.importe}</td>
                            <td>{objeto.observacion}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default Home;