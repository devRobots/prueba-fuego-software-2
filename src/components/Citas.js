import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Firebase from "../database/firebase";
import {
    Input, Button, TableHeader, TableRow,
    Icon, TableHeaderCell, Table, TableBody,
    Grid, Header, Divider, Segment
} from 'semantic-ui-react';

const Citas = () => {

    const [id, setId] = useState('');
    const [idCliente, setIdCliente] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [duracion, setDuracion] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [modalIsOpen, setIsOpen] = React.useState(false);

    Modal.setAppElement()

    function openModal(objeto) {
        setId(objeto.id)
        setDescripcion(objeto.hora)
        setDuracion(objeto.fecha)
        setNombre(objeto.cobrada)
        setPrecio(objeto.importe)
        setIsOpen(true);
    }

    function closeModal() {
        handleChange('vaciar', null)
        setIsOpen(false);
    }

    Firebase.readList("Terapias", function (data) {
        var element = (
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Descripcion</TableHeaderCell>
                        <TableHeaderCell>Duracion</TableHeaderCell>
                        <TableHeaderCell>Nombre</TableHeaderCell>
                        <TableHeaderCell>Precio</TableHeaderCell>
                        <TableHeaderCell>Gestionar</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>{
                    data.map((objeto, id) => {
                        return (
                            <tr key={id}>
                                <Table.Cell>{objeto.id}</Table.Cell>
                                <Table.Cell>{objeto.descripcion}</Table.Cell>
                                <Table.Cell>{objeto.duracion}</Table.Cell>
                                <Table.Cell>{objeto.nombre}</Table.Cell>
                                <Table.Cell>{objeto.precio}</Table.Cell>
                                <Table.Cell>
                                    <Button.Group>
                                        <Button icon color="red" onClick={(e) => Firebase.remove("Terapias", objeto)}>
                                            <Icon name='delete' />
                                        </Button>
                                        <Button icon color="yellow" onClick={(e) => openModal(objeto)} id="modal-create-thanks-you">
                                            <Icon name='edit' />
                                        </Button>
                                    </Button.Group>
                                </Table.Cell>

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
                                                    <Input id='nombre' name='nombre' className="form-control"
                                                        placeholder='nombre' type='text' value={nombre}
                                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    />
                                                    <Input id='descripcion' name='descripcion' value={descripcion}
                                                        placeholder='descripcion' type='text' className='regular-style'
                                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    />
                                                    <Input id='duracion' name='duracion' value={duracion}
                                                        placeholder='duracion' type='text' className='regular-style'
                                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    />
                                                    <Input id='precio' name='precio' value={precio}
                                                        placeholder='precio' type='text' className='regular-style'
                                                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    />
                                                    <hr></hr>
                                                    <Button onClick={(e) => handleEdit()}>
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
        ReactDOM.render(element, document.getElementById('tablaTerapias'))
    })

    /**
     * Registrar sesiones
     */
    function handleChange(name, value) {
        switch (name) {
            case 'id':
                setId(value)
                break;
            case 'descripcion':
                setDescripcion(value)
                break;
            case 'duracion':
                setDuracion(value)
                break;
            case 'nombre':
                setNombre(value)
                break;
            case 'precio':
                setPrecio(value)
                break;
            case 'vaciar':
                setId('')
                setNombre('')
                setDescripcion('')
                setPrecio('')
                setDuracion('')
                break;
            default:
                console.log('no hay valores.')
        }
    }

    function handleSubmit(params) {
        let account = { id, descripcion, duracion, nombre, precio }

        Firebase.write("Terapias", account)

        if (account) {
            console.log('account:', account)
        }
    };

    function handleEdit(params) {
        let account = { id, descripcion, duracion, nombre, precio }

        Firebase.put("Citas", account)
        handleChange('vaciar', null)
    };

    return (
        <Grid container columns={2} centered>
            <Grid.Column width={5}>
                <Header Icon>
                    <Icon name='user' />
                    <Header.Content>
                        Gestionar Citas
                            <Header.Subheader>Ingrese los parametros de la cita</Header.Subheader>
                    </Header.Content>
                </Header>
                    Id
                    <Input id='id' name='id' fluid
                    placeholder='id' type='text' className='regular-style'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                    Nombre
                    <Input id='nombre' name='nombre' fluid className="form-control"
                    placeholder='nombre' type='text' value={nombre}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                    Descripcion
                    <Input id='descripcion' name='descripcion' fluid value={descripcion}
                    placeholder='descripcion' type='text' className='regular-style'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                    Duracion
                    <Input id='duracion' name='duracion' fluid value={duracion}
                    placeholder='duracion' type='text' className='regular-style'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                    Precio
                    <Input id='precio' name='precio' fluid value={precio}
                    placeholder='precio' type='text' className='regular-style'
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
                <br></br>
                <Button fluid primary onClick={(e) => handleSubmit()}>
                    Registrar Cita
                    </Button>
            </Grid.Column>
            <Grid.Column width={11}>
                <table id="tablaTerapias"></table>
            </Grid.Column>
        </Grid>
    )
}

export default Citas;