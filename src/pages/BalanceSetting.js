import React, { useState, useEffect } from "react";
import {
  Col,
  Spinner,
  Row,
} from "@themesberg/react-bootstrap";
import AlertDismissable from "../components/AlertDismissable";
import { useCookies } from "react-cookie";
import AxiosWebHelper from "../utils/axios-helper";
import { Redirect } from "react-router-dom";
import {
  APPKEY,
  SETTING_BALANCE,
} from "./constante/Const";
import { Routes } from "../routes";
import { BalanceSettingWidget } from "../components/balanceSetting/BalanceSettingWidget";
export default () => {
  const [errorData, setErrorData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [balanceSetting, setBalanceSetting] = useState([]);
  const [shouldLogin, setShouldLogin] = useState(false);

  const axios = AxiosWebHelper.getAxios();
  const [cookies] = useCookies(["token"]);

  const getBalanceSetting = () => {
    setIsLoaded(false);
    setErrorData(null);
    axios
      .get(SETTING_BALANCE, {
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        console.log("isLoaded value : " + isLoaded);
        setBalanceSetting(result.data);
        console.log("In then");
        console.log(result.data);
      })
      .catch((error) => {
        setIsLoaded(true);
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

  useEffect(() => {
    getBalanceSetting();
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
        <Col className="">
          {balanceSetting.map((item) => (
            <Row key={item.id}>
              <BalanceSettingWidget balanceSetting={item} />
            </Row>
          ))}
        </Col>
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