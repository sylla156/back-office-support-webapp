
import React, {useState} from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {Col, Row, Card, Form, Button, InputGroup} from '@themesberg/react-bootstrap';


export const GeneralInfoForm = () => {

    const [birthday, setBirthday] = useState("");

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">General information</h5>
                <Form>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter your first name" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control required type="text" placeholder="Also your last name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col md={6} className="mb-3">
                            <Form.Group id="birthday">
                                <Form.Label>Birthday</Form.Label>
                                <Datetime
                                    timeFormat={false}
                                    onChange={setBirthday}
                                    renderInput={(props, openCalendar) => (
                                        <InputGroup>
                                            <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                                                placeholder="mm/dd/yyyy"
                                                onFocus={openCalendar}
                                                onChange={() => { }} />
                                        </InputGroup>
                                    )} />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select defaultValue="0">
                                    <option value="0">Gender</option>
                                    <option value="1">Female</option>
                                    <option value="2">Male</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="emal">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" placeholder="name@company.com" />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control required type="number" placeholder="+12-345 678 910" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <h5 className="my-4">Address</h5>
                    <Row>
                        <Col sm={9} className="mb-3">
                            <Form.Group id="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control required type="text" placeholder="Enter your home address" />
                            </Form.Group>
                        </Col>
                        <Col sm={3} className="mb-3">
                            <Form.Group id="addressNumber">
                                <Form.Label>Number</Form.Label>
                                <Form.Control required type="number" placeholder="No." />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4} className="mb-3">
                            <Form.Group id="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control required type="text" placeholder="City" />
                            </Form.Group>
                        </Col>
                        <Col sm={4} className="mb-3">
                            <Form.Group className="mb-2">
                                <Form.Label>Select state</Form.Label>
                                <Form.Select id="state" defaultValue="0">
                                    <option value="0">State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm={4}>
                            <Form.Group id="zip">
                                <Form.Label>ZIP</Form.Label>
                                <Form.Control required type="tel" placeholder="ZIP" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <Button variant="primary" type="submit">Save All</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

};


export const TransferFormInformSourceHub = () => {

    // const { transfer: { id, status, merchantId,amount,description, createdAt, updatedAt,reference} } = props;

    // console.log("createdAt : "+ createdAt);
    // console.log("updatedAt : "+ updatedAt);
  
    // const createdAtUtc = new Date(createdAt);
    // const createdAtFormated = createdAtUtc.toLocaleString('pt-BR');

  
    // const updatedAtUtc = new Date(updatedAt);
    // const updatedAtFormated = updatedAtUtc.toLocaleString('pt-BR');

    // const testU =new Date(updatedAtFormated);
    // console.log("testU :: "+testU)


    // console.log("updatedAtFormated : "+ updatedAtFormated);
    // console.log("createdAtFormated : "+ createdAtFormated)
    return (
        <Card border="light" className="bg-white border-warning shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4"> HUB2</h5>
                <Form>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>Id</Form.Label><br/>
                                <Form.Label ></Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="lastName">
                                <Form.Label>Marchand Id</Form.Label><br/>
                                <Form.Label ></Form.Label>
                            </Form.Group>
                        </Col>
             
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="">
                                <Form.Label>Marchand</Form.Label><br/>
                                <Form.Label ></Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="">
                                <Form.Label>Montant</Form.Label><br/>
                                <Form.Label ></Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="emal">
                                <Form.Label>Description</Form.Label><br/>
                                <Form.Label ></Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Date de création</Form.Label><br/>
                                <Form.Label ></Form.Label>
                            </Form.Group>
                        </Col>
              
                    </Row>
  
                    <Row>
                        <Col sm={6} className="mb-3">
                            <Form.Group id="city">
                                <Form.Label>Date de mise à jour</Form.Label><br/>
                                <Form.Label ></Form.Label>
                            </Form.Group>
                        </Col>
              
                    </Row>
                    {/* <div className="mt-3">
              <Button variant="primary" type="submit">Save All</Button>
            </div> */}
                </Form>
            </Card.Body>
        </Card>
    );
  
};


