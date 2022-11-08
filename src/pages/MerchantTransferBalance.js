import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { useCookies } from "react-cookie";
import AxiosWebHelper from "../utils/axios-helper";
import { APPKEY, MERCHANTS_URL } from "./constante/Const";
import { Col, Row, Spinner } from "@themesberg/react-bootstrap";
import { MerchantBalance } from "./MerchantBalance";

export default () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [merchantList, setMerchantList] = useState([]);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);

  const [cookies] = useCookies(["token"]);

  if (!cookies) {
    return <Redirect to={Routes.Signin.path} />;
  }

  const axios = AxiosWebHelper.getAxios();
  const transferBalanceEnable = true;

  const getMerchantList = () => {
    setIsLoaded(false);
    setErrorData(null);
    axios
      .get(MERCHANTS_URL, {
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
        params: {
          transferBalanceEnable
        }
      })
      .then((result) => {
        setIsLoaded(true);
        setMerchantList(result.data);
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
    getMerchantList();
  }, []);

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <>
      {isLoaded ? (
        <Row>
          {merchantList.map((merchant) => {
            return (
              <>
                <Col
                  key={merchant.id}
                  xs={12}
                  sm={6}
                  md={5}
                  lg={4}
                  className="mb-4 border-warning "
                >
                  <MerchantBalance
                    key={merchant.id}
                    merchantId={merchant.merchantId}
                  />
                </Col>
              </>
            );
          })}
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
