import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
    Grid, Header, Input, Button,
    Table, TableHeader, TableHeaderCell, Modal,
    TableRow, Icon, TableBody
} from 'semantic-ui-react';
import Firebase from '../database/firebase';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";

const CreateUser = () => {

    const [celular, setPhone] = useState('');
    const [correo, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaNacimiento, setbirthDate] = useState('');
    const [id, setId] = useState('');
    const [nombreCompleto, setNombre] = useState('');

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(objeto) {
        setPhone(objeto.celular)
        setEmail(objeto.correo)
        setDireccion(objeto.direccion)
        setbirthDate(objeto.fechaNacimiento)
        setId(objeto.id)
        setNombre(objeto.nombreCompleto)
        setIsOpen(true)
    }

    function closeModal() {
        handleChange('vaciar', null)
        setIsOpen(false);
    }

    function handleEdit(params) {
        let account = { celular, correo, direccion, fechaNacimiento, id, nombreCompleto }
        Firebase.put("Clientes", account)
        handleChange('vaciar', null)
        closeModal()
    };

    function handleChange(name, value) {
        switch (name) {
            case 'phone':
                if (value < 1) {

                } else {
                    setPhone(value)
                }
                break;
            case 'email':
                if (value < 1) {

                } else {
                    setEmail(value)
                }
                break;
            case 'direccion':
                if (value < 1) {

                } else {
                    setDireccion(value)
                }
                break;
            case 'birthDate':
                if (value < 1) {

                } else {
                    setbirthDate(value)
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
                setPhone('')
                setEmail('')
                setDireccion('')
                setbirthDate('')
                setId('')
                setNombre('')
                break;
            default:
                console.log('no hay valores.')
        }
    }

    function handleSubmit(params) {
        let account = { celular, correo, direccion, fechaNacimiento, id, nombreCompleto }

        Firebase.write("Clientes", account)

        if (account) {
            console.log('account:', account)
        }
    };


    Firebase.readList("Clientes", function (data) {
        var element = (
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Nombre</TableHeaderCell>
                        <TableHeaderCell>Cedula</TableHeaderCell>
                        <TableHeaderCell>Correo</TableHeaderCell>
                        <TableHeaderCell>Celular</TableHeaderCell>
                        <TableHeaderCell>Fecha de Nacimiento</TableHeaderCell>
                        <TableHeaderCell>Direccion</TableHeaderCell>
                        <TableHeaderCell>Gestionar</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>{
                    data.map((objeto, id) => {
                        return (
                            <tr key={id}>
                                <Table.Cell>{objeto.nombreCompleto}</Table.Cell>
                                <Table.Cell>{objeto.id}</Table.Cell>
                                <Table.Cell>{objeto.correo}</Table.Cell>
                                <Table.Cell>{objeto.celular}</Table.Cell>
                                <Table.Cell>{objeto.fechaNacimiento}</Table.Cell>
                                <Table.Cell>{objeto.direccion}</Table.Cell>
                                <Table.Cell>
                                    <Button.Group>
                                        <Button icon color="red" onClick={(e) => Firebase.remove("Clientes", objeto)}>
                                            <Icon name='delete' />
                                        </Button>
                                        <Button icon color="yellow" onClick={(e) => openModal(objeto)} id="modal-create-thanks-you">
                                            <Icon name='edit' />
                                        </Button>
                                    </Button.Group>
                                </Table.Cell>

                                <Modal
                                    onClose={() => closeModal}
                                    size="mini"
                                    onOpen={() => setIsOpen(true)}
                                    open={modalIsOpen}
                                >
                                    <Modal.Header>
                                        <Header icon='user' content='Editar Cliente' />
                                    </Modal.Header>
                                    <Modal.Content>
                                    <Header.Subheader>Nombre Completo</Header.Subheader>
                                        <Input
                                            fluid
                                            id='nombre'
                                            name='nombre'
                                            placeholder='Ingrese su nombre'
                                            type='text'
                                            value = {nombreCompleto}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                            className='input-error'
                                        />
                                        <Header.Subheader>Cedula</Header.Subheader>
                                        <Input
                                            fluid
                                            id='cedula'
                                            name='id'
                                            placeholder='Ingrese su cedula'
                                            type='text'
                                            value = {id}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                            className='input-error'
                                        />
                                        <Header.Subheader>Correo</Header.Subheader>
                                        <Input
                                            fluid
                                            id='correo'
                                            name='email'
                                            placeholder='Ingrese su correo'
                                            type='text'
                                            value = {correo}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                            className='regular-style'
                                        />
                                        <Header.Subheader>Fecha Nacimiento</Header.Subheader>
                                        <TextField
                                                id="date"
                                                type="date"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(event) => setbirthDate(event.target.value)}
                                        />
                                        <Header.Subheader>Telefono</Header.Subheader>
                                        <Input
                                            fluid
                                            id='telefono'
                                            name='phone'
                                            placeholder='Ingrese su telefono'
                                            type='text'
                                            value = {celular}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                            className='regular-style'
                                        />


                                        <Header.Subheader>Direccion</Header.Subheader>
                                        <Input
                                            fluid
                                            id='direccion'
                                            name='direccion'
                                            placeholder='Ingrese su direccion'
                                            type='text'
                                            value = {direccion}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                            className='regular-style'
                                        />
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color='red' onClick={closeModal}>
                                            <Icon name='remove' /> Cerrar
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
        ReactDOM.render(element, document.getElementById('tablaUsuarios'))
    })

    return (
        <Grid centered columns={2}>
            <Grid.Column width={5}>
                <Header Icon>
                    <Icon name='user' />
                    <Header.Content>
                        Gestionar Clientes
                        <Header.Subheader>Ingrese los parametros del cliente</Header.Subheader>
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
                    className='input-error'
                />
                <Header.Subheader>Cedula</Header.Subheader>
                <Input
                    fluid
                    id='cedula'
                    name='id'
                    placeholder='Ingrese su cedula'
                    type='text'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='input-error'
                />
                <Header.Subheader>Correo</Header.Subheader>
                <Input
                    fluid
                    id='correo'
                    name='email'
                    placeholder='Ingrese su correo'
                    type='text'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='regular-style'
                />
                <Header.Subheader>Fecha Nacimiento</Header.Subheader>
                <TextField
                            id="date"
                            type="date"
                            fullWidth
                            defaultValue={new Date()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => setbirthDate(event.target.value)}
                     />
                <Header.Subheader>Telefono</Header.Subheader>
                <Input
                    fluid
                    id='telefono'
                    name='phone'
                    placeholder='Ingrese su telefono'
                    type='text'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='regular-style'
                />


                <Header.Subheader>Direccion</Header.Subheader>
                <Input
                    fluid
                    id='direccion'
                    name='direccion'
                    placeholder='Ingrese su direccion'
                    type='text'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className='regular-style'
                />

                <br></br>
                <br></br>
                <Button primary fluid onClick={(e) => handleSubmit()}>
                    Registrarse
                </Button>
            </Grid.Column>
            <Grid.Column width={11}>
                <table id="tablaUsuarios"></table>
            </Grid.Column>
        </Grid>


    )
};

export default CreateUser;