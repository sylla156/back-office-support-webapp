import React, { useState, PureComponent, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../../../routes";
import AxiosWebHelper from "../../../utils/axios-helper";
import {
  Col,
  Row,
  Card,
  Spinner,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import numeral from "numeral";

import {
  APPKEY,
  ChooseCountry,
  LOCAL_STATS_COMMISSION_COUNTRY_PAYMENT_CATEGORY_WEEK,
} from "../../../pages/constante/Const";

export default (props) => {
  const week = props.week;
  const country = props.country;
  const order = props.order;
  //const year

  const [errorData, setErrorData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [commissionList, setCommissionlist] = useState([]);
  const [total, setTotal] = useState([]);


  const axios = AxiosWebHelper.getAxios();
  const [cookies] = useCookies(["token"]);

  if(!cookies.token) {
    return <Redirect to={Routes.Signin.path}/>
  }
  
  const getSuccessfulPaymentCommissionCountryCategory = () => {
    setIsLoaded(false);
    setErrorData(null);
    axios
      .get(LOCAL_STATS_COMMISSION_COUNTRY_PAYMENT_CATEGORY_WEEK, {
        params: {
          country,
          week,
          order
        },
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setCommissionlist(result.data);
        setTotal(result.data.total);
      })
      .catch((error) => {
        setIsLoaded(true);
        // onFilters();
        if (error.response) {
          if (error.response.status === 401) {
            setShouldLogin(true);
          } else {
            setErrorData(error.response.data.message);
          }
        }
      });
  };

  const roundAmount = (value)=> {
    return Math.round(value)
  }
  const getAmount = (value) => {
    const amount = roundAmount(value);
    return numeral(amount).format("0,0");
  };

  const getCategoryList = () => {
    if (!commissionList) return [];

    const categoryList = commissionList.categoryList;
    if (!categoryList) return [];
    
    return categoryList;
  };

  useEffect(() => {
    getSuccessfulPaymentCommissionCountryCategory();
  }, [country, week, order]);

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <>
      {isLoaded ? (
        <Row>
          <Col xs={12} className="">
            {/* <h2 className="h3">{getMerchantName()}</h2>
            <p className="h5 text-gray">{getFormattedDate()}</p> */}
            <Card border="light" className="shadow-sm border mb-3">
              <Card.Body>
                {getCategoryList().map((category, categoryIndex) => (
                  <>
                    {categoryIndex > 0 && (
                      <hr className="my-0 py-0" style={{ height: "2px" }} />
                    )}
                    <Row>
                      <Col xl={1}>
                        <span className="d-block py-2 mb-2 text-capitalize fw-bold">
                          {category.name}
                        </span>
                      </Col>
                      <Col xl={11}>
                        {categoryIndex === 0 && (
                          <Row className="bg-light rounded rounded-lg py-1 mb-2 fw-bold text-muted">
                            <Col xl={3}>
                              <span className="d-block">marchant</span>
                            </Col>
                            <Col xl={2}>
                              <span className="text-end d-block">CA brut</span>
                            </Col>
                            <Col xl={2}>
                              <span className="text-end d-block">CA net</span>
                            </Col>
                            <Col xl={3}>
                              <span className="text-end d-block">Volume</span>
                            </Col>
                          </Row>
                        )}
                        {category.items.map((merchantInfos, mainIndex) =>
                            <>
                              {mainIndex >= 1 && (
                                <hr className="my-0 py-0" />
                              )}
                              <Row
                                
                                className="my-2"
                              >
                                <Col xl={3}>
                                  <span>
                                  {merchantInfos.mer_name} ({merchantInfos.merchant_id})
                                  </span>
                                </Col>
                                <Col xl={2}>
                                  <span className="text-end d-block">
                                    {getAmount(merchantInfos.commission_brute)}
                                  </span>
                                </Col>
                                <Col xl={2}>
                                  <span className="text-end d-block">
                                    {getAmount(merchantInfos.commission_nette)}
                                  </span>
                                </Col>
                                <Col xl={3}>
                                  <span className="text-end d-block">
                                    {getAmount(merchantInfos.volume)}
                                  </span>
                                </Col>
                              </Row>
                            </>
                        )}
                      </Col>
                    </Row>
                  </>
                ))}

                {commissionList.total && (
                  <>
                    <hr className="my-0 py-0" style={{ height: "2px" }} />
                    <Row>
                      <Col xl={1}>
                        <span className="d-block py-2 mb-2 text-capitalize fw-bold">
                          Total
                        </span>
                      </Col>
                      <Col xl={11}>
                        {/* <Row className="bg-light rounded rounded-lg py-1 mb-2">
                          <Col xl={2}>
                            <span className="d-block">Status</span>
                          </Col>
                          <Col xl={1}>
                            <span className="text-end d-block">Number</span>
                          </Col>
                          <Col xl={2}>
                            <span className="text-end d-block">Volume</span>
                          </Col>
                          <Col xl={6}>
                            <span className="d-block">Failure reason</span>
                          </Col>
                          <Col xl={1}>
                            <span className="text-end d-block">Rate</span>
                          </Col>
                        </Row> */}
                        {commissionList.total && commissionList.total.map((item)=>
                          (
                            <Row className="my-2">
                              <Col xl={1}>
                                <span className="text-end d-block">
                                  {}
                                </span>
                              </Col>
                              <Col xl={4}>
                                <span className="text-end d-block">
                                  {/* "commission_brute": null */}
                                  {getAmount(item.commission_brute)} 
                                </span>
                              </Col>
                              <Col xl={2}>
                                <span className="text-end d-block">
                                  {/* "commission_nette": null */}
                                  {getAmount(item.commission_nette)}
                                </span>
                              </Col>
                              <Col xl={3}>
                                <span className="text-end d-block">
                                  {/* "volume": null */}
                                  {getAmount(item.volume)}
                                </span>
                              </Col>
                            </Row>
                          )
                        )}
                        
                      </Col>
                    </Row>
                  </>
                )}
              </Card.Body>
            </Card>
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
