import React from "react";
import {Row, Col, Badge} from "@themesberg/react-bootstrap";

export const IntouchReportTransferInProcessMarkLikeRegularisedList = (props) => {

    let processorTransfer = props.processorTransfer

    const {id, sendingDate, transactionStatus, partnerDistTransactionId, recipient, transactionMontant, numTransactionGu, status} = processorTransfer

    return(
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
                        {partnerDistTransactionId ? partnerDistTransactionId : ""}
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
                        {sendingDate === "Invalid Date" ? "" : sendingDate}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                        montant brut
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <span className="h6 mb-0 text-start">
                        {transactionMontant} {"XOF"}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                        Destinataire
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <span className="h6 mb-0 text-start">
                        {recipient ? recipient : ""}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col className="ms--2 " lg={3}>
                    <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                        status
                    </h4>
                </Col>

                <Col className="ms--2" lg={9}>
                    <h2 className=" badge bg-success py-2">{transactionStatus}</h2>
                </Col>
            </Row>
        </>
    )

}
