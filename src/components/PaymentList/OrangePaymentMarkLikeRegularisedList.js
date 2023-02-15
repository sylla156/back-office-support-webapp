import React from "react";
import { Row, Col, Badge } from "@themesberg/react-bootstrap";

export const OrangePaymentMarkLikeRegularisedList = (props) => {
  
  let {
    id,
    paymentId,
    merchantId,
    merchantName,
    purchaseReference,
    customerReference,
    paymentProcessorReference,
    number,
    status,
    paymentStatus,
    providerStatus,
    createdAt,
    updatedAt,
    createdAtDate,
    updatedAtDate,
    year,
    quarter,
    month,
    week,
    weekDay,
    day,
    hour,
    country,
    provider,
    method,
    amount,
    currency,
    convertedAmount,
    fees,
    cost,
    convertedCost,
    reason,
    reasonGroup,
    rawData,
    processorReferenceUpdated,
    isAnomaly,
    gatewayId,
    regularisationDate,
    finalStatus,
    paymentProcessorReferenceRegularised,
  } = props.paymentIntent;
  const paymentStatusVariant =
            paymentStatus === "successful" ||
            paymentStatus === "success" ||
            paymentStatus === "SUCCESSFUL" ||
            paymentStatus === "SUCCESS"
              ? "success"
              : paymentStatus === "pending" ||
                paymentStatus === "Pending" ||
                paymentStatus === "PENDING"
              ? "warning"
              : paymentStatus === "FAILLED" ||
                paymentStatus === "failed" ||
                paymentStatus === "FAILED" ||
                paymentStatus === "failled"
              ? "danger"
              : "primary";
  return (
    <>
        <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
          paymentId
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <span className="h6 mb-0 text-start">{paymentId ? paymentId : ""}</span>
        </Col>
      </Row>
      <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
          createdAt
          </h4>
        </Col>

        <Col className="ms--2" lg={9} >
          <span className="h6 mb-0 text-start">{createdAt==="Invalid Date" ? "": createdAt}</span>
        </Col>
      </Row>
      <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
          merch_Id
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <span className="h6 mb-0 text-start">{merchantId ? merchantId : ""}</span>
        </Col>
      </Row>
      <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
          amount
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <span className="h6 mb-0 text-start">{amount} {currency}</span>
        </Col>
      </Row>
      <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
          téléphone
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <span className="h6 mb-0 text-start">{number ? number : ""}</span>
        </Col>
      </Row>
      <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
          gatewayId
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <span className="h6 mb-0 text-start">{gatewayId ? gatewayId : ""}</span>
        </Col>
      </Row>
      <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
          paymentStatus
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <Badge  bg={paymentStatusVariant}>
            <span className="h6 mb-0 text-start">{paymentStatus ? paymentStatus : ""}</span>
          </Badge>
        </Col>
      </Row>
      <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
          provider
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <span className="h6 mb-0 text-start">{provider ? provider : ""}</span>
        </Col>
      </Row>
      {/* <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
          trId
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <span className="h6 mb-0 text-start">{transactionIdentifier ? transactionIdentifier : ""}</span>
        </Col>
      </Row>
      <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
          desc
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <span className="h6 mb-0 text-start text-wrap">{description ? description : ""}</span>
        </Col>
      </Row> */}
      {/* <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end text-wrap" style={{ color: "#8a8a86" }}>
          trRef
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <span className="h6 mb-0 text-start text-wrap">{transactionReference ? transactionReference : ""}</span>
        </Col>
      </Row> */}
    </>
  );
};

// <span className="fw-normal">{createdAt}</span><br/>
//         <span className="fw-normal">{merchantId}</span><br/>
//         <span className="fw-normal">{id}</span><br/>
//         <span className="fw-normal">{transactionReference}</span><br/>
//         <span className="fw-normal">{amount} {currency}</span><br/>
//         <span className="fw-normal">{gatewayId}</span><br/>
//         <span className="fw-normal">{status}</span><br/>
//         <span className="fw-normal">{country}</span><br/>
//         <span className="fw-normal">{provider}</span><br/>
//         <span className="fw-normal">{transactionIdentifier}</span><br/>
//         <span className="fw-normal">{description}</span><br/>