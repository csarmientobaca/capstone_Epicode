import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, login } from '../redux/actions/actions';
import axios from 'axios';
import './CesarLogin.css';

const FormRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/register', {
                username,
                email,
                password,
            });

            if (response.status === 201) {
                console.log('User registered');
                alert('Registration successful');
                const token = response.data.token;
                const storedToken = sessionStorage.getItem('token'); // Get the token from sessionStorage
                if (!storedToken) {
                    sessionStorage.setItem('token', token); // Save the token
                }
                dispatch(login(email, password)); // Log in the user
                navigate('/login'); // Navigate to the login page
                dispatch(setUser(response.data.user)); // Update the user state in Redux
            } else {
                throw new Error('Registration error');
            }
        } catch (error) {
            console.log('Registration error', error);
            alert('Registration error');
        }
    };

    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
        return (
            <Container>
                <h2>You are already registered and logged in.</h2>
            </Container>
        );
    }

    return (
        <Container className='mt-5'>
            <Form onSubmit={handleSubmit} className="register-form">
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </Form.Group>

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
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default FormRegister;
