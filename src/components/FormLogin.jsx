import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/actions';
import plebei from "../imgPub/plebei.png";

const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Dispatch the login action with email and password
        dispatch(login(email, password))
            .then(() => {
                navigate('/profile');
            })
            .catch((error) => {
                console.log('Login error', error);
            });
    };

    const token = sessionStorage.getItem('token');

    if (token) {
        return (
            <Container>
                <Row className="justify-content-md-center mt-5">
                    <div>
                        <Link to="/profile">
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
                <Form onSubmit={handleSubmit}>
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
