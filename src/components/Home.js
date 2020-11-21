import React, { useState } from 'react';
import Firebase from "../database/firebase";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {Input, Button, TableHeader, TableRow, TableColumn, TableCell, 
    TableHeaderCell, Table, TableBody,Grid,Divider} from 'semantic-ui-react';
import { BrowserRouter as Router } from "react-router-dom"
import { Redirect } from "react-router-dom";
import Calendar from 'react-calendar';


const Home = () => {
    
    const [ id, setId ] = useState('');
    const [ hora, setHora ] = useState('');
    const [ fecha, setFecha ] = useState('');
    const [ cobrada, setCobro ] = useState('');
    const [ importe, setImporte ] = useState('');
    const [ cancelada, setCancelada ] = useState('');
    const [ observacion, setObservacion] = useState('');
    const [ modalIsOpen, setIsOpen] = React.useState(false);
    const [ modalCobrar, setModalCobro ] = React.useState(false);
    const [ idCliente, setIdCliente ] = useState('');
    const [ idTerapeuta, setIdTerapeuta ] = useState('');
    const [ idTerapia, setIdTerapia ] = useState('');

    const [ refresh, setRefresh ] = useState(false);

    Modal.setAppElement()

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
    
    function closeModal(){
        handleChange('vaciar',null)
        setIsOpen(false);
        setModalCobro(false);
    }

   

    /**
     * Registrar sesiones
     */
    function handleChange(name, value) {
        switch(name) {
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
                setCancelada(value)
                break;
            case 'observacion':
                setObservacion(value)
                break;
            case 'vaciar':
                setId('')
                setHora('')
                setFecha('')
                setCobro('')
                setImporte('')
                setCancelada('')
                setObservacion('')
                break;
            case 'vaciar':
                setId('')
                setHora('')
                setFecha('')
                setCobro('')
                setImporte('')
                setCancelada('')
                setObservacion('')
                break;
            default:
                console.log('no hay valores.')
        }
    }

    function handleSubmit(params) {
        setIdTerapeuta (document.getElementById('Terapeuta').value)
        setIdTerapia (document.getElementById('Terapia').value)
        setIdCliente (document.getElementById("Cliente").value)

        let account = {id, hora, fecha, cobrada, cancelada, importe, observacion,idTerapeuta,idTerapia,idCliente}
        //var selected = cod.option[cod.selectedIndex].text

        Firebase.write("Sesiones", account)

        if (account) {
            console.log('account:', account)
        }
    };

    function handleEdit(params) {
        let account = {id, hora, fecha, cobrada, cancelada, importe, observacion,idTerapeuta,idTerapia,idCliente}

        Firebase.put("Sesiones", account)
        handleChange('vaciar',null)
    };

    function handlePagar(params) {
        
        let account = {id, hora, fecha, cobrada, cancelada, importe, observacion,idTerapeuta,idTerapia,idCliente}

        Firebase.put("Sesiones", account)
        handleChange('vaciar',null)
    };

    /**
     * Lista de Clientes
     */
    Firebase.readList("Clientes", function(data) {
        var element = (
            <div>
                <label>
                    Clientes
                </label>
                <select name = "Cliente" id = "Cliente">
                    {
                        data.map((objeto, id) => {
                            return(
                            <option value = {objeto.id}>{objeto.nombreCompleto}</option>
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
    Firebase.readList("Terapeutas", function(data) {
        var element = (
            <div>
                <label>
                    Terapeuta
                </label>
                <select name = "Terapeuta" id = "Terapeuta">
                    {
                        data.map((objeto, id) => {
                            return(
                            <option value = {objeto.id} >{objeto.nombre}</option>
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
    Firebase.readList("Sesiones", function(data) {
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
                </TableRow>
            </TableHeader>
            <TableBody>{
                data.map((objeto, id) => {
                return (
                <tr key = {id}>
                    <Table.Cell>{objeto.id}</Table.Cell>
                    <Table.Cell>{objeto.cancelada ? "Si" : "No"}</Table.Cell>
                    <Table.Cell>{objeto.cobrada ? "Si" : "No"}</Table.Cell>
                    <Table.Cell>{objeto.fecha}</Table.Cell>
                    <Table.Cell>{objeto.hora}</Table.Cell>
                    <Table.Cell>{objeto.importe}</Table.Cell>
                    <Table.Cell>{objeto.observacion}</Table.Cell>
                    <Button onClick={(e) => Firebase.remove("Sesiones",objeto)}>Eliminar</Button>
                    <Button onClick={(e) => openModal(objeto)} id = "modal-create-thanks-you">Editar</Button>
                    <Button onClick={(e) => openCobro(objeto)} id = "modal-create-cobrar">Cobrar</Button>

                    <Modal isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        >
                        <modalBody>
                        <button onClick={closeModal}>close</button>
                        <div >Editar</div>
                        <form>
                        <center>
                        <div className="form-group"> 
                        <div >
                            <input type="radio" value= "true" name="cancelada" onChange={(e) => handleChange(e.target.name, true)} /> Cancelada
                            <input type="radio" value= "false" name="cancelada" onChange={(e) => handleChange(e.target.name, false)} /> No Cancelada
                        </div>
                        <div>
                            <input type="radio" value= "true" name="cobrada" onChange={(e) => handleChange(e.target.name, true)} /> Cobrada
                            <input type="radio" value= "false" name="cobrada" onChange={(e) => handleChange(e.target.name, false)} /> No Cobrada
                        </div>
                            <Input id='fecha' name='fecha' className="form-control"
                                placeholder='fecha' type='text' value = {fecha}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            /> 
                            <Input id='hora' name='hora' value = {hora}
                                placeholder='hora' type='text' className='regular-style' 
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            /> 
                            <Input id='importe' name='importe' value = {importe}
                                placeholder='importe' type='text' className='regular-style' 
                                onChange={(e) => setImporte(e.target.value)}
                            /> 
                            <Input id='observacion' name='observacion' value = {observacion}
                                placeholder='observacion' type='text' className='regular-style' 
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            /> 
                            <hr></hr>
                            <Button onClick = {(e) => handleEdit()}>
                                Editar
                            </Button>
                            </div>
                        </center>
                        </form>
                        </modalBody>
                    </Modal>

                    <Modal isOpen={modalCobrar}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        >
                        <modalBody>
                        <button onClick={closeModal}>close</button>
                        <div >Cobrar</div>
                        <form>
                        <center>
                        <div className="form-group"> 
                        <label>Id Cliente</label>
                        <Input name='Id Cliente' id='fecha'  className="form-control"
                                placeholder='fecha' type='text' value = {idCliente}
                                
                        />
                        </div>
                        <div>
                        <label>Id Sesion</label>
                        <Input name='Id sesion' id='fecha'  className="form-control"
                                placeholder='fecha' type='text' value = {id}
                                
                        />
                        </div>
                        <div>
                        <label>Valor a Pagar</label>
                        <Input name='Importe' id='fecha'  className="form-control"
                                placeholder='fecha' type='text' value = {importe}
                                
                        />
                        </div>
                        <Button onClick = {(e) => handlePagar()}>
                                Pagar
                        </Button>
                        </center>
                        </form>
                        </modalBody>
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
    Firebase.readList("Terapias", function(data) {
        var element = (
            <div>
                <label>
                    Terapia
                </label>
                <select name = "Terapia" id = "Terapia">
                    {
                        data.map((objeto, id) => {
                            return(
                            <option value = {objeto.id}>{objeto.nombre}</option>
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
        switch(name) {
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
                setCancelada(value)
                break;
            case 'observacion':
                setObservacion(value)
                break;
            case 'vaciar':
                setId('')
                setHora('')
                setFecha('')
                setCobro('')
                setImporte('')
                setCancelada('')
                setObservacion('')
                break;
            default:
                console.log('no hay valores.')
        }
    }

    function handleRedirect(params) {
        
        setRefresh(true)
    }
    if(refresh)
    {
       return <Redirect to = "/Citas"/>
    }

    return (
        <Router exact path="/home" basename="/home">
        <center>
            <div >
                <input type="radio" value= "true" name="cancelada" onChange={(e) => handleChange(e.target.name, true)} /> Cancelada
                <input type="radio" value= "false" name="cancelada" onChange={(e) => handleChange(e.target.name, false)} /> No Cancelada
            </div>
            <div>
                <input type="radio" value= "true" name="cobrada" onChange={(e) => handleChange(e.target.name, true)} /> Cobrada
                <input type="radio" value= "false" name="cobrada" onChange={(e) => handleChange(e.target.name, false)} /> No Cobrada
            </div>
            <Input id='fecha' name='fecha' 
                placeholder='fecha' type='text' className='regular-style' 
                onChange={(e) => handleChange(e.target.name, e.target.value)}
            /> 
            <Input id='hora' name='hora' 
                placeholder='hora' type='text' className='regular-style' 
                onChange={(e) => handleChange(e.target.name, e.target.value)}
            /> 
            <Input id='id' name='id' 
                placeholder='id' type='text' className='regular-style' 
                onChange={(e) => handleChange(e.target.name, e.target.value)}
            /> 
            <Input id='importe' name='importe' 
                placeholder='importe' type='text' className='regular-style' 
                onChange={(e) => setImporte(e.target.value)}
            /> 
            <Input id='observacion' name='observacion' 
                placeholder='observacion' type='text' className='regular-style' 
                onChange={(e) => handleChange(e.target.name, e.target.value)}
            /> 
            <div id="listaTerapeuta" defer > </div>

            <div id="listaTerapias" defer> 
            </div>

            <div id="listaClientes"> 
            </div>

            <hr></hr>
            <Button onClick={(e) => handleSubmit()}>
                Registrar sesión
             </Button>
             <Button onClick={(e) => handleRedirect()}>
                 Gestionar Citas
            </Button>

            <hr></hr>
            <table id="tablaSesiones"></table> 
        </center>
        </Router>
    )
}

export default Home;