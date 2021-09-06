import React from 'react';

import './JoinGame.css';

import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useHistory } from 'react-router-dom';

import joinGame from '../../services/JoinGameService';

function JoinGame() {
    const history = useHistory();
    const gameCodeInput = React.useRef(null);

    const handleSubmit = async e => {
        e.preventDefault();
        
        const data = {
            name: gameCodeInput.current.value,
            token : "test"
        }

        let response;
        try{
            response = await joinGame(data);
            if(response.success){
                history.push(`/game/${response.data.game_id}`);
            }
        } catch(err){
            console.log("Error: ", err);
        }
    };

    return (
      <div className="join-game-form">
        <Card style={{ backgroundColor: '#F8F9FA' }}>
            <Card.Body>
                <Card.Title>Join an existing game!</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="gameCodeInputGroup">
                        <FloatingLabel
                            controlId="gameCodeLabel"
                            label="Enter the game code"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text" 
                                placeholder="Enter the game code" 
                                name="gameCodeInput"
                                id="gameCodeInput"
                                required
                                ref={gameCodeInput}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Join!
                    </Button>
                </Form>
            </Card.Body>
        </Card>
      </div>
    );
  }
  
  export default JoinGame;