import React from 'react';

import './CreateGame.css';

import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useHistory } from 'react-router-dom';

import createGame from '../../services/CreateGameService';

function CreateGame() {
    const history = useHistory();
    const nameInput = React.useRef(null);

    const handleSubmit = async e => {
        e.preventDefault();
        
        const data = {
            name: nameInput.current.value,
            token : "test"
        }

        let response;
        try{
            response = await createGame(data);
            if(response.success){
                history.push(`/game/${response.data.game_id}`);
            }
        } catch(err){
            console.log("Error: ", err);
        }
    };

    return (
      <div className="create-game-form">
        <Card style={{ backgroundColor: '#F8F9FA' }}>
            <Card.Body>
                <Card.Title>Create a new game!</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="nameInputGroup">
                        <FloatingLabel
                            controlId="nameLabel"
                            label="Enter a name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text" 
                                placeholder="Enter the name of your game" 
                                name="nameInput"
                                id="nameInput"
                                required
                                ref={nameInput}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create!
                    </Button>
                </Form>
            </Card.Body>
        </Card>
      </div>
    );
  }
  
  export default CreateGame;