import React from 'react';
import { Col, Row, Card, Image, Button, ListGroup, ProgressBar,Form,InputGroup } from '@themesberg/react-bootstrap';

export default function Hub2TransactionStatus(props) {
    console.log("props hub value")
    console.log(props);
    const {hub2IdResult:{transactionId,status,merchantId,merchantName,reference,amount,currency,description,createDate,updateDate,logo}} = props;

    const createdAtUtc = new Date(createDate);
    const createdAtFormated = createdAtUtc.toLocaleString('pt-BR');

    const updatedAtUtc = new Date(updateDate);
    const updatedAtFormated = createdAtUtc.toLocaleString('pt-BR');
    return (
        <Card border="light" className="shadow-sm border-warning">
        <Card.Body>
            <Row className="d-block d-xl-flex align-items-center">
            <Col xl={3} className="text-center d-flex align-items-center justify-content-center mb-3 mb-xl-0">
                <img className="mb-4 rounded mx-auto d-block" src={require("../assets/img/technologies/hub2.jpg")} width="80"/> 
            </Col>

            <Col xs={12} xl={9} className="px-xl-0">
            <Form.Group id="firstName">
                <Form.Label >Transaction Id : {transactionId}</Form.Label><br/>
                <Form.Label></Form.Label>
              </Form.Group>
             <Form.Group id="firstName">
                <Form.Label>Reférence marchand : {reference}</Form.Label><br/>
                <Form.Label></Form.Label>
              </Form.Group>
              <Form.Group id="firstName">
                <Form.Label>Marchand : {merchantId} {merchantName}</Form.Label><br/>
                <Form.Label></Form.Label>
              </Form.Group>

              <Form.Group id="firstName">
                <Form.Label>Status : {status}</Form.Label><br/>
                <Form.Label></Form.Label>
              </Form.Group>
              
              <Form.Group id="firstName">
                <Form.Label>Montant : {amount} {currency}</Form.Label><br/>
                <Form.Label></Form.Label>
              </Form.Group>
              <Form.Group id="firstName">
                <Form.Text>Description : {description}</Form.Text><br/>
                <Form.Label></Form.Label>
              </Form.Group>
              <Form.Group id="firstName">
                  {/* Modifier la taille  */}
                <Form.Text className="mb-0">Créé le : {createdAtFormated} Modfié le : {updatedAtFormated}</Form.Text><br/>
                <Form.Label></Form.Label>
              </Form.Group>
            
            </Col>
            
            </Row>
            
        </Card.Body>
    </Card>

    
    )
}


