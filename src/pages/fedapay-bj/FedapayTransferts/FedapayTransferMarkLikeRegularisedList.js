import {Row, Col, Badge} from "@themesberg/react-bootstrap";
import React from "react";


export const FedapayTransferMarkLikeRegularisedList = (props) => {

    const candidates = props.candidates
    if (candidates.length === 0) {

        return <p className="badge bg-danger h2 py-3">Pas de candidat</p>
    
    }

    return (
        <>
            {candidates.map((candidate) => {

                let {
                    id,
                    merchantId,
                    merchantName,
                    reference,
                    phoneNumber,
                    gatewayId,
                    status,
                    createdAt,
                    updatedAt,
                    createdAtDate,
                    updatedAtDate,
                    year,
                    quarter,
                    month,
                    week,
                    weekDay,
                    day,
                    dayHour,
                    hour,
                    country,
                    provider,
                    amount,
                    currency,
                    convertedAmount,
                    fees,
                    cost,
                    convertedCost,
                    reason,
                    description,
                    rawData,
                    processorReference,
                    regularisationdate,
                    finalStatus,
                    transferProcessorReferenceRegularised
                } = candidate

                const transferStatusVariant =
                    status === "successful" ||
                        status === "success" ||
                        status === "SUCCESSFUL" ||
                        status === "SUCCESS"
                        ? "success"
                        : status === "pending" ||
                            status === "Pending" ||
                            status === "PENDING"
                            ? "warning"
                            : status === "FAILLED" ||
                                status === "failed" ||
                                status === "FAILED"
                                ? "danger"
                                : "primary";

                return (
                    <>
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col className="ms--2 " lg={3}>
                                <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                                    paymentProcessorReference
                                </h4>
                            </Col>

                            <Col className="ms--2" lg={9}>
                                <span className="h6 mb-0 text-start">{processorReference ? processorReference : ""}</span>
                            </Col>
                        </Row>
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col className="ms--2 " lg={3}>
                                <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                                    createdAt
                                </h4>
                            </Col>

                            <Col className="ms--2" lg={9} >
                                <span className="h6 mb-0 text-start">{createdAt === "Invalid Date" ? "" : createdAt}</span>
                            </Col>
                        </Row>
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col className="ms--2 " lg={3}>
                                <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                                    merch_Id
                                </h4>
                            </Col>

                            <Col className="ms--2" lg={9}>
                                <span className="h6 mb-0 text-start">{merchantId ? merchantId : ""}</span>
                            </Col>
                        </Row>
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col className="ms--2 " lg={3}>
                                <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                                    amount
                                </h4>
                            </Col>

                            <Col className="ms--2" lg={9}>
                                <span className="h6 mb-0 text-start">{amount} {currency}</span>
                            </Col>
                        </Row>
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col className="ms--2 " lg={3}>
                                <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                                    téléphone
                                </h4>
                            </Col>

                            <Col className="ms--2" lg={9}>
                                <span className="h6 mb-0 text-start">{phoneNumber ? phoneNumber : ""}</span>
                            </Col>
                        </Row>
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col className="ms--2 " lg={3}>
                                <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                                    gatewayId
                                </h4>
                            </Col>

                            <Col className="ms--2" lg={9}>
                                <span className="h6 mb-0 text-start">{gatewayId ? gatewayId : ""}</span>
                            </Col>
                        </Row>
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col className="ms--2 " lg={3}>
                                <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                                    transferStatus
                                </h4>
                            </Col>

                            <Col className="ms--2" lg={9}>
                                <Badge bg={transferStatusVariant}>
                                    <span className="h6 mb-0 text-start">{status ? status : ""}</span>
                                </Badge>
                            </Col>
                        </Row>
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col className="ms--2 " lg={3}>
                                <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                                    provider
                                </h4>
                            </Col>

                            <Col className="ms--2" lg={9}>
                                <span className="h6 mb-0 text-start">{provider ? provider : ""}</span>
                            </Col>
                        </Row>
                    </>
                )
            
            })}
        </>
    )

}
