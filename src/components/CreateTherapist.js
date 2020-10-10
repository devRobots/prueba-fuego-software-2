import React, { useState } from 'react';
import './CreateTherapist.css';
import {Segment, Header, Label, Input, Button} from 'semantic-ui-react';
import firebase from '../database/firebase';

const CreateTherapist = () => {


    const [celular, setPhone ] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ estado, setEstado ] = useState('');
    const [ id, setId ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ usuario, setUser ] = useState('');
     

    function handleChange(name, value) {
        switch(name) {
            case 'celular':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setPhone(value)
                }
                break;
            case 'usuario':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setUser(value)
                }
                break;
            case 'email':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setEmail(value)
                }
                break;
            case 'estado':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setEstado(value)
                }
                break;
            case 'id':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setId(value)
                }
                break;
            case 'nombre':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
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
        
        var db= new firebase

        db.write("Terapeutas",account)
        db.RegisterUser(email, password);

        if (account) {
            console.log('account:', account)
        }
    };

    /**
     * ingresar usuario a la base de datos
     * pues falta eso, no es que lo haga lo que hay abajo :v
     */
    return (
        <Segment color="teal" className='CreateTherapist-container'>
            <Header.Subheader>Telefono</Header.Subheader>
            <Input 
                focus
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
                icon="user"
                id='correo'
                name='email'
                placeholder='Ingrese su correo'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='regular-style'
            />
            
            <Header.Subheader>Cedula</Header.Subheader>
            <Input 
                focus
                id='cedula'
                name='id'
                placeholder='Ingrese su identificación'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='regular-style'
            />

            <Header.Subheader>Nombre de usuario</Header.Subheader>
            <Input
                focus
                id='usuario'
                name='usuario'
                placeholder='Ingresa nombre de usuario'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='input-error'
            />
            <Header.Subheader>Nombre Completo</Header.Subheader>
            <Input
                focus
                id='nombre'
                name='nombre'
                placeholder='Ingrese su nombre'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='input-error'
            />
            <Header.Subheader>Estado</Header.Subheader>
            <Input
                focus
                id='estado'
                name='estado'
                placeholder='Ingrese su estado'
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
                    contraseña invalida o incompleta
                </Label>
            }
            <hr></hr>
            <Button onClick={(e) => handleSubmit()}>
                Registrarse
             </Button>
        </Segment>
    )
};

export default CreateTherapist;