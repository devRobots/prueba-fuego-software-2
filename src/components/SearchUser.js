import React, { useState } from 'react';
import Firebase from '../database/firebase';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";
import {Input, Button, TableHeader, TableRow, TableColumn, TableCell, TableHeaderCell, Table, TableBody} from 'semantic-ui-react';


const SearchUser = () => {

    const [ celular, setCelular ] = useState('');
    const [ correo, setCorreo] = useState('');
    const [ direccion, setDireccion ] = useState('');
    const [ fechaNacimiento, setFechaNacimiento ] = useState('');
    const [ id, setId ] = useState('');
    const [ nombreCompleto, setNombreCompleto ] = useState('');

    
    Firebase.readList("Clientes", function(data) {
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
                return (
                <tr key = {id}>
                    <Table.Cell>{objeto.id}</Table.Cell>
                    <Table.Cell>{objeto.nombreCompleto}</Table.Cell>
                    <Table.Cell>{objeto.correo}</Table.Cell>
                    <Table.Cell>{objeto.direccion}</Table.Cell>
                    <Table.Cell>{objeto.fechaNacimiento}</Table.Cell>
                    <Table.Cell>{objeto.celular}</Table.Cell>
                    <Table.Cell>{objeto.sesiones} <Button onClick={(e) => seeSessions(objeto)}>Ver Sesiones</Button></Table.Cell>

                </tr>
                )
        })}</TableBody>
        </Table>
        )
    ReactDOM.render(element, document.getElementById('tablaClientes'))
    })

    /**
     * Sesiones
     */
    function seeSessions(cliente)
    {
    Firebase.readList("Sesiones", function(data) {

        var element = (
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
                if(cliente.id == objeto.idCliente){ 
                return (
                <tr key = {id}>
                    <Table.Cell>{objeto.id}</Table.Cell>
                    <Table.Cell>{objeto.idCliente}</Table.Cell>
                    <Table.Cell>{objeto.cancelada ? "Si" : "No"}</Table.Cell>
                    <Table.Cell>{objeto.cobrada ? "Si" : "No"}</Table.Cell>
                    <Table.Cell>{objeto.fecha}</Table.Cell>
                    <Table.Cell>{objeto.hora}</Table.Cell>
                    <Table.Cell>{objeto.importe}</Table.Cell>
                    <Table.Cell>{objeto.observacion}</Table.Cell>
                </tr>
                )}
        })}</TableBody>
        </Table>
        )
        ReactDOM.render(element, document.getElementById('tablaSesiones'))
    })
}

    return (
        <center>
            <table id="tablaClientes"></table> 
            <label>SESIONES</label>
            <table id="tablaSesiones"></table> 
        </center>
    )
}
export default SearchUser;