import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { GiCardAceSpades } from 'react-icons/gi';
import { GoSignOut } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { ImHome } from 'react-icons/im';


const NavigationBar = () => {

  const handleSignOut = async (e) => {
      e.preventDefault();
  }

 return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <GiCardAceSpades /> POKER Planner</Navbar.Brand>
        <Nav className="me-auto">
        </Nav>
                <>
                <Nav className="p-2">
                  <Link to="/">
                  <Button variant="outline-light">
                    <ImHome /> Home</Button>
                  </Link>
                </Nav>
                <Nav className="p-2">
                  <Button variant="outline-light" onClick={handleSignOut}>
                    <GoSignOut /> Sign Out</Button>
                </Nav>
              </>
      </Container>
    </Navbar>
 )   
}

export default NavigationBar;