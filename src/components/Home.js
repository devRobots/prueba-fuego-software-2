import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Firebase from "../database/firebase";
import {Input, Button} from 'semantic-ui-react';

const Home = () => {
    
    const [id, setId ] = useState('');
    const [ hora, setHora ] = useState('');
    const [ fecha, setFecha ] = useState('');
    const [ cobrada, setCobro ] = useState('');
    const [ importe, setImporte ] = useState('');
    const [ cancelada, setCancelada ] = useState('');
    const [ observacion, setObservacion] = useState('');
    const [modalIsOpen,setIsOpen] = React.useState(false);

    Modal.setAppElement()

    function openModal() {
        setIsOpen(true);
    }
    function closeModal(){
        setIsOpen(false);
    }

    Firebase.readList("Sesiones", function(data) {
        var element = (
        <div>
            <thead>
                <tr>
                <th>id</th>
                <th>cancelada</th>
                <th>cobrada</th>
                <th>fecha</th>
                <th>hora</th>
                <th>importe</th>
                <th>observacion</th>
                </tr>
            </thead>
            <tbody>{
                data.map((objeto, id) => {
                return (
                <tr key = {id}>
                    <td>{objeto.id}</td>
                    <td>{objeto.cancelada ? "Si" : "No"}</td>
                    <td>{objeto.cobrada ? "Si" : "No"}</td>
                    <td>{objeto.fecha}</td>
                    <td>{objeto.hora}</td>
                    <td>{objeto.importe}</td>
                    <td>{objeto.observacion}</td>
                    <button onClick={(e) => Firebase.remove("Sesiones",objeto)}>Eliminar</button>
                    <button onClick={openModal}>Editar</button>

                    <Modal isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Example Modal"
                        >
                        <button onClick={closeModal}>close</button>
                        <div>Editar</div>
                        <form>

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
                            <Button>
                                Registrarse
                            </Button>
                        </center>
                        </form>
                    </Modal>
                </tr>
                )
        })}</tbody>
        </div>
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