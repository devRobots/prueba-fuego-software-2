import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from "../database/firebase";
import {Input} from 'semantic-ui-react';

const Home = () => {
    Firebase.readList("Sesiones", function(data) {
        var element = (
        <div>
            <thead>
                <tr>
                <th>id</th>
                <th>cancelada</th>
                <th>cobrada</th>
                <th>fecha</th>
                <th>hora</th>
                <th>importe</th>
                <th>observacion</th>
                </tr>
            </thead>
            <tbody>{
                data.map((objeto, id) => {
                return (
                <tr key = {id}>
                    <td>{objeto.id}</td>
                    <td>{objeto.cancelada ? "Si" : "No"}</td>
                    <td>{objeto.cobrada ? "Si" : "No"}</td>
                    <td>{objeto.fecha}</td>
                    <td>{objeto.hora}</td>
                    <td>{objeto.importe}</td>
                    <td>{objeto.observacion}</td>
                    <button>Editar</button>
                    <button onClick={(e) => Firebase.remove("Sesiones",objeto)}>Eliminar</button>
                </tr>
                )
        })}</tbody>
        </div>
        )
        ReactDOM.render(element, document.getElementById('tablaSesiones'))
    })

    return (
        <center> 
            <Input id='cancelada' name='cancelada'  
            placeholder='cancelada' type='text' className='regular-style' 
            /> 
            <Input id='cobrada' name='cobrada'  
            placeholder='cobrada' type='text' className='regular-style' 
            /> 
            <Input id='fecha' name='fecha' 
                placeholder='fecha' type='text' className='regular-style' 
            /> 
            <Input id='hora' name='hora' 
                placeholder='hora' type='text' className='regular-style' 
            /> 
            <Input id='id' name='id' 
                placeholder='id' type='text' className='regular-style' 
            /> 
            <Input id='importe' name='importe' 
                placeholder='importe' type='text' className='regular-style' 
            /> 
            <Input id='observacion' name='observacion' 
                placeholder='observacion' type='text' className='regular-style' 
            /> 
            <table id="tablaSesiones"></table> 
        </center>
    )
}

export default Home