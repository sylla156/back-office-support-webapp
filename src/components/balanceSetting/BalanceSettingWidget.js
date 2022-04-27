import React, { useState } from "react";
import {
  Col,
  Spinner,
  Row,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { APPKEY, SETTING_BALANCE } from "../../pages/constante/Const";
import AxiosWebHelper from "../../utils/axios-helper";
import { useCookies } from "react-cookie";

export const BalanceSettingWidget = (props) => {
  const item = props.balanceSetting;
  let id;
  let amount;
  let currency;
  let date;
  let gatewayId;
  let logo;
  let name;

  if (item) {
    id = item.id;
    date = item.date;
    name = item.name;
    amount = item.amount;
    gatewayId = item.gatewayId;
  }

  const [errorData, setErrorData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [balance, setBalance] = useState(amount);
  const [balanceDate, setBalanceDate] = useState(date);

  const axios = AxiosWebHelper.getAxios();
  const [cookies] = useCookies(["token"]);

  const handleBalance = (value) => {
    setBalance(value);
  };
  const handleBalanceDate = (value) => {
    setBalanceDate(value);
  };

  const updateSettingBalance = (settingId) => {
    setIsLoaded(false);
    setErrorData(null);
    axios
      .patch(
        SETTING_BALANCE + "/" + settingId,
        {
          date: balanceDate,
          amount: balance,
        },
        {
          headers: {
            AppKey: APPKEY,
            authenticationtoken: cookies.token,
          },
        }
      )
      .then((result) => {
        setIsLoaded(true);
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
    setBalanceDate("");
    setBalance("");
  };

  return (
    <>
      <h1> {name} </h1>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={12} md={6} lg={6} className="mb-2 px-2">
            <Form.Label>Solde </Form.Label>
            <InputGroup>
              <InputGroup.Text></InputGroup.Text>
              <Form.Control
                type="number"
                placeholder={amount}
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
                placeholder={date}
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

            {isLoaded ? (
              <Button
                className="ml-3"
                variant="primary"
                type="button"
                onClick={() => updateSettingBalance(id)}
              >
                Nouveau solde {name}
              </Button>
            ) : (
              <div className="d-flex justify-content-center">
                <Spinner animation="border " size="sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};
