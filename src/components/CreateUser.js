import React, { useState } from 'react';
import {Segment, Header, Label, Input, Button} from 'semantic-ui-react';

const CreateUser = () => {


    const [username, setUsername ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordAgain, setPasswordAgain ] = useState('');


    function handleChange(name, value) {
        switch(name) {
            case 'username':
                if(value < 1) {
                    console.log("Error :v?")
                } else {
                    console.log("Error :v?")
                    setUsername(value)
                }
                break;
            case 'firstName':
                if(value < 1) {
                    console.log("Error :v?")
                } else {
                    console.log("Error :v?")
                    setFirstName(value)
                }
                break;
            case 'lastName':
                if(value < 1) {
                    console.log("Error :v?")
                } else {
                    console.log("Error :v?")
                    setLastName(value)
                }
                break;
            case 'password':
                if(value < 1) {
                    console.log("Error :v?")
                } else {
                    console.log("Error :v?")
                    setPassword(value)
                }
                break;
            case 'passwordAgain':
                if(password.length < 6) {
                    console.log("Error :v?")
                } else if( password === value ) {
                    setPasswordAgain(value)
                } else {
                    console.log("Error :v")
                }
                break;
            default:
                console.log('no hay valores.')
        }
    }

    function handleSubmit(params) {
        let account = { username, firstName, lastName, password, passwordAgain }

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
            <Header.Subheader>Usuario</Header.Subheader>
            <Input 
                focus
                icon="user"
                id='usuario'
                name='usuario'
                placeholder='Ingrese su usuario'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='regular-style'
            />
            
            <Header.Subheader>FirstName</Header.Subheader>
            <Input 
                focus
                icon="user"
                id='usuario'
                name='usuario'
                placeholder='Ingrese su usuario'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='regular-style'
            />
            
            <Header.Subheader>LastName</Header.Subheader>
            <Input 
                focus
                icon="user"
                id='usuario'
                name='usuario'
                placeholder='Ingrese su usuario'
                type='text'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='regular-style'
            />

            <Header.Subheader>password</Header.Subheader>
            <Input
                focus
                icon="key"
                id='contraseña'
                name='contraseña'
                placeholder='Ingrese su contraseña'
                type='password'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='input-error'
            />
            
            <Header.Subheader>passwordAgain</Header.Subheader>
            <Input
                focus
                icon="key"
                id='contraseña'
                name='contraseña'
                placeholder='Ingrese su contraseña'
                type='password'
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className='input-error'
            />
        </Segment>
    )
};

export default CreateUser;