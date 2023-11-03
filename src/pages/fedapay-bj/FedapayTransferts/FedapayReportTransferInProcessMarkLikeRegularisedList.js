import React from "react";
import {Row, Col} from "@themesberg/react-bootstrap";

export const FedapayReportTransferInProcessMarkLikeRegularisedList = (props) => {

    let processorTransfer = props.processorTransfer

    const {
        id, transactionDate, transactionKey, paymentMethodNumber, amount, reference, status
    } = processorTransfer

    const showStatus = (status) => {

        if (status === "pending") {

            return <h2 className="badge bg-warning py-2">{status}</h2>
        
        }else if(status === "approved"){

            return <h2 className="badge bg-success py-2">{status}</h2>
        
        }else if(status === "canceled"){

            return <h2 className="badge bg-danger py-2">{status}</h2>
        
        }
    
    }

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
                        {transactionKey ? transactionKey : ""}
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
                        {paymentMethodNumber ? paymentMethodNumber : ""}
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
                    {showStatus(status)}
                </Col>
            </Row>
        </>
    )

}
