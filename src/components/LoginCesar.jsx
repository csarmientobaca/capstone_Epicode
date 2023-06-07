import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row } from 'react-bootstrap';
import plebei from "../imgPub/plebei.png";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/actions/cesaractions';
import './CesarLogin.css'; // Import the CSS file for styling

const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/cesar/login', {
                email,
                password,
            });

            const token = response.data.cesar.access;

            if (token) {
                sessionStorage.setItem('token', token);
                dispatch(loginSuccess(token));
                navigate('/profilecesar');
            } else {
                throw new Error('Invalid response format: Missing token');
            }
        } catch (error) {
            console.log('Login error', error);
            dispatch(loginFailure(error.message));
        }
    };

    const token = sessionStorage.getItem('token');

    if (token) {
        return (
            <Container>
                <Row className="justify-content-md-center mt-5">
                    <div>
                        <Link to="/profilecesar">
                            <img className='plebei-img m-5 ps-5' src={plebei} alt="Plebei" />
                        </Link>
                        <h2>You are logged in, go to your profile.</h2>
                    </div>
                </Row>
            </Container>
        );
    }

    return (
        <Container className='mt-5'>
            <Row className="justify-content-md-center">
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Row>
        </Container>
    );
};

export default FormLogin;