export const TransferFormInformSourceProvider = () => {

    // const {intouch:{amount,gu_transaction_id,recipient_id,recipient_invoice_id,service_id,status,transaction_date}} = props;

    // const transactionDateUtc = new Date(transaction_date);
    // const transactionDateFormated = transactionDateUtc.toLocaleString('pt-BR');

    // console.log("transactionDateFormated : "+ transactionDateFormated);
    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4"> Provider</h5>
                <Form>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>Transaction Id</Form.Label><br/>
                                <Form.Label></Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="lastName">
                                <Form.Label>Status</Form.Label><br/>
                                <Form.Label></Form.Label>
                            </Form.Group>
                        </Col>
            
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="emal">
                                <Form.Label>Service</Form.Label><br/>
                                <Form.Label></Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Montant</Form.Label><br/>
                                <Form.Label></Form.Label>
                            </Form.Group>
                        </Col>
            
                    </Row>

                    <Row>
                        <Col sm={6} className="mb-3">
                            <Form.Group id="city">
                                <Form.Label>Date de transaction</Form.Label><br/>
                                <Form.Label></Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Destinataire</Form.Label><br/>
                                <Form.Label></Form.Label>
                            </Form.Group>
                        </Col>
            
                    </Row>
                    {/* <div className="mt-3">
            <Button variant="primary" type="submit">Save All</Button>
          </div> */}
                </Form>
            </Card.Body>
        </Card>
    );

};


export const TransferFormInformForceStatusSourceHub = (props) => {

    const {transfer: {id, status, merchantId, amount, description, createdAt, updatedAt, reference}} = props;
    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4"> HUB2</h5>
                <Form>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>Id</Form.Label><br/>
                                <Form.Label >{id}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="lastName">
                                <Form.Label>Status</Form.Label><br/>
                                <Form.Label >{status}</Form.Label>
                            </Form.Group>
                        </Col>
             
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="">
                                <Form.Label>Réference</Form.Label><br/>
                                <Form.Label >{reference}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="">
                                <Form.Label>Description</Form.Label><br/>
                                <Form.Label >{description}</Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="emal">
                                <Form.Label>Merchant id</Form.Label><br/>
                                <Form.Label >{merchantId}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Montant</Form.Label><br/>
                                <Form.Label >{amount}</Form.Label>
                            </Form.Group>
                        </Col>
              
                    </Row>
  
                    <Row>
                        <Col sm={6} className="mb-3">
                            <Form.Group id="city">
                                <Form.Label>Date de création</Form.Label><br/>
                                <Form.Label >{createdAt}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Date update</Form.Label><br/>
                                <Form.Label>{updatedAt}</Form.Label>
                            </Form.Group>
                        </Col>
              
                    </Row>
                    {/* <div className="mt-3">
              <Button variant="primary" type="submit">Save All</Button>
            </div> */}
                </Form>
            </Card.Body>
        </Card>
    );

};

export const TransferFormInformForceStatusSourceProvider = (props) => {

    const {intouch:{amount, gu_transaction_id, recipient_id, service_id, status, transaction_date}} = props
    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4"> Provider</h5>
                <Form>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="firstName">
                                <Form.Label>Transaction Id</Form.Label><br/>
                                <Form.Label>{gu_transaction_id}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="lastName">
                                <Form.Label>Status</Form.Label><br/>
                                <Form.Label>{status}</Form.Label>
                            </Form.Group>
                        </Col>
            
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group id="emal">
                                <Form.Label>Service</Form.Label><br/>
                                <Form.Label>{service_id}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Montant</Form.Label><br/>
                                <Form.Label>{amount}</Form.Label>
                            </Form.Group>
                        </Col>
            
                    </Row>

                    <Row>
                        <Col sm={6} className="mb-3">
                            <Form.Group id="city">
                                <Form.Label>Date de transaction</Form.Label><br/>
                                <Form.Label>{transaction_date}</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group id="phone">
                                <Form.Label>Destinataire</Form.Label><br/>
                                <Form.Label>{recipient_id}</Form.Label>
                            </Form.Group>
                        </Col>
            
                    </Row>
                    {/* <div className="mt-3">
            <Button variant="primary" type="submit">Save All</Button>
          </div> */}
                </Form>
            </Card.Body>
        </Card>
    );

};
