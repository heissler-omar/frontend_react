import React from 'react';
import {Table, Row, Col, Container, Button} from 'reactstrap'
import './ViewUsers.css';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

class ViewUsers extends React.Component {

    state = {
        users: []
    }

    getUsers = async() =>{ 
        await axios.get('http://localhost:5000/users')
        .then(response => {
            console.log(response)
            this.setState({users: response.data})
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
                <Row className="rows">
                    <Col>
                        <Table hover>
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
                                    return(
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.creationDate}</td>
                                            <td className="buttonsTd">
                                                <Button>
                                                   <FontAwesomeIcon icon={faEdit}/>
                                                </Button>{' '}
                                                <Button>
                                                   <FontAwesomeIcon icon={faTrashAlt}/>
                                                </Button>
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