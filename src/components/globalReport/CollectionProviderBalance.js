import React, { useState, useEffect, version } from "react";
import {
  Col,
  Spinner,
  Row,
} from "@themesberg/react-bootstrap";
import { useCookies } from "react-cookie";
import AxiosWebHelper from "../../utils/axios-helper";
import {
  APPKEY,
  PROVIDER_PAYMENT_BALANCE_URL,
} from "../../pages/constante/Const";
import { CounterWidget } from "../Widgets";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";

export const CollectionProviderBalance = (props) => {
  const version = props.version;
  
  const [isLoaded, setIsLoaded] = useState(true);
  const [providerBalance, setProviderBalance] = useState([]);
  const [errorData, setErrorData] = useState(null);
  const [shouldLogin, setShouldLogin] = useState(false);

  const axios = AxiosWebHelper.getAxios();
  const [cookies] = useCookies(["token"]);

  if(!cookies.token) {
    return <Redirect to={Routes.Signin.path}/>
  }

  const getProviderBalance = () => {
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
        setProviderBalance(result.data);
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
    getProviderBalance();
  }, [version]);

  if(shouldLogin) {
    return <Redirect to={Routes.Signin.path}/>
  }

  return (
    <>
      {isLoaded ? (
        <Row className="">
          {providerBalance.map((balance) => (
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
};
