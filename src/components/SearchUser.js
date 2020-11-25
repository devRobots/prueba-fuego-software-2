import React, { useContext, useState } from 'react';
import Firebase from '../database/firebase';
import ReactDOM from 'react-dom';
import { Redirect, BrowserRouter as Router } from "react-router-dom";
import { Input, Icon, Modal, Segment, Button, TableHeader, TableRow, TableColumn, TableCell, TableHeaderCell, Table, TableBody, Header } from 'semantic-ui-react';
import userContext from './userContext'

const SearchUser = () => {
    const [cliente, setCliente] = useState([]);
    const { usuario } = useContext(userContext)

    const [open, setIsOpen] = React.useState(false);
    const [modalEdit, setEdit] = React.useState(false)
    const [informe, setInforme] = useState(null)
    const [observacion, setInfo] = useState('')
    const [login, setLogin] = useState('')

    console.log(usuario)
    if (usuario.length == 0 || login == null) {
        return <Redirect to="/Login" />
    }

    function closeModal() {
        setIsOpen(false);
    }
    function openModal(idObjeto) {
        Firebase.getObjectById('Clientes', idObjeto, setCliente)
        console.log(cliente)
        setIsOpen(true);
    }
    function openEdit(objeto) {
        setInforme(objeto)
        setInfo(objeto.observacion)
        setEdit(true);
    }
    function handleEdit() {
        var id = informe.id
        var hora = informe.hora
        var fecha = informe.fecha
        var cobrada = informe.cobrada
        var cancelada = informe.cancelada
        var importe = informe.importe
        var idTerapeuta = informe.idTerapeuta
        var idTerapia = informe.idTerapeuta
        var idCliente = informe.idCliente
        let account = { id, hora, fecha, cobrada, cancelada, importe, observacion, idTerapeuta, idTerapia, idCliente }
        Firebase.put("Sesiones", account)
        setEdit(false)
    }

    Firebase.readList("Sesiones", function (data) {
        var element = (
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Id</TableHeaderCell>
                        <TableHeaderCell>Fecha</TableHeaderCell>
                        <TableHeaderCell>Hora</TableHeaderCell>
                        <TableHeaderCell>Cancelada</TableHeaderCell>
                        <TableHeaderCell>Cobrada</TableHeaderCell>
                        <TableHeaderCell>Importe</TableHeaderCell>
                        <TableHeaderCell>Observacion</TableHeaderCell>
                        <TableHeaderCell>Id Cliente</TableHeaderCell>
                        <TableHeaderCell>Detalle</TableHeaderCell>
                        <TableHeaderCell>Sesiones</TableHeaderCell>
                        <TableHeaderCell>Observacion</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>{

                    data.map((objeto, id) => {
                        if ((objeto.idTerapeuta + "").includes(usuario.id + "")) {


                            return (
                                <tr key={id}>
                                    <Table.Cell>{objeto.id}</Table.Cell>
                                    <Table.Cell>{objeto.fecha}</Table.Cell>
                                    <Table.Cell>{objeto.hora}</Table.Cell>
                                    <Table.Cell>{objeto.cancelada ? "Si" : "No"}</Table.Cell>
                                    <Table.Cell>{objeto.cobrada ? "Si" : "No"}</Table.Cell>
                                    <Table.Cell>{objeto.importe}</Table.Cell>
                                    <Table.Cell>{objeto.observacion}</Table.Cell>
                                    <Table.Cell>{objeto.idCliente}</Table.Cell>
                                    <Table.Cell>
                                        <Button onClick={() => openModal(objeto.idCliente)}>Cliente</Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button onClick={(e) => seeSessions(objeto.idCliente)}>Detalle</Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button onClick={(e) => openEdit(objeto)}>Observacion</Button>
                                    </Table.Cell>


                                    <Modal
                                        onClose={() => setEdit(false)}
                                        size="mini"
                                        onOpen={() => setEdit(true)}
                                        open={modalEdit}
                                    >
                                        <Modal.Header>
                                            <Header icon='user' content='Observacion del Cliente' />
                                        </Modal.Header>
                                        <Modal.Content>
                                            <Input
                                                fluid
                                                id='observacion'
                                                name='observacion'
                                                placeholder='Ingrese una observacion'
                                                type='text'
                                                value={observacion}
                                                onChange={(e) => setInfo(e.target.value)}
                                            />
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='red' onClick={() => setEdit(false)}>
                                                <Icon name='remove' /> Cancelar
                                                    </Button>
                                            <Button color='green' onClick={() => handleEdit()}>
                                                <Icon name='checkmark' /> Aceptar
                                                    </Button>
                                        </Modal.Actions>
                                    </Modal>

                                    <Modal
                                        onClose={() => closeModal}
                                        size="mini"
                                        onOpen={() => setIsOpen(true)}
                                        open={open}
                                    >
                                        <Modal.Header>
                                            <Header icon='user' content='Informacion Del Cliente' />
                                        </Modal.Header>
                                        <Modal.Content>
                                            <Header>
                                                ID Cliente
                                                        </Header>
                                            {cliente.id}
                                            <Header>
                                                Nombre
                                                        </Header>
                                            {cliente.nombreCompleto}
                                            <Header>
                                                Celular
                                                        </Header>
                                            {cliente.celular}
                                            <Header>
                                                Correo
                                                        </Header>
                                            {cliente.correo}
                                            <Header>
                                                Direccion
                                                        </Header>
                                            {cliente.direccion}
                                            <Header>
                                                Fecha De Nacimiento
                                                        </Header>
                                            {cliente.fechaNacimiento}
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='red' onClick={closeModal}>
                                                <Icon name='remove' /> Cerrar
                                                        </Button>
                                        </Modal.Actions>
                                    </Modal>

                                </tr>)
                        }

                    })}</TableBody>
            </Table>
        )
        ReactDOM.render(element, document.getElementById('tablaClientes'))
    })

    /**
     * Sesiones
     */
    function seeSessions(cliente_id) {
        Firebase.readList("Sesiones", function (data) {

            var element = (
                <div>
                    <Header>Sesiones</Header>
                    <Table celled>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>ID</TableHeaderCell>
                                <TableHeaderCell>IdCliente</TableHeaderCell>
                                <TableHeaderCell>Fecha</TableHeaderCell>
                                <TableHeaderCell>Hora</TableHeaderCell>
                                <TableHeaderCell>Cancelada</TableHeaderCell>
                                <TableHeaderCell>Cobrada</TableHeaderCell>
                                <TableHeaderCell>Importe</TableHeaderCell>
                                <TableHeaderCell>Observación</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>{
                            data.map((objeto, id) => {
                                if (cliente_id == objeto.idCliente) {
                                    return (
                                        <tr key={id}>
                                            <Table.Cell>{objeto.id}</Table.Cell>
                                            <Table.Cell>{objeto.idCliente}</Table.Cell>
                                            <Table.Cell>{objeto.fecha}</Table.Cell>
                                            <Table.Cell>{objeto.hora}</Table.Cell>
                                            <Table.Cell>{objeto.cancelada ? "Si" : "No"}</Table.Cell>
                                            <Table.Cell>{objeto.cobrada ? "Si" : "No"}</Table.Cell>
                                            <Table.Cell>{objeto.importe}</Table.Cell>
                                            <Table.Cell>{objeto.observacion}</Table.Cell>
                                        </tr>
                                    )
                                }
                            })}</TableBody>

                    </Table>
                </div>
            )
            ReactDOM.render(element, document.getElementById('tablaSesiones'))
        })
    }

    return (
        <Segment color="teal">
            <div class="ui grid centered">
                <div class="eleven wide column centered">
                    <Header textAlign="center" as="h2">Clientes</Header>
                    <Button color="red" floated="right" onClick={() => setLogin(null)}>
                        Cerrar Sesion
                    </Button>
                    <br></br>
                    <br></br>
                    <table id="tablaClientes"></table>
                    <br></br>
                    <table id="tablaSesiones"></table>
                </div>
            </div>
        </Segment>
    )


}

export default SearchUser;