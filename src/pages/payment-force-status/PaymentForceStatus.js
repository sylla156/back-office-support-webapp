import { Col, Form, InputGroup, Row, Spinner, Button } from "@themesberg/react-bootstrap";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import AxiosWebHelper from "../../utils/axios-helper";
import { APPKEY, PAGE_SIZE, SelectDefaultValues, FIRST_PAGE_INDEX, StatusConfirmationList, STATUS_CONFIRMATION_PAYMENT_LIST } from "../constante/Const";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";
import { format, addMinutes, subDays } from "date-fns";
import AlertDismissable from "../../components/AlertDismissable";
import { UpdateLocalData } from "../../components/statusConfirmation/UpdateLocalData";
import { StatusConfirmationReportingList } from "./StatusConfirmationReportingList";

export default () => {
    const currentDate = new Date();

    const startDateToUse = subDays(currentDate, 2);
    const formatStartDateToUse = format(startDateToUse, "yyyy-MM-dd");
    const defaultStartDate = `${formatStartDateToUse}T00:00:00Z`;
    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
    const defaultEndDate = `${formattedCurrentDate}T23:59:59Z`;
    const addMinutesInEndDate = addMinutes(currentDate, 30);


    const [errorData, setErrorData] = useState(null);
    const [errorDataCSV, setErrorDataCSV] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedCSV, setIsLoadedCSV] = useState(true);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [status, setStatus] = useState("pending");
    const [merchantId, setMerchantId] = useState(undefined);
    const [gatewayId, setGetwayId] = useState(undefined);
    const [transactionForceStatus, setTransactionForceStatus] = useState([]);
    const [count, setCount] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);

    const handleStartDate = (value) => {
        setStartDate(value);
    }
    const handleEndDate = (value) => {
        setEndDate(value);
    };
    const [cookies] = useCookies(["token", "user"]);

    const userCanForceStatus = cookies.user?.canForceStatus;
    const userCanUpdateLocalData = cookies.user?.canUpdateCachedTransaction;

    const axios = AxiosWebHelper.getAxios();

    const fileName = "status-confirmation-reporting-export";

    const exportData = () => { }

    const statusConfirmationReportingList = async() => {
        setIsLoaded(false);
        setErrorData(null)
        await axios.get(STATUS_CONFIRMATION_PAYMENT_LIST, {
            params: {
                from: startDate,
                to: endDate,
                merchantId,
                gatewayId,
                status,
                csv:false,
                page: currentPage,
                perPage: PAGE_SIZE,
            },
            headers: {
                AppKey: APPKEY,
                authenticationtoken: cookies.token,
            },
        }).then((result) => {
            setIsLoaded(true);
            // if(gatewayId){
            //     const data = result.data.transactionForceStatus
            //     // Filtrer les objets avec gatewayId égal à "hub2_mm_ci_orange_live"
            //     const filteredData = data.filter(obj => obj.transactionsInfos.gatewayId === gatewayId);
            //     setTransactionForceStatus(filteredData);
            //     setCount(filteredData.length);
            // }else{
            // }
            setTransactionForceStatus(result.data.transactionForceStatus);
            setCount(result.data.count);
        }).catch((error) => {
            setIsLoaded(true);
            if(error.response){
                if(error.response.status === 401){
                    setShouldLogin(true);
                }else{
                    setErrorData(error.response.data.message);
                }
            }
        })
    }

    const onPageChange = (page = 0) => {
        setCurrentPage(page);
    }

    const incrementVersion = () => {
        setVersion((currentVersion) => {
            return currentVersion + 1;
        });
    }

    const onClearFilters = () => {
        setMerchantId("");
        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
        setGetwayId("")
        setStatus("processing");
    };

    useEffect(() => {
        statusConfirmationReportingList();
    }, [currentPage, version]);

    if (!cookies.token) {
        return <Redirect to={Routes.Signin.path} />;
    }

    if (shouldLogin) {
        return <Redirect to={Routes.Signin.path} />;
    }

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
                {/* <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Gateway ID</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="GatewayId"
                            value={gatewayId}
                            onChange={(event) => setGetwayId(event.target.value)}
                        />
                    </InputGroup>
                </Col> */}
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
                            onClick={statusConfirmationReportingList}
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
            <div>
                <AlertDismissable
                    message={errorData}
                    variant="danger"
                    show={!!errorData}
                    onClose={() => setErrorData(null)}
                />
                <div></div>
            </div>

            {userCanUpdateLocalData && <UpdateLocalData
                onRefresh={incrementVersion}
                userCanUpdateLocalData={userCanUpdateLocalData}
            />}

            {isLoaded ? (
                <Row>
                    <StatusConfirmationReportingList
                        key={version}
                        listInfo={transactionForceStatus}
                        count={count}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        onRefresh={incrementVersion}
                        userCanForceStatus={userCanForceStatus}
                        userCanUpdateLocalData={userCanUpdateLocalData}
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
    )
}