import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { useCookies } from "react-cookie";
import AxiosWebHelper from "../utils/axios-helper";
import { MerchantCounterWidget } from "../components/Widgets";
import { APPKEY, BASE_URL_MERCHANT_TRANSFER_BALANCES } from "./constante/Const";
import { Col, Row, Spinner } from "@themesberg/react-bootstrap";
import AlertDismissable from "../components/AlertDismissable";

export const MerchantBalance = (props) => {
  const merchant = props.merchant;
  const {id} = merchant;

  const [isLoaded, setIsLoaded] = useState(true);
  const [merchantBalance, setMerchantBalance] = useState([]);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [version, setVersion] = useState(0);

  const [cookies] = useCookies(["token","user"]);

  const axios = AxiosWebHelper.getAxios();

  const getMerchantBalance = () => {
    setIsLoaded(false);
    axios
      .get(BASE_URL_MERCHANT_TRANSFER_BALANCES +"/"+ id, {
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setMerchantBalance(result.data);
        setVersion();
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

  const incrementVersion = ()=> setVersion((currentVersion)=> {
    console
    return currentVersion + 1;
  })

  useEffect(() => {
    getMerchantBalance();
  }, [id, version]);
  if (!cookies.token) {
    return <Redirect to={Routes.Signin.path} />;
  }
  
  
  
  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <>
      {isLoaded ? (
        <MerchantCounterWidget key={merchantBalance.id} balance={merchantBalance} merchant={merchant} onRefresh={incrementVersion} />
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
