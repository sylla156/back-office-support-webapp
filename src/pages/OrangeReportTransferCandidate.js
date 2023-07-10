import React, { useState, useEffect } from "react";
import {
  Col,
  Spinner,
  Row,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { format } from "date-fns";
import { useCookies } from "react-cookie";
import { Routes } from "../routes";
import { Redirect } from "react-router-dom";
import AxiosWebHelper from "../utils/axios-helper";
import { APPKEY, ORANGE_REPORT_TRANSFER_CANDIDATES } from "./constante/Const";
import { OrangeReportContentGlobalCandidate } from "./OrangeReportContentGlobalCandidate";

export default ()=> {

  const currentDate = new Date();

  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");

  const [errorData, setErrorData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [count, setCount] = useState(undefined);
  const [startDate, setStartDate] = useState(
    `${formattedCurrentDate}T00:00:00Z`
  );
  const [endDate, setEndDate] = useState(`${formattedCurrentDate}T23:59:59Z`);

  const handleStartDate = (value) => {
    setStartDate(value);
  };
  const handleEndDate = (value) => {
    setEndDate(value);
  };
  const [cookies] = useCookies(["token","user"]);
  
  const axios = AxiosWebHelper.getAxios();

  const getOrangeReportTransferCandidates = () => {
    setErrorData(null);
    setIsLoaded(false);
    axios
      .get(ORANGE_REPORT_TRANSFER_CANDIDATES, {
        params: {
          from: startDate,
          to: endDate,
        },
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setCandidates(result.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        onFilters();
        if (error.response) {
          if (error.response.status === 401) {
            setShouldLogin(true);
          } else {
            setErrorData(error.response.data.message);
          }
        }
      });
  };
  const onFilters = () => {
    setStartDate("");
    setEndDate("");
  };
  if(!cookies.token) {
    return <Redirect to={Routes.Signin.path}/>
  }
  if(!cookies.user.isActive2FA) {
    return <Redirect to={Routes.Signin.path} />
  }
  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <>
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
            <Button variant="outline-primary" type="button" onClick={onFilters}>
              Effacer
            </Button>
            <Button
              className="mx-2"
              variant="primary"
              type="button"
              onClick={getOrangeReportTransferCandidates}
            >
              Filtrer
            </Button>
          </div>
        </Col>
      </div>

      {isLoaded ? (
        candidates.map((item)=> {
          return (
           <OrangeReportContentGlobalCandidate candidates={item} />
          )
        })
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner animation="border " size="sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
}