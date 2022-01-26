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
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import AlertDismissable from "../components/AlertDismissable";
import AxiosWebHelper from "../utils/axios-helper";
import { APPKEY, BASEURLMOOVBALANCE } from "./constante/Const";
import { GatewayID } from "../utils/gateway-id";
import { CounterWidgetProviderBalance } from "../components/Widgets";

export default () => {
  const [errorData, setErrorData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [balance, setBalance] = useState("");
  const [balanceDate, setBalanceDate] = useState("");
  const [providerBalance, setProviderBalance] = useState({});
  const [shouldLogin, setShouldLogin] = useState(false);

  const axios = AxiosWebHelper.getAxios();
  const [cookies] = useCookies(["token"]);

  const handleBalance = (event) => {
    setBalance(event);
  };
  const handleBalanceDate = (event) => {
    setBalanceDate(event);
  };

  console.log("========================> token ", cookies.token);

  const getMoovBalance = () => {
    setIsLoaded(false);
    setErrorData(null);
    axios
      .get(
        BASEURLMOOVBALANCE + GatewayID.HUB2_ci_moov,
        {
          params: {
            balance: balance,
            date: balanceDate,
          },
          headers: {
            AppKey: APPKEY,
            authenticationtoken: cookies.token,
          }
        }
      )
      .then((result) => {
        setIsLoaded(true);
        console.log("isLoaded value : " + isLoaded);
        setProviderBalance(result.data);
        console.log("In then");
        console.log(result.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        onFilters();
        if (error.response) {
          console.log("In catch error getMoovBalance", error.response.data);
          // console.log(error.response.data);
          console.log("Status code error : " + error.response.status);
          if (error.response.status === 401) {
            console.log(
              "===========> in error.response.status === 401 of getMoovBalance"
            );
            setShouldLogin(true);
          } else {
            console.log("In atch error getMoovBalance");
            console.log(error.response.data);
            console.log(error.response.data.message);
            setErrorData(error.response.data.message);
          }
        }
      });
  };

  const onFilters = () => {
    setBalanceDate('');
    setBalance('');
    setProviderBalance({})
  };

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
      <div>
        <AlertDismissable
          message={errorData}
          variant="danger"
          show={!!errorData}
          onClose={() => setErrorData(null)}
        />
        <div></div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={12} md={6} lg={6} className="mb-2 px-2">
            <Form.Label>Solde </Form.Label>
            <InputGroup>
              <InputGroup.Text></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder=""
                value={balance}
                onChange={(event) => handleBalance(event.target.value)}
              />
              {/* <Button variant="outline-primary" size="sm" className="px-5" onClick={checkHub2Status}>Vérifier</Button> */}
            </InputGroup>
          </Col>

          <Col xs={12} md={6} lg={6} className="mb-2 px-2">
            <Form.Label>Date du solde</Form.Label>
            <InputGroup>
              <InputGroup.Text></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder=""
                value={balanceDate}
                onChange={(event) => handleBalanceDate(event.target.value)}
              />

              {/* <Button variant="outline-primary" size="sm" className="px-5" onClick={checkHub2Status}>Vérifier</Button> */}
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-between align-items-center">
          <Col xs={12} md={6} lg={6} className="mt-5 px-2">
            <Button
              variant="outline-primary"
              className="mx-2"
              type="button"
              onClick={onFilters}
            >
              Effacer
            </Button>
            <Button
              className="ml-3"
              variant="primary"
              type="button"
              onClick={getMoovBalance}
            >
              Estimation du nouveau solde
            </Button>
          </Col>
        </Row>
      </div>

      {isLoaded ? (
        <Row>
          <Col xs={12} sm={6} md={5} lg={4} className="mb-4 border-warning ">
              <CounterWidgetProviderBalance
                key={providerBalance.id}
                providerBalance={providerBalance}
              />
            </Col>
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