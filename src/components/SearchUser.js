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

                </tr>
                )
        })}</TableBody>
        </Table>
        )
    ReactDOM.render(element, document.getElementById('tablaClientes'))
    })

    return (
        <center>
            <table id="tablaClientes"></table> 
        </center>
    )
}
export default SearchUser;