import React, { useState, useEffect } from "react";
import {
  Col,
  Spinner,
  Row,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { useCookies } from "react-cookie";
import { SmsOrangeCashInList } from "../components/sms/SmsOrangeCashInList";
import { Routes } from "../routes";
import { Redirect } from "react-router-dom";
import AxiosWebHelper from "../utils/axios-helper";
import {
  APPKEY,
  PAGE_SIZE,
  SMS_CONTENT_ORANGE_CASH_IN,
} from "./constante/Const";

export default () => {
  const [errorData, setErrorData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [amount, setAmount] = useState(undefined);
  const [operatorRef, setOperatorRef] = useState(undefined);
  const [msisdn, setMsisdn] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const [smsList, setSmsList] = useState([]);
  const [count, setCount] = useState(undefined);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const handleStartDate = (value) => {
    setStartDate(value);
  };
  const handleEndDate = (value) => {
    setEndDate(value);
  };

  const handleAmount = (value) => {
    setAmount(value);
  };
  const handleMsisdn = (value) => {
    setMsisdn(value);
  };
  const handleOperatorRef = (value) => {
    setOperatorRef(value);
  };
  const [cookies] = useCookies(["token"]);
  const axios = AxiosWebHelper.getAxios();

  const getSmsContentOrangeCashIn = () => {
    setErrorData(null);
    setIsLoaded(false);
    axios
      .get(SMS_CONTENT_ORANGE_CASH_IN, {
        params: {
          amount,
          operatorRef,
          msisdn,
          to: startDate,
          from: endDate,
          perPage: PAGE_SIZE,
          page: currentPage
        },
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setSmsList(result.data.result);
        setCount(result.data.count);
      })
      .catch((error) => {
        setIsLoaded(true);
        onFilters();
        if (error.response) {
          console.log(
            "In catch error getSmsContentOrange454",
            error.response.data
          );
          // console.log(error.response.data);
          console.log("Status code error : " + error.response.status);
          if (error.response.status === 401) {
            console.log(
              "===========> in error.response.status === 401 of checkSupportTransferStatus"
            );
            setShouldLogin(true);
          } else {
            console.log("In catch error getSmsContentOrange454");
            console.log(error.response.data);
            console.log(error.response.data.message);
            setErrorData(error.response.data.message);
          }
        }
      });
  };

  useEffect(() => {
    getSmsContentOrangeCashIn();
  }, [currentPage]);

  const onFilters = () => {
    setAmount("");
    setMsisdn("");
    setStartDate("");
    setEndDate("")
    setOperatorRef("");
    setSmsList([])
    setCount(0);
  };
  const onPageChange = (page = 0) => {
    setCurrentPage(page);
  };

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <>
      {/* filter system */}
      <div className="align-items-center d-flex flex-wrap">
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
        <Form.Label>Référence opérateur</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Référence opérateur"
              value={operatorRef}
              onChange={(event) => handleOperatorRef(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
        <Form.Label>Montant du transfert</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Montant du transfert"
              value={amount}
              onChange={(event) => handleAmount(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
        <Form.Label>Numéro de téléphone</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Numéro de téléphone"
              value={msisdn}
              onChange={(event) => handleMsisdn(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
        <Form.Label>Date début</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Date début"
              value={startDate}
              onChange={(event) => handleStartDate(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
        <Form.Label>Date fin</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Date fin"
              value={endDate}
              onChange={(event) => handleEndDate(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={3} lg={3} className="px-2 mt-4">
          <div className="mt-3 mb-4">
            <Button
              variant="outline-primary"
              type="button"
              onClick={onFilters}
            >
              Effacer
            </Button>
            <Button
              className="mx-2"
              variant="primary"
              type="button"
              onClick={getSmsContentOrangeCashIn}
            >
              Filtrer
            </Button>
          </div>
        </Col>
      </div>

      {/* sms content list */}

      {isLoaded ? (
        <Row>
            <SmsOrangeCashInList
              listInfo={smsList}
              count={count}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
        </Row>
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border " size="sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
};
