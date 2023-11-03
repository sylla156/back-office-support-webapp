import React from "react";
import {Row, Col, Badge} from "@themesberg/react-bootstrap";

export const MoovPaymentMarkLikeRegularised = (props) => {

    const candidates = props.candidates
    if (candidates.length === 0) {

        return <p className="badge bg-danger h2 py-3">Pas de candidat</p>
    
    }

    return (
        <>
            {candidates.map((candidate) => {

                let {
                    id,
                    paymentId,
                    merchantId,
                    merchantName,
                    purchaseReference,
                    customerReference,
                    paymentProcessorReference,
                    number,
                    status,
                    paymentStatus,
                    providerStatus,
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
                    hour,
                    country,
                    provider,
                    method,
                    amount,
                    currency,
                    convertedAmount,
                    fees,
                    cost,
                    convertedCost,
                    reason,
                    reasonGroup,
                    rawData,
                    processorReferenceUpdated,
                    isAnomaly,
                    gatewayId,
                    regularisationDate,
                    finalStatus,
                    paymentProcessorReferenceRegularised,
                } = candidate

                const paymentStatusVariant =
                    paymentStatus === "successful" ||
                        paymentStatus === "success" ||
                        paymentStatus === "SUCCESSFUL" ||
                        paymentStatus === "SUCCESS"
                        ? "success"
                        : paymentStatus === "pending" ||
                            paymentStatus === "Pending" ||
                            paymentStatus === "PENDING"
                            ? "warning"
                            : paymentStatus === "FAILLED" ||
                                paymentStatus === "failed" ||
                                paymentStatus === "FAILED" ||
                                paymentStatus === "failled"
                                ? "danger"
                                : "primary";
                return (
                    <>
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col className="ms--2 " lg={3}>
                                <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                                    paymentId
                                </h4>
                            </Col>

                            <Col className="ms--2" lg={9}>
                                <span className="h6 mb-0 text-start">{paymentId ? paymentId : ""}</span>
                            </Col>
                        </Row>
                        <Row className="d-block d-xl-flex align-items-center">
                            <Col className="ms--2 " lg={3}>
                                <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                                    paymentProcessorReference
                                </h4>
                            </Col>

                            <Col className="ms--2" lg={9}>
                                <span className="h6 mb-0 text-start">{paymentProcessorReference ? paymentProcessorReference : ""}</span>
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
                                <span className="h6 mb-0 text-start">{number ? number : ""}</span>
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
                                    paymentStatus
                                </h4>
                            </Col>

                            <Col className="ms--2" lg={9}>
                                <Badge bg={paymentStatusVariant}>
                                    <span className="h6 mb-0 text-start">{paymentStatus ? paymentStatus : ""}</span>
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
