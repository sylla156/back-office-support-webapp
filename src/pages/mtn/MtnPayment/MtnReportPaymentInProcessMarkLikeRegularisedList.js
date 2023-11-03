import React from "react";
import {Row, Col, Badge} from "@themesberg/react-bootstrap";

export const MtnReportPaymentInProcessMarkLikeRegularisedList = (props) => {

    let processorPayment = props.processorPayment;
    const {id, transactionDate, identifiant, transactionId, fromNumber, amount, processorReference, statut} = processorPayment

    return (
        <>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
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
                    <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                        reference opérateur
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <span className="h6 mb-0 text-start">
                        {identifiant ? identifiant : ""}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                        reference Hub2
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
                    <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
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
                    <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                        montant
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <span className="h6 mb-0 text-start">
                        {amount} {"XOF"}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                        téléphone
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <span className="h6 mb-0 text-start">
                        {fromNumber ? fromNumber : ""}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                        statut
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <h2 className=" badge bg-success py-2">{statut}</h2>
                </Col>
            </Row>
        </>
    )

}
