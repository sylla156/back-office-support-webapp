import React, { useState, useEffect } from "react";
import {
  Col,
  Spinner,
  Row,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { useCookies } from "react-cookie";
import { Routes } from "../routes";
import { Redirect } from "react-router-dom";
import AxiosWebHelper from "../utils/axios-helper";
import { APPKEY, SMS_ORANGE_CASH_IN_CANDIDATE } from "./constante/Const";
import { SmsOrangeCashInCandidateList } from "../components/sms/SmsOrangeCashInCandidateList";
import { OrangeCashInInfoList } from "../components/sms/OrangeCashInInfos";
import { format } from "date-fns";
export default () => {
  const currentDate = new Date();

  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");

  const [errorData, setErrorData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [smsCandidates, setSmsCandidates] = useState([]);
  const [count, setCount] = useState(undefined);
  const [startDate, setStartDate] = useState(
    `${formattedCurrentDate}T00:00:00Z`
  );
  const [endDate, setEndDate] = useState(`${formattedCurrentDate}T23:59:59Z`);

  const handleEndDate = (value) => {
    setStartDate(value);
  };
  const handleStartDate = (value) => {
    setEndDate(value);
  };

  const [cookies] = useCookies(["token"]);
  const axios = AxiosWebHelper.getAxios();

  const getSmsOrangeCashInCandidates = () => {
    setErrorData(null);
    setIsLoaded(false);
    axios
      .get(SMS_ORANGE_CASH_IN_CANDIDATE, {
        params: {
          start: startDate,
          end: endDate,
        },
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setSmsCandidates(result.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        onFilters();
        if (error.response) {
          console.log(
            "In catch error getSmsContentOrange454",
            error.response.data
          );
          // console.log(error.response.data);
          console.log("Status code error : " + error.response.status);
          if (error.response.status === 401) {
            console.log(
              "===========> in error.response.status === 401 of checkSupportTransferStatus"
            );
            setShouldLogin(true);
          } else {
            console.log("In catch error getSmsContentOrange454");
            console.log(error.response.data);
            console.log(error.response.data.message);
            setErrorData(error.response.data.message);
          }
        }
      });
  };

  // useEffect(() => {
  //   getSmsOrangeCashInCandidates();
  // }, []);

  console.log(smsCandidates);

  const onFilters = () => {};

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <>
      {/* filter system */}
      <div className="align-items-center d-flex flex-wrap">
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Date début"
              value={startDate}
              onChange={(event) => handleStartDate(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Date fin"
              value={endDate}
              onChange={(event) => handleEndDate(event.target.value)}
            />
          </InputGroup>
        </Col>

        <Col xs={12} md={3} lg={3} className="px-2">
          <div className="mt-3 mb-4">
            <Button
              variant="outline-primary"
              type="button"
              // onClick={onFilters}
            >
              Effacer
            </Button>
            <Button
              className="mx-2"
              variant="primary"
              type="button"
              onClick={getSmsOrangeCashInCandidates}
            >
              Filtrer
            </Button>
          </div>
        </Col>
      </div>
      <Row>
        {isLoaded ? (
          <Col xs={12} xl={6}>
            <SmsOrangeCashInCandidateList candidates={smsCandidates} />
          </Col>
        ) : (
          <div className="d-flex justify-content-center">
            <Spinner animation="border " size="sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {isLoaded ? (
          <Col xs={12} xl={6}>
            <OrangeCashInInfoList candidates={smsCandidates} />
          </Col>
        ) : (
          <div className="d-flex justify-content-center">
            <Spinner animation="border " size="sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </Row>
    </>
  );
};
