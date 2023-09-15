import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { format, addMinutes, parseISO } from "date-fns";
import { Routes } from "../../routes";
import AlertDismissable from "../../components/AlertDismissable";
import { FIRST_PAGE_INDEX, APPKEY, PAGE_SIZE, chooseReconciliation, FEDAPAY_REPORT_TRANSFER_URL } from "../constante/Const";
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
import { FedapayReportTransferImportFile } from "./FedapayTransferts/FedapayReportTransferImportFile";
import { FedapayReportTransferList } from "./FedapayTransferts/FedapayReportTransferList";
import { MakeFedapayAndLocalTransferReconciliation } from "./FedapayTransferts/MakeFedapayAndLocalTransferReconciliation";

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
    const [transactionKey, setTransactionKey] = useState(undefined);
    const [reference, setReference] = useState(undefined);
    const [status, setStatus] = useState(undefined);
    const [number, setNumber] = useState(undefined);
    const [montantMin, setMontantMin] = useState();
    const [montantMax, setMontantMax] = useState();
    const [fedapayReportTransferList, setFedapayReportTransferList] = useState([]);
    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);
    const [reconciliation, setReconciliation] = useState("Tous");

    const handleStartDate = (value) => {
        setStartDate(value);
    };

    const handleEndDate = (value) => {
        setEndDate(value);
    };

    const [cookies] = useCookies(["token",]);

    const axios = AxiosWebHelper.getAxios();

    const userCanUpdateLocalData = cookies.user?.canUpdateCachedTransaction;

    const getFedapayReportTransfer = () => {
        setIsLoaded(false)
        setErrorData(null)
        axios.get(FEDAPAY_REPORT_TRANSFER_URL, {
            headers: {
                AppKey: APPKEY,
                authenticationtoken: cookies.token,
            },
            params: {
                transactionKey,
                reference,
                from: startDate,
                to: endDate,
                number,
                status,
                page: currentPage,
                perPage: PAGE_SIZE,
                montantMin,
                montantMax
            }
        }).then((response) => {
            setIsLoaded(true)
            setFedapayReportTransferList(response.data.result)
            setCount(response.data.count)
        }).catch((error) => {
            setIsLoaded(true)
            if (error.response) {
                if (error.response.status === 401) {
                    setShouldLogin(true)
                } else {
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

    useEffect(() => {
        getFedapayReportTransfer()
    }, [currentPage, version]);

    if (!cookies.token) {
        return <Redirect to={Routes.Signin.path} />
    }

    if (shouldLogin) {
        return <Redirect to={Routes.Signin.path} />;
    }
    return (
        <>
            <FedapayReportTransferImportFile onRefresh={incrementVersion} />
            <div className="mb-4"></div>
            <div className="align-items-center d-flex flex-wrap">
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Date début</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Date de début"
                            value={startDate}
                            onChange={(e) => handleStartDate(e.target.value)}
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
                    <Form.Label>Transaction key</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Transaction key"
                            value={transactionKey}
                            onChange={(event) => setTransactionKey(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Reference</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Reference"
                            value={reference}
                            onChange={(event) => setReference(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Montant</Form.Label>
                    <InputGroup>
                        <FormControl
                            placeholder="Valeur minimale"
                            value={montantMin}
                            onChange={(e) => setMontantMin(e.target.value)}
                        />
                        <FormControl
                            placeholder="Valeur maximale"
                            value={montantMax}
                            onChange={(e) => setMontantMax(e.target.value)}
                        />
                    </InputGroup>
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
                            onClick={()=>console.log("okokok")}
                        >
                            Effacer
                        </Button>
                        <Button
                            className="mx-2"
                            variant="primary"
                            type="button"
                            onClick={() => getFedapayReportTransfer()}
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
            {userCanUpdateLocalData && <MakeFedapayAndLocalTransferReconciliation onRefresh={incrementVersion} userCanUpdateLocalData={userCanUpdateLocalData} />}

            {
                isLoaded ? <Row>
                    <FedapayReportTransferList
                        key={version}
                        listInfo={fedapayReportTransferList}
                        count={count}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        onRefresh={incrementVersion}
                    />
                </Row> : <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </>
    )
}
