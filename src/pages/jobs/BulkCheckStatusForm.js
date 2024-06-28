import React, { useState, useRef } from 'react';
import { Form, Row, Col, Container, Button } from '@themesberg/react-bootstrap';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { Routes } from '../../routes';
import LoadingOverlay from '../../components/LoadingOverlay';
import { getAxiosInstance, handleAxiosError } from '../../utils/betterAxiosHelpers';
import toast from 'react-hot-toast';
import { genericErrorMessages } from '../../utils/errorMessages';
import { APPKEY } from '../constante/Const';
import { saveAs } from 'file-saver';
import { CHECK_STATUS_BASE_ROUTE, CHECK_STATUS_TEMPLATE_ROUTE } from './apiRoutes';


export default () => {
  const [cookies] = useCookies(['token']);
  const [shouldLogin, setShouldLogin] = useState(false);

  const [isBusy, setIsBusy] = useState(false);

  const formRef = useRef(null)

  const axios = getAxiosInstance();

  const axiosErrorHandlers = {
    onForbidden: () => setShouldLogin(true),
    onResponseError: () => toast.error(genericErrorMessages.serverError),
    onRequestError: () => toast.error(genericErrorMessages.requestError),
    onClientError: () => toast.error('Donnés invalides.\nVeuillez vérifier le fichier CSV que vous envoyez.'),
    onError: () => toast.error(genericErrorMessages.networkError)
  };

  const doSubmit = async (f) => {
    let jobCreated = false;
    setIsBusy(true);
    try {
      await axios.post(CHECK_STATUS_BASE_ROUTE, f, {
        headers: {
          AppKey: APPKEY,
          AuthenticationToken: cookies.token
        }
      });
      jobCreated = true;
    } catch (error) {
      handleAxiosError(error, axiosErrorHandlers);
    }
    setIsBusy(false);
    return jobCreated;
  };

  const onFormSubmit = async (ev) => {
    ev.preventDefault();

    const f = new FormData(ev.target);
    const title = f.get('title').trim();
    const description = f.get('description').trim();

    if (!title || !description) {
      toast.error('Un titre et une description sont requis.');
      return;
    }

    f.set('title', title);
    f.set('description', description);
    if (await doSubmit(f)) {
      formRef.current.reset();
      toast.success('Job créé avec succès ! 😇', {
        duration: 5000
      });
    }
  };

  const downloadTemplate = async () => {
    setIsBusy(true);

    try {
      const response = await axios.get(CHECK_STATUS_TEMPLATE_ROUTE, {
        responseType: 'blob',
        headers: {
          AppKey: APPKEY,
          AuthenticationToken: cookies.token
        }
      });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      saveAs(blob, 'template-check-status.csv');
    } catch (error) {
      toast.error('Impossible de télécharger le fichier.')
      console.error(error);
    }

    setIsBusy(false);
  }

  if (!cookies.token) {
    return (
      <Redirect to={Routes.Signin.path} />
    );
  }

  if (shouldLogin) {
    return (
      <Redirect to={Routes.Signin.path} />
    );
  }

  return (
    <Container style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
      <LoadingOverlay isActive={isBusy} />
      <Form ref={formRef} encType='multipart/form-data' onSubmit={onFormSubmit}>
        <Row className='mt-2'>
          <Col className='col-md-5'>
            <Form.Label>Titre</Form.Label>
            <Form.Control type='text' name='title' required />
          </Col>

          <Col className='col-md-7'>
            <Form.Label>Description (markdown)</Form.Label>
            <Form.Control as='textarea' name='description' rows={4} required />
          </Col>
        </Row>

        <Row className='mt-2'>
          <Col>
            <Form.Label>Fichier CSV</Form.Label>
            <Form.Control type='file' name='csv' accept='text/csv' required />
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col>
            <Button type='submit'>Soumettre</Button>
          </Col>
        </Row>
      </Form>

      <Row className='mt-4'>
        <Col className='text-justify'>
          Le fichier contenant la liste des transactions doit être un CSV avec deux colones.
          <ul className='mb-2'>
            <li>La première colonne comporte l'IDs de la transaction HUB2.</li>
            <li>La seconde l'ID de la transaction chez le marchand.</li>
          </ul>

          <p className='mb-2'>
            Vous devez fournir au moins un de ces identifiants pour que la requête soit traitée.
          </p>

          <Button variant='link' className='p-0 text-primary' onClick={downloadTemplate}>
            Télécharger le template.
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
