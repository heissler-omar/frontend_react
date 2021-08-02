import React from 'react';
import {Table, Row, Col, Container, Button} from 'reactstrap'
import './ViewUsers.css';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

class ViewUsers extends React.Component {

    state = {
        users: [],
        userId: '',
        title: 'Todos los usuarios:'
    }

    getUsers = () => {
        axios.get('http://localhost:5000/users')
        .then(response => {
            console.log(response)
            this.setState({users: response.data})
        })
        .catch(error => {console.log(error)})
    }
    getActiveUsers = () => {
        axios.get('http://localhost:5000/users?active=true')
        .then(response => {
            console.log(response)
            this.setState({users: response.data})
        })
        .catch(error => {console.log(error)})
    }
    getInactiveUsers = () => {
        axios.get('http://localhost:5000/users?active=false')
        .then(response => {
            console.log(response)
            this.setState({users: response.data})
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
        this.getUsers();
    }

    render () {
        return (
            <div>
                <Container className="usersContainer">
                    <Row className="selectRow">
                        <Button className="linkButton" onClick={() => {this.getUsers(); this.setState({title: 'Todos los usuarios:'})}}>
                            Todos
                        </Button>&nbsp;&nbsp;
                        <Button className="linkButton" onClick={() => {this.getActiveUsers(); this.setState({title: 'Usuarios activos:'})}}>
                            Activos
                        </Button>&nbsp;&nbsp;
                        <Button className="linkButton" onClick={() => {this.getInactiveUsers(); this.setState({title: 'Usuarios inactivos:'})}}>
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
                    <Row className="viewUsersRows">
                        <Col>
                            <Table className="usersTable">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Fecha</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.users.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    <Link to={"/users/" + user._id.$oid} className="nameLink">
                                                        {user.username}
                                                    </Link>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>{user.creationDate}</td>
                                                <td className="buttonsTd">
                                                    <Link to={"/users/" + user._id.$oid} className="eyeButton">
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

export default ViewUsers