import React, { useState } from 'react';
import './Login.css';
import {Segment, Header, Label, Input, Button, Grid, Divider, Icon} from 'semantic-ui-react';
import { BrowserRouter as Router } from "react-router-dom"
import Firebase from '../database/firebase';

import { Redirect } from "react-router-dom";

const Login = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const[isLogin, setLogin]= useState(true);
    const[isHome, setHome]= useState(true);

    if(!isLogin){
        return <Redirect to = "/createTherapist"/>
    } 
    if(!isHome){
        return <Redirect to = "/home"/>
    } 

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
        var method = function (flag) {
            if (flag) {
                setHome(false)
            } else {
                console.log("Nel prro")
            }
        }
        Firebase.login(user, password, method) 
    };

    return (
        <Router exact path="/login" basename="/login">
        <Segment relaxed color="teal" className='login-container'>
        <Grid stretched padded="horizontally" relaxed columns={2} stackable textAlign='center'>
        <Divider vertical>Or</Divider>
        <Grid.Row verticalAlign='middle'>
            <Grid.Column>
                <Header Icon>
                <Icon name='user'/>
                Ingresar
                </Header>
                <Header.Subheader>Usuario</Header.Subheader>
                <Input 
                    focus
                    icon="envelope"
                    id='usuario'
                    name='usuario'
                    placeholder='Ingrese su correo'
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
                <br></br>
                <Button onClick={(e) => handleSubmit()}>
                Iniciar Sesión
                </Button>

            </Grid.Column>

            <Grid.Column>

                <Header Icon>
                <Icon name='user plus'/>
                Realizar Registros
                </Header>
                <br></br>
                    <Button onClick={() => setLogin(false)}>
                    Registrar Terapeuta
                    </Button>

                    <br></br>
                    <Button onClick={() => handleSubmit()}>
                    Registrar Secretario
                    </Button>
             </Grid.Column>
         </Grid.Row>
         </Grid>
        </Segment>
        </Router>
    )
}

export default Login;