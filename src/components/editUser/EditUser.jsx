import React from 'react';
import axios from 'axios';
import './EditUser.css'
import {Row, Col, Button, Input} from 'reactstrap';
// import moment from 'moment';

class EditUser extends React.Component {

    state = {
        updateUser: {
            username: '',
            email: '',
            password: '',
            active: '',
            creationDate: ''
        },
        userId: ''
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = async() => { 
        var location = window.location.href
        var id = location.slice(28, -5)
        this.setState({userId: id})
        console.log(location)
        console.log(id)
        await axios.get('http://localhost:5000/users/' + id)
        .then(response => {
            this.setState({updateUser: response.data})
            console.log(this.state.updateUser)
        })
        .catch(error => {console.log(error)})
    }

    changeHandler = async e => {
        e.persist();
        await this.setState({
            updateUser: {
                ...this.state.updateUser,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.updateUser)
    }

    updateUser = () => {
        axios.put('http://localhost:5000/users/' + this.state.userId, this.state.updateUser)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {console.log(error)})

        window.location = '/users/' + this.state.userId
    }

    render () {
        const {username, email, password, active, creationDate} = this.state.updateUser
        return (
            <div>
                <Row className="rows">
                    <Col xs="7" className="formCol">
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Nombre:
                            </Col>
                            <Col>
                                <Input name="username" value={username} onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Correo:
                            </Col>
                            <Col>
                                <Input name="email" value={email} onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Contraseña:
                            </Col>
                            <Col>
                                <Input type="password" name="password" value={password} onChange={this.changeHandler}></Input>
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
                            <Button color="primary" className="saveButton" onClick={() => this.updateUser()}>Guardar</Button>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EditUser