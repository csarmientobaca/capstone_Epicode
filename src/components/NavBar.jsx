import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCow, faCoins, faChildren } from '@fortawesome/free-solid-svg-icons';
import romaEagle from '../imgPub/romaEagle.jpg';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
    const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Remove the token from sessionStorage
        alert('you are out'); // Show an alert
        navigate('/login'); // Redirect to the login page
    };

    return (
        <>
            <Container className="nav-space">
                <Navbar variant="dark" expand="lg" className="roman-navbar" fixed="top">
                    <Navbar.Brand as={Link} to="/" className="navbar-brand-center">
                        <img src={romaEagle} alt="Logo" className="brand-logo" />
                    </Navbar.Brand>

                    <FontAwesomeIcon icon={faCow} color="white" className="icon-large-spacing" />
                    <FontAwesomeIcon icon={faCoins} color="white" className="icon-large-spacing" />
                    <FontAwesomeIcon icon={faChildren} color="white" className="icon-large-spacing" />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link as={Link} to="/map">Home</Nav.Link>
                            {token && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
                            {!token && <Nav.Link as={Link} to="/">Registrazione</Nav.Link>}
                            {!token && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                            {token && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </>
    );
}

export default NavBar;
