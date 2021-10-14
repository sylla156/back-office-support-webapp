import { Col, Row, Card, Form, Badge } from '@themesberg/react-bootstrap';
import React from 'react'

export default function ProviderTransferFedapay(props) {

    console.log("ProviderTransferFedapay props " + props.providerTransferFedapay);
    const processorReference = props.providerTransferFedapay.processorReference;

    const providerTransferFedapayData = props.providerTransferFedapay;

    let response;
    let klass;
    let id;
    let reference;
    let amount;
    let status;
    let customer_id;
    let currency_id;
    let mode;
    let last_error_code;
    let commission;
    let fees;
    let fixed_commission;
    let amount_transferred;
    let amount_debited;
    let created_at;
    let updated_at;
    let scheduled_at;
    let sent_at;
    let failed_at;
    let deleted_at;
    let custom_metadata;
    let payment_method_id;


    if (providerTransferFedapayData) {
        console.log("providerTransferFedapayData define ")
        response = providerTransferFedapayData.checkStatus.response;
        console.log("providerTransferFedapayData.checkStatus : " + response);

        if (response) {
            console.log("response in checkStatus  define ");
            klass = response.klass;
            id = response.id;
            reference = response.reference;
            amount = response.amount;
            status = response.status;
            customer_id = response.customer_id;
            currency_id = response.currency_id;
            mode = response.mode;
            last_error_code = response.last_error_code;
            commission = response.commission;
            fees = response.fees;
            fixed_commission = response.fixed_commission;
            amount_transferred = response.amount_transferred;
            amount_debited = response.amount_debited;
            created_at = new Date(response.created_at);
            updated_at = new Date(response.updated_at);
            scheduled_at = response.scheduled_at;
            sent_at = response.sent_at;
            failed_at = new Date(response.failed_at);
            deleted_at = new Date(response.deleted_at);
            custom_metadata = response.custom_metadata;
            payment_method_id = response.payment_method_id;


        }
    }

    const createdDate_at = created_at.toLocaleString('pt-BR');
    const updatedDate_at = updated_at.toLocaleString('pt-BR');
    const deletedDate_at = deleted_at.toLocaleString('pt-BR');
    const failedDate_at = failed_at.toLocaleString('pt-BR');

    const statusVariant = status === 'successful' || status === 'success' || status === "SUCCESSFUL"  || status === 'SUCCESS'
    ? 'success'
    : status === 'pending' || status === 'Pending' || status === "PENDING"
      ? 'warning'
      : status === 'FAILLED' || status === 'failed' || status==="FAILED" ? 'danger' : 'primary'

    return (
        <>

            <Card.Body>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                            processorReference
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-center">
                            {processorReference}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            klass
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {klass}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            id
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {id}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            reference
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {reference}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            amount
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {amount}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                            status
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <Badge bg={`${statusVariant}`} >  
                            <span className="h6 mb-0 text-start text-light">
                                {status}
                            </span>
                        </Badge>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                            customer_id
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {customer_id}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                            currency_id
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {currency_id}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            mode
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {mode}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            last_error_code
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {last_error_code}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            commission
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {commission}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            fees
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {fees}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            fixed_commission
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {fixed_commission}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            amount_transferred
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {amount_transferred}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            amount_debited
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {amount_debited}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            created_at
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {createdDate_at}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            updated_at
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {updatedDate_at}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            scheduled_at
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {scheduled_at}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            sent_at
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {sent_at}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            failed_at
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {failedDate_at}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            deleted_at
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {deletedDate_at}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            custom_metadata
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {custom_metadata}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }} >
                            payment_method_id
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {payment_method_id}
                        </span>
                    </Col>
                </Row>

            </Card.Body>


        </>
    );
}
