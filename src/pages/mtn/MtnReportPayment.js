import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import {Redirect} from "react-router-dom";
import {format, addMinutes, parseISO} from "date-fns";
import {Routes} from "../../routes";
import AlertDismissable from "../../components/AlertDismissable";
import {APPKEY, FIRST_PAGE_INDEX, PAGE_SIZE, chooseReconciliation, MtnReportTransferCountry, MTN_REPORT_PAYMENT_URL} from "../constante/Const";
import {
    Col,
    Spinner,
    Row,
    Form,
    Button,
    InputGroup,
    FormControl
} from "@themesberg/react-bootstrap";
import AxiosWebHelper from "../../utils/axios-helper";
import {MtnReportPaymentImportFile} from "./MtnPayment/MtnReportPaymentImportFile";
import {MakeMtnAndLocalPaymentReconciliation} from "./MtnPayment/MakeMtnAndLocalPaymentReconciliation";
import {MtnReportPaymentList} from "./MtnPayment/MtnReportPaymentList";

export default () => {

    const currentDate = new Date()
    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
    const formattedCurrentTime = format(currentDate, "HH:mm:ss");
    const defaultStartDate = `${formattedCurrentDate}T00:00:00Z`;
    const defaultEndDate = `${formattedCurrentDate}T23:59:59Z`;
    const [errorData, setErrorData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [count, setCount] = useState(undefined);
    const [mtnReportPaymentList, setMtnReportPaymentList] = useState([]);
    const [reference, setReference] = useState(undefined);
    const [recipientNumber, setRecipientNumber] = useState(undefined);
    const [country, setCountry] = useState("CI");
    const [reconciliation, setReconciliation] = useState("Tous");
    const [creditAmount, setCreditAmount] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);
    const [minValue, setMinValue] = useState();
    const [maxValue, setMaxValue] = useState();

    const handleStartDate = (value) => {

        setStartDate(value);
    
    };

    const handleEndDate = (value) => {

        setEndDate(value);
    
    };

    const [cookies] = useCookies(["token", ]);

    const axios = AxiosWebHelper.getAxios();

    const userCanUpdateLocalData = cookies.user?.canUpdateCachedTransaction;

    const getMtnReportPayment = () => {

        setIsLoaded(false);
        setErrorData(null);
        axios.get(MTN_REPORT_PAYMENT_URL, {
            params: {
                reference,
                recipientNumber,
                country,
                montantMin: minValue,
                montantMax: maxValue,
                creditAmount,
                from: startDate,
                to: endDate,
                reconciliation,
                page: currentPage,
                perPage: PAGE_SIZE
            },
            headers: {
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            }
        }).then((result) => {

            console.log("result", result.data.result);
            setIsLoaded(true)
            setMtnReportPaymentList(result.data.result)
            setCount(result.data.count)
        
        }).catch((error) => {

            setIsLoaded(true)
            if(error.response){

                if(error.response.message === 401){

                    setShouldLogin(true)
                
                }else{

                    setErrorData(error.response.data.message)
                
                }
            
            }
        
        })
    
    }

    const onPageChange = (page = 0) => {

        setCurrentPage(page);
    
    };

    const incrementVersion = () => {

        setVersion((currentVersion) => {
            
            return currentVersion + 1;
        
        });
    
    }

    const onClearFilters = () => {

        setReference("");
        setReconciliation('Tous')
        setCountry("CI");
        setCreditAmount("");
        setMinValue("");
        setMaxValue("")
        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
    
    };

    useEffect(() => {

        getMtnReportPayment()
    
    }, [currentPage, version]);

    if (!cookies.token) {

        return <Redirect to={Routes.Signin.path} />
    
    }


    if (shouldLogin) {

        return <Redirect to={Routes.Signin.path} />;
    
    }

    return(
        <>
            <MtnReportPaymentImportFile onRefresh={incrementVersion} />
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
                    <Form.Label>Transaction ID</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Transaction ID"
                            value={reference}
                            onChange={(event) => setReference(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Numéro de téléphone destinataire</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Numéro de téléphone destinataire"
                            value={recipientNumber}
                            onChange={(event) => setRecipientNumber(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Montant</Form.Label>
                    <InputGroup>
                        <FormControl
                            placeholder="Valeur minimale"
                            value={minValue}
                            onChange={(e) => setMinValue(e.target.value)}
                        />
                        <FormControl
                            placeholder="Valeur maximale"
                            value={maxValue}
                            onChange={(e) => setMaxValue(e.target.value)}
                        />
                    </InputGroup>
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
                            {MtnReportTransferCountry.map((item) => (
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
                            onClick={() => getMtnReportPayment()}
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

            {userCanUpdateLocalData && <MakeMtnAndLocalPaymentReconciliation onRefresh={incrementVersion} userCanUpdateLocalData={userCanUpdateLocalData} />}

            {
                isLoaded ? <Row>
                    <MtnReportPaymentList
                        key={version}
                        listInfo={mtnReportPaymentList}
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
    )

}
