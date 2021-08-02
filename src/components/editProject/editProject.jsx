import React from 'react';
import axios from 'axios';
// import './EditUser.css'
import {Row, Col, Button, Input} from 'reactstrap';
// import moment from 'moment';

class EditProject extends React.Component {

    state = {
        updateProject: {
            projectName: '',
            projectType: '',
            userId: '',
            active: '',
            creationDate: '',
            description: ''
        },
        projectId: '',
        users: []
    }

    componentDidMount() {
        this.getProject();
        this.getUsers()
    }

    getProject = async() => { 
        var location = window.location.href
        var id = location.slice(31, -5)
        this.setState({projectId: id})
        console.log(location)
        console.log(id)
        await axios.get('http://localhost:5000/projects/' + id)
        .then(response => {
            // this.setState({updateProject: response.data})
            this.setState({
                updateProject: {
                    ...this.state.updateProject,
                    projectName: response.data.projectName,
                    projectType: response.data.projectType,
                    userId: response.data.userId,
                    active: response.data.active,
                    creationDate: response.data.creationDate,
                    description: response.data.description
                }
            });
            console.log(this.state.updateProject)
        })
        .catch(error => {console.log(error)})
    }

    getUsers = async() => {
        await axios.get('http://localhost:5000/users')
        .then(response => {
            this.setState({users: response.data})
        })
        .catch(error => {console.log(error)})
    }

    changeHandler = async e => {
        e.persist();
        await this.setState({
            updateProject: {
                ...this.state.updateProject,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.updateProject)
    }

    updateProject = () => {
        // var formatedDate = moment(this.state.updateProject.creationDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
        // this.setState({
        //     updateProject: {
        //         ...this.state.updateProject,
        //         creationDate: formatedDate
        //     }
        // })

        axios.put('http://localhost:5000/projects/' + this.state.projectId, this.state.updateProject)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {console.log(error)})

        window.location = '/projects/' + this.state.projectId
    }

    render () {
        const {projectName, projectType, userId, active, creationDate, description} = this.state.updateProject
        return (
            <div>
                <Row className="rows">
                    <Col xs="7" className="formCol">
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Usuario:
                            </Col>
                            <Col>
                                <select className="createProjectSelect" name="userId" value={userId} onChange={this.changeHandler}>
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
                                <Input name="projectName" value={projectName} onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Tipo:
                            </Col>
                            <Col>
                                <Input name="projectType" value={projectType} onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Descripción:
                            </Col>
                            <Col>
                                <Input name="description" value={description} onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Usuario activo:
                            </Col>
                            <Col>
                                <select name="active" value={active} onChange={this.changeHandler}>
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
                                <Input type="date" name="creationDate" value={creationDate} onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="buttonRow">
                            <Button color="primary" className="saveButton" onClick={() => this.updateProject()}>Guardar</Button>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditProject