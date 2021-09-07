import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import { BiLogIn } from 'react-icons/bi';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { checkGame } from '../services/Game';
import AuthContext from '../context/AuthContext';

const JoinGame = () => {
        const [name, setName] = useState('');
        const [gameId, setGameId] = useState('');
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const { currentUser, setCurrentUser } = useContext(AuthContext);
        const history = useHistory();

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            if (!(name && gameId)) {
                setError('All inputs are required');
                setLoading(false);
            } else {
                const response = await checkGame(gameId);
                if ("error" in response) {
                    setError(response.error);
                    setLoading(false);
                } else {
                    setLoading(false);
                    if (currentUser._id === null) {
                        setCurrentUser({
                            _id: null,
                            name: name,
                            email: null,
                            token: null
                        });
                    }
                    history.push({
                        pathname: '/game',
                        state: {
                            _id: gameId
                        },
                      });
                }
            }
        }

    return (
        <Container>
            <Row className="justify-content-md-center my-5">
                <Card style={{ width: '50%' }} className="bg-light">
                    <Card.Body>
                        <Card.Title className="text-center display-6">Join a game</Card.Title>
                        { error && <Alert variant="danger">
                            <FiAlertTriangle /> {error} </Alert> }
                        <Form onSubmit={handleSubmit}>
                            {currentUser.name === null && 
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Your name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" controlid="name" value={name}
                                    onChange={(e)=> {setName(e.target.value)}} />
                            </Form.Group>
                            }
                            <Form.Group className="mb-3" controlId="gameId">
                                <Form.Label>Game ID</Form.Label>
                                <Form.Control type="text" placeholder="Game ID" controlid="gameId"
                                    value={gameId} onChange={(e)=> {setGameId(e.target.value)}} />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="center w-100" disabled={loading}>
                                <BiLogIn /> {loading ? "Loading" : "Submit"}
                            </Button>
                        </Form>
                        {currentUser._id === null && 
                        <>
                        <hr />
                        <Row>
                            <small className="text-center">Already have an account?</small>
                            <Col>
                                <Link to="/login">
                                <Button variant="outline-success" type="submit" className="w-100 m-1 p-1">
                                <BiLogIn /> Login
                            </Button>
                                </Link>
                            </Col>
                        </Row>
                        </>
                        }
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default JoinGame;