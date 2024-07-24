import { Col, Form, InputGroup, Row, Spinner, Button } from '@themesberg/react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import AxiosWebHelper from '../../utils/axios-helper';
import {
  APPKEY,
  PAGE_SIZE,
  FIRST_PAGE_INDEX,
  STATUS_CONFIRMATION_PAYMENT_LIST,
  StatusConfirmationList,
} from '../constante/Const';
import { Redirect } from 'react-router-dom';
import { Routes } from '../../routes';
import { format, subDays } from 'date-fns';
import AlertDismissable from '../../components/AlertDismissable';
import { UpdateLocalData } from '../../components/statusConfirmation/UpdateLocalData';
import { StatusConfirmationReportingList } from './StatusConfirmationReportingList';

export default () => {
  const currentDate = new Date();

  const startDateToUse = subDays(currentDate, 2);
  const formatStartDateToUse = format(startDateToUse, 'yyyy-MM-dd');
  const defaultStartDate = `${formatStartDateToUse}T00:00:00Z`;
  const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
  const defaultEndDate = `${formattedCurrentDate}T23:59:59Z`;

  const [errorData, setErrorData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCsvLoaded, setIsCsvLoaded] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [status, setStatus] = useState('pending');
  const [merchantId, setMerchantId] = useState('');
  const [gatewayId, setGatewayId] = useState('');
  const [transactionForceStatus, setTransactionForceStatus] = useState([]);
  const [count, setCount] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
  const [version, setVersion] = useState(0);

  const handleStartDate = (value) => setStartDate(value);
  const handleEndDate = (value) => setEndDate(value);

  const [cookies] = useCookies(['token', 'user']);

  const userCanForceStatus = cookies.user?.canForceStatus;
  const userCanUpdateLocalData = cookies.user?.canUpdateCachedTransaction;

  const axios = AxiosWebHelper.getAxios();

  const exportData = () => {};

  const fetchStatusConfirmationData = async () => {
    setIsLoaded(false);
    setErrorData(null)
    await axios.get(STATUS_CONFIRMATION_PAYMENT_LIST, {
      params: {
        from: startDate,
        to: endDate,
        merchantId,
        gatewayId,
        status,
        csv: false,
        page: currentPage,
        perPage: PAGE_SIZE,
      },
      headers: {
        AppKey: APPKEY,
        authenticationtoken: cookies.token,
      },
    }).then((result) => {
      setIsLoaded(true);
      setTransactionForceStatus(result.data.transactionForceStatus);
      setCount(result.data.count);
    }).catch((error) => {
      setIsLoaded(true);
      if (error.response) {
        if (error.response.status === 401) {
          setShouldLogin(true);
        } else {
          setErrorData(error.response.data.message);
        }
      }
    });
  }

  const onPageChange = (page = 0) => setCurrentPage(page);

  const incrementVersion = () => {
    setVersion((currentVersion) => currentVersion + 1);
  };

  const onClearFilters = () => {
    setMerchantId('');
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setGatewayId('')
    setStatus('pending');
  };

  useEffect(() => {
    fetchStatusConfirmationData();
  }, [currentPage, version]);

  if (!cookies.token) {
    return <Redirect to={Routes.Signin.path} />;
  }

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <>
      {/* Filter fields */}
      <div className='align-items-center d-flex flex-wrap'>
        <Col xs={12} md={6} lg={3} className='mb-2 px-2'>
          <Form.Label>Date début</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type='text'
              placeholder='Date début'
              value={startDate}
              onChange={(event) => handleStartDate(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className='mb-2 px-2'>
          <Form.Label>Date fin</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type='text'
              placeholder='Date fin'
              value={endDate}
              onChange={(event) => handleEndDate(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className='mb-2 px-2'>
          <Form.Group id='status'>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <For each='item' of={StatusConfirmationList}>
                <option key={item.id} value={item.status}>
                  {item.status}
                </option>
              </For>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={6} lg={3} className='mb-2 px-2'>
          <Form.Label>MerchantId</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type='text'
              placeholder='MerchantId'
              value={merchantId}
              onChange={(event) => setMerchantId(event.target.value.trim())}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className='mb-2 px-2'>
          <Form.Label>Gateway ID</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type='text'
              placeholder='GatewayId'
              value={gatewayId}
              onChange={(event) => setGatewayId(event.target.value.trim())}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={3} lg={3} className='px-2 mt-4'>
          <div className='mt-3 mb-4'>
            <Button
              variant='outline-primary'
              type='button'
              onClick={onClearFilters}
            >
              Effacer
            </Button>
            <Button
              className='mx-2'
              variant='primary'
              type='button'
              onClick={fetchStatusConfirmationData}
            >
              Filtrer
            </Button>

            <Choose>
              <When condition={isCsvLoaded}>
                <Button
                  variant='outline-primary'
                  className=''
                  type='button'
                  onClick={exportData}
                >
                  Exporter
                </Button>
              </When>
              <Otherwise>
                <div className='d-flex justify-content-center'>
                  <Spinner animation='border ' size='sm' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </Spinner>
                </div>
              </Otherwise>
            </Choose>
          </div>
        </Col>
      </div>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'></div>
      <div>
        <AlertDismissable
          message={errorData}
          variant='danger'
          show={!!errorData}
          onClose={() => setErrorData(null)}
        />
        <div></div>
      </div>

      <If condition={userCanUpdateLocalData}>
        <UpdateLocalData
          onRefresh={incrementVersion}
          userCanUpdateLocalData={userCanUpdateLocalData}
        />
      </If>

      <Choose>
        <When condition={isLoaded}>
          <Row>
            <StatusConfirmationReportingList
              key={version}
              listInfo={transactionForceStatus}
              count={count}
              currentPage={currentPage}
              onPageChange={onPageChange}
              onRefresh={incrementVersion}
              userCanForceStatus={userCanForceStatus}
              userCanUpdateLocalData={userCanUpdateLocalData}
            />
          </Row>
        </When>
        <Otherwise>
          <div className='d-flex justify-content-center'>
            <Spinner animation='border ' size='sm' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </div>
        </Otherwise>
      </Choose>
    </>
  );
};
