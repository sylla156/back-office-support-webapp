import { Col, Row } from "@themesberg/react-bootstrap";
import React from "react";

export const PaymentSummary = (props) => {
    const {
        id,
        merchantId,
        amount,
        currency,
        createdAt,
        country,
        provider,
        gatewayId,
    } = props

    return (
        <>
            <Row className="d-block d-xl-flex align-items-center">
                <Col md={4} className="ms--2 ">
                    <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                        Id
                    </h4>
                </Col>
                <Col className="ms--">
                    <span className="h6 mb-0 text-start">{id ? id : ""}</span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col md={4} className="ms--2">
                    <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                        merchantId
                    </h4>
                </Col>

                <Col className="ms--2">
                    <span className="h6 mb-0 text-start">
                        {merchantId ? merchantId : ""}
                    </span>
                </Col>
            </Row>
            {/* <Row className="d-block d-xl-flex align-items-center">
        <Col md={4} className="ms--2">
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
            msisdn
          </h4>
        </Col>

        <Col className="ms--2">
          <span className="h6 mb-0 text-start">
            {transactionIdentifier ? transactionIdentifier : ""}
          </span>
        </Col>
      </Row> */}
            <Row className="d-block d-xl-flex align-items-center">
                <Col md={4} className="ms--2">
                    <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                        amount
                    </h4>
                </Col>

                <Col className="ms--2">
                    <span className="h6 mb-0 text-start text">
                        {amount} {currency}
                    </span>
                </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
                <Col md={4} className="ms--2">
                    <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                        createdAt
                    </h4>
                </Col>

                <Col className="ms--2">
                    <span className="h6 mb-0 text-start">
                        {createdAt == "Invalid Date" ? "" : createdAt}
                    </span>
                </Col>
            </Row>

            <Row className="d-block d-xl-flex align-items-center">
                <Col md={4} className="ms--2">
                    <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                        gatewayId
                    </h4>
                </Col>

                <Col className="ms--2">
                    <span className="h6 mb-0 text-start">
                        {gatewayId} {`(${country} - ${provider})`}
                    </span>
                </Col>
            </Row>

        </>
    )
}