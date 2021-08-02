import React from 'react';
import axios from 'axios';
import './ViewUser.css'
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Link } from "react-router-dom";

class ViewUser extends React.Component {

    state = {
        user: [],
        projects: [],
        userId: '',
        openDelete: false
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = async() => { 
        var location = window.location.href
        var id = location.slice(28)
        this.setState({userId: id})
        console.log(location)
        console.log(id)
        await axios.get('http://localhost:5000/users/' + id)
        .then(response => {
            this.setState({user: response.data})
            console.log(this.state.user)
        })
        .catch(error => {console.log(error)})
    }

    deleteUser = async() => {
        await axios.delete('http://localhost:5000/users/' + this.state.userId)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {console.log(error)})

        window.location = '/users'
    }

    openDeleteModal=()=>{
        this.setState({openDelete: !this.state.openDelete});
    }

    render () {
        const modalStyles = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px'
        }
        return (
            <div>
                <Row className="viewUserRow">
                    <Col xs="7" className="viewUserCol">
                        <Row className="viewUserNameCol">
                            <Col>
                                Nombre:
                            </Col>
                            <Col>
                                {this.state.user.username}
                            </Col>
                        </Row>
                        <Row className="viewUserNameCol">
                            <Col>
                                Correo:
                            </Col>
                            <Col>
                                {this.state.user.email}
                            </Col>
                        </Row>
                        <Row className="viewUserNameCol">
                            <Col>
                                Usuario activo:
                            </Col>
                            <Col>
                                {this.state.user.active}
                            </Col>
                        </Row>
                        <Row className="viewUserNameCol">
                            <Col>
                                Fecha:
                            </Col>
                            <Col>
                                {this.state.user.creationDate}
                            </Col>
                        </Row>
                        <Row className="viewUserButtons">
                            <Link to={'/users/' + this.state.userId + '/edit'} className="viewUserLink">
                                Editar
                            </Link>
                            &nbsp;&nbsp;
                            <Button color="danger" className="viewUserButton" onClick={this.openDeleteModal}>Eliminar</Button>
                        </Row>
                    </Col>
                </Row>
                <Row className="viewUserRow">
                    <Col className="viewUserPjButton">
                        <Link to={'/users/' + this.state.userId + '/projects'} className="viewUserLinkPj">
                            Ver Proyectos del Usuario
                        </Link>
                    </Col>
                </Row>

                <Modal isOpen={this.state.openDelete} style={modalStyles}>
                    <ModalHeader>
                        Eliminar
                    </ModalHeader>
                    <ModalBody>
                        ¿Deseas eliminar definitivamente el usuario?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => {this.openDeleteModal(); this.deleteUser();}}>Eliminar</Button>{' '}
                        <Button color="secondary" onClick={this.openDeleteModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ViewUser