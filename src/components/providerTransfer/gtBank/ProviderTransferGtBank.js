import React from 'react'
import {Col, Row, Card} from '@themesberg/react-bootstrap';

export default function ProviderTransferGtBank(props) {

    const providerTransferGtBankData = props.providerTransferGtBank;
    let response;
    let data;
    let code;
    let message;
    let description;
    //
    let remarks;
    let sender_name;
    let gtb_reference;
    let receiver_name;
    let sender_address;
    let sender_country;
    let sending_amount;
    let sending_reason;
    let sending_currency;
    let transaction_date;
    let merchant_reference;
    let receiver_bank_code;
    let receiver_bank_name;
    let transaction_status;
    let sender_phone_number;
    let receiver_bank_account;
    let receiver_phone_number;

    if(providerTransferGtBankData){
        response = providerTransferGtBankData.checkStatus.response;
    
    }

    if(response){
        data = response.data;
        code = response.code;
        message = response.message;
        description = response.message;
    
    }

    if(data){
        remarks = data.remarks;
        sender_name = data.sended_name;
        gtb_reference = data.gtb_reference;
        receiver_name = data.receiver_name;
        sender_address = data.sender_address;
        sender_country = data.sender_country;
        sending_amount = data.sending_amount;
        sending_reason = data.sending_reason;
        sending_currency = data.sending_currency;
        transaction_date = data.transaction_date;
        merchant_reference = data.merchant_reference;
        receiver_bank_code = data.receiver_bank_code;
        receiver_bank_name = data.receiver_bank_name;
        transaction_status = data.transaction_status;
        sender_phone_number = data.sender_phone_number;
        receiver_bank_account = data.receiver_bank_account;
        receiver_phone_number = data.receiver_phone_number;
    
    }
    

    return (
        <>
            <Card.Body style={{marginTop:-30}}>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                code
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-center">
                            {code}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                message
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-center">
                            {message}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                description
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-center">
                            {description}
                        </span>
                    </Col>
                </Row>
            </Card.Body>
          

            <h5 className="mb-0 text-justify" style={{paddingLeft: 20}}>Data</h5>
            <hr style={{borderTop: "1px double #111", marginRight: 30, marginLeft: 20, marginTop: 1}} />
            {data && <Card.Body style={{marginTop: -30}}>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              remarks
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {remarks}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              sender_name
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-start">
                            {sender_name}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              gtb_reference
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {gtb_reference}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              receiver_name
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-start">
                            {receiver_name}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              sender_address
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {sender_address}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              sender_country
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-start">
                            {sender_country}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              sending_amount
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {sending_amount}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              sender_name
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-start">
                            {sender_name}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              sending_reason
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {sending_reason}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              sending_currency
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-start">
                            {sending_currency}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              transaction_date
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {transaction_date}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              merchant_reference
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-start">
                            {merchant_reference}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              receiver_bank_code
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {receiver_bank_code}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              receiver_bank_name
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-start">
                            {receiver_bank_name}
                        </span>
                    </Col>
                </Row>

                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              transaction_status
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {transaction_status}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              sender_phone_number
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-start">
                            {sender_phone_number}
                        </span>
                    </Col>
                </Row>


                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2 ">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              receiver_bank_account
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mb-0 text-start">
                            {receiver_bank_account}
                        </span>
                    </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                        <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
              receiver_phone_number
                        </h4>
                    </Col>

                    <Col className="ms--2">
                        <span className="h6 mt-0 text-start">
                            {receiver_phone_number}
                        </span>
                    </Col>
                </Row>
          
            </Card.Body>}
        </>
    )

}
