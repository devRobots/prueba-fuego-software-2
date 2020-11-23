import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
    Grid, Header, Label, Input, Button, Modal,
    Table, TableHeader, TableBody, TableHeaderCell,
    TableRow, Icon
} from 'semantic-ui-react';
import Firebase from '../database/firebase';

import { Redirect } from "react-router-dom";

const CreateTherapist = () => {
    const [celular, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [email, setEmail] = useState('');
    const [estado, setEstado] = useState('');
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [usuario, setUser] = useState('');

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(objeto) {
        setId(objeto.id)
        setNombre(objeto.nombre)
        setPhone(objeto.celular)
        setEmail(objeto.email)
        setUser(objeto.usuario)
        setPassword(objeto.password)
        setEstado(objeto.estado)
        setIsOpen(true)
    }

    function closeModal() {
        handleChange('vaciar', null)
        setIsOpen(false);
    }

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


    Firebase.readList("Terapeutas", function (data) {
        var element = (
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Nombre</TableHeaderCell>
                        <TableHeaderCell>Celular</TableHeaderCell>
                        <TableHeaderCell>Correo</TableHeaderCell>
                        <TableHeaderCell>Usuario</TableHeaderCell>
                        <TableHeaderCell>Contraseña</TableHeaderCell>
                        <TableHeaderCell>Estado</TableHeaderCell>
                        <TableHeaderCell>Gestionar</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>{
                    data.map((objeto, id) => {
                        return (
                            <tr key={id}>
                                <Table.Cell>{objeto.id}</Table.Cell>
                                <Table.Cell>{objeto.nombre}</Table.Cell>
                                <Table.Cell>{objeto.celular}</Table.Cell>
                                <Table.Cell>{objeto.email}</Table.Cell>
                                <Table.Cell>{objeto.usuario}</Table.Cell>
                                <Table.Cell>{objeto.password}</Table.Cell>
                                <Table.Cell>{objeto.estado}</Table.Cell>
                                <Table.Cell>
                                    <Button.Group>
                                        <Button icon color="red" onClick={(e) => Firebase.remove("Terapeutas", objeto)}>
                                            <Icon name='delete' />
                                        </Button>
                                        <Button icon color="yellow" onClick={(e) => openModal(objeto)} id="modal-create-thanks-you">
                                            <Icon name='edit' />
                                        </Button>
                                    </Button.Group>
                                </Table.Cell>

                                <Modal 
                                    onClose={() => closeModal}
                                    size = "mini"
                                    onOpen={() => setIsOpen(true)}
                                    open={modalIsOpen} 
                                >
                                    <Modal.Header>
                                            <Header icon='user' content='Editar Terapeuta' />
                                    </Modal.Header>
                                    <Modal.Content>
                                    <Header.Subheader>Nombre Completo</Header.Subheader>
                                        <Input
                                            fluid
                                            id='nombre'
                                            name='nombre'
                                            placeholder='Ingrese su nombre'
                                            type='text'
                                            value = {nombre}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        />

                                        <Header.Subheader>Cedula</Header.Subheader>
                                        <Input
                                            fluid
                                            id='cedula'
                                            name='id'
                                            placeholder='Ingrese su identificación'
                                            type='text'
                                            value={id}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        />

                                        <Header.Subheader>Telefono</Header.Subheader>
                                        <Input
                                            fluid
                                            id='telefono'
                                            name='celular'
                                            placeholder='Ingrese su numero celular'
                                            type='text'
                                            value= {celular}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}

                                        />

                                        <Header.Subheader>Correo</Header.Subheader>
                                        <Input
                                            fluid
                                            id='correo'
                                            name='email'
                                            placeholder='Ingrese su correo'
                                            type='text'
                                            value = {email}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        />

                                        <Header.Subheader>Nombre de usuario</Header.Subheader>
                                        <Input
                                            fluid
                                            id='usuario'
                                            name='usuario'
                                            placeholder='Ingresa username'
                                            type='text'
                                            value = {usuario}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        />

                                        <Header.Subheader>Contraseña</Header.Subheader>
                                        <Input
                                            fluid
                                            id='contraseña'
                                            name='password'
                                            placeholder='Ingrese su contraseña'
                                            type='text'
                                            value= {password}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        />
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color='red' onClick={closeModal}>
                                        <Icon name='remove' /> Cancelar
                                        </Button>
                                        <Button color='green' onClick={() => handleEdit()}>
                                        <Icon name='checkmark' /> Editar
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </tr>
                        )
                    })}</TableBody>
            </Table>
        )
        ReactDOM.render(element, document.getElementById('tablaTerapeutas'))
    })

    function handleEdit(params) {
        let account = { celular, password, email, estado, id, nombre, usuario }
        Firebase.put("Sesiones", account)
        handleChange('vaciar', null)
        closeModal()
    };
    
    function handleSubmit(params) {
        let account = { celular, password, email, estado, id, nombre, usuario }

        Firebase.write("Terapeutas", account)

        if (account) {
            console.log('account:', account)
        }
    };

    /**
     * ingresar usuario a la base de datos
     * pues falta eso, no es que lo haga lo que hay abajo :v
     */
    return (
        <Grid centered columns={2}>
            <Grid.Column width={5}>
                <Header Icon>
                    <Icon name='user' />
                    <Header.Content>
                        Gestionar Terapeutas
                        <Header.Subheader>Ingrese los parametros del terapeuta</Header.Subheader>
                    </Header.Content>
                </Header>
                <Header.Subheader>Nombre Completo</Header.Subheader>
                <Input
                    fluid
                    id='nombre'
                    name='nombre'
                    placeholder='Ingrese su nombre'
                    type='text'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />

                <Header.Subheader>Cedula</Header.Subheader>
                <Input
                    fluid
                    id='cedula'
                    name='id'
                    placeholder='Ingrese su identificación'
                    type='text'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />

                <Header.Subheader>Telefono</Header.Subheader>
                <Input
                    fluid
                    id='telefono'
                    name='celular'
                    placeholder='Ingrese su numero celular'
                    type='text'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}

                />

                <Header.Subheader>Correo</Header.Subheader>
                <Input
                    fluid
                    id='correo'
                    name='email'
                    placeholder='Ingrese su correo'
                    type='text'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />

                <Header.Subheader>Nombre de usuario</Header.Subheader>
                <Input
                    fluid
                    id='usuario'
                    name='usuario'
                    placeholder='Ingresa username'
                    type='text'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />

                <Header.Subheader>Contraseña</Header.Subheader>
                <Input
                    fluid
                    id='contraseña'
                    name='password'
                    placeholder='Ingrese su contraseña'
                    type='password'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                {
                    passwordError &&
                    <Label pointing="above" className='label-error'>
                        contraseña invalida
                </Label>
                }
                <br></br>
                <br></br>
                <Button fluid primary onClick={(e) => handleSubmit()}>
                    Registrar Terapeuta
                </Button>
            </Grid.Column>
            <Grid.Column width={11}>
                <table id="tablaTerapeutas"></table>
            </Grid.Column>
        </Grid>
    )
};

export default CreateTherapist;