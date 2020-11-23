import React, { useState } from 'react';
import { Segment, Header, Label, Input, Button, Grid, Placeholder } from 'semantic-ui-react';
import Firebase from '../database/firebase';

import { Redirect } from "react-router-dom";

const CreateSecretary = () => {

    const [celular, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('');
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [usuario, setUser] = useState('');

    function handleChange(name, value) {
        switch (name) {
            case 'celular':
                if (value < 1) {

                } else {
                    setPhone(value)
                }
                break;
            case 'usuario':
                if (value < 1) {

                } else {
                    setUser(value)
                }
                break;
            case 'email':
                if (value < 1) {

                } else {
                    setEmail(value)
                }
                break;
            case 'estado':
                if (value < 1) {

                } else {
                    setEstado(value)
                }
                break;
            case 'id':
                if (value < 1) {

                } else {
                    setId(value)
                }
                break;
            case 'nombre':
                if (value < 1) {

                } else {
                    setNombre(value)
                }
                break;
            case 'vaciar':
                setEmail('')
                setEstado('')
                setId('')
                setNombre('')
                setPassword('')
                setPhone('')
                setUser('')
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

        Firebase.write("Secretario", account)

        if (account) {
            console.log('account:', account)
        }
    };

    return (
        <Segment color="teal" className='CreateSecretary-container'>
            <Grid centered columns={2} container>
                <Grid.Row centered>
                    <Grid.Column>
                        <center>

                            Nombre Completo
                        <Input
                                fluid
                                focus
                                icon="user"
                                id='nombre'
                                name='nombre'
                                placeholder='Ingrese su nombre'
                                type='text'
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className='input-error'
                            />

                            Cedula
                            <Input
                                fluid
                                focus
                                icon="id card"
                                id='cedula'
                                name='id'
                                placeholder='Ingrese su identificación'
                                type='text'
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className='regular-style'
                            />

                            <Header.Subheader>Telefono</Header.Subheader>
                            <Input
                                fluid
                                focus
                                icon="phone"
                                id='telefono'
                                name='celular'
                                placeholder='Ingrese su numero celular'
                                type='text'
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className='regular-style'

                            />

                            <Header.Subheader>Correo</Header.Subheader>
                            <Input
                                fluid
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
                                fluid
                                focus
                                icon="user circle"
                                id='usuario'
                                name='usuario'
                                placeholder='Ingresa username'
                                type='text'
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                className='input-error'
                            />

                            <Header.Subheader>Contraseña</Header.Subheader>
                            <Input
                                fluid
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
                                    Contraseña invalida
                                </Label>
                            }
                            <br></br>
                            <Button.Group fluid>
                                <Button primary onClick={(e) => handleSubmit()}>
                                    Registrarse
                            </Button>
                                <Button onClick={(e) => setCreateSecretary(false)}>
                                    Cancelar
                            </Button>
                            </Button.Group>
                        </center>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
};
export default CreateSecretary;