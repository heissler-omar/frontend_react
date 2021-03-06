import React from 'react';
import './CreateUsers.css'
import {Row, Col, Input, Button} from 'reactstrap';
import axios from 'axios';
// import moment from 'moment';

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
        // var formatedDate = moment(this.state.createUser.creationDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
        // this.setState({
        //     createUser: {
        //         ...this.state.createUser,
        //         creationDate: moment(this.state.createUser.creationDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
        //     }
        // })

        console.log('Fecha que no se quiere cambiar: ', this.state.createUser.creationDate)

        axios.post('http://localhost:5000/users', this.state.createUser).then(response => {
            console.log(response)
            
        }).catch(error => {
            console.log(error.message)
        })
    }

    clearForm = async() => {
        console.log('Clear')
        var empty = ''
        await this.setState({
            createUser: {
                ...this.state.createUser,
                username: empty,
                email: empty,
                password: empty,
                active: empty,
                creationDate: empty
            }
        })
    }

    render () {
        return (
            <div>
                <Row className="titleRow">
                    <h3>Creación de usuarios</h3>
                </Row>
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
                            <Button color="primary" className="saveButton" onClick={() => {this.createUser(); this.clearForm()}}>Guardar</Button>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CreateUsers