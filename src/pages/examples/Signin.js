
import React, { useState, useEffect,Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt,faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import base64 from 'base-64';
import axios from 'axios';
import { Routes } from "../../routes";




export default () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLoadedProvider, setIsLoadedProvider] = useState(true);

  const [loginUsername, setLoginUsername] = useState('');

  const [loginPassword, setLoginPassword] = useState('');

  const [login, setLogin] = useState({});

  const url = "/authentications";

  console.log("username : " +loginUsername);
  console.log("password : "+loginPassword);

  const loginHub2Support = function (){
    axios.post(
      url,
      {
        "username": loginUsername,
        "password": loginPassword,
      },
      {
        headers: {
          AppKey: "b1413ec5-e76c-4c38-8a1f-38a7a67e0f7c"
        }
      }
    )
      .then((result) => {
        setLogin(result);
        console.log(result);
        console.log(result.data);
       
      },
        (error) => {
          console.log(error.message);
        }

      )
  }
//import { Col, Row, Card, Image, Button, ListGroup, ProgressBar,Form,InputGroup } from '@themesberg/react-bootstrap';

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container className="">
          {/* <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p> */}
          <Row className="justify-content-center form-bg-image " >
            <Col xs={12} className="d-flex align-items-center justify-content-center ">
              <div className="bg-white shadow-soft border rounded border-warning p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center">
                  <img className="mb-4 " src={require("../../assets/img/technologies/hub2.png")} width="100" height=""/>
                </div>
                <div className="text-center  text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Support HUB2</h3>
                </div>
                <Form className="mt-4" >
                  <Form.Group id="email" className="mb-4">
                    <Form.Label></Form.Label>
                    <InputGroup className="border border-warning">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faHouseUser} />
                      </InputGroup.Text>
                      <Form.Control  required type="text" placeholder="Utilisateur" onChange={event =>setLoginUsername(event.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4 ">
                      <Form.Label></Form.Label>
                      <InputGroup className="border border-warning">
                        <InputGroup.Text >
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Mot de passe" onChange={event => setLoginPassword(event.target.value)} />
                      </InputGroup>
                    </Form.Group>
                    {/* <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div> */}
                  </Form.Group>
                  {console.log("isLoaded in balise : " + isLoaded)}
                  <Button variant="" type="submit"  className="w-100 btn-primary" onClick={loginHub2Support}>
                    Connexion
                  </Button>
                </Form>

                {/* <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div> */}
                <div className="d-flex justify-content-center my-4">
                  {/* <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button> */}
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  {/* <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
