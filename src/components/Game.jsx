import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getGame, addQuestion, addVote, toggleQuestion, setActiveQuestion } from '../services/Game';
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
import Modal from 'react-bootstrap/Modal'
import { FaSave, FaUserCircle, FaChartBar, FaVoteYea } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { MdCheckCircle } from 'react-icons/md';

const Game = () => {
    const location = useLocation();
    const [_id ] = useState(location.state._id)
    const [game, setGame] = useState(null);
    const [question, setQuestion] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false);
    const [voteDisable, setVoteDisable] = useState(false)
    const { currentUser } = useContext(AuthContext);
    const points = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        addVote(gameId, questionId, currentUser.name, points);
        setVoteDisable(false);

    }
    
    const toggleQuestionHandler = async (e, gameId, questionId) => {
        e.preventDefault();
        toggleQuestion(currentUser.token, gameId, questionId);
    }

    const setActiveGameHandler = async (e, gameId, questionId) => {
        e.preventDefault();
        setActiveQuestion(currentUser.token, gameId, questionId);

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
            <Container className="bg-dark rounded-3 text-white" style={{border:'2px solid #5bc0de'}}>
                <Row className="justify-content-md-center my-2 p-3">
                    { error && <Alert variant="danger">
                        <FiAlertTriangle /> {error} </Alert> }
                    { success && <Alert variant="success">
                        <MdCheckCircle /> <strong>{success} </strong></Alert> }

                    <h1 className="display-6 fw-bold p-2 text-center"><code>Game ID: {_id}</code></h1>
                </Row>
            </Container>
            <Container className="bg-dark rounded-3 text-white mb-5 pb-5"
                style={{border:'2px solid #5bc0de', marginTop:"20px"}}>
                <Row className="justify-content-md-center my-3 p-5">
                    {!game &&
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} bg="light" />
                        <Placeholder xs={10} bg="light" />
                        <Placeholder xs={8} bg="light" />
                    </Placeholder>
                    }
                    {game && game.questions.length === 0 &&
                    <h2 className="text-center m-2 p-2">No questions in this game.</h2>
                    }
                    {game && game.questions.length > 0 &&
                    <Tab.Container id="left-tabs-example" defaultActiveKey={game.questions[0]._id}>
                        <Row>
                            <Col sm={4}>
                            <Card border="info" className="m-2 p-2 bg-dark">
                                <Card.Header className="fw-bold text-center">Questions</Card.Header>
                                <Card.Body>
                                    { game.questions.map((question, index) => {
                                    return (
                                    <Nav variant="pills" className="flex-column" key={question._id}>
                                        <Nav.Item>
                                            <Nav.Link eventKey={question._id} style={{ cursor: 'pointer' }}>
                                                <Card.Text>{index+1}. {question.question} {game.active_question ===
                                                    question._id && <Badge pill bg="warning" className="text-dark">Live
                                                    </Badge>}</Card.Text>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    )
                                    })
                                    }
                                    {game && currentUser._id === game.started_by &&
                                    <>
                                        <Button variant="primary" onClick={handleShow}
                                            style={{ margin: '10px', width: '100%' }}
                                        >
                                            Add New Question
                                        </Button>
                                    
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton className="bg-dark">
                                                <Modal.Title><h2 className="fw-bold p-2 text-center"><code>Add New Question</code></h2></Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body className="bg-dark">
                                                <Form onSubmit={addQuestionHandler} className="text-center w-100">
                                                    <Form.Group className="mb-3">
                                                        <FloatingLabel label="Enter a question" className="text-dark">
                                                            <Form.Control type="text" placeholder="Enter a question" id="question" name="question"
                                                                value={question} onChange={(e)=>
                                                                {setQuestion(e.target.value)}}/>
                                                        </FloatingLabel>
                                                    </Form.Group>
                                                    <Button variant="outline-success" className="text-center" type="submit" disabled={loading}>
                                                        <FaSave /> {loading ? "Adding" : "Add"}
                                                    </Button>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer className="bg-dark">
                                                <Button variant="primary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </>
                                    }
                                </Card.Body>
                            </Card>
                            </Col>
                            <Col sm={8}>
                            <Tab.Content>
                                { game.questions.map((question) => {
                                return (
                                <Tab.Pane eventKey={question._id} key={question._id}>
                                    <h2 className="display-6 fw-bold p-2 text-center"><code>Question Name : {question.question}</code></h2>
                                    {game && currentUser._id === game.started_by && game.active_question !== question._id &&
                                    <Row className="p-3 m-3">
                                        <ButtonToolbar className="justify-content-md-center">
                                            <Button className="text-center" variant="outline-warning" size="sm"
                                                onClick={(e)=> setActiveGameHandler(e, game._id, question._id)}>
                                                <FaVoteYea /> Start Voting
                                            </Button>
                                        </ButtonToolbar>
                                    </Row>
                                    }
                                    <Row className="justify-content-md-center">
                                        {question.votes.map((vote) => {
                                        return (
                                        <Col md={3} className="px-2 m-2" key={vote._id}>
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
                                        {!question.is_active ?
                                            <Card bg="light" text="dark" className="mb-2">
                                                <Card.Body>
                                                    <h4 className="text-center fw-bold p-2">
                                                        <code>
                                                            Total Votes Cast : {question.votes.length}
                                                            <br />
                                                            Most voted point : 
                                                            {
                                                                ` ${[...question.votes.reduce((acc, e) => acc.set(e.points, (acc.get(e.points) || 0) + 1), new Map())
                                                                .entries()].reduce((a, e ) => e[1] > a[1] ? e : a)[0]}, `
                                                            }
                                                            with
                                                            {
                                                                ` ${[...question.votes.reduce((acc, e) => acc.set(e.points, (acc.get(e.points) || 0) + 1), new Map())
                                                                .entries()].reduce((a, e ) => e[1] > a[1] ? e : a)[1] } `
                                                            }
                                                            votes
                                                        </code>
                                                    </h4>
                                                </Card.Body>
                                            </Card>
                                        : ""}
                                    </Row>
                                    <Row>
                                        {question.is_active && game.active_question === question._id ?
                                            <h3 className="fw-bold p-2 text-center"><code>Cast your vote</code></h3>
                                            : ""
                                        }
                                        <ButtonToolbar className="w-100 justify-content-md-center">
                                            {question.is_active && game.active_question === question._id && points.map((point) => {
                                            return (
                                            <ButtonGroup key={point} className="p-1 m-1">
                                                <Button size="lg" onClick={(e)=> voteHandler(e, game._id, question._id,
                                                    point)} disabled={voteDisable}><h3>{point}</h3></Button>
                                            </ButtonGroup>
                                            )
                                            })}
                                        </ButtonToolbar>
                                    </Row>
                                    {game && currentUser._id === game.started_by && question.votes.length > 0 &&
                                    <Row className="p-3 m-3">
                                        <ButtonToolbar className="justify-content-md-center">
                                            <Button className="w-50 text-center" variant="outline-warning"
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