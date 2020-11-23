import React, { useContext, useState } from 'react';
import Firebase from '../database/firebase';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";
import { Input,Icon,Modal, Segment, Button, TableHeader, TableRow, TableColumn, TableCell, TableHeaderCell, Table, TableBody, Header } from 'semantic-ui-react';
import userContext from './userContext'

const SearchUser = () => {

    const [ id, setId ] = useState('');
    const [ hora, setHora ] = useState("");
    const [ fecha, setFecha ] = useState(new Date());
    const [ cobrada, setCobro ] = useState(false);
    const [ importe, setImporte ] = useState('');
    const [ cancelada, setCancelada ] = useState('');
    const [ observacion, setObservacion] = useState('');
    const [ modalCobrar, setModalCobro ] = React.useState(false);

    const [ idCliente, setIdCliente ] = useState('');
    const [ idTerapeuta, setIdTerapeuta ] = useState('');
    const [ idTerapia, setIdTerapia ] = useState('');

    const [cliente, setCliente] = useState([]);

    const [buscar, setbuscar] = useState('')
    const { usuario } = useContext(userContext)
    
    const [ open, setIsOpen] = React.useState(false);

    console.log(usuario)
    if (usuario.length == 0) {
        //return <Redirect to="/Login" />
    }

    function closeModal(){
        setIsOpen(false);
    }
    function openModal(idObjeto){
        Firebase.getObjectById('Clientes',idObjeto, setCliente)
        console.log(cliente)
        setIsOpen(true);
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
                    </TableRow>
                </TableHeader>
                <TableBody>{

                    data.map((objeto, id) => {
                        if ( (objeto.idTerapeuta+"").includes(usuario.id+"")) {
                            
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

                                        <Modal
                                        onClose={() => closeModal}
                                        size = "mini"
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