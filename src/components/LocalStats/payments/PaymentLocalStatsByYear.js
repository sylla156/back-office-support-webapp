import React, { useState, PureComponent, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../../../routes";
import AlertDismissable from "../../AlertDismissable";
import AxiosWebHelper from "../../../utils/axios-helper";
import { Col, Row, Card } from "@themesberg/react-bootstrap";
import numeral from "numeral";
// import {Line} from 'react-chartjs-2';
import {Chart as ChartJS,registerables,} from "chart.js"
import {
  AreaChart,
  Area,
  Line,
  LineChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend
  } from "recharts";
import { APPKEY, LOCAL_STATS_COMMISSION_BY_YEAR } from "../../../pages/constante/Const";

ChartJS.register(...registerables);

export default () => {
  const [errorData, setErrorData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [commission, setCommission] = useState([]);
  const [total, setTotal] = useState([]);

  const axios = AxiosWebHelper.getAxios();
  const [cookies] = useCookies(["token","user"]);
  
  const getSuccessfulPaymentCommissionByMonth = () => {
    setIsLoaded(false);
    setErrorData(null);
    axios
      .get(LOCAL_STATS_COMMISSION_BY_YEAR, {
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setCommission(result.data.commission);
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

  const getAmount = (value) => {
    return numeral(value).format("0,0");
  };

  useEffect(() => {
    getSuccessfulPaymentCommissionByMonth();
  }, []);

  if(!cookies.token) {
    return <Redirect to={Routes.Signin.path}/>
  }

  

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <>
      <Col className="xs={12} sm={6} md={5} lg={4}">
        <Row>
          <Col xs={12} className="">
            <h2 className="h3"></h2>
            <p className="h5 text-gray"></p>
            <Card border="light" className="shadow-sm border mb-3">
              <Card.Body>
                {commission.map((item, comIndex) => (
                  <>
                    <Row>
                      <Col xl={11}>
                        {comIndex === 0 && (
                          <Row className="bg-light rounded rounded-lg py-1 mb-2 fw-bold text-muted">
                            <Col xl={2}>
                              <span className="d-block">Month</span>
                            </Col>
                            <Col xl={2}>
                              <span className="text-start d-block">Total NB</span>
                            </Col>
                            <Col xl={2}>
                              <span className="text-start d-block">
                                Total Volume
                              </span>
                            </Col>
                            <Col xl={2}>
                              <span className="d-block">Commission brutes</span>
                            </Col>
                            <Col xl={3}>
                              <span className="text-start d-block">
                                Commission nettes
                              </span>
                            </Col>
                          </Row>
                        )}
                        <Row  className="my-2">
                          <Col xl={2}>
                            <span className="text-start d-block">
                              {item.pay_month}
                            </span>
                          </Col>
                          <Col xl={2}>
                            <span className="text-start d-block">
                              {item.nb}
                            </span>
                          </Col>
                          <Col xl={2}>
                            <span className="text-start d-block">
                              {item.volume}
                            </span>
                          </Col>
                          <Col xl={2}>
                            <span>{item.commission_brute}</span>
                          </Col>
                          <Col xl={4}>
                            <span className="text-start d-block">
                              {item.commission_nette}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                ))}

                {total.map((item) => (
                  <>
                    <hr className="my-0 py-0" style={{ height: "2px" }} />
                    <Row>
                      <Col xl={1}>
                        <span className="d-block py-2 mb-2 text-capitalize fw-bold">
                          Total
                        </span>
                      </Col>
                      <Col xl={11}>
                        <Row className="my-2">
                          <Col xl={2}>
                            <span className="text-start d-block">
                              {item.nb}
                            </span>
                          </Col>
                          <Col xl={4}>
                            <span className="text-start d-block">{item.volume}</span>
                          </Col>
                          <Col xl={2}>
                            <span className="text-start d-block">
                              {item.commission_brute}
                            </span>
                          </Col>
                          <Col xl={4}>
                            <span className="text-start d-block">
                              {item.commission_nette}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Col  xs={12} className="">
        <h2>Graph</h2>
        {/* <Line data={data} /> */}
        <AreaChart
               width={730}
               height={300}
               data={commission}
               margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
            <defs>
               <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
               </linearGradient>
               <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
               </linearGradient>
            </defs>
            <XAxis dataKey="pay_month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area
               type="monotone"
               dataKey="commission_brute"
               stroke="#8884d8"
               fillOpacity={1}
               fill="url(#colorUv)"/>
            <Area
               type="monotone"
               dataKey="commission_nette"
               stroke="#82ca9d"
               fillOpacity={1}
               fill="url(#colorPv)"/>
            </AreaChart>

        </Col>
      </Col>
    </>
  );
};