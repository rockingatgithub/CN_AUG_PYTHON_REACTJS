import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavbarComponent = (props) => {

    return (<Navbar bg="light" variant="light">
        <Container fluid>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Link to="/"> Signup </Link>
                <Link to="/signin"> Signin </Link>
                <Link to="/dashboard"> Dashboard </Link>
            </Nav>
        </Container>
    </Navbar>)

}

export default NavbarComponent