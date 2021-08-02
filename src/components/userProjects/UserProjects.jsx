import React from 'react';
import axios from 'axios';
// import './ViewUser.css'
import {Row, Col} from 'reactstrap';
import { Link } from "react-router-dom";

class UserProjects extends React.Component {

    state = {
        projects: [],
        userId: ''
    }

    componentDidMount() {
        this.getUserProjects()
    }

    getUserProjects = async() => { 
        var location = window.location.href
        var id = location.slice(28, -9)
        this.setState({userId: id})

        await axios.get('http://localhost:5000/users/' + id + '/projects')
        .then(response => {
            this.setState({projects: response.data})
            console.log(this.state.projects)
        })
        .catch(error => {console.log(error)})
    }

    render () {
        return (
            <div>
                {this.state.projects.map(project => {
                    return (
                        <Row className="viewUserRow">
                            <Col xs="7" className="viewUserCol">
                                <Row className="viewUserNameCol">
                                    <Col>
                                        Nombre del proyecto:
                                    </Col>
                                    <Col>
                                        {project.projectName}
                                    </Col>
                                </Row>
                                <Row className="viewUserNameCol">
                                    <Col>
                                        Tipo:
                                    </Col>
                                    <Col>
                                        {project.projectType}
                                    </Col>
                                </Row>
                                <Row className="viewUserNameCol">
                                    <Col>
                                        Proyecto activo:
                                    </Col>
                                    <Col>
                                        {project.active}
                                    </Col>
                                </Row>
                                <Row className="viewUserNameCol">
                                    <Col>
                                        Fecha:
                                    </Col>
                                    <Col>
                                        {project.creationDate}
                                    </Col>
                                </Row>
                                <Row className="viewUserNameCol">
                                    <Col>
                                        Descripción:
                                    </Col>
                                    <Col>
                                        {project.description}
                                    </Col>
                                </Row>
                                <Row className="viewUserButtons">
                                    <Link to={'/projects/' + project._id.$oid} className="viewUserLink">
                                        Ver
                                    </Link>
                                </Row>
                            </Col>
                        </Row>
                    )
                })}
                {/* <Row className="viewUserRow">
                    <Col xs="7" className="viewUserCol">
                        <Row className="viewUserNameCol">
                            <Col>
                                Nombre del proyecto:
                            </Col>
                            <Col>
                                {this.state.projects.projectName}
                            </Col>
                        </Row>
                        <Row className="viewUserNameCol">
                            <Col>
                                Tipo:
                            </Col>
                            <Col>
                                {this.state.projects.projectType}
                            </Col>
                        </Row>
                        <Row className="viewUserNameCol">
                            <Col>
                                Proyecto activo:
                            </Col>
                            <Col>
                                {this.state.projects.active}
                            </Col>
                        </Row>
                        <Row className="viewUserNameCol">
                            <Col>
                                Fecha:
                            </Col>
                            <Col>
                                {this.state.projects.creationDate}
                            </Col>
                        </Row>
                        <Row className="viewUserNameCol">
                            <Col>
                                Descripción:
                            </Col>
                            <Col>
                                {this.state.projects.description}
                            </Col>
                        </Row>
                    </Col>
                </Row> */}
            </div>
        )
    }
}

export default UserProjects