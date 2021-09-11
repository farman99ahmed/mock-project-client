import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from '../assets/logo.png'; 
import { GoSignOut } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { ImHome } from 'react-icons/im';
import { RiGameFill } from 'react-icons/ri';
import AuthContext from '../context/AuthContext';
import { BiLogIn } from 'react-icons/bi';
import { FaSave } from 'react-icons/fa';
import { useContext } from 'react';


const NavigationBar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleSignOut = async (e) => {
      e.preventDefault();
      setCurrentUser({ _id: null, name: null, email: null, token: null });
      window.sessionStorage.clear();
  }

 return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <img src={logo} height="50" className="d-inline-block align-top" alt="Poker planner logo" /></Navbar.Brand>
        <Nav className="me-auto">
        </Nav>
        <>
          {currentUser._id != null &&
          <Nav className="p-2">
            <Link to="/">
            <Button variant="light">
              <ImHome /> Home</Button>
            </Link>
          </Nav>}
          <Nav className="p-2">
            <Link to="/join">
            <Button variant="light">
              <RiGameFill /> Join a game</Button>
            </Link>
          </Nav>
          {currentUser.name != null &&
          <Nav className="p-2">
            <Button variant="light" onClick={handleSignOut}>
              <GoSignOut /> {currentUser._id ? "Sign Out" : "Exit"} ({currentUser.name})</Button>
          </Nav>
          }          
          {currentUser._id === null &&
          <>
          <Nav className="p-2">
          <Link to="/login">
          <Button variant="light">
            <BiLogIn /> Login</Button>
          </Link>
        </Nav>          
        <Nav className="p-2">
          <Link to="/register">
          <Button variant="light">
            <FaSave /> Register</Button>
          </Link>
        </Nav>
        </>
          }
        </>
      </Container>
    </Navbar>
 )   
}

export default NavigationBar;