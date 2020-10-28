import React, { useState } from 'react';
import './CreateSecretary.css';
import {Segment, Header, Label, Input, Button} from 'semantic-ui-react';
import Firebase from '../database/firebase';

import { Redirect } from "react-router-dom";

const CreateSecretary = () => {

    const [celular, setPhone ] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ estado, setEstado ] = useState('');
    const [ id, setId ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ usuario, setUser ] = useState('');

    const[isCreateSecretary, setCreateSecretary]= useState(true); 

    if(!isCreateSecretary){
        return <Redirect to = "/login"/>
    }

    function handleChange(name, value) {
        switch(name) {
            case 'celular':
                if(value < 1) {

                } else {
                    setPhone(value)
                }
                break;
            case 'usuario':
                if(value < 1) {

                } else {
                    setUser(value)
                }
                break;
            case 'email':
                if(value < 1) {
                    
                } else {
                    setEmail(value)
                }
                break;
            case 'estado':
                if(value < 1) {

                } else {
                    setEstado(value)
                }
                break;
            case 'id':
                if(value < 1) {

                } else {
                    setId(value)
                }
                break;
            case 'nombre':
                if(value < 1) {

                } else {
                    setNombre(value)
                }
                break;
            case 'password':
                if (value.length < 6) {
                    setPasswordError(true);
                }
                else {
                    setPasswordError(false);
                    setPassword(value)
                }
                break;
            default:
                console.log('no hay valores.')
        }
    }

    function handleSubmit(params) {
        let account = { celular, password, email, estado, id, nombre, usuario }
        
        Firebase.write("Secretario",account)

        if (account) {
            console.log('account:', account)
        }
    };

    return (
        <Segment color="teal" className='CreateSecretary-container'>
            <Header.Subheader>Nombre Completo</Header.Subheader>
            <Input
                focus
                icon = "user"
                id='nombre'
                name='nombre'
                placeholder='Ingrese su nombre'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='input-error'
            />
            
            <Header.Subheader>Cedula</Header.Subheader>
            <Input 
                focus
                icon = "id card"
                id='cedula'
                name='id'
                placeholder='Ingrese su identificación'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='regular-style'
            />

            <Header.Subheader>Telefono</Header.Subheader>
            <Input 
                focus
                icon = "phone"
                id='telefono'
                name='celular'
                placeholder='Ingrese su numero celular'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='regular-style'

            />
            
            <Header.Subheader>Correo</Header.Subheader>
            <Input 
                focus
                icon="envelope"
                id='correo'
                name='email'
                placeholder='Ingrese su correo'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='regular-style'
            />

            <Header.Subheader>Nombre de usuario</Header.Subheader>
            <Input
                focus
                icon = "user circle"
                id='usuario'
                name='usuario'
                placeholder='Ingresa username'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='input-error'
            />
            
            <Header.Subheader>Contraseña</Header.Subheader>
            <Input
                focus
                icon="key"
                id='contraseña'
                name='password'
                placeholder='Ingrese su contraseña'
                type='password'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='input-error'
            />
            {
                passwordError &&
                <Label pointing="above" className='label-error'>
                    contraseña invalida
                </Label>
            }
            
            <Header.Subheader>Estado</Header.Subheader>
                <div onChange={(e) => handleChange(e.target.name, e.target.value)}>
                <input type="radio" value="Activo" name="estado" /> Activo
                <input type="radio" value="Inactivo" name="estado" /> Inactivo
                </div>
            <hr></hr>
            <Button color="blue" onClick={(e) => handleSubmit()}>
                Registrarse
             </Button>
             <br></br>
             <Button color="red" onClick={(e) => setCreateSecretary(false)}>
                Atrás
             </Button>
        </Segment>
    )
};
export default CreateSecretary;