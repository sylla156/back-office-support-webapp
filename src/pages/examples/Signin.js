import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockAlt, faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, Spinner, Container, InputGroup } from '@themesberg/react-bootstrap';

import { useCookies } from 'react-cookie';
import { APPKEY, URL_LOGIN } from '../constante/Const';
import AxiosWebHelper from '../../utils/axios-helper';
import { Redirect } from 'react-router-dom';
import { Routes } from '../../routes';
import AlertDismissable from '../../components/AlertDismissable';


export default function Signin() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [shouldValidate2FA, setShouldValidate2FA] = useState(false);
  const [otpAuthUrl, setOtpAuthUrl] = useState('');
  const [, setLogin] = useState({});
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies(['token', 'id', 'user']);
  const [isLoading, setIsLoading] = useState(false)

  const handleOnUsernameChange = (event) => setLoginUsername(event.target.value);
  const handleOnPasswordChange = (event) => setLoginPassword(event.target.value);

  const axios = AxiosWebHelper.getAxios();

  const loginHub2Support = () => {
    const payload = { 'username': loginUsername, 'password': loginPassword };
    const headers = { AppKey: APPKEY };
    setError(null);
    setIsLoading(true)
    axios.post(URL_LOGIN, payload, headers)
      .then((result) => {
        setLogin(result);
        setCookie('token', result.data.token);
        setCookie('id', result.data.id);
        setCookie('user', result.data.user);
        setOtpAuthUrl(result.data.otpAuthUrl);

        if (result.data.user.isActive2FA === false) {
          setShouldValidate2FA(true);
        } else {
          setIsLoginSuccess(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          setIsLoginSuccess(false);
          setError(error.response.data.message);
        } else if (error) {
          setError(error.message);
        } else {
          setError('Une erreur est survenue.');
        }
      })
      .finally(() => setIsLoading(false));
  };

  const logo = require('../../assets/img/technologies/hub2-logo.png');

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container className="">

          <Row className="justify-content-center form-bg-image " >
            <Col xs={12} className="d-flex align-items-center justify-content-center ">
              <div className="bg-white shadow-soft border rounded border-warning p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center">
                  <img className="mb-2 " src={logo} width="100" height="" />
                </div>
                <div className="text-center  text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Support HUB2</h3>
                </div>
                <Form className="mt-4" >
                  <Form.Group id="email" className="mb-1">
                    <Form.Label></Form.Label>
                    <InputGroup className="border border-warning">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faHouseUser} />
                      </InputGroup.Text>
                      <Form.Control required type="text" placeholder="Utilisateur" onChange={handleOnUsernameChange} />
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

                  {isLoginSuccess ? <div className="d-flex justify-content-center">
                    <Spinner animation="border " size="sm" role="status"></Spinner>
                  </div> : <Button type="button" className="w-100 btn-primary" onClick={loginHub2Support}>
                    Connexion
                  </Button>}

                  <div className="mt-3">
                    <AlertDismissable message={error} variant="danger" show={!!error} onClose={() => setError(null)} isLoading={isLoading} />
                  </div>

                  {isLoginSuccess ? <Redirect to={Routes.VerifyAuth.path} /> : ""}
                  {shouldValidate2FA ? <Redirect to={{ pathname: Routes.VerifyAuth.path, state: { otpAuthUrl } }} /> : ""}
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
}
