import React from 'react';
import './CreateUsers.css'
import {Row, Col, Input, Button} from 'reactstrap';
import axios from 'axios';

class CreateUsers extends React.Component {
    state = {
        createUser: {
            username: '',
            email: '',
            password: '',
            active: '',
            creationDate: ''
        }
    }

    changeHandler = async e => {
        e.persist();
        await this.setState({
            createUser: {
                ...this.state.createUser,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.createUser)
    }
    createUser = () => {
        axios.post('http://localhost:5000/users', this.state.createUser).then(response => {
            console.log(response)
            this.setState({
                createUser: {
                    username: '',
                    email: '',
                    password: '',
                    active: '',
                    creationDate: ''
                }
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    render () {
        return (
            <div>
                <Row className="rows">
                    <Col xs="7" className="formCol">
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Nombre:
                            </Col>
                            <Col>
                                <Input name="username" onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Correo:
                            </Col>
                            <Col>
                                <Input name="email" onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Contraseña:
                            </Col>
                            <Col>
                                <Input type="password" name="password" onChange={this.changeHandler}></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Usuario activo:
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
                            <Button color="primary" className="saveButton" onClick={() => this.createUser()}>Guardar</Button>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CreateUsers