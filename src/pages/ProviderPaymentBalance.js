import React, { useState, useEffect } from "react";
import { CounterWidget } from "../components/Widgets";
import AxiosWebHelper from "../utils/axios-helper";
import { APPKEY, PROVIDER_PAYMENT_BALANCE_URL } from "./constante/Const";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";

import { useCookies } from "react-cookie";
import { Col, Row, Spinner } from "@themesberg/react-bootstrap";

export default()=> {

  const [isLoaded, setIsLoaded] = useState(false);
  const [balanceList, setBalanceList] = useState([]);
  const [shouldLogin, setShouldLogin] = useState(false);

  const [cookies] = useCookies(["token"]);

  if(!cookies) {
    return <Redirect to={Routes.Signin.path}/>
  }

  const axios = AxiosWebHelper.getAxios();
  const getBalances = () => {
    setIsLoaded(false);
    axios
      .get(PROVIDER_PAYMENT_BALANCE_URL, {
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
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

  useEffect(() => {
    getBalances();
  }, []);

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <>
      {isLoaded ? (
        <Row className="">
          {balanceList.map((balance) => (
            <Col
              key={balance.id}
              xs={12}
              sm={6}
              md={5}
              lg={4}
              className="mb-4 border-warning "
            >
              <CounterWidget key={balance.id} balance={balance} />
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
}