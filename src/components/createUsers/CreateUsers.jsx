import React from 'react';
import './CreateUsers.css'
import {Row, Col, Input} from 'reactstrap';

class CreateUsers extends React.Component {
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
                                <Input></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Correo:
                            </Col>
                            <Col>
                                <Input></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Contraseña:
                            </Col>
                            <Col>
                                <Input type="password"></Input>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Usuario activo:
                            </Col>
                            <Col>
                                <select>
                                    <option>Si</option>
                                    <option>No</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="inputRow">
                            <Col xs="4" className="label">
                                Fecha:
                            </Col>
                            <Col>
                                <Input type="date"></Input>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CreateUsers