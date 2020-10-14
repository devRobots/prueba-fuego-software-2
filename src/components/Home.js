import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Firebase from "../database/firebase";
import {Input, Button, TableHeader, TableRow, TableColumn, TableCell, TableHeaderCell, Table, TableBody} from 'semantic-ui-react';

const Home = () => {
    
    const [ id, setId ] = useState('');
    const [ hora, setHora ] = useState('');
    const [ fecha, setFecha ] = useState('');
    const [ cobrada, setCobro ] = useState('');
    const [ importe, setImporte ] = useState('');
    const [ cancelada, setCancelada ] = useState('');
    const [ observacion, setObservacion] = useState('');
    const [ modalIsOpen,setIsOpen] = React.useState(false);
    const [ objetoEdit, setObjetoEdit] = useState('')

    Modal.setAppElement()

    function openModal(value) {
        setObjetoEdit(value)
        setIsOpen(true);
    }
    function closeModal(){
        setIsOpen(false);
    }


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
                            <div onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                <input type="radio"  name="cancelada" /> Cancelada
                                <input type="radio" name="cancelada" /> No Cancelada
                            </div>
                            <div onChange={(e) => handleChange(e.target.name, e.target.value)}>
                                <input type="radio"  name="cobrada" /> Cobrada
                                <input type="radio" name="cobrada" /> No Cobrada
                            </div>
                            <Input id='fecha' name='fecha' className="form-control"
                                placeholder='fecha' type='text' 
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                            /> 
                            <Input id='hora' name='hora'
                                placeholder='hora' type='text' className='regular-style' 
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
                            <hr></hr>
                            <Button onClick = {(e) => handleEdit()}>
                                Editar
                            </Button>
                            </div>
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

    /**
     * Registrar sesiones
     */
    function handleChange(name, value) {
        switch(name) {
            case 'id':
                if(value < 1) {

                } else {
                    setId(value)
                }
                break;
            case 'hora':
                if(value < 1) {

                } else {
                    setHora(value)
                }
                break;
            case 'fecha':
                if(value < 1) {

                } else {
                    setFecha(value)
                }
                break;
            case 'cobrada':
                if(value < 1) {

                } else {
                    setCobro(value)
                }
                break;
            case 'importe':
                if(value < 1) {

                } else {
                    setImporte(value)
                }
                break;
            case 'cancelada':
                if(value < 1) {

                } else {
                    setCancelada(value)
                }
                break;
            case 'observacion':
                    if(value < 1) {

                    } else {
                        setObservacion(value)
                    }
                break;
            default:
                console.log('no hay valores.')
        }
    }

    function handleSubmit(params) {
        let account = {id, hora, fecha, cobrada, cancelada, importe, observacion}

        Firebase.write("Sesiones", account)

        if (account) {
            console.log('account:', account)
        }
    };

    function handleEdit(params) {
        setId(objetoEdit.id)
        let account = {id, hora, fecha, cobrada, cancelada, importe, observacion}

        Firebase.put("Sesiones", account)

        if (account) {
            console.log('account:', account)
        }
    };

    return (
        <center>
            <div onChange={(e) => handleChange(e.target.name, e.target.value)}>
                <input type="radio" value= "true" name="cancelada" /> Cancelada
                <input type="radio" value= "false" name="cancelada" /> No Cancelada
            </div>
            <div onChange={(e) => handleChange(e.target.name, e.target.value)}>
                <input type="radio" value= "true" name="cobrada" /> Cobrada
                <input type="radio" value= "false" name="cobrada" /> No Cobrada
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
            <hr></hr>
            <Button onClick={(e) => handleSubmit()}>
                Registrar sesión
             </Button>

            <hr></hr>
            <table id="tablaSesiones"></table> 
        </center>
    )
}

export default Home;