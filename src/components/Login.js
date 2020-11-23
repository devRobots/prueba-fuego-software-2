import React, { useContext, useState } from 'react';
import './Login.css';
import { Segment, Header, Label, Input, Button, Grid, Divider, Icon } from 'semantic-ui-react';
import { BrowserRouter as Router } from "react-router-dom"
import Firebase from '../database/firebase';
import userContext from './userContext'
import { Redirect } from "react-router-dom";

const Login = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [isLogin, setLogin] = useState(1);
    const [isHome, setHome] = useState(true);
    const [isTerapeuta, setTerapeuta] = useState(true);
    const { usuario, setUsuario } = useContext(userContext)

    if (isLogin !== 1) {
        if (isLogin === 2) {
            return <Redirect to="/createTherapist" />
        }
        if (isLogin === 3) {
            return <Redirect to="/createSecretary" />
        }
        if (isLogin === 4) {
            return <Redirect to="/Gestionar" />
        }
        if (isLogin === 5) {
            return <Redirect to="/SearchUser" />
        }
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
        var method = function (terapeuta, secretario) {
            if (terapeuta) {
                setLogin(5)
            } else if (secretario) {
                setLogin(4)
            }
        }
        Firebase.login(user, password, method, setUsuario)
    };
    handleSubmit()

    return (
        <Router exact path="/login" basename="/login">
            <Segment relaxed color="teal" className='login-container'>
                <Grid stretched padded="horizontally" relaxed stackable textAlign='center'>
                    <Grid.Row horizontalAlign='middle'>
                        <Grid.Column>
                            <Header Icon>
                                <Icon name='user' />
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
                        </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal>Or</Divider>
                    <Grid.Row>
                        <Grid.Column>

                            <Button onClick={() => setLogin(3)}>
                                <Icon name='user plus' />
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