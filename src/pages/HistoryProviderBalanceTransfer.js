import React, { useState, useEffect } from "react";
import {
  Col,
  Spinner,
  Row,
  Form,
  InputGroup,
  Button,
} from "@themesberg/react-bootstrap";
import { CounterWidgetHistory } from "../components/Widgets";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { useCookies } from "react-cookie";
import AxiosWebHelper from "../utils/axios-helper";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  APPKEY,
  HISTORY_PROVIDER_BALANCE_TRANSFER,
  HISTORY_PROVIDER_BALANCE_TRANSFER_PARAMS,
} from "./constante/Const";

export default () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [balanceList, setBalanceList] = useState([]);
  const [shouldLogin, setShouldLogin] = useState(false);

  const [cookies] = useCookies(["token"]);
  const [day, setDateDay] = useState(undefined);

  const handleDateChange = (event) => {
    const value = event.target.value;

    setDateDay(value);
  };

  const format = "YYYY-MM-DD";
  const dateFormated = moment(day).format(format);
  const axios = AxiosWebHelper.getAxios();

  const getHistoryMerchantBalanceCollection = () => {
    setIsLoaded(false);
    axios
      .get(HISTORY_PROVIDER_BALANCE_TRANSFER, {
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
        params: {
          type: HISTORY_PROVIDER_BALANCE_TRANSFER_PARAMS,
          day: dateFormated,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setBalanceList(result.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        if (error.response) {
          if (error.response.status === 401) {
            setShouldLogin(true);
          } else {
            console.log(error.response.data.message);
          }
        }
      });
  };

  const getMerchantMessage = () => {
    if (!balanceList) return "Nom du fournisseur";
    if (!balanceList.balance) return "Solde fournisseur ";
  };

  const getFormattedDate = () => {
    if (!dateFormated) return "Date du rapport";
    return `Du ${dateFormated}`;
  };

  useEffect(() => {
    getHistoryMerchantBalanceCollection();
  }, []);
  
  if(!cookies.token) {
    return <Redirect to={Routes.Signin.path}/>
  }
  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3">
        <Col xs={12} md={2} lg={4} className="">
          <Form.Group id="dateStart">
            <Form.Label>Date Solde</Form.Label>
            <Datetime
              timeFormat={false}
              onChange={setDateDay}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={day ? moment(day).format("YYYY-MM-DD") : ""}
                    placeholder="yyyy-mm-dd"
                    onFocus={openCalendar}
                    onChange={(event) => {
                      handleDateChange(event);
                    }}
                  />
                </InputGroup>
              )}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={6} lg={7} className="mt-4 ">
          <Button
            className="ml-3"
            variant="primary"
            type="button"
            onClick={getHistoryMerchantBalanceCollection}
          >
            Filtrer
          </Button>
        </Col>
      </div>

      {isLoaded ? (
        <Row className="">
          <h2 className="h3">
            {getMerchantMessage()} {getFormattedDate()}
          </h2>

          {balanceList.length === 0 && (
            <h6 className="h6 mt-4">Aucunes données pour cette date.</h6>
          )}
          
          {balanceList.map((balance) => (
            <Col
              key={balance.id}
              xs={12}
              sm={6}
              md={5}
              lg={4}
              className="mb-4 border-warning "
            >
              <CounterWidgetHistory key={balance.id} balance={balance} />
            </Col>
          ))}
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
