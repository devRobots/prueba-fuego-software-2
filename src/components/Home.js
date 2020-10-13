import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Firebase from "../database/firebase";
import {Input, Button} from 'semantic-ui-react';

const Home = () => {
    
    const [id, setId ] = useState('');
    const [ hora, setHora ] = useState('');
    const [ fecha, setFecha ] = useState('');
    const [ cobrada, setCobro ] = useState('');
    const [ importe, setImporte ] = useState('');
    const [ cancelada, setCancelada ] = useState('');
    const [ observacion, setObservacion] = useState('');

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

    /**
     * Registrar sesiones
     */
    function handleChange(name, value) {
        switch(name) {
            case 'id':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setId(value)
                }
                break;
            case 'hora':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setHora(value)
                }
                break;
            case 'fecha':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setFecha(value)
                }
                break;
            case 'cobrada':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setCobro(value)
                }
                break;
            case 'importe':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setImporte(value)
                }
                break;
            case 'cancelada':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setCancelada(value)
                }
                break;
            case 'observacion':
                    if(value < 1) {
                        console.log(value)
                    } else {
                        console.log(value)
                        setObservacion(value)
                    }
                break;
            default:
                console.log('no hay valores.')
        }
    }

    function handleSubmit(params) {
        let account = {id, hora, fecha, cobrada, cancelada, importe, observacion}

        Firebase.write("Sesiones", account)

        if (account) {
            console.log('account:', account)
        }
    };

    return (
        <center>
            <Input 
            id='cancelada' 
            name='cancelada'  
            placeholder='cancelada' 
            type='text' 
            onChange = {(e) => handleChange(e.target.name, e.target.value)}
            className='regular-style' 
            /> 
            <Input 
            id='cobrada' 
            name='cobrada'  
            placeholder='cobrada' 
            type='text' 
            onChange = {(e) => handleChange(e.target.name, e.target.value)}
            className='regular-style' 
            /> 
            <Input 
            id='fecha'
            name='fecha' 
            placeholder='fecha' 
            type='text' 
            onChange = {(e) => handleChange(e.target.name, e.target.value)}
            className='regular-style' 
            /> 
            <Input 
            id='hora'
            name='hora' 
            placeholder='hora' 
            type='text' 
            onChange = {(e) => handleChange(e.target.name, e.target.value)}
            className='regular-style' 
            /> 
            <Input 
            id='id' 
            name='id' 
            placeholder='id' 
            type='text'
            onChange = {(e) => handleChange(e.target.name, e.target.value)} 
            className='regular-style' 
            /> 
            <Input 
            id='importe' 
            name='importe' 
            placeholder='importe' 
            type='text' 
            onChange = {(e) => handleChange(e.target.name, e.target.value)}
            className='regular-style' 
            /> 
            <Input 
            id='observacion' 
            name='observacion' 
            placeholder='observacion' 
            type='text'
            onChange = {(e) => handleChange(e.target.name, e.target.value)}
            className='regular-style' 
            /> 
            <hr></hr>
            <Button onClick={(e) => handleSubmit()}>
                Registrarse
             </Button>

            <hr></hr>
            <table id="tablaSesiones"></table> 

        </center>
    )
}

export default Home;