import {Col, Row, Card, Badge} from "@themesberg/react-bootstrap";
import React from "react";

export const OrangeCashInInfoList = (props) => {

    const candidates = props.candidates;
    let smsCandidates = candidates?.smsCandidates;
    let id = candidates?.id;
    let merchantId = candidates?.merchantId;
    let msisdn = candidates?.msisdn;
    let amountTransfer = candidates?.amount ? candidates?.amount : 0 ;
    let createdAt = candidates?.createdAt;

    const createdAtUtc = new Date(createdAt);
    const createdAtFormated = createdAtUtc.toLocaleString("pt-BR");

    const amountSms =
    smsCandidates.length === 0
        ? 0
        : smsCandidates.map((item) => {

            return item.amount;
        
        });
    const isSameAmount = amountTransfer.toString() === amountSms[0];
    const statusVariant = isSameAmount ? "success" : "primary";
    return (
        <>
            <Card border="light" className="shadow-sm ">
                <Card.Body>
                    <img
                        className="p-2 d-xl-flex rounded mx-auto"
                        src={require("../../assets/img/technologies/logo_o.png")}
                        width="100"
                        style={{position: "absolute", top: 12, left: 14}}
                    />
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2 ">
                            <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                Id
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">{id ? id : ""}</span>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                merchantId
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {merchantId ? merchantId : ""}
                            </span>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                msisdn
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">{msisdn ? msisdn : ""}</span>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                amount
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            {isSameAmount ? <Badge bg={`${statusVariant}`}>
                                <span className="h6 mb-0 text-start text-light">
                                    {" "}
                                    {amountTransfer ? amountTransfer : ""}
                                </span>
                            </Badge> : <span className="h6 mb-0 text-start text">
                                {" "}
                                {amountTransfer ? amountTransfer : ""}
                            </span>}
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                createdAt
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {createdAtFormated == "Invalid Date" ? "" : createdAtFormated}
                            </span>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );

};
