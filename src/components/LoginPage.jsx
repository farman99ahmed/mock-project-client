import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { BiLogIn } from 'react-icons/bi';
import { FaSave } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Login } from '../services/Auth';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const { setCurrentUser } = useContext(AuthContext);
        const history = useHistory();

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            if (!(email && password)) {
                setError('All inputs are required');
                setLoading(false);
            } else {
                const response = await Login(email, password);
                if ("error" in response) {
                    setError(response.error);
                    setLoading(false);
                } else {
                    setCurrentUser({
                        _id: response._id,
                        name: response.name,
                        email: response.email,
                        token: response.token
                    });
                    window.sessionStorage.setItem("_id", response._id);
                    window.sessionStorage.setItem("name", response.name);
                    window.sessionStorage.setItem("email", response.email);
                    window.sessionStorage.setItem("token", response.token);
                    setLoading(false);
                    history.push('/');
                }
            }
        }

    return (
        <Container>
            <Row className="justify-content-md-center my-5">
                <Card style={{ width: '50%' }} className="bg-light">
                    <Card.Body>
                        <Card.Title className="text-center display-6">Login</Card.Title>
                        { error && <Alert variant="danger">
                            <FiAlertTriangle /> {error} </Alert> }
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" controlid="email" value={email}
                                    onChange={(e)=> {setEmail(e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" controlid="password"
                                    value={password} onChange={(e)=> {setPassword(e.target.value)}} />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="center w-100" disabled={loading}>
                                <BiLogIn /> {loading ? "Loading" : "Submit"}
                            </Button>
                        </Form>
                        <hr />
                        <Row>
                            <small className="text-center">Don't have an account?</small>
                            <Col>
                            <Link to="/register">
                            <Button variant="outline-success" type="submit" className="w-100 m-1 p-1">
                                <FaSave /> Create an account
                            </Button>
                            </Link>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default LoginPage;