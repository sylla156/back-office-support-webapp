import React, { useState, useEffect } from "react";
import {
  Col,
  Spinner,
  Row,
  Card,
} from "@themesberg/react-bootstrap";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";
import AlertDismissable from "../AlertDismissable";
import AxiosWebHelper from "../../utils/axios-helper";
import { APPKEY, BASE_URL_STATS } from "../../pages/constante/Const";
import numeral from "numeral";

numeral.locale("fr");
export const DailyReportList = (props) => {
  const version = props.version;
  const merchantId = props.merchantId;
  const date = props.date;
  const [errorData, setErrorData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  
  const [merchantStats, setMerchantStats] = useState(undefined);
  const [shouldLogin, setShouldLogin] = useState(false);

  const axios = AxiosWebHelper.getAxios();
  const [cookies] = useCookies(["token"]);

  const getMerchantStats = () => {
    setIsLoaded(false);
    setErrorData(null);
    axios
      .get(BASE_URL_STATS, {
        params: {
          merchantId,
          start: date.formattedStartDate,
          end: date.formattedEndDate,
        },
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        console.log("isLoaded value : " + isLoaded);
        setMerchantStats(result.data);
        console.log("In then");
        console.log(result.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        onFilters();
        if (error.response) {
          console.log("In catch error getMerchantStats", error.response.data);
          // console.log(error.response.data);
          console.log("Status code error : " + error.response.status);
          if (error.response.status === 401) {
            console.log(
              "===========> in error.response.status === 401 of getMerchantStats"
            );
            setShouldLogin(true);
          } else {
            console.log("In atch error getMerchantStats");
            console.log(error.response.data);
            console.log(error.response.data.message);
            setErrorData(error.response.data.message);
          }
        }
      });
  };

  const onFilters = () => {
    setMerchantStats({});
  };

  const getMerchantName = () => {
    if (!merchantStats) return "Nom du marchand";
    if (!merchantStats.merchant) return "Nom du marchand";
    return merchantStats.merchant.name;
  };
  const getFormattedDate = () => {
    if (!merchantStats) return "Date du rapport";

    const { startDate: sDate, endDate: eDate } = merchantStats;
    return `Du ${sDate} au ${eDate}`;
  };

  const getProviderList = () => {
    if (!merchantStats) return [];

    const stats = merchantStats.stats;
    if (!stats) return [];

    console.log(stats[0]);
    return stats;
  };

  const getPercent = (value) => {
    return numeral(value).format("0.0%");
  };
  const getAmount = (value) => {
    return numeral(value).format("0,0");
  };

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  const getMerchantSuccessfull = () => {
    if (!merchantStats) return undefined;

    return merchantStats.success;
  };

  const getMerchantFailure = () => {
    if (!merchantStats) return undefined;

    return merchantStats.failure;
  };

  const merchantSuccess = getMerchantSuccessfull();
  const merchantFailure = getMerchantFailure();

  const getStatusColorClass = (status) => {
    if (status === "pending") return "text-warning fw-bold";
    if (status === "successful") return "text-success fw-bold";
    if (status === "failed") return "text-danger fw-bold";
    return "";
  };

  useEffect(() => {
    getMerchantStats();
  }, [version]);

  return (
    <>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2"></div>
      <div>
        <AlertDismissable
          message={errorData}
          variant="danger"
          show={!!errorData}
          onClose={() => setErrorData(null)}
        />
        <div></div>
      </div>

      {/* merchandList */}
      
    {/* merchandList */}
      {isLoaded ? (
        <Row>
          <Col xs={12} className="">
            <h2 className="h3">{getMerchantName()}</h2>
            <p className="h5 text-gray">{getFormattedDate()}</p>
            <Card border="light" className="shadow-sm border mb-3">
              <Card.Body>
                {getProviderList().map((provider, providerIndex) => (
                  <>
                    {providerIndex > 0 && (
                      <hr className="my-0 py-0" style={{ height: "2px" }} />
                    )}
                    <Row>
                      <Col xl={1}>
                        <span className="d-block py-2 mb-2 text-capitalize fw-bold">
                          {provider.name}
                        </span>
                      </Col>
                      <Col xl={11}>
                        {providerIndex === 0 && (
                          <Row className="bg-light rounded rounded-lg py-1 mb-2 fw-bold text-muted">
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
                          </Row>
                        )}
                        {provider.statuses.map((statusInfos, mainIndex) =>
                          statusInfos.items.map((item, index) => (
                            <>
                              {mainIndex + index >= 1 && (
                                <hr className="my-0 py-0" />
                              )}
                              <Row
                                key={`${item.status}-${index}`}
                                className="my-2"
                              >
                                <Col xl={2}>
                                  <span
                                    className={`text-capitalize d-block ${getStatusColorClass(
                                      item.status
                                    )}`}
                                  >
                                    {item.status}
                                  </span>
                                </Col>
                                <Col xl={1}>
                                  <span className="text-end d-block">
                                    {getAmount(item.count)}
                                  </span>
                                </Col>
                                <Col xl={2}>
                                  <span className="text-end d-block">
                                    {getAmount(item.total)}
                                  </span>
                                </Col>
                                <Col xl={6}>
                                  <span>{item.reason}</span>
                                </Col>
                                <Col xl={1}>
                                  <span className="text-end d-block">
                                    {getPercent(item.rate)}
                                  </span>
                                </Col>
                              </Row>
                            </>
                          ))
                        )}
                      </Col>
                    </Row>
                  </>
                ))}

                {merchantStats && (
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
                        {merchantSuccess && (
                          <Row className="my-2">
                            <Col xl={2}>
                              <span
                                className={`d-block  ${getStatusColorClass(
                                  "successful"
                                )}`}
                              >
                                Successful
                              </span>
                            </Col>
                            <Col xl={1}>
                              <span className="text-end d-block">
                                {getAmount(merchantSuccess.count)}
                              </span>
                            </Col>
                            <Col xl={2}>
                              <span className="text-end d-block">
                                {getAmount(merchantSuccess.total)}
                              </span>
                            </Col>
                            <Col xl={6}>
                              <span className="d-block">&nbsp;</span>
                            </Col>
                            <Col xl={1}>
                              <span className="text-end d-block">
                                {getPercent(merchantSuccess.rate)}
                              </span>
                            </Col>
                          </Row>
                        )}
                        {merchantFailure && (
                          <>
                            <hr className="my-0 py-0" />
                            <Row className="my-2">
                              <Col xl={2}>
                                <span
                                  className={`d-block ${getStatusColorClass(
                                    "failed"
                                  )}`}
                                >
                                  Failed
                                </span>
                              </Col>
                              <Col xl={1}>
                                <span className="text-end d-block">
                                  {getAmount(merchantFailure.count)}
                                </span>
                              </Col>
                              <Col xl={2}>
                                <span className="text-end d-block">
                                  {getAmount(merchantFailure.total)}
                                </span>
                              </Col>
                              <Col xl={6}>
                                <span className="d-block">&nbsp;</span>
                              </Col>
                              <Col xl={1}>
                                <span className="text-end d-block">
                                  {getPercent(merchantFailure.rate)}
                                </span>
                              </Col>
                            </Row>
                          </>
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
