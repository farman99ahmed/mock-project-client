import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import getPusherInstance from '../config/PusherConfig';
import { getGame } from '../services/Game';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { FaSave } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Game = () => {
    const location = useLocation();
    const [_id, setId] = useState(location.state._id)
    const [game, setGame] = useState(null);
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState('');
    const { currentUser } = useContext(AuthContext);

    const addQuestion = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        async function fetchGame() {
            let response = await getGame(currentUser.token, _id);
            setGame(response);
            console.log(game);
        }
        fetchGame();
        return () => {
            setGame(null)
        }
    }, [currentUser])

    return (
        <>
        <Container className="bg-light rounded-3 text-dark">
            <Row className="justify-content-md-center my-5 p-5">
                <h1 className="display-6 fw-bold p-2 text-center"><code>Game ID: {_id}</code></h1>
            <Form onSubmit={addQuestion} className="text-center w-75">
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Add a question" className="text-dark">
                                <Form.Control type="text" placeholder="Add a question" id="question" name="question" value={question}
                                    onChange={(e)=>
                                        {setQuestion(e.target.value)}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Button variant="outline-success" className="text-center" type="submit" size="lg"
                            disabled={loading}>
                            <FaSave /> {loading ? "Submitting" : "Submit"}
                        </Button>
                    </Form>
                                </Row>
        </Container>
        <Container className="bg-light rounded-3 text-dark">
            <Row className="justify-content-md-center my-5 p-5">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">What is your name?What is your name? What is your name?</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Tab 2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            What is your name?
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            gdfgdfsgdsfgdsfg
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            </Row>
        </Container>
        </>
    )
}

export default Game;