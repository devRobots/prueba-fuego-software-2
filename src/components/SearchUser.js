import React, { useContext, useState } from 'react';
import Firebase from '../database/firebase';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";
import { Input, Segment, Button, TableHeader, TableRow, TableColumn, TableCell, TableHeaderCell, Table, TableBody, Header } from 'semantic-ui-react';
import userContext from './userContext'

const SearchUser = () => {

    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [id, setId] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [buscar, setbuscar] = useState('')
    const { usuario } = useContext(userContext)

    console.log(usuario)
    if (usuario.length == 0) {
        return <Redirect to="/Login" />
    }

    Firebase.readList("Clientes", function (data) {
        var element = (
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Id</TableHeaderCell>
                        <TableHeaderCell>Nombre Completo</TableHeaderCell>
                        <TableHeaderCell>Correo</TableHeaderCell>
                        <TableHeaderCell>Direccion</TableHeaderCell>
                        <TableHeaderCell>Fecha Nacimiento</TableHeaderCell>
                        <TableHeaderCell>Celular</TableHeaderCell>
                        <TableHeaderCell>Sesiones</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>{

                    data.map((objeto, id) => {
                        if (buscar.length > 0) {
                            if (
                                (objeto.nombreCompleto + "").toLowerCase().includes(buscar.toLowerCase()) ||
                                (objeto.id + "").toLowerCase().includes(buscar.toLowerCase())) {
                                return (
                                    <tr key={id}>
                                        <Table.Cell>{objeto.id}</Table.Cell>
                                        <Table.Cell>{objeto.nombreCompleto}</Table.Cell>
                                        <Table.Cell>{objeto.correo}</Table.Cell>
                                        <Table.Cell>{objeto.direccion}</Table.Cell>
                                        <Table.Cell>{objeto.fechaNacimiento}</Table.Cell>
                                        <Table.Cell>{objeto.celular}</Table.Cell>
                                        <Table.Cell>{objeto.sesiones} <Button onClick={(e) => seeSessions(objeto)}>Ver Sesiones</Button></Table.Cell>
                                    </tr>)
                            }
                        } else {
                            return (
                                <tr key={id}>
                                    <Table.Cell>{objeto.id}</Table.Cell>
                                    <Table.Cell>{objeto.nombreCompleto}</Table.Cell>
                                    <Table.Cell>{objeto.correo}</Table.Cell>
                                    <Table.Cell>{objeto.direccion}</Table.Cell>
                                    <Table.Cell>{objeto.fechaNacimiento}</Table.Cell>
                                    <Table.Cell>{objeto.celular}</Table.Cell>
                                    <Table.Cell>{objeto.sesiones} <Button onClick={(e) => seeSessions(objeto)}>Detalle</Button></Table.Cell>

                                </tr>
                            )
                        }
                    })}</TableBody>
            </Table>
        )
        ReactDOM.render(element, document.getElementById('tablaClientes'))
    })

    /**
     * Sesiones
     */
    function seeSessions(cliente) {
        Firebase.readList("Sesiones", function (data) {

            var element = (
                <div>
                    <Header>Sesiones</Header>
                    <Table celled>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>ID</TableHeaderCell>
                                <TableHeaderCell>IdCliente</TableHeaderCell>
                                <TableHeaderCell>Cancelada</TableHeaderCell>
                                <TableHeaderCell>Cobrada</TableHeaderCell>
                                <TableHeaderCell>Fecha</TableHeaderCell>
                                <TableHeaderCell>Hora</TableHeaderCell>
                                <TableHeaderCell>Importe</TableHeaderCell>
                                <TableHeaderCell>Observación</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>{
                            data.map((objeto, id) => {
                                if (cliente.id == objeto.idCliente) {
                                    return (
                                        <tr key={id}>
                                            <Table.Cell>{objeto.id}</Table.Cell>
                                            <Table.Cell>{objeto.idCliente}</Table.Cell>
                                            <Table.Cell>{objeto.cancelada ? "Si" : "No"}</Table.Cell>
                                            <Table.Cell>{objeto.cobrada ? "Si" : "No"}</Table.Cell>
                                            <Table.Cell>{objeto.fecha}</Table.Cell>
                                            <Table.Cell>{objeto.hora}</Table.Cell>
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
                <div class="nine wide column centered">
                    <Header textAlign="center" as="h2">Clientes</Header>
                    <div class="ui icon fluid input">
                        <input type="text" id='Buscar' name='Buscar' className='regular-style'
                            placeholder='Buscar...' onChange={(e) => setbuscar(e.target.value)}
                        />
                        <i class="search icon"></i>
                    </div>
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