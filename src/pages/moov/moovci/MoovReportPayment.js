import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { format, addMinutes, parseISO } from "date-fns";
import { Routes } from "../../../routes";
import { FIRST_PAGE_INDEX, AddStatusConfirmationList, APPKEY, PAGE_SIZE, chooseReconciliation, MoovReportPaymentCountry, MOOV_REPORT_PAYMENT_URL, } from "../../constante/Const";
import AlertDismissable from "../../../components/AlertDismissable";

import {
    Col,
    Spinner,
    Row,
    Form,
    Button,
    InputGroup,
    FormControl
} from "@themesberg/react-bootstrap";
import AxiosWebHelper from "../../../utils/axios-helper";
import { MoovReportPaymentImportFile } from "./components/MoovPayment/MoovReportPaymentImportFile";
import { MoovReportPaymentList } from "./components/MoovPayment/MoovReportPaymentList";
import { MakeMoovAndLocalPaymentReconciliation } from "./components/MoovPayment/MakeMoovAndLocalPaymentReconciliation";


export default () => {
    const currentDate = new Date();

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
    const [moovReportPaymentList, setMoovReportPaymentList] = useState([]);
    const [reference, setReference] = useState(undefined);
    const [sourceNumber, setSourceNumber] = useState(undefined);
    const [country, setCountry] = useState("CI");
    const [reconciliation, setReconciliation] = useState("Tous");
    const [creditAmount, setCreditAmount] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);
    const [minValue, setMinValue] = useState();
    const [maxValue, setMaxValue] = useState();
    const [sourceFullName, setSourceFullName] = useState("");

    const handleStartDate = (value) => {
        setStartDate(value);
    };

    const handleEndDate = (value) => {
        setEndDate(value);
    };

    const [cookies] = useCookies(["token","user"]);

    const axios = AxiosWebHelper.getAxios();

    const userCanUpdateLocalData = cookies.user?.canUpdateCachedTransaction;

    const getMoovReportPayment = () => {
        setIsLoaded(false);
        setErrorData(null);
        axios.get(MOOV_REPORT_PAYMENT_URL, {
            params: {
                reference,
                sourceNumber,
                country,
                sourceFullName,
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
            setIsLoaded(true)
            // console.log(result.data.result);
            setMoovReportPaymentList(result.data.result)
            setCount(result.data.count)
        }).catch((error) => {
            setIsLoaded(true)
            if (error.response) {
                if (error.response.status === 401) {
                    setShouldLogin(true);
                } else {
                    setErrorData(error.response.data.message);
                }
            }
        })
    }

    const onPageChange = (page = 0) => {
        setCurrentPage(page);
    };

    const incrementVersion = () =>
        setVersion((currentVersion) => {
            console;
            return currentVersion + 1;
        });

    const onClearFilters = () => {
        setReference("");
        setSourceNumber("");
        setReconciliation('Tous')
        setCountry("CI");
        setCreditAmount("");
        setMinValue("");
        setMaxValue("")
        setSourceFullName('')
        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
    };

    useEffect(() => {
        getMoovReportPayment()
    }, [currentPage, version]);
    if (!cookies.token) {
        return <Redirect to={Routes.Signin.path} />
    }

    if (shouldLogin) {
        return <Redirect to={Routes.Signin.path} />;
    }

    return (
        <>
            <MoovReportPaymentImportFile onRefresh={incrementVersion} />
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
                    <Form.Label>Numéro de téléphone origine</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Numéro de téléphone origine"
                            value={sourceNumber}
                            onChange={(event) => setSourceNumber(event.target.value)}
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
                    <Form.Label>Nom & prenoms compte origine</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Nom & prenoms compte destinataire"
                            value={sourceFullName}
                            onChange={(event) => setSourceFullName(event.target.value)}
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
                            {MoovReportPaymentCountry.map((item) => (
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
                            onClick={() => getMoovReportPayment()}
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

            {userCanUpdateLocalData && <MakeMoovAndLocalPaymentReconciliation onRefresh={incrementVersion} userCanUpdateLocalData={userCanUpdateLocalData} />}
            {
                isLoaded ? <Row>
                    <MoovReportPaymentList
                        key={version}
                        listInfo={moovReportPaymentList}
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