import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getGame, addQuestion, addVote, toggleQuestion } from '../services/Game';
import getPusherInstance from '../config/PusherConfig';
import AuthContext from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Placeholder from 'react-bootstrap/Placeholder';
import Badge from 'react-bootstrap/Badge'
import { FaSave, FaUserCircle, FaChartBar } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { MdCheckCircle } from 'react-icons/md';

const Game = () => {
    const location = useLocation();
    const [_id ] = useState(location.state._id)
    const [game, setGame] = useState(null);
    const [question, setQuestion] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState('');
    const [voteDisable, setVoteDisable] = useState(false)
    const { currentUser } = useContext(AuthContext);
    const points = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]

    const addQuestionHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!question) {
            setError('Question is required');
            setLoading(false);
        } else {
            const response = await addQuestion(currentUser.token, _id, question);
            setSuccess(response.success);
            setLoading(false);
            setQuestion('');
        }
    }

    const voteHandler = async (e, gameId, questionId, points) => {
        e.preventDefault();
        setVoteDisable(true);
        await addVote(gameId, questionId, currentUser.name, points);
        setVoteDisable(false);

    }
    
    const toggleQuestionHandler = async (e, gameId, questionId) => {
        e.preventDefault();
        await toggleQuestion(currentUser.token, gameId, questionId);
    }

    useEffect(() => {
        const channel = getPusherInstance().subscribe('game');
        async function fetchGame() {
            let response = await getGame(currentUser.token, _id);
            setGame(response);
        }
        fetchGame();
        channel.bind('vote', async () => {
            fetchGame();
        });
        return () => {
            setGame(null)
        }
    }, [currentUser, _id])

    return (
        <>
            <Container className="bg-light rounded-3 text-dark">
                <Row className="justify-content-md-center my-5 p-5">
                    { error && <Alert variant="danger">
                        <FiAlertTriangle /> {error} </Alert> }
                    { success && <Alert variant="success">
                        <MdCheckCircle /> <strong>{success} </strong></Alert> }

                    <h1 className="display-6 fw-bold p-2 text-center"><code>Game ID: {_id}</code></h1>
                    {game && currentUser._id === game.started_by &&
                    <Form onSubmit={addQuestionHandler} className="text-center w-75">
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Add a question" className="text-dark">
                                <Form.Control type="text" placeholder="Add a question" id="question" name="question"
                                    value={question} onChange={(e)=>
                                    {setQuestion(e.target.value)}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Button variant="outline-success" className="text-center" type="submit" size="lg"
                            disabled={loading}>
                            <FaSave /> {loading ? "Submitting" : "Submit"}
                        </Button>
                    </Form>
                    }
                </Row>
            </Container>
            <Container className="bg-light rounded-3 text-dark">
                <Row className="justify-content-md-center my-5 p-5">
                    {!game &&
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} bg="dark" />
                        <Placeholder xs={10} bg="dark" />
                        <Placeholder xs={8} bg="dark" />
                    </Placeholder>
                    }
                    {game &&
                    <Tab.Container id="left-tabs-example" defaultActiveKey={game.questions[0]._id}>
                        <Row>
                            <Col sm={3}>
                            { game.questions.map((question) => {
                            return (
                            <Nav variant="pills" className="flex-column" key={question._id}>
                                <Nav.Item>
                                    <Nav.Link eventKey={question._id}>{question.question}
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            )
                            })
                            }
                            </Col>
                            <Col sm={9}>
                            <Tab.Content>
                                { game.questions.map((question) => {
                                return (
                                <Tab.Pane eventKey={question._id} key={question._id}>
                                    <Row className="justify-content-md-center">
                                        {question.votes.map((vote) => {
                                        return (
                                        <Col md={3} className="p-2 m-2" key={vote._id}>
                                        <Card bg="light" text="dark" className="mb-2">
                                            <Card.Body>
                                                <h1 className="text-center">
                                                    <Badge bg="secondary">{!question.is_active ? vote.points : "?"}
                                                    </Badge>
                                                </h1>
                                            </Card.Body>
                                            <Card.Footer>
                                                <small className="text-muted">
                                                    <FaUserCircle /> {vote.voter}</small>
                                            </Card.Footer>
                                        </Card>
                                        </Col>
                                        )
                                        })}
                                    </Row>
                                    <Row>
                                        <ButtonToolbar className="w-100 justify-content-md-center">
                                            {question.is_active && points.map((point) => {
                                            return (
                                            <ButtonGroup key={point} className="p-1 m-1">
                                                <Button size="lg" onClick={(e)=> voteHandler(e, game._id, question._id,
                                                    point)} disabled={voteDisable}><h3>{point}</h3></Button>
                                            </ButtonGroup>
                                            )
                                            })}
                                        </ButtonToolbar>
                                    </Row>
                                    {game && currentUser._id === game.started_by &&
                                    <Row className="p-3 m-3">
                                        <ButtonToolbar className="justify-content-md-center">
                                            <Button className="w-50 text-center" variant="outline-success" size="lg"
                                                onClick={(e)=> toggleQuestionHandler(e, game._id, question._id)}>
                                                <FaChartBar /> {!question.is_active ? "Hide Results" : "Show Results"}
                                            </Button>
                                        </ButtonToolbar>
                                    </Row>
                                    }
                                </Tab.Pane>
                                )
                                })
                                }
                            </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                    }
                </Row>
            </Container>
        </>
    )
}

export default Game;