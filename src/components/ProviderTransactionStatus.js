import React from 'react';
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar,Form,InputGroup } from '@themesberg/react-bootstrap';

export default function ProviderTransactionStatus() {
    return (
        <Card border="light" className="shadow-sm border-warning">
        <Card.Body>
            <Row className="d-block d-xl-flex align-items-center">
            <Col xl={3} className="text-center d-flex align-items-center justify-content-center mb-3 mb-xl-0">
                <img className="mb-4 rounded mx-auto d-block" src={require("../assets/img/technologies/intouch.jpg")} width="80"/> 
            </Col>

            <Col xs={12} xl={9} className="px-xl-0">
            <Form.Group id="firstName">
                <Form.Label>Transaction Id : </Form.Label><br/>
                <Form.Label></Form.Label>
              </Form.Group>
             <Form.Group id="firstName">
                <Form.Label>Réference Hub2 : </Form.Label><br/>
                <Form.Label></Form.Label>
              </Form.Group>
    

              <Form.Group id="firstName">
                <Form.Label>Status : </Form.Label><br/>
                <Form.Label></Form.Label>
              </Form.Group>
              
              <Form.Group id="firstName">
                <Form.Label>Montant : </Form.Label><br/>
                <Form.Label></Form.Label>
              </Form.Group>
              <Form.Group id="firstName">
                <Form.Text>Description : </Form.Text><br/>
                <Form.Label></Form.Label>
              </Form.Group>
              <Form.Group id="firstName">
                <Form.Text>Date de transaction</Form.Text><br/>
                <Form.Label></Form.Label>
              </Form.Group>
              
            
            </Col>
            
            </Row>
            
        </Card.Body>
    </Card>

    )
}
