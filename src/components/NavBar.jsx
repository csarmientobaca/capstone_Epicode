import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCow, faCoins, faChildren } from '@fortawesome/free-solid-svg-icons'
import romaEagle from '../imgPub/romaEagle.jpg';

function NavBar() {
    return (
        <>
            <Container>

                <Navbar variant="dark" expand="lg" className="roman-navbar" fixed="top">
                    <Navbar.Brand href="#home" className="navbar-brand-center"><img src={romaEagle} alt="Logo" className="brand-logo" /> </Navbar.Brand>

                    <FontAwesomeIcon icon={faCow} color="white" className="icon-large-spacing" />
                    <FontAwesomeIcon icon={faCoins} color="white" className="icon-large-spacing" />
                    <FontAwesomeIcon icon={faChildren} color="white" className="icon-large-spacing" />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="/map">Home</Nav.Link>
                            <Nav.Link href="/profilo">Profile</Nav.Link>
                            <Nav.Link href="/">Registrazione</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </>
    );
}

export default NavBar;