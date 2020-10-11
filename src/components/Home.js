import React, { useState } from 'react';
import Firebase from "../database/firebase";

const Home = () => {
    var saludar = () => {
        alert("Hola mundo");
    };
    /**
     * <Button onClick={(e) => handleSubmit()}>
                Registrarse
             </Button>
     */

    var db = new Firebase();
    var metodo = function(data) {
        data.map((o, i) => {
            document.getElementById("listaSesiones").innerHTML += "<tr key='" + i+ "'>" +
                        "<td>" + o.cancelada + "</td>" + 
                        "<td>" + o.cobrada + "</td>" +
                        "<td>" + o.fecha + "</td>" +
                        "<td>" + o.hora + "</td>" +
                        "<td>" + o.id + "</td>" +
                        "<td>" + o.importe + "</td>" +
                        "<td>" + o.observacion + "</td>" +
                        "<td> <input type='button' value='editar' onClick='alert(\"Hola mundo\")' /> </td>"+ 
                    "</tr>"
            
        })
    }
    db.readList("Sesiones",  metodo)

    return (
        <center>
        <table>
            <thead><tr>
                <th>cancelada</th>
                <th>cobrada</th>
                <th>fecha</th>
                <th>hora</th>
                <th>id</th>
                <th>importe</th>
                <th>observacion</th>
                <th>editar</th>
                </tr></thead>
            <tbody id="listaSesiones">
            </tbody>
        </table>
        </center>
    )
}

export default Home;