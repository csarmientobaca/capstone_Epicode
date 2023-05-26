import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FormLogin = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = sessionStorage.getItem("token")

    const handleSubmit = (event) => {
        event.preventDefault();

        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }
        // Handle registration logic here (e.g., validation, server request)
        fetch("http://127.0.0.1:5000/token", opts)
            .then(resp => {
                if (resp.status === 200) return resp.json();
                else alert("some error")
            })
            .then(data => {
                console.log("hi from backend", data)
                sessionStorage.setItem("token", data.access_token)
            })
            .catch(error => {
                console.log("another error", error)
            })



        console.log('Form submitted!');
    };

    return (
        <div>

            {token && token !== "" && token !== undefined ? (
                "you are logged in with this token" + token
            ) : (

                < Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={email}
                            onChange={(event) => setUsername(event.target.value)}
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
            )}</div >
    )
}


export default FormLogin;