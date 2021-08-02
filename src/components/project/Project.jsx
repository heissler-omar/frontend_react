import React from 'react';
import axios from 'axios';
// import './ViewUser.css'
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Link } from "react-router-dom";

class Project extends React.Component {

    state = {
        project: [],
        projectId: '',
        openDelete: false
    }

    componentDidMount() {
        this.getProject()
    }

    getProject = async() => { 
        var location = window.location.href
        var id = location.slice(31)
        this.setState({projectId: id})
        console.log(location)
        console.log(id)
        await axios.get('http://localhost:5000/projects/' + id)
        .then(response => {
            this.setState({project: response.data})
            console.log(this.state.project)
        })
        .catch(error => {console.log(error)})
    }

    deleteProject = async() => {
        await axios.delete('http://localhost:5000/projects/' + this.state.projectId)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {console.log(error)})

        window.location = '/projects'
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
                                Nombre del proyecto:
                            </Col>
                            <Col>
                                {this.state.project.projectName}
                            </Col>
                        </Row>
                        <Row className="viewUserNameCol">
                            <Col>
                                Tipo:
                            </Col>
                            <Col>
                                {this.state.project.projectType}
                            </Col>
                        </Row>
                        <Row className="viewUserNameCol">
                            <Col>
                                Descripción:
                            </Col>
                            <Col>
                                {this.state.project.description}
                            </Col>
                        </Row>
                        <Row className="viewUserNameCol">
                            <Col>
                                Proyecto activo:
                            </Col>
                            <Col>
                                {this.state.project.active}
                            </Col>
                        </Row>
                        <Row className="viewUserNameCol">
                            <Col>
                                Fecha:
                            </Col>
                            <Col>
                                {this.state.project.creationDate}
                            </Col>
                        </Row>
                        <Row className="viewUserButtons">
                            <Link to={'/projects/' + this.state.projectId + '/edit'} className="viewUserLink">
                                Editar
                            </Link>
                            &nbsp;&nbsp;
                            <Button color="danger" className="viewUserButton" onClick={this.openDeleteModal}>Eliminar</Button>
                        </Row>
                    </Col>
                </Row>

                <Modal isOpen={this.state.openDelete} style={modalStyles}>
                    <ModalHeader>
                        Eliminar
                    </ModalHeader>
                    <ModalBody>
                        ¿Deseas eliminar definitivamente el proyecto?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => {this.openDeleteModal(); this.deleteProject();}}>Eliminar</Button>{' '}
                        <Button color="secondary" onClick={this.openDeleteModal}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Project