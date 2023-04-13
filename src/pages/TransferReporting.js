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
  TransferstatusList,
  TRANSFERS_CSV_LIST,
  FIRST_PAGE_INDEX,
} from "./constante/Const";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { TransfersReportingList } from "../components/transferList/TransfersReportingList";
import { format, addMinutes, parseISO } from "date-fns";
import DateTimePicker from "react-datetime-picker";
import AlertDismissable from "../components/AlertDismissable";

export default () => {
  const currentDate = new Date();

  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
  const formattedCurrentTime = format(currentDate, "HH:mm:ss");

  const addMinutesInEndDate = addMinutes(currentDate, 30);
  const formattedCurrentEndDateTime = format(addMinutesInEndDate, "HH:mm:ss");

  const [errorData, setErrorData] = useState(null);
  const [errorDataCSV, setErrorDataCSV] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLoadedCSV, setIsLoadedCSV] = useState(true);
  const [reference, setReference] = useState('');
  const [gatewayId, setGateWayId] = useState('');
  const [isForceStatus, setIsForceStatus] = useState('none');
  const [shouldLogin, setShouldLogin] = useState(false);
  const [startDate, setStartDate] = useState(
    `${formattedCurrentDate}T00:00:00Z`
  );
  const [endDate, setEndDate] = useState(
    `${formattedCurrentDate}T23:59:59Z`
  );
  const [status, setStatus] = useState(undefined);
  const [merchantId, setMerchantId] = useState(undefined);
  const [transferList, setTransferList] = useState([]);
  const [count, setCount] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX)

  const statusValue = () =>
    status ? TransferstatusList.id : SelectDefaultValues.status;
  const handleStartDate = (value) => {
    setStartDate(value);
  };
  const handleEndDate = (value) => {
    setEndDate(value);
  };
  const [cookies] = useCookies(["token"]);

  if(!cookies.token) {
    return <Redirect to={Routes.Signin.path}/>
  }
  
  const axios = AxiosWebHelper.getAxios();

  const fileName = "transfers-reporting-export";

  const exportData = () => {
    setErrorDataCSV(null);
    setIsLoadedCSV(false);
    let params = null
    if(isForceStatus == "true" || isForceStatus == "false"){
      params = {
        from: startDate,
          to: endDate,
          merchantId,
          reference,
          gatewayId,
          isForceStatus,
          status,
          csv: true,
          page: currentPage,
          perPage: PAGE_SIZE,
      }
    }else{
      params = {
        from: startDate,
          to: endDate,
          merchantId,
          reference,
          gatewayId,
          status,
          csv: true,
          page: currentPage,
          perPage: PAGE_SIZE,
      }
    }
    axios
      .get(TRANSFERS_CSV_LIST, {
        params: params,
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

  const transfersReportingList = () => {
    setIsLoaded(false);
    setErrorData(null);
    let params = null
    if(isForceStatus == "true" || isForceStatus == "false"){
      params = {
        from: startDate,
          to: endDate,
          merchantId,
          reference,
          gatewayId,
          isForceStatus,
          status,
          csv: false,
          page: currentPage,
          perPage: PAGE_SIZE,
      }
    }else{
      params = {
        from: startDate,
          to: endDate,
          merchantId,
          reference,
          gatewayId,
          status,
          csv: false,
          page: currentPage,
          perPage: PAGE_SIZE,
      }
    }
    axios
      .get(TRANSFERS_CSV_LIST, {
        params: params,
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setTransferList(result.data.result);
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

  const onPageChange = (page = FIRST_PAGE_INDEX) => {
    setCurrentPage(page);
  };

  const handleChangeReference = (event) => {
    setReference(event.target.value)
  }

  const handleChangeGatewayId = (event) => {
    setGateWayId(event.target.value)
  }

  const handleChangeIsForceStatus = (e) => {
    setIsForceStatus(e.target.value);
  }

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  useEffect(() => {
    transfersReportingList();
  }, [currentPage]);

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
              value={statusValue()}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              <option
                key={SelectDefaultValues.currency}
                value={SelectDefaultValues.currency}
              >
                Choisissez un status
              </option>
              {TransferstatusList.map((item) => (
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
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Label>Reference</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Reference transfert"
              value={reference}
              onChange={handleChangeReference}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Label>GatewayId</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="GatewayId"
              value={gatewayId}
              onChange={handleChangeGatewayId}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Group id="status">
            <Form.Label>isForceStatus</Form.Label>
            <Form.Select
              value={isForceStatus}
              onChange={handleChangeIsForceStatus}
            >
              <option value="none">Tous les transferts</option>
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={3} lg={3} className="px-2 mt-4">
          <div className="mt-3 mb-4">
            <Button
              variant="outline-primary"
              type="button"
              // onClick={}
            >
              Effacer
            </Button>
            <Button
              className="mx-2"
              variant="primary"
              type="button"
              onClick={transfersReportingList}
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
          <TransfersReportingList
            listInfo={transferList}
            count={count}
            currentPage={currentPage}
            onPageChange={onPageChange}
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
