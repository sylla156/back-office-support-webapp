import React from "react";
import { Row, Col, Badge } from "@themesberg/react-bootstrap";

export const MtnReportTransferInProcessMarkLikeRegularisedList = (props) => {
    let processorTransfer = props.processorTransfer

    const { id, transactionDate, identifiant, toNumber, amount, processorReference, statut } = processorTransfer


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
                        {identifiant ? identifiant : ""}
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
                        {amount} {"XOF"}
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
                        {toNumber ? toNumber : ""}
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
                    <h2 className=" badge bg-success py-2">{statut}</h2>
                </Col>
            </Row>
        </>
    )
}