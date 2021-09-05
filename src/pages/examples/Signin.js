
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt,faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { APPKEY, URLLOGIN } from "../constante/Const";


//Signin({ setToken })
export default function Signin(){

  const [loginUsername, setLoginUsername] = useState('');

  const [loginPassword, setLoginPassword] = useState('');

  const [login, setLogin] = useState({});


 

  const [cookiesToken, setCookieToken] = useCookies(['token']);
  const [cookiesId, setCookieId] = useCookies(['id']);
  const [cookiesUser, setCookieUser] = useCookies(['user']);

  

  const handleOnUsernameChange = (event) =>{
    console.log("username : " +event.target.value);
    setLoginUsername(event.target.value);
  }

  const handleOnPasswordChange = (event) =>{
    
    console.log("password : "+event.target.value);
    setLoginPassword(event.target.value);
  }


  const loginHub2Support = (event) => {
    
    console.log("will login");
    axios.post(
      URLLOGIN,
      {
        "username": loginUsername,
        "password": loginPassword,
      },
      {
        headers: {
          AppKey: APPKEY
        }
      }
    )
      .then((result) => {
        setLogin(result);
        setCookieToken("token",result.data.token);
        console.log(result);
        console.log(result.data);
        console.log(cookiesToken);
      })
      .catch((error)=>{
        if (error.response) {
          //console.log(error.response.data);
          console.log(error.response.status);
          //console.log(error.response.headers);
        }
      })
  }

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container className="">
         
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
                      <Form.Control  required type="text" placeholder="Utilisateur" onChange={handleOnUsernameChange} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4 ">
                      <Form.Label></Form.Label>
                      <InputGroup className="border border-warning">
                        <InputGroup.Text >
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Mot de passe" onChange={handleOnPasswordChange} />
                      </InputGroup>
                    </Form.Group>
                    
                  </Form.Group>
                 
                  <Button type="button" className="w-100 btn-primary" onClick={loginHub2Support}>
                    Connexion
                  </Button>
                </Form>
                <div className="d-flex justify-content-center my-4">
                  
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

