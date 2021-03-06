import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import '../quiz/quiz.css';

const ViewAnswer = (props) => {
    return (
        <Fragment>
            <Accordion.Toggle as={Button} active="true" variant="" eventKey={props.eKey}>
                <Alert.Link style={{ color: '#775ecf' }}>View Answer</Alert.Link>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.eKey} >
                <Card.Body className='explanation_area' >
                    <div>The Correct Answer is: <strong>{props.correctOption}</strong></div>
                    {props.explain ? <div>Explanation: <strong>{props.explain}</strong></div>
                        : <div>Explanation: <strong>Not Available</strong></div>}
                </Card.Body>
            </Accordion.Collapse>
        </Fragment>
    );
};

export default ViewAnswer;
