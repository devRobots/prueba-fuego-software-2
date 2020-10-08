import React, { useState } from 'react';
import './Login.css';
import {Segment, Header, Label, Input, Button} from 'semantic-ui-react';

const Login = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    function handleChange(name, value) {
        if (name === 'usuario') {
            setUser(value)
        }
        else {
            if (value.length < 6) {
                setPasswordError(true);
            }
            else {
                setPasswordError(false);
                setPassword(value)
            }
        }
    };

    function handleSubmit(params) {
        let account = { user, password }

        if (account) {
            console.log('account:', account)
        }
    };

    return (
        <Segment color="teal" className='login-container'>
            <Header as="h3">Ingresar</Header>
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
            <Header.Subheader>Contraseña</Header.Subheader>
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
}

export default Login;