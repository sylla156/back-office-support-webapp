import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import {Redirect} from "react-router-dom";
import {format, addMinutes, parseISO} from "date-fns";
import {Routes} from "../routes";
import AxiosWebHelper from "../utils/axios-helper";
import {
    AddStatusConfirmationList,
    APPKEY,
    OrangeReportTransferCountry,
    ORANGE_REPORT_PAYMENT_URL,
    GET_ORANGE_REPORT_PAYMENT_SERVICE_LIST,
    PAGE_SIZE,
    SelectDefaultValues,
    TransferstatusList,
    chooseReconciliation,
    FIRST_PAGE_INDEX
} from "./constante/Const";
import AlertDismissable from "../components/AlertDismissable";
import {
    Col,
    Spinner,
    Row,
    Form,
    Button,
    InputGroup,
} from "@themesberg/react-bootstrap";
import {OrangeReportPaymentList} from "../components/PaymentList/OrangeReportPaymentList";
import {OrangeReportPaymentImportfile} from "../components/PaymentList/OrangeReportPaymentImportFile";
import {MakeORAndLocalPaymentReconciliation} from "../components/PaymentList/MakeORAndLocalPaymentReconciliation";
import {UpdatePaymentLocalData} from "../components/PaymentList/UpdatePaymentLocalData";
export default () => {

    const currentDate = new Date();

    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
    const formattedCurrentTime = format(currentDate, "HH:mm:ss");

    const defaultStartDate = `${formattedCurrentDate}T00:00:00Z`;
    const defaultEndDate = `${formattedCurrentDate}T23:59:59Z`;

    const [errorData, setErrorData] = useState(null);
    const [isLoadedCSV, setIsLoadedCSV] = useState(true);
    const [errorDataCSV, setErrorDataCSV] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

    const [count, setCount] = useState(undefined);
    const [orangeReportPaymentList, setOrangeReportPaymentList] = useState([]);
    const [status, setStatus] = useState("successful");
    const [reference, setReference] = useState(undefined);
    const [country, setCountry] = useState("ci");
    const [reconciliation, setReconciliation] = useState("Tous");
    const [flowRateAmount, setFlowRateAmount] = useState(undefined);
    const [creditAmount, setCreditAmount] = useState(undefined);
    const [service, setService] = useState(SelectDefaultValues.servciePayment);
    const [fee, setFee] = useState(undefined);
    const [receiverPhoneNumber, setReceiverPhoneNumber] = useState(undefined);
    const [serviceList, setServiceList] = useState([]);

    const statusValue = () =>
        status ? AddStatusConfirmationList.id : SelectDefaultValues.status;
    const handleStartDate = (value) => {

        setStartDate(value);
    
    };
    const handleEndDate = (value) => {

        setEndDate(value);
    
    };

    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);

    const [cookies] = useCookies(["token", ]);

    const axios = AxiosWebHelper.getAxios();

    const userCanForceStatus = cookies.user?.canForceStatus;
    const userCanUpdateLocalData = cookies.user?.canUpdateCachedTransaction;

    const getOrangeReportPayment = () => {

        setIsLoaded(false);
        setErrorData(null);
        axios
            .get(ORANGE_REPORT_PAYMENT_URL, {
                params: {
                    reference,
                    country,
                    status,
                    flowRateAmount,
                    creditAmount,
                    service,
                    from: startDate,
                    to: endDate,
                    fee,
                    receiverPhoneNumber,
                    reconciliation,
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
                setOrangeReportPaymentList(result.data.result);
                setCount(result.data.count);
            
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
    const getServiceList = () => {

        setIsLoaded(false);
        setErrorData(null);
        axios
            .get(GET_ORANGE_REPORT_PAYMENT_SERVICE_LIST, {
                headers: {
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token,
                },
            })
            .then((result) => {

                setIsLoaded(true);
                setServiceList(result.data);
            
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

    const incrementVersion = () =>
        setVersion((currentVersion) => {
      
            return currentVersion + 1;
        
        });


    const onClearFilters = () => {
 
        setReference("");
        setCountry("ci");
        setFlowRateAmount("");
        setCreditAmount("");
        setService("");
        setFee("");
        setReceiverPhoneNumber("");
        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
        setStatus("successful");
    
    };

    useEffect(() => {

        getOrangeReportPayment();
    
    }, [currentPage, version]);
  
    useEffect(() => {

        getServiceList();
    
    }, [currentPage, version]);
  
    if (!cookies.token) {

        return <Redirect to={Routes.Signin.path} />;
    
    }
  
    if (shouldLogin) {

        return <Redirect to={Routes.Signin.path} />;
    
    }

    return (
        <>
            <OrangeReportPaymentImportfile
                onRefresh = {incrementVersion}
            />
            <div className="mb-4"></div>
      
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
                            {AddStatusConfirmationList.map((item) => (
                                <option key={item.id} value={item.status}>
                                    {item.status}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Référence</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Référence"
                            value={reference}
                            onChange={(event) => setReference(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Montant Créditié</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Montant créditié"
                            value={flowRateAmount}
                            onChange={(event) => setCreditAmount(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="service">
                        <Form.Label>Service</Form.Label>
                        <Form.Select
                            value={service}
                            onChange={(event) => {

                                setService(event.target.value);
                            
                            }}
                        >
                            {serviceList.map((item) => (
                                <option key={item.ser_service} value={item.ser_service}>
                                    {item.ser_service}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="country">
                        <Form.Label>Pays</Form.Label>
                        <Form.Select
                            value={country}
                            onChange={(event) => {

                                setCountry(event.target.value);
                            
                            }}
                        >
                            {OrangeReportTransferCountry.map((item) => (
                                <option key={item.id} value={item.country}>
                                    {item.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="reconciliation">
                        <Form.Label>Reconciliation</Form.Label>
                        <Form.Select
                            value={reconciliation}
                            onChange={(event) => {

                                setReconciliation(event.target.value);
                            
                            }}
                        >
                            {chooseReconciliation.map((item) => (
                                <option key={item.id} value={item.reconciliation}>
                                    {item.reconciliation}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={3} lg={6} className="px-2 mt-4">
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
                            onClick={getOrangeReportPayment}
                        >
              Filtrer
                        </Button>
                    </div>
                </Col>
            </div>

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

            {userCanUpdateLocalData && <UpdatePaymentLocalData 
                onRefresh={incrementVersion}
                userCanUpdateLocalData={userCanUpdateLocalData}
            />}
            {userCanUpdateLocalData && <MakeORAndLocalPaymentReconciliation 
                onRefresh={incrementVersion}
                userCanUpdateLocalData={userCanUpdateLocalData}
            />}
            {
                isLoaded ? <Row>
                    <OrangeReportPaymentList
                        key={version}
                        listInfo={orangeReportPaymentList}
                        count={count}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        onRefresh={incrementVersion}
                    />
                </Row> : <div className="d-flex justify-content-center">
                    <Spinner animation="border " size="sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </>
    );

};
