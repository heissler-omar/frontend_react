import React from 'react';
import './Home.css';
import reactLogo from './React-logo.png'
import { Row, Col } from 'reactstrap';

const Home = () => {
    return (
        <div className="principalDiv">
            <Row className="imageRow">
                <Col>
                    <img src={reactLogo} alt=""/>
                </Col>
            </Row>
        </div>
    )
}

export default Home