import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { useCookies } from "react-cookie";
import AxiosWebHelper from "../utils/axios-helper";
import { CounterWidget } from "../components/Widgets";
import { APPKEY, BASE_URL_MERCHANT_BALANCE } from "./constante/Const";
import { Col, Row, Spinner } from "@themesberg/react-bootstrap";
import AlertDismissable from "../components/AlertDismissable";

export default () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [merchantBalanceList, setMerchantBalanceList] = useState([]);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);

  const [cookies] = useCookies(["token"]);

  if (!cookies) {
    return <Redirect to={Routes.Signin.path} />;
  }

  const axios = AxiosWebHelper.getAxios();

  const checkMerchantBalance = () => {
    setIsLoaded(false);
    axios
      .get(BASE_URL_MERCHANT_BALANCE, {
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setMerchantBalanceList(result.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        if (error.response) {
          if (error.response.status === 401) {
            setShouldLogin(true);
          } else {
            setErrorData(error.response.data.message);
          }
        }
      });
  };

  useEffect(() => {
    checkMerchantBalance();
  }, []);

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
      {isLoaded ? (
        <Row>
          {merchantBalanceList.map((merchantBalance) => (
            <Col xs={12} sm={6} md={5} lg={4} className="mb-4 border-warning ">
              <CounterWidget
                key={merchantBalance.id}
                balance={merchantBalance}
              />
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
