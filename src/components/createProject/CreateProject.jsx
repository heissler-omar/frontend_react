import React from 'react';
import './CreateProject.css';
import {Row, Col, Input, Button} from 'reactstrap';
import axios from 'axios';
// import moment from 'moment';

class CreateProject extends React.Component {
    state = {
        createProject: {
            projectName: '',
            projectType: '',
            userId: '',
            active: '',
            creationDate: '',
            description: ''
        },
        users: [],
        openDropdown: false
    }

    componentDidMount () {
        this.getUsers()
    }

    getUsers = async() => { 
        await axios.get('http://localhost:5000/users')
        .then(response => {
            this.setState({users: response.data})
            console.log(this.state.users)
        })
        .catch(error => {console.log(error)})
    }

    changeHandler = async e => {
        e.persist();
        await this.setState({
            createProject: {
                ...this.state.createProject,
                [e.target.name]: e.target.value
            }
        });
        // console.log(moment(this.state.createProject.creationDate, 'YYYY-MM-DD').format('DD/MM/YYYY'))
    }
    createProject = () => {
        // var date = this.state.createProject.creationDate
        // var formatedDate = moment(this.state.createProject.creationDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
        // this.setState({
        //     createProject: {
        //         ...this.state.createProject,
        //         creationDate: formatedDate
        //     }
        // })

        // console.log('Formateado', this.state.createProject)

        axios.post('http://localhost:5000/projects', this.state.createProject).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.message)
        })
    }

    changeHandlerId = async event => {
        await this.setState({
            createProject: {
                ...this.state.createProject,
                userId: event.target.value
            }
        })
        console.log(event.target.value)
    }
    
    render () {
        return (
            <div>
                <Row className="titleRow">
                    <h3>Creación de proyectos</h3>
                </Row>
                <Row className="rows">
                    <Col xs="7" className="formCol">
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Seleccionar usuario:
                            </Col>
                            <Col>
                                <select className="createProjectSelect" name="active" onChange={this.changeHandlerId}>
                                    {this.state.users.map((user, index) => {
                                        return (
                                            <option key={index}>{user._id.$oid}</option>
                                        ) 
                                    })}
                                </select>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Nombre del proyecto:
                            </Col>
                            <Col>
                                <Input name="projectName" onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Tipo:
                            </Col>
                            <Col>
                                <Input name="projectType" onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Descripción:
                            </Col>
                            <Col>
                                <Input name="description" onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Proyecto activo:
                            </Col>
                            <Col>
                                <select name="active" onChange={this.changeHandler}>
                                    <option>true</option>
                                    <option>false</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Fecha:
                            </Col>
                            <Col>
                                <Input type="date" name="creationDate" onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="buttonRow">
                            <Button color="primary" className="saveButton" onClick={() => this.createProject()}>Guardar</Button>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CreateProject