import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Firebase from "../database/firebase";

const Home = () => {
    new Firebase().readList("Sesiones", function(data) {
        var element = (
        <div>
            <thead>
                <tr>
                <th>cancelada</th>
                <th>cobrada</th>
                <th>fecha</th>
                <th>hora</th>
                <th>id</th>
                <th>importe</th>
                <th>observacion</th>
                </tr>
            </thead>
            <tbody>{
                data.map((objeto, id) => {
                return (
                <tr key = {id}>
                    <td>{objeto.cancelada ? "Si" : "No"}</td>
                    <td>{objeto.cobrada ? "Si" : "No"}</td>
                    <td>{objeto.fecha}</td>
                    <td>{objeto.hora}</td>
                    <td>{objeto.id}</td>
                    <td>{objeto.importe}</td>
                    <td>{objeto.observacion}</td>
                </tr>
                )
        })}</tbody>
        </div>
        )
        ReactDOM.render(element, document.getElementById('tablaSesiones'))
    })

    return (
        <center>
            <table id="tablaSesiones"></table>
        </center>
    )
}

export default Home