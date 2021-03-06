import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {Container, Row, Col, Button, Form, FloatingLabel, Card, Alert, Placeholder} from 'react-bootstrap'
import { MdDateRange } from 'react-icons/md';
import { FaPlay, FaEye } from 'react-icons/fa';
import { FiAlertTriangle } from 'react-icons/fi';
import { FcApproval, FcCancel } from "react-icons/fc";
import { createGame, getMyGames } from '../services/Game';

const Dashboard = () => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState(null);
    const [games, setGames] = useState([]);
    const [isGamesNull, setIsGamesNull] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();

    const viewGame = async (e, _id) => {
        e.preventDefault();
        history.push({
            pathname: '/game',
            state: {
                _id
            },
          });
    }

    const startNewGame = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!title) {
            setError('Title is required.')
            setLoading(false);
        } else {
            const response = await createGame(currentUser.token, currentUser._id, title)
            setLoading(false);
            viewGame(e, response.gameId);
        }
    }

    useEffect(() => {
        async function fetchGames() {
            let response = await getMyGames(currentUser.token);
            response.length !== 0 ? setGames(response) : setIsGamesNull(true);
        }
        fetchGames();
        return () => {
            setGames([])
        }
    }, [currentUser])


    return (
        <>
            <Container className="bg-dark rounded-3 text-white" style={{border:'2px solid #5bc0de'}}>
                <Row className="justify-content-md-center my-2 p-3">
                    { error && <Alert variant="danger">
                        <FiAlertTriangle /> {error} </Alert> }
                    <h1 className="display-4 fw-bold p-2 text-center">Start new game</h1>
                    <Form onSubmit={startNewGame} className="text-center w-75">
                        <Form.Group className="mb-3">
                            <FloatingLabel label="Game Title" className="text-dark">
                                <Form.Control type="text" placeholder="Game Title" id="title" name="title" value={title}
                                    onChange={(e)=>
                                    {setTitle(e.target.value)}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Button variant="outline-success" className="text-center w-25" type="submit" size="lg"
                            disabled={loading}>
                            <FaPlay /> {loading ? "Starting" : "Start"}
                        </Button>
                    </Form>
                </Row>
            </Container>

            <Container className="bg-dark rounded-3 text-white mb-5 pb-5" style={{border:'2px solid #5bc0de', marginTop:"20px"}}>
                <Row className="justify-content-md-center my-3 p-4">
                    <h1 className="display-4 fw-bold p-2 text-center">My Games</h1>
                    { isGamesNull && 
                        <h2 className="text-center m-2 p-2">No games created by you.</h2>
                    }
                    {(isGamesNull === false && games.length === 0) &&
                    <Placeholder as="p" animation="glow">
                        <Placeholder xs={12} bg="light" />
                        <Placeholder xs={10} bg="light" />
                        <Placeholder xs={8} bg="light" />
                    </Placeholder>
                    }
                    {games !== null && games.length > 0 && games.map(game => { return ( 
                    <Col md={3} key={game._id} className="p-2 m-2">
                    <Card bg="light" text="dark" className="mb-2">
                        <Card.Body>
                        <Card.Title>{game.title}</Card.Title>
                        <Card.Text>Active: {game.is_active ? <FcApproval />  : <FcCancel />} </Card.Text>
                            <Button variant="outline-dark" size="sm" className="mx-1" onClick={(e) => viewGame(e, game._id)}>
                                <FaEye /> View</Button>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">
                                <MdDateRange /> {game.createdAt}</small>
                        </Card.Footer>
                    </Card>
                    </Col>
                    )})
                    }
                </Row>
            </Container>
        </>
    )
}

export default Dashboard;