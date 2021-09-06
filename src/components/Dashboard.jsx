import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import { MdDateRange } from 'react-icons/md';
import { FaPlay, FaEye } from 'react-icons/fa';




const Dashboard = () => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState('');

    const startNewGame = (e) => {
        e.preventDefault();
        console.log(title);
    }
    return (
        <>
            <Container className="bg-light rounded-3 text-dark">
                <Row className="justify-content-md-center my-5 p-5">
                    <h1 className="display-4 fw-bold p-2 text-center">Start new game</h1>
                    <Form onSubmit={startNewGame}>
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Game title" className="text-dark">
                                <Form.Control type="text" placeholder="Game title" id="title" name="title" value={title}
                                    onChange={(e)=>
                                    {setTitle(e.target.value)}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Button variant="outline-success" className="text-center" type="submit" size="lg"
                            disabled={loading}>
                            <FaPlay /> {loading ? "Starting" : "Start"}
                        </Button>
                    </Form>
                </Row>
            </Container>
            <Container className="bg-light rounded-3 text-dark">
                <Row className="justify-content-md-center my-5 p-5">
                    <h1 className="display-4 fw-bold p-2 text-center">My games</h1>
                    <Col md={3}>
                <Card bg="info" text="light" className="mb-2">
                    <Card.Body>
                        <Card.Text>article.body</Card.Text>
                        <Button variant="success" size="sm" className="mx-1">
                            <FaEye /> View</Button> 

                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">
                            <MdDateRange /> article.createdAt</small>
                    </Card.Footer>
                </Card>
                </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;