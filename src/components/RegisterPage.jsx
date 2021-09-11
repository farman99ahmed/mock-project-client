import {Container, Row, Col, Card, Button, Form, Alert} from 'react-bootstrap'
import { Register } from '../services/Auth';
import { BiLogIn } from 'react-icons/bi';
import { FaSave } from 'react-icons/fa';
import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if (!(name && email && password && confirmPassword)) {
            setError('All inputs are required')
            setLoading(false);
        } else if(password !== confirmPassword) {
            setError('Passwords do not match.')
            setLoading(false);
        } else {
            const response = await Register(name, email, password);
            if ("error" in response) {
                setError(response.error)
                setLoading(false);
            } else {
                setSuccess('User created successfully, please logIn again to continue.');
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setLoading(false);
        }
    }
}

    return (
        <Container>
            <Row className="justify-content-md-center my-5">
                <Card style={{ width: '50%' }} className="bg-dark text-white border-info">
                    <Card.Body>
                        <Card.Title className="text-center display-6">Create an account</Card.Title>
                        { error && <Alert variant="danger"><FiAlertTriangle /> {error} </Alert> }
                        { success && <Alert variant="success"><MdCheckCircle /> <strong>{success} </strong></Alert> }
                        <Form onSubmit = {handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" controlid="name" value={name} onChange={(e) => {setName(e.target.value)}} required/>
                            </Form.Group>                            
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                            </Form.Group>                            
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
                            </Form.Group>                            
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} required/>
                            </Form.Group>
                            <Button variant="info" type="submit" className="w-100 m-1" disabled={loading}>
                                <FaSave/> {loading ? "Loading" : "Submit"}
                            </Button>
                        </Form>
                        <hr />
                        <Row>
                            <small className="text-center">Already have an account?</small>
                            <Col>
                                <Link to="/login">
                                <Button variant="outline-warning" type="submit" className="w-100 m-1 p-1">
                                <BiLogIn /> Login
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

export default RegisterPage;