
import React, { useState, useEffect } from "react";
import { Col, Row, Spinner } from '@themesberg/react-bootstrap';

import { CounterWidget } from "../components/Widgets";
import AxiosWebHelper from "../utils/axios-helper";
import { APPKEY, BASEURLSOLDE } from "./constante/Const";
import { Redirect } from 'react-router';
import { Routes } from "../routes";

import { withCookies,useCookies,Cookies } from 'react-cookie';

export default () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [balanceList, setBalanceList] = useState([]);
  const [shouldLogin, setShouldLogin] = useState(false);

  const [cookies, setCookie] = useCookies(['token']);


  //const baseUrlSolde = "/balances";
  const axios = AxiosWebHelper.getAxios();

  const checkSolde = () => {
    setIsLoaded(false);

    console.log("isLoaded value : " + isLoaded);

    console.log("authenticationtokend value : " + cookies.token);

    console.log(" In check solde ");

    axios.get(
      BASEURLSOLDE,
      {
        headers: {
          AppKey: APPKEY,
          authenticationtoken:cookies.token
        }
      }
    )
      .then((result) => {
        setIsLoaded(true);
        console.log("isLoaded value : " + isLoaded);
        setBalanceList(result.data);
        console.log("In then")
        console.log(result.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        console.log("In the catch")
        if (error.response) {
          console.log("In catch error solde", error.response.data);
          //console.log(error.response.data);
          console.log("Status code error : " + error.response.status);
          //console.log(error.response.headers);
          if (error.response.status === 401) {
            setShouldLogin(true);
          }
          else {
            console.log(error.response.data.message);
          }
        }
      });

  };


  useEffect(() => {
    checkSolde();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     checkSolde();
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);
  
  if(shouldLogin){
    return <Redirect to={Routes.Signin.path} />;
  }
  return (
    <>
      {isLoaded ? <Row className="">
        {balanceList.map((balance) => (
          <Col key={balance.id} xs={12} sm={6} md={5} lg={4} className="mb-4 border-warning ">
            {console.log("isLoaded value : " + isLoaded)}
            <CounterWidget key={balance.id} balance={balance} />
          </Col>
        ))}
      </Row> : <div className="d-flex justify-content-center">
        <Spinner animation="border " size="sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>}

    </>
  );
};
