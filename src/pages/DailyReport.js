import React, { Fragment, useState } from "react";
import {
    Col,
    Spinner,
    Row,
    Form,
    Button,
    InputGroup,
    Card
} from "@themesberg/react-bootstrap";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import AlertDismissable from "../components/AlertDismissable";
import AxiosWebHelper from "../utils/axios-helper";
import { APPKEY, BASE_URL_STATS } from "./constante/Const";
import numeral from "numeral";
import { format } from "date-fns";

numeral.register("locale", "fr", {
    delimiters: {
        thousands: " ",
        decimal: ","
    },
    abbreviations: {
        thousand: "k",
        million: "m",
        billion: "b",
        trillion: "t"
    },
    ordinal: function (number) {

        return number === 1 ? "er" : "ème";

    },
    currency: {
        symbol: "FCFA",
    },
});

numeral.locale("fr");

export default () => {

    const currentDate = new Date();
    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");

    const [errorData, setErrorData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [merchantId, setMerchantId] = useState("915");
    const [startDate, setStartDate] = useState(`${formattedCurrentDate}T00:00:00Z`);
    const [endDate, setEndDate] = useState(`${formattedCurrentDate}T23:59:59Z`);
    const [merchantStats, setMerchantStats] = useState(undefined);
    const [shouldLogin, setShouldLogin] = useState(false);

    const axios = AxiosWebHelper.getAxios();
    const [cookies] = useCookies(["token",]);

    const handleMerchantId = (event) => setMerchantId(event);

    const handleStartDate = (event) => setStartDate(event);

    const handleEndDate = (event) => setEndDate(event);

    const getMerchantStats = () => {

        setIsLoaded(false);
        setErrorData(null);
        axios
            .get(BASE_URL_STATS, {
                params: {
                    merchantId,
                    start: startDate,
                    end: endDate,
                    shouldUseLocalData: false
                },
                headers: {
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token,
                },
            })
            .then((result) => {

                setIsLoaded(true);
                setMerchantStats(result.data);

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

        setMerchantId("");
        setStartDate("");
        setEndDate("");
        setMerchantStats({});

    };

    const getMerchantName = () => {

        if (!merchantStats) return "Nom du marchand";
        if (!merchantStats.merchant) return "Nom du marchand";
        return merchantStats.merchant.name;

    };
    const getFormattedDate = () => {

        if (!merchantStats) return "Date du rapport";

        const { startDate: sDate, endDate: eDate } = merchantStats;
        return `Du ${sDate} au ${eDate}`;

    };

    const getProviderList = () => {

        if (!merchantStats) return [];

        const stats = merchantStats.stats;
        if (!stats) return [];

        stats.forEach(statsObject => {
            statsObject.statuses.sort((item, other) => {
                if (item.status < other.status) {
                    return 1;
                } else if (item.status > other.status) {
                    return -1;
                } else {
                    return 0;
                }
            });
        });

        return stats;
    };

    const getPercent = (value) => {

        return numeral(value).format("0.0%");

    };
    const getAmount = (value) => {

        return numeral(value).format("0,0");

    };

    const getMerchantSuccessfull = () => {

        if (!merchantStats) return undefined;

        return merchantStats.success;

    };

    const getMerchantFailure = () => {

        if (!merchantStats) return undefined;

        return merchantStats.failure;

    };

    const merchantSuccess = getMerchantSuccessfull();
    const merchantFailure = getMerchantFailure();

    const getStatusColorClass = (status) => {

        if (status === "pending") return "text-warning fw-bold";
        if (status === "successful") return "text-success fw-bold";
        if (status === "failed") return "text-danger fw-bold";
        return "";

    };

    if (!cookies.token) {

        return <Redirect to={Routes.Signin.path} />

    }

    if (shouldLogin) {

        return <Redirect to={Routes.Signin.path} />;

    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2"></div>
            <div>
                <AlertDismissable
                    message={errorData}
                    variant="danger"
                    show={!!errorData}
                    onClose={() => setErrorData(null)}
                />
                <div></div>
            </div>

            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    {/* Merchant input */}
                    <Col xs={12} md={4} lg={4} className="mb-2 px-2">
                        <Form.Label>Id marchant</Form.Label>
                        <InputGroup>
                            <InputGroup.Text></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={merchantId}
                                onChange={(event) => handleMerchantId(event.target.value)}
                            />
                        </InputGroup>
                    </Col>

                    {/* Start date */}
                    <Col xs={12} md={4} lg={4} className="mb-2 px-2">
                        <Form.Label>Date début</Form.Label>
                        <InputGroup>
                            <InputGroup.Text></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={startDate}
                                onChange={(event) => handleStartDate(event.target.value)}
                            />
                        </InputGroup>
                    </Col>

                    {/* End date */}
                    <Col xs={12} md={4} lg={4} className="mb-2 px-2">
                        <Form.Label>Date fin</Form.Label>
                        <InputGroup>
                            <InputGroup.Text></InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={endDate}
                                onChange={(event) => handleEndDate(event.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="justify-content-between align-items-center">
                    <Col xs={12} md={6} lg={6} className="mt-5 px-2">
                        <Button
                            variant="outline-primary"
                            className="mx-2"
                            type="button"
                            onClick={onFilters}
                        >
                            Effacer
                        </Button>
                        <Button
                            className="ml-3"
                            variant="primary"
                            type="button"
                            onClick={getMerchantStats}
                        >
                            Générer le rapport
                        </Button>
                    </Col>
                </Row>
            </div>

            {isLoaded ? (
                <Row>
                    <Col xs={12} className="">
                        <h2 className="h3">{getMerchantName()}</h2>
                        <p className="h5 text-gray">{getFormattedDate()}</p>
                        <Card border="light" className="shadow-sm border mb-3">
                            <Card.Body>
                                <Row className="bg-light rounded rounded-lg py-1 mb-0 fw-bold text-muted">
                                    <Col xl={2}>
                                        <span className="d-block">Status</span>
                                    </Col>
                                    <Col xl={1}>
                                        <span className="text-end d-block">Count</span>
                                    </Col>
                                    <Col xl={2}>
                                        <span className="text-end d-block">Volume</span>
                                    </Col>
                                    <Col xl={6}>
                                        <span className="d-block">Failure reason</span>
                                    </Col>
                                    <Col xl={1}>
                                        <span className="text-end d-block">Rate</span>
                                    </Col>
                                </Row>
                                {getProviderList().map((provider, providerIndex) => (
                                    <Fragment key={provider.name}>
                                        {providerIndex > 0 && (
                                            <hr className="my-0 py-0" style={{ height: "2px" }} />
                                        )}

                                        <Row>
                                            <Col xl={12}>
                                                <Row>
                                                    <Col xl={12}>
                                                        <span className="d-block bg-light py-2 mb-0 ps-1 mt-4 text-dark fw-bold">
                                                            {provider.name}
                                                        </span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        {provider.statuses.map((statusInfo, mainIndex) => (
                                                            <Fragment key={`${statusInfo}-${mainIndex}`}>
                                                                {(statusInfo.items.map((item, index) => (
                                                                    <Fragment key={`${item.status}-${index}`}>
                                                                        {mainIndex + index >= 1 && (
                                                                            <hr className="my-0 py-0" />
                                                                        )}
                                                                        <Row
                                                                            key={`${item.status}-${index}`}
                                                                            className="my-2"
                                                                        >
                                                                            <Col xl={2}>
                                                                                <span
                                                                                    className={`text-capitalize d-block ps-1 ${getStatusColorClass(
                                                                                        item.status
                                                                                    )}`}
                                                                                >
                                                                                    {item.status}
                                                                                </span>
                                                                            </Col>
                                                                            <Col xl={1}>
                                                                                <span className="text-end d-block">
                                                                                    {getAmount(item.count)}
                                                                                </span>
                                                                            </Col>
                                                                            <Col xl={2}>
                                                                                <span className="text-end d-block">
                                                                                    {getAmount(item.total)}
                                                                                </span>
                                                                            </Col>
                                                                            <Col xl={6}>
                                                                                <span>{item.reason}</span>
                                                                            </Col>
                                                                            <Col xl={1}>
                                                                                <span className="text-end d-block">
                                                                                    {getPercent(item.rate)}
                                                                                </span>
                                                                            </Col>
                                                                        </Row>
                                                                    </Fragment>
                                                                ))
                                                                )}
                                                            </Fragment>
                                                        )
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Fragment>
                                ))}

                                {merchantStats && (
                                    <>
                                        <hr className="my-0 py-0" style={{ height: "2px" }} />
                                        <Row>
                                            <Col xl={12}>
                                                <Row>
                                                    <Col>
                                                        <span className="d-block bg-light py-2 mb-0 ps-1 mt-4 text-capitalize fw-bold">
                                                            Total
                                                        </span>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xl={12}>
                                                        {merchantSuccess && (
                                                            <Row className="my-2">
                                                                <Col xl={2}>
                                                                    <span className={`d-block  ${getStatusColorClass("successful")}`}>
                                                                        Successful
                                                                    </span>
                                                                </Col>
                                                                <Col xl={1}>
                                                                    <span className="text-end d-block">
                                                                        {getAmount(merchantSuccess.count)}
                                                                    </span>
                                                                </Col>
                                                                <Col xl={2}>
                                                                    <span className="text-end d-block">
                                                                        {getAmount(merchantSuccess.total)}
                                                                    </span>
                                                                </Col>
                                                                <Col xl={6}>
                                                                    <span className="d-block">&nbsp;</span>
                                                                </Col>
                                                                <Col xl={1}>
                                                                    <span className="text-end d-block">
                                                                        {getPercent(merchantSuccess.rate)}
                                                                    </span>
                                                                </Col>
                                                            </Row>
                                                        )}
                                                        {merchantFailure && (
                                                            <>
                                                                <hr className="my-0 py-0" />
                                                                <Row className="my-2">
                                                                    <Col xl={2}>
                                                                        <span className={`d-block ${getStatusColorClass("failed")}`}>
                                                                            Failed
                                                                        </span>
                                                                    </Col>
                                                                    <Col xl={1}>
                                                                        <span className="text-end d-block">
                                                                            {getAmount(merchantFailure.count)}
                                                                        </span>
                                                                    </Col>
                                                                    <Col xl={2}>
                                                                        <span className="text-end d-block">
                                                                            {getAmount(merchantFailure.total)}
                                                                        </span>
                                                                    </Col>
                                                                    <Col xl={6}>
                                                                        <span className="d-block">&nbsp;</span>
                                                                    </Col>
                                                                    <Col xl={1}>
                                                                        <span className="text-end d-block">
                                                                            {getPercent(merchantFailure.rate)}
                                                                        </span>
                                                                    </Col>
                                                                </Row>
                                                                <hr className="my-0 py-0" style={{ height: "2px" }} />
                                                            </>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
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
