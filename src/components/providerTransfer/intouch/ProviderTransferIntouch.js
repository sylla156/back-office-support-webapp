import React from 'react'
import {Col, Row, Card, Badge} from '@themesberg/react-bootstrap';

export default function ProviderTransferIntouch(props) {

    console.log("ProviderTransferIntouch props " + props.providerTransferIntouch);

    const providerTransferIntouchData = props.providerTransferIntouch;

    console.log("ProviderTransferIntouch information ")
    console.log(providerTransferIntouchData);
    
    let checkStatus;
    let response;
    let service_id;
    let gu_transaction_id;
    let status;
    let transaction_date;
    let recipient_id;
    let amount;
    let recipient_invoice_id;
    
    if (providerTransferIntouchData) {

        console.log(" providerTransferIntouchData define");

        checkStatus = providerTransferIntouchData.checkStatus;
    
    }

    if(checkStatus){

        console.log("checkStatus in providerTransferIntouchData define");
        response = checkStatus.response;
    
    }

    if (response) {

        console.log("response in providerTransferIntouchData define");
        console.log("service_id : " + service_id);
        console.log("gu_transaction_id : " + gu_transaction_id);
        service_id = response.service_id;
        gu_transaction_id = response.gu_transaction_id;
        status = response.status;
        transaction_date = response.transaction_date;
        recipient_id = response.recipient_id;
        amount = response.amount;
        recipient_invoice_id = response.recipient_invoice_id;

    }

    // const statusVariant = status === "SUCCESSFUL" || "successufl" ? "success" : status==="PENDING" || status==="pending" ? "warning": status==="FAILED" || status==="failed" ? "danger" : "primary";

    const statusVariant = status === 'successful' || status === 'success' || status === "SUCCESSFUL" || status === 'SUCCESS'
        ? 'success'
        : status === 'pending' || status === 'Pending' || status === "PENDING"
            ? 'warning'
            : status === 'FAILLED' || status === 'failed' || status === "FAILED" ? 'danger' : 'primary'


    return (
        <>
            <Card.Body style={{marginTop: -30}}>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                            service_id
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-center">
                            {service_id}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                            gu_transaction_id
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-center">
                            {gu_transaction_id}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                            status
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <Badge bg={`${statusVariant}`}>
                            <span className="h6 mt-0 text-center text-light">
                                {status}
                            </span>
                        </Badge>

                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                            transaction_date
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-center">
                            {transaction_date}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                            recipient_id
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-center">
                            {recipient_id}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                            amount
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-center">
                            {amount}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                            recipient_invoice_id
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-center">
                            {recipient_invoice_id}
                        </span>
                    </Col>
                </Row>
            </Card.Body>
        </>
    )

}
