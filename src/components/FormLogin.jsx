import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Row } from 'react-bootstrap';

const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        };

        fetch('http://127.0.0.1:5000/api/v1/auth/login', opts)
            .then(resp => {
                if (resp.status === 200) return resp.json();
                else alert('Login error');
            })
            .then(data => {
                console.log('hi from backend', data);
                sessionStorage.setItem('token', data.access_token);
                getUserData();
                navigate('/profile');
            })
            .catch(error => {
                console.log('Login error', error);
            });
    };

    const getUserData = () => {
        const token = sessionStorage.getItem('token');

        fetch('http://127.0.0.1:5000/api/v1/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(resp => {
                if (resp.status === 200) return resp.json();
                else throw new Error('Failed to fetch user data');
            })
            .then(userData => {
                console.log('User data from backend:', userData);
                setUserData(userData);
            })
            .catch(error => {
                console.log('User data fetch error:', error);
            });
    };

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>

                    {userData && <h1>Welcome, {userData.username}!</h1>}
                </Row>
            </Container>

        </>
    );
};

export default FormLogin;