import React from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

import { useState } from 'react';

import addQuestion from '../../services/AddQuestionService';

function QuestionsSidebar() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const newQuestionName = React.useRef(null);

  const options = {
    name: 'Enable both scrolling & backdrop',
    scroll: true,
    backdrop: true,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    const data = {
        name: newQuestionName.current.value,
        token : "test"
    }

    let response;
    try{
        response = await addQuestion(data);
        if(response.success){
            
        }
    } catch(err){
        console.log("Error: ", err);
    }
  };

    return (
      <div style={{ textAlign:'right' }}>
        <Button variant="primary" onClick={toggleShow} className="me-2">
            Show all questions
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...options} placement='end'>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>All Question</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingTextarea" label="Add a new question" className="mb-3">
                        <Form.Control as="textarea" placeholder="Add a new question here"
                            name="newQuestionName"
                            ref={newQuestionName}
                        />
                    </FloatingLabel>
                    <div style={{ textAlign:'center'}}>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </div>
                </Form>
                <hr />

                <ul>
                    {/* {names.map(function(name, index){
                        return <li key={ index }>{name}</li>;
                    })} */}
                </ul>
            </Offcanvas.Body>
        </Offcanvas>
      </div>
    );
  }
  
  export default QuestionsSidebar;