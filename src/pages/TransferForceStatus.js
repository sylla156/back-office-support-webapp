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
import AxiosWebHelper from "../utils/axios-helper";
import {
  APPKEY,
  PAGE_SIZE,
  SelectDefaultValues,
  StatusConfirmationList,
  STATUS_CONFIRMATION_TRANSFER_LIST,
  TRANSFERS_CSV_LIST,
} from "./constante/Const";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { format, addMinutes, parseISO, subDays } from "date-fns";
import DateTimePicker from "react-datetime-picker";
import AlertDismissable from "../components/AlertDismissable";
import { StatusConfirmationReportingList } from "../components/statusConfirmation/StatusConfirmationReportingList";

export default () => {
  const currentDate = new Date();

  const startDateToUse = subDays(currentDate, 2);
  const formatStartDateToUse = format(startDateToUse, "yyyy-MM-dd");
  const defaultStartDate = `${formatStartDateToUse}T00:00:00Z`;
  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
  const defaultEndDate = `${formattedCurrentDate}T23:59:59Z`;

  const addMinutesInEndDate = addMinutes(currentDate, 30);
  const formattedCurrentEndDateTime = format(addMinutesInEndDate, "HH:mm:ss");

  const [errorData, setErrorData] = useState(null);
  const [errorDataCSV, setErrorDataCSV] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedCSV, setIsLoadedCSV] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [status, setStatus] = useState("pending");
  const [merchantId, setMerchantId] = useState(undefined);
  const [transactionForceStatus, setTransactionForceStatus] = useState([]);
  const [count, setCount] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const [version, setVersion] = useState(0)

  const statusValue = () =>
    status ? StatusConfirmationList.id : SelectDefaultValues.status;
  const handleStartDate = (value) => {
    setStartDate(value);
  };
  const handleEndDate = (value) => {
    setEndDate(value);
  };
  const [cookies, ] = useCookies(["token", "user"]);

  if(!cookies.token) {
    return <Redirect to={Routes.Signin.path}/>
  }

  const userCanForceStatus = cookies.user?.canForceStatus;
  
  const axios = AxiosWebHelper.getAxios();

  const fileName = "status-confirmation-reporting-export";

  const exportData = () => {
    setErrorDataCSV(null);
    setIsLoadedCSV(false);
    axios
      .get(TRANSFERS_CSV_LIST, {
        params: {
          from: startDate,
          to: endDate,
          merchantId,
          status,
          csv: true,
          page: currentPage,
          perPage: PAGE_SIZE,
        },
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoadedCSV(true);
        setErrorDataCSV(null);
        const url = window.URL.createObjectURL(new Blob([result.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName + ".csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        setIsLoaded(true);
      });
  };

  const statusConfirmaionReportingList = () => {
    setIsLoaded(false);
    setErrorData(null);
    axios
      .get(STATUS_CONFIRMATION_TRANSFER_LIST, {
        params: {
          from: startDate,
          to: endDate,
          merchantId,
          status,
          csv: false,
          page: currentPage,
          perPage: PAGE_SIZE,
        },
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setTransactionForceStatus(result.data.transactionForceStatus);
        setCount(result.data.count);
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

  const onPageChange = (page = 0) => {
    setCurrentPage(page);
  };
  const incrementVersion = ()=> setVersion((currentVersion)=> {
    console
    return currentVersion + 1;
  })

  const onClearFilters = () => {
    setMerchantId("");
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setStatus("pending")
  };

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  useEffect(() => {
    statusConfirmaionReportingList();
  }, [currentPage, version]);
  return (
    <>
      {/* filter system */}
      <div className="align-items-center d-flex flex-wrap">
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Label>Date début</Form.Label>
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
          <Form.Label>Date fin</Form.Label>
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
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Group id="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              {StatusConfirmationList.map((item) => (
                <option key={item.id} value={item.status}>
                  {item.status}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Label>MerchantId</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="MerchantId"
              value={merchantId}
              onChange={(event) => setMerchantId(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={3} lg={3} className="px-2 mt-4">
          <div className="mt-3 mb-4">
            <Button
              variant="outline-primary"
              type="button"
              onClick={onClearFilters}
            >
              Effacer
            </Button>
            <Button
              className="mx-2"
              variant="primary"
              type="button"
              onClick={statusConfirmaionReportingList}
            >
              Filtrer
            </Button>

            {isLoadedCSV ? (
            <Button
              variant="outline-primary"
              className=""
              type="button"
              onClick={exportData}
            >
              Exporter
            </Button>
            ) : (
              <div className="d-flex justify-content-center">
                <Spinner animation="border " size="sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

          </div>
        </Col>
      </div>

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
            <div >
                <AlertDismissable message={errorData} variant="danger" show={!!errorData} onClose={()=>setErrorData(null)} />
                <div>
      
                </div>
            </div>

      {isLoaded ? (
        <Row>
          <StatusConfirmationReportingList
            key={version}
            listInfo={transactionForceStatus}
            count={count}
            currentPage={currentPage}
            onPageChange={onPageChange}
            onRefresh = {incrementVersion}
            userCanForceStatus={userCanForceStatus}
          />
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
