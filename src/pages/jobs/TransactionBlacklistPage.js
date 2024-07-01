import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Container, Row, Col, Button, Table, Card, Badge, Form } from '@themesberg/react-bootstrap';
import { faCheck, faMoneyBillWave, faPiggyBank, faFlag, faShare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingOverlay from '@/components/LoadingOverlay';
import { genericErrorMessages } from '@/utils/errorMessages';
import { getAxiosInstance, handleAxiosError } from '@/utils/betterAxiosHelpers';
import { Routes } from '@/routes';
import { formatDate } from '@/utils/date';
import { formatNationalPhoneNumber } from '@/utils/phoneNumber';
import countryCodes from '@/utils/countryCodes';
import { TRANSACTION_BLACKLIST_BASE_ROUTE, TRANSACTION_BLACKLIST_JOB_BASE_ROUTE } from './apiRoutes';
import { APPKEY } from '../constante/Const';


export const TransactionBlacklistPage = () => {
  const getItemKey = item => `${item.country}:${item.msisdn}:${item.transactionType}`;

  const [cookies] = useCookies(['token']);
  const [shouldLogin, setShouldLogin] = useState(false);

  const [busy, setBusy] = useState(false);

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const axiosErrorHandlers = {
    onForbidden: () => setShouldLogin(true),
    onClientError: () => toast.error('Données invalides. Veuillez vérifier votre saisie.'),
    onServerError: () => toast.error(genericErrorMessages.serverError),
    onRequestError: () => toast.error(genericErrorMessages.requestError),
    onError: () => toast.error(genericErrorMessages.networkError)
  };

  const selectAll = () => {
    setBusy(true);
    if (Object.keys(selectedItems).length === items.length) {
      setBusy(false);
      return;
    }

    const selected = {};
    for (const item of items) {
      selected[item.key] = true;
    }
    setSelectedItems(selected);
    setBusy(false);
  };

  const deselectAll = () => setSelectedItems({});

  const toggle = (key, checked) => {
    setBusy(true);
    setSelectedItems(prev => {
      const updated = { ...prev };
      if (checked) {
        updated[key] = true;
      } else {
        delete updated[key];
      }
      return updated;
    });
    setBusy(false);
  };

  const axios = getAxiosInstance();

  const doSubmit = async (data) => {
    let jobCreated = false;
    try {
      await axios.post(TRANSACTION_BLACKLIST_JOB_BASE_ROUTE, data, {
        headers: {
          AppKey: APPKEY,
          AuthenticationToken: cookies.token
        }
      });
      jobCreated = true;
    } catch (error) {
      handleAxiosError(error, axiosErrorHandlers);
    }
    return jobCreated;
  };

  const handleSubmit = async () => {
    const title = titleRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    if (!title.length || !description.length) {
      toast('Un titre et une description sont requis.', {
        duration: 4000,
        icon: '😑'
      });
      return false;
    }

    const selected = Object.keys(selectedItems);
    if (selected.length === 0) {
      toast('Veuillez sélectionner au moins un élément.', {
        duration: 4000,
        icon: '😑'
      });
      return false;
    }

    const itemsToSubmit = selected.map(item => {
      const tokens = item.split(':');
      return {
        country: tokens[0],
        msisdn: tokens[1],
        transactionType: tokens[2]
      }
    });

    return doSubmit({ title, description, items: itemsToSubmit });
  };

  const onSubmit = async () => {
    setBusy(true);
    if (await handleSubmit()) {
      toast.success('Job créé avec succès !');
      titleRef.current.value = '';
      descriptionRef.current.value = '';
      setItems((items) => {
        return items.filter(item => !(item.key in selectedItems));
      })
      setSelectedItems({});
    }
    setBusy(false);
  };

  const fetchTransactionBlacklistItems = async () => {
    const { data } = await axios.get(TRANSACTION_BLACKLIST_BASE_ROUTE, {
      headers: {
        AuthenticationToken: cookies.token
      }
    });
    return data.map(item => ({ key: getItemKey(item), ...item }));
  };

  useEffect(() => {
    setBusy(true);

    let mounted = true;
    const fetchData = async () => {
      try {
        const items = await fetchTransactionBlacklistItems();
        if (mounted) {
          setItems(items);
        }
      } catch (error) {
        if (mounted) {
          handleAxiosError(error, axiosErrorHandlers);
        }
      } finally {
        if (mounted) {
          setBusy(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

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
    <Container style={{ pointerEvents: busy ? 'none' : 'auto' }}>
      <LoadingOverlay isActive={busy} />

      <Row className='mt-2'>
        <Col className='col-md-5'>
          <Form.Label>Titre</Form.Label>
          <Form.Control ref={titleRef} type='text' name='title' required />
        </Col>

        <Col className='col-md-7'>
          <Form.Label>Description (markdown)</Form.Label>
          <Form.Control ref={descriptionRef} as='textarea' name='description' rows={4} required />
        </Col>
      </Row>

      <Row className='mt-4 p-0'>
        <Col>
          <Card border="light" className="table-wrapper table-responsive shadow-sm mb-4">
            <Card.Body className="pt-0 px-3">
              <Table hover>
                <thead>
                  <tr>
                    <th className='text-center'>
                      <Button
                        onClick={selectAll}
                        size='sm'
                        variant='success'
                        title='Tout cocher'
                      >
                        <FontAwesomeIcon icon={faCheck} size='sm' />
                      </Button>
                      &nbsp;
                      <Button
                        onClick={deselectAll}
                        size='sm'
                        variant='danger'
                        title='Tout décocher'
                      >
                        <FontAwesomeIcon icon={faSquare} size='sm' />
                      </Button>
                    </th>
                    <th>
                      <FontAwesomeIcon icon={faFlag} size='sm' />
                    </th>
                    <th className='w-25 px-2'>Pays</th>
                    <th className='w-25 px-2'>MSISDN</th>
                    <th className='w-25 px-2'>Date d&apos;ajout</th>
                    <th className='px-2'>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <For each="item" of={items}>
                    <tr key={item.key}>
                      <td className='text-center'>
                        <input
                          checked={item.key in selectedItems}
                          onChange={(ev) => toggle(item.key, ev.target.checked)}
                          type='checkbox'
                        />
                      </td>
                      <td>
                        <img src={`https://flagsapi.com/${item.country}/shiny/24.png`} alt='Drapeau' />
                      </td>
                      <td className='px-2'>
                        {countryCodes[item.country] || item.country}
                      </td>
                      <td className='px-2'>{formatNationalPhoneNumber(item.msisdn)}</td>
                      <td className='px-2'>{formatDate(item.createdAt)}</td>
                      <td className='px-2'>
                        <TransactionTypePill transactionType={item.transactionType} />
                      </td>
                    </tr>
                  </For>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className='mt-3'>
        <Col className='text-end'>
          <Button
            className='py-1'
            onClick={onSubmit}
          >
            <FontAwesomeIcon icon={faShare} size='sm' />
            &nbsp;
            Soumettre
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

function TransactionTypePill({ transactionType }) {
  const bgMap = {
    transfer: 'info',
    payment: 'success'
  }
  const bg = bgMap[transactionType];

  const iconMap = {
    transfer: faMoneyBillWave,
    payment: faPiggyBank
  };
  const icon = iconMap[transactionType];

  const translations = {
    transfer: 'Payout',
    payment: 'Payin'
  };
  const text = translations[transactionType];

  const style = {
    fontSize: '0.75rem'
  }

  return (
    <Badge pill bg={bg} style={style} className='px-2 py-1'>
      <FontAwesomeIcon icon={icon} size='sm' />
      &nbsp;
      <span>{text}</span>
    </Badge>
  );
}
