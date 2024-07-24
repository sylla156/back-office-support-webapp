import React from 'react';
import { Redirect } from 'react-router-dom';
import { Routes } from '../../routes';
import { useCookies } from 'react-cookie';
import { Col, Row, Image, Container } from '@themesberg/react-bootstrap';
import Logo from "../../assets/img/technologies/hub2-logo.png";


export default () => {
  const [cookies] = useCookies(['token', 'user']);

  if (!cookies.token) {
    return <Redirect to={Routes.Signin.path} />
  }

  return (
    <Container>
      <Row className='mt-4'>
        <Col xs={12} className='text-center mt-4'>
          <div className='mt-4 pt-4'>
            <Image src={Logo} alt='Logo HUB2' roundedCircle/>
          </div>
          <h4 className='h4 mt-4 text-center'>HUB2 SUPPORT</h4>
        </Col>
      </Row>
    </Container>
  );
};
