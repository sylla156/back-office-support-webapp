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
  LOCAT_PAYMENT_REPORTING,
  PaymentstatusList,
  FIRST_PAGE_INDEX
} from "./constante/Const";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { format, addMinutes, parseISO } from "date-fns";
import DateTimePicker from "react-datetime-picker";
import AlertDismissable from "../components/AlertDismissable";
import { LocalTransferReportingList } from "../components/transferList/LocalTransferReportingList";
import { LocalPaymentReportingList } from "../components/PaymentList/LocalPaymentsReportingList";

export default()=> {
  const currentDate = new Date();

  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
  const formattedCurrentTime = format(currentDate, "HH:mm:ss");

  const addMinutesInEndDate = addMinutes(currentDate, 30);
  const formattedCurrentEndDateTime = format(addMinutesInEndDate, "HH:mm:ss");

  const [errorData, setErrorData] = useState(null);
  const [errorDataCSV, setErrorDataCSV] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLoadedCSV, setIsLoadedCSV] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [startDate, setStartDate] = useState(
    `${formattedCurrentDate}T00:00:00Z`
  );
  const [endDate, setEndDate] = useState(
    `${formattedCurrentDate}T23:59:59Z`
  );
  const [status, setStatus] = useState(undefined);
  const [paymentStatus, setPaymentStatus] = useState(undefined);
  const [merchantId, setMerchantId] = useState(undefined);
  const [transactionId, setTransactionId] = useState(undefined);
  const [gatewayId, setGatewayId] = useState(undefined);
  const [processorReference, setProcessorReference] = useState(undefined);
  const [number, setNumber] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  const [method, setMethod] = useState(undefined);
  const [customerReference, setCustomerReference] = useState(undefined);
  const [paymentProcessorReference, setPaymentProcessorReference] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [amount, setAmount] = useState(undefined);
  const [currency, setCurrency] = useState(undefined);
  const [reference, setReference] = useState(undefined);
  const [localPaymentList, setLocalPaymentList] = useState([]);
  const [count, setCount] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);

  const statusPaymentValue = () =>
    paymentStatus ? TransferstatusList.id : SelectDefaultValues.status;
  const statusValue = () =>
    status ? PaymentstatusList.id : SelectDefaultValues.status;
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
  const fileName = "local-payments-reporting"
  const exportData = () => {
    setErrorDataCSV(null);
    setIsLoadedCSV(false);
    axios
      .get(LOCAT_PAYMENT_REPORTING, {
        params: {
          from: startDate,
          to: endDate,
          merchantId,
          paymentStatus,
          status,
          gatewayId,
          method,
          transactionId,
          customerReference,
          paymentProcessorReference,
          number,
          provider,
          country,
          amount,
          currency,
          csv: true
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
  const localPaymentsReportingList = () => {
    setIsLoaded(false);
    setErrorData(null);
    axios
      .get(LOCAT_PAYMENT_REPORTING, {
        params: {
          from: startDate,
          to: endDate,
          merchantId,
          paymentStatus,
          status,
          gatewayId,
          method,
          transactionId,
          customerReference,
          paymentProcessorReference,
          number,
          provider,
          country,
          amount,
          currency,
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
        setLocalPaymentList(result.data.result);
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

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  useEffect(() => {
    localPaymentsReportingList();
  }, [currentPage]);

  console.log(localPaymentList)
  return (
    <>
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
            <Form.Label>PaymentStatus</Form.Label>
            <Form.Select
              value={statusPaymentValue()}
              onChange={(event) => {
                setPaymentStatus(event.target.value);
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
              {PaymentstatusList.map((item) => (
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
          <Form.Label>GatewayId</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="GatewayId"
              value={gatewayId}
              onChange={(event) => setGatewayId(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Label>PaymentProcessorReference</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Reference du frs"
              value={paymentProcessorReference}
              onChange={(event) => setPaymentProcessorReference(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Label>TransactionId</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="ID"
              value={transactionId}
              onChange={(event) => setTransactionId(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Label>PhoneNumber</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Transaction identifier"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Label>Provider</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Provider"
              value={provider}
              onChange={(event) => setProvider(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Label>Amount</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-2 px-2">
          <Form.Label>CustomerReference</Form.Label>
          <InputGroup>
            <InputGroup.Text></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="CustomerReference"
              value={customerReference}
              onChange={(event) => setCustomerReference(event.target.value)}
            />
          </InputGroup>
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
              onClick={localPaymentsReportingList}
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
          <LocalPaymentReportingList
            listInfo={localPaymentList}
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
}