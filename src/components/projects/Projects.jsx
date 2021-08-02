import React from 'react';
import {Table, Row, Col, Container, Button} from 'reactstrap'
// import './ViewUsers.css';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

class Projects extends React.Component {

    state = {
        projects: [],
        userId: '',
        title: 'Todos los proyectos:'
    }

    getProjects = async() => { 
        await axios.get('http://localhost:5000/projects')
        .then(response => {
            console.log(response)
            this.setState({projects: response.data})
        })
        .catch(error => {console.log(error)})
    }
    getActiveProjects = async() => { 
        await axios.get('http://localhost:5000/projects?active=true')
        .then(response => {
            console.log(response)
            this.setState({projects: response.data})
        })
        .catch(error => {console.log(error)})
    }
    getInactiveProjects = async() => { 
        await axios.get('http://localhost:5000/projects?active=false')
        .then(response => {
            console.log(response)
            this.setState({projects: response.data})
        })
        .catch(error => {console.log(error)})
    }

    deleteUser = async() => {
        await axios.delete('http://localhost:5000/user/' + this.state.userId)
        .then(response => {
            console.log(response)
        })
        .catch(error => {console.log(error)})
    }

    componentDidMount() {
        this.getProjects();
    }

    render () {
        return (
            <div>
                <Container className="usersContainer">
                    <Row className="selectRow">
                    <Row className="selectRow">
                        <Button className="linkButton" onClick={() => {this.getProjects(); this.setState({title: 'Todos los proyectos:'})}}>
                            Todos
                        </Button>&nbsp;&nbsp;
                        <Button className="linkButton" onClick={() => {this.getActiveProjects(); this.setState({title: 'Proyectos activos:'})}}>
                            Activos
                        </Button>&nbsp;&nbsp;
                        <Button className="linkButton" onClick={() => {this.getInactiveProjects(); this.setState({title: 'Proyectos inactivos:'})}}>
                            Inactivos
                        </Button>
                    </Row>
                    <Row className="titleRow">
                        <Col>
                        <h3>
                            {this.state.title}
                        </h3>
                        </Col>
                    </Row>
                    </Row>
                    <Row className="viewUsersRows">
                        <Col>
                            <Table className="usersTable">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Descripción</th>
                                        <th>Fecha</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.projects.map((project, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    <Link to={"/projects/" + project._id.$oid} className="nameLink">
                                                        {project.projectName}
                                                    </Link>
                                                </td>
                                                <td>{project.projectType}</td>
                                                <td>{project.description}</td>
                                                <td>{project.creationDate}</td>
                                                <td className="buttonsTd">
                                                    <Link to={"/projects/" + project._id.$oid} className="eyeButton">
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </Link>{' '}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
    
}

export default Projects