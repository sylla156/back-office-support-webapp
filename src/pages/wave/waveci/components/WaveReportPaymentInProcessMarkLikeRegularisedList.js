import React from "react";
import { Row, Col, Badge } from "@themesberg/react-bootstrap";

export const WaveReportPaymentInProcessMarkLikeRegularisedList = (props) => {
    let processorPayment = props.processorPayment;
    // if(waveReportPaymentCandidates.length === 0) {
    //     return <p>Pas de candidat</p>
    // }
    const {
        id, transactionDate, transactionId, groupId, rawphoneNumber, phoneNumber, description, netAmount, fee, country, grossAmount, balance, currency, paymentReason, cashier, emitterName, national_identification_number, local_payment_id, last_reconciliation_date, regularisation_date, reference, rawData, createDate, updateDate, processorReference
    } = processorPayment

    return(
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
                    {processorReference ? processorReference : ""}
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
                    montant brut
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <span className="h6 mb-0 text-start">
                    {grossAmount} {"XOF"}
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
                    {phoneNumber ? phoneNumber : ""}
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
                    <Badge bg="sucess">
                    <span className="h6 mb-0 text-start">
                    success
                    </span>
                    </Badge>
                </Col>
            </Row>
        </>
    )
}