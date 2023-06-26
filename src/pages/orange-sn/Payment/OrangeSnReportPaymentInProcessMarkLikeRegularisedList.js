import React from "react";
import { Row, Col, Badge } from "@themesberg/react-bootstrap";

export const OrangeSnReportPaymentInProcessMarkLikeRegularisedList = (props) => {
    let processorPayment = props.processorPayment;
    const { id, transactionDate, transactionId, senderMsisdn, transactionAmount, status, localPaymentId } = processorPayment

    return (
        <>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                        Id
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <span className="h6 mb-0 text-start">
                        {id ? id : ""}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                        reference opérateur
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <span className="h6 mb-0 text-start">
                        {transactionId ? transactionId : ""}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                        Date de transaction
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <span className="h6 mb-0 text-start">
                        {transactionDate === "Invalid Date" ? "" : transactionDate}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                        montant
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <span className="h6 mb-0 text-start">
                        {transactionAmount} {"XOF"}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                        téléphone
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <span className="h6 mb-0 text-start">
                        {senderMsisdn ? senderMsisdn : ""}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                        status
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <h2 className=" badge bg-success py-2">{status}</h2>
                </Col>
            </Row>
        </>
    )

}