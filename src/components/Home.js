import React, { useState } from 'react';
import Firebase from "../database/firebase";
import ReactDOM from 'react-dom';
import {
    Input, Button, TableHeader, TableRow, Segment, TableColumn, TableCell,
    TableHeaderCell, Table, TableBody, Grid, Header, Label, Icon,
    Checkbox, Modal
} from 'semantic-ui-react';
import { BrowserRouter as Router } from "react-router-dom"
import { Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

const Home = () => {

    const [id, setId] = useState('');
    const [hora, setHora] = useState("");
    const [fecha, setFecha] = useState(new Date());
    const [cobrada, setCobro] = useState(false);
    const [importe, setImporte] = useState('');
    const [cancelada, setCancelada] = useState(false);
    const [observacion, setObservacion] = useState('');
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalCobrar, setModalCobro] = React.useState(false);
    const [idCliente, setIdCliente] = useState('');
    const [idTerapeuta, setIdTerapeuta] = useState('');
    const [idTerapia, setIdTerapia] = useState('');

    function openModal(objeto) {
        setId(objeto.id)
        setHora(objeto.hora)
        setFecha(objeto.fecha)
        setCobro(objeto.cobrada)
        setImporte(objeto.importe)
        setCancelada(objeto.cancelada)
        setObservacion(objeto.observacion)
        setIdCliente(objeto.idCliente)
        setIdTerapeuta(objeto.idTerapeuta)
        setIdTerapia(objeto.idTerapia)
        setIsOpen(true);
    }
    function openCobro(objeto) {
        setId(objeto.id)
        setHora(objeto.hora)
        setFecha(objeto.fecha)
        setCobro(true)
        setImporte(objeto.importe)
        setCancelada(objeto.cancelada)
        setObservacion(objeto.observacion)
        setIdCliente(objeto.idCliente)
        setIdTerapeuta(objeto.idTerapeuta)
        setIdTerapia(objeto.idTerapia)
        setModalCobro(true);

    }

    function closeModal() {
        handleChange('vaciar', null)
        setIsOpen(false);
        setModalCobro(false);
    }

    function handleSubmit(params) {
        setIdTerapeuta(document.getElementById('Terapeuta').value)
        setIdTerapia(document.getElementById('Terapia').value)
        setIdCliente(document.getElementById("Cliente").value)

        var idTerapeuta = document.getElementById('Terapeuta').value
        var idTerapia = document.getElementById('Terapia').value
        var idCliente = document.getElementById("Cliente").value
        let account = { id, hora, fecha, cobrada, cancelada, importe, observacion, idTerapeuta, idTerapia, idCliente }
        //var selected = cod.option[cod.selectedIndex].text




        if (account) {

            console.log("account", account)
            if (id.length > 0) {
                console.log('registrado 0')
                if (fecha.length > 0) {
                    console.log('registrado 1')
                    if (importe.length > 0) {
                        console.log('registrado 2')
                        if (observacion.length > 0) {
                            console.log('registrado 3')
                            Firebase.write("Sesiones", account)

                        }
                    } else { console.log('no registrado 2') }
                } else { console.log('no registrado 1') }
            } else { console.log('no registrado 0') }

        }
    };

    function handleEdit(params) {
        let account = { id, hora, fecha, cobrada, cancelada, importe, observacion, idTerapeuta, idTerapia, idCliente }

        Firebase.put("Sesiones", account)
        handleChange('vaciar', null)
    };

    function handlePagar(params) {

        let account = { id, hora, fecha, cobrada, cancelada, importe, observacion, idTerapeuta, idTerapia, idCliente }

        Firebase.put("Sesiones", account)
        handleChange('vaciar', null)
    };

    /**
     * Lista de Clientes
     */
    Firebase.readList("Clientes", function (data) {
        var element = (
            <div>
                <label>
                    Clientes
                </label> <br></br>
                <select name="Cliente" id="Cliente" class="ui fluid selection dropdown">
                    {
                        data.map((objeto, id) => {
                            return (
                                <option value={objeto.id}>{objeto.nombreCompleto}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
        ReactDOM.render(element, document.getElementById('listaClientes'))
    })

    /**
     * Lista de Terapeutas
     */
    Firebase.readList("Terapeutas", function (data) {
        var element = (
            <div >
                <label>
                    Terapeuta
                </label> <br></br>
                <select name="Terapeuta" id="Terapeuta" class="ui fluid selection dropdown">
                    {
                        data.map((objeto, id) => {
                            return (
                                <option value={objeto.id} >{objeto.nombre}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
        ReactDOM.render(element, document.getElementById('listaTerapeuta'))
    })

    /**
     * Sesiones
     */
    Firebase.readList("Sesiones", function (data) {
        var element = (
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Cancelada</TableHeaderCell>
                        <TableHeaderCell>Cobrada</TableHeaderCell>
                        <TableHeaderCell>Fecha</TableHeaderCell>
                        <TableHeaderCell>Hora</TableHeaderCell>
                        <TableHeaderCell>Importe</TableHeaderCell>
                        <TableHeaderCell>Observación</TableHeaderCell>
                        <TableHeaderCell>Gestionar</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>{
                    data.map((objeto, id) => {
                        return (
                            <tr key={id}>
                                <Table.Cell>{objeto.id}</Table.Cell>
                                <Table.Cell>{objeto.cancelada ? "Si" : "No"}</Table.Cell>
                                <Table.Cell>{objeto.cobrada ? "Si" : "No"}</Table.Cell>
                                <Table.Cell>{objeto.fecha}</Table.Cell>
                                <Table.Cell>{objeto.hora}</Table.Cell>
                                <Table.Cell>{objeto.importe}</Table.Cell>
                                <Table.Cell>{objeto.observacion}</Table.Cell>
                                <Table.Cell>
                                    <Button.Group>
                                        <Button icon color="red" onClick={(e) => Firebase.remove("Sesiones", objeto)}>
                                            <Icon name='delete' />
                                        </Button>
                                        <Button icon color="yellow" onClick={(e) => openModal(objeto)} id="modal-create-thanks-you">
                                            <Icon name="edit" />
                                        </Button>
                                        <Button icon color="green" onClick={(e) => openCobro(objeto)} id="modal-create-cobrar">
                                            <Icon name="money bill alternate outline" />
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
                                        <Header icon='user' content='Editar Cita' />
                                    </Modal.Header>

                                    <Modal.Content>
                                        <Header>Cancelada</Header>
                                        <Checkbox toggle onClick={(e) => handleChange("cancelada", e.target.value)} />
                                        <Header>Fecha</Header>
                                        <TextField
                                            id="date"
                                            type="date"
                                            fullWidth
                                            defaultValue={new Date()}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(event) => setFecha(event.target.value)}
                                        />
                                        <Header>Hora</Header>
                                        <TextField
                                            id="time"
                                            type="time"
                                            fullWidth
                                            defaultValue="09:00"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                            onChange={(event) => setHora(event.target.value)}
                                        />
                                        <Header>Importe</Header>
                                        <Input id='importe' name='importe' value={importe}
                                            placeholder='importe' type='text' className='regular-style'
                                            onChange={(e) => setImporte(e.target.value)}
                                        />
                                        <Header>Observacion</Header>
                                        <Input id='observacion' name='observacion' value={observacion}
                                            placeholder='observacion' type='text' className='regular-style'
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

                                <Modal
                                    onClose={() => closeModal}
                                    size="mini"
                                    onOpen={() => setModalCobro}
                                    open={modalCobrar}
                                >
                                    <Modal.Header>
                                        <Header icon color='green' content='Gestionar Cobro ' />
                                        <Icon name="money bill alternate outline" />
                                    </Modal.Header>
                                    <Modal.Content>
                                        <Header> Id Cliente</Header>
                                        {idCliente}
                                        <Header> Id Sesion</Header>
                                        {id}
                                        <Header> Valor A Pagar</Header>
                                        {importe}
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button color='red' onClick={closeModal}>
                                            <Icon name='remove' /> Cancelar
                                        </Button>
                                        <Button color='green' onClick={() => handlePagar()}>
                                            <Icon name='checkmark' /> Pagar
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </tr>
                        )
                    })}</TableBody>
            </Table>
        )
        ReactDOM.render(element, document.getElementById('tablaSesiones'))
    })
    setInterval(1000)

    /**
     * Lista de Terapias
     */
    Firebase.readList("Terapias", function (data) {
        var element = (
            <div>
                <label>
                    Terapia
                </label> <br></br>
                <select name="Terapia" id="Terapia" class="ui fluid selection dropdown">
                    {
                        data.map((objeto, id) => {
                            return (
                                <option value={objeto.id}>{objeto.nombre}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
        ReactDOM.render(element, document.getElementById('listaTerapias'))
    })

    /**
     * Registrar sesiones
     */
    function handleChange(name, value) {
        switch (name) {
            case 'id':
                setId(value)
                break;
            case 'hora':
                setHora(value)
                break;
            case 'fecha':
                setFecha(value)
                break;
            case 'cobrada':
                setCobro(value)
                break;
            case 'importe':
                setImporte(value)
                break;
            case 'cancelada':
                setCancelada(!cancelada)
                break;
            case 'observacion':
                setObservacion(value)
                break;
            case 'vaciar':
                setId('')
                setHora('')
                setFecha('')
                setCobro(false)
                setImporte('')
                setCancelada(false)
                setObservacion('')
                break;
            default:
                console.log('no hay valores.')
        }
    }


    return (
        <Router exact path="/home" basename="/home">
            <div class="ui grid">
                <div class="five wide column">
                    <Header Icon>
                        <Icon name='user' />
                        <Header.Content>
                            Gestionar Cita
                            <Header.Subheader>Ingrese los parametros de una Cita</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <div >
                        Cancelada
                    </div>
                    <Checkbox toggle onClick={(e) => handleChange("cancelada", e.target.value)} />
                    <div >
                        <label>Fecha</label> <br></br>
                        <TextField
                            id="date"
                            type="date"
                            fullWidth
                            defaultValue={new Date()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => setFecha(event.target.value)}
                        />
                    </div>
                    <div>
                        <label>Hora</label> <br></br>
                        <TextField
                            id="time"
                            type="time"
                            fullWidth
                            defaultValue="09:00"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            onChange={(event) => setHora(event.target.value)}
                        />
                    </div>
                    <label>Id</label>
                    <div class="ui fluid input">
                        <input id='id' name='id'
                            placeholder='id' type='text' className='regular-style'
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <label>Importe</label>
                    <div class="ui fluid input">
                        <input id='importe' name='importe'
                            placeholder='importe' type='text' className='regular-style'
                            onChange={(e) => setImporte(e.target.value)}
                        />
                    </div>
                    <label>Observacion</label>
                    <div class="ui fluid input">
                        <input id='observacion' name='observacion'
                            placeholder='observacion' type='text' className='regular-style'
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />
                    </div>

                    <div class="ui fluid imput" id="listaTerapeuta" defer > </div>

                    <div class="ui fluid imput" id="listaTerapias" defer>
                    </div>

                    <div class="ui fluid imput" id="listaClientes">
                    </div>
                    <br></br>
                    <Button primary fluid onClick={(e) => handleSubmit()}>
                        Registrar Citas
                    </Button>
                </div>

                <div class="eleven wide column">
                    <table id="tablaSesiones"></table>
                </div>

            </div>
        </Router>
    )
}

export default Home;