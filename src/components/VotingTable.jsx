import { useState, useContext, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Flippy, { FrontSide, BackSide } from 'react-flippy';

const VotingTable = () => {
    const location = useLocation();
    const [_id, setId] = useState(location.state._id)
    const [game, setGame] = useState(null);
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState('');
    const { currentUser } = useContext(AuthContext);

    const fibonacciNumbers = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];


    return (
        <>
            <Card className="text-center" style={{ borderRadius: '20px' }}>
                <Card.Body>
                    <Card.Title>Question Name here</Card.Title>
                    <Button variant="primary">Show Votes</Button>
                </Card.Body>
            </Card>

            <div style={{ display: 'flex', marginTop: '20px', textAlign: 'center'}}>
                {/* Loop through all players & display the card */}
                {/* keep width percentage = 100/number of players */}
                <Card style={{ width: '25%' , backgroundColor: "light-blue" , marginInline: '10px'}}>
                    <Card.Body>
                        <Card.Title>Parikshit</Card.Title>
                        <Flippy
                            flipOnHover={false} // default false
                            flipOnClick={false} // default false
                            flipDirection="horizontal" // horizontal or vertical
                            // isFlipped={true}
                        >
                            <FrontSide>
                                <Button variant="primary" style= {{ width: '100%', height: '100%' }}>?</Button>
                            </FrontSide>
                            <BackSide>
                                <Button variant="primary" style= {{ width: '100%', height: '100%' }}>55</Button>
                            </BackSide>
                        </Flippy>
                    </Card.Body>
                </Card>
            </div>
            
            <div style={{ width: '100%', textAlign: 'center', margin: '20px' }}>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2" aria-label="First group">

                    {fibonacciNumbers.map(function(number, index) {
                        return <Button key={ index } style={{ marginInline: '10px', borderRadius: '5px', padding: '20px' }}>{number}</Button>;
                    })}

                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        </>
    )
}

export default VotingTable;