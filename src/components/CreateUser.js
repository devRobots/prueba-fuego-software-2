import React, { useState } from 'react';
import {Segment, Header, Label, Input, Button} from 'semantic-ui-react';
import firebase from '../database/firebase';

const CreateUser = () => {


    const [phone, setPhone ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ direccion, setDireccion ] = useState('');
    const [ birthDate, setbirthDate ] = useState('');
    const [ id, setId ] = useState('');
    const [ nombre, setNombre ] = useState('');
     

    function handleChange(name, value) {
        switch(name) {
            case 'phone':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setPhone(value)
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
            case 'direccion':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setDireccion(value)
                }
                break;
            case 'birthDate':
                if(value < 1) {
                    console.log(value)
                } else {
                    console.log(value)
                    setbirthDate(value)
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
            default:
                console.log('no hay valores.')
        }
    }

    function handleSubmit(params) {
        let account = { phone, email, direccion, birthDate, id, nombre }
        
        var db= new firebase

        db.write("Clientes",account)

        if (account) {
            console.log('account:', account)
        }
    };

    /**
     * ingresar usuario a la base de datos
     * pues falta eso, no es que lo haga lo que hay abajo :v
     */
    return (
        <Segment color="teal" className='login-container'>
            <Header.Subheader>Telefono</Header.Subheader>
            <Input 
                focus
                id='telefono'
                name='phone'
                placeholder='Ingrese su telefono'
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
            
            <Header.Subheader>Direccion</Header.Subheader>
            <Input 
                focus
                id='direccion'
                name='direccion'
                placeholder='Ingrese su direccion'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='regular-style'
            />

            <Header.Subheader>Fecha Nacimiento</Header.Subheader>
            <Input
                focus
                id='Fecha_Nacimiento'
                name='birthDate'
                placeholder='Fecha Nacimiento'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='input-error'
            />
            
            <Header.Subheader>Cedula</Header.Subheader>
            <Input
                focus
                id='cedula'
                name='id'
                placeholder='Ingrese su cedula'
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
            <Button onClick={(e) => handleSubmit()}>
                Registrarse
             </Button>
        </Segment>

    
    )
};

export default CreateUser;