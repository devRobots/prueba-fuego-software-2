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

    const[isLogin, setLogin]= useState(1);
    const[isHome, setHome]= useState(true);
    const[isTerapeuta, setTerapeuta]= useState(true);

    if(isLogin!==1){
        if(isLogin===2)
        {
            return <Redirect to = "/createTherapist"/>
        }
        if(isLogin===3)
        {
            return <Redirect to = "/createUser"/>
        }
        
    }

    if(!isHome)
    {
        return <Redirect to = "/Home"/>
    }
    if(!isTerapeuta)
    {
        return <Redirect to = "/SearchUser"/>
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
        var method = function (terapeuta ,secretario) {
            if (terapeuta) {
                setTerapeuta(false)
            } else if(secretario){
                setHome(false)
            } else{
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
                    <Button onClick={() => setLogin(2)}>
                    Registrar Terapeuta
                    </Button>

                    <br></br>
                    <Button onClick={() => setLogin(3)}>
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