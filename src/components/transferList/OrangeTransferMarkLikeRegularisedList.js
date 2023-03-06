import React from "react";
import { Row, Col, Badge } from "@themesberg/react-bootstrap";

export const OrangeTransferMarkLikeRegularisedList = (props) => {
  
  let {
    id,
    merchantId,
    merchantName,
    reference,
    processorReference,
    phoneNumber,
    gatewayId,
    status,
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
    dayHour,
    hour,
    country,
    provider,
    amount,
    currency,
    convertedAmount,
    fees,
    cost,
    convertedCost,
    reason,
    description,
    regularisationDate,
    finalStatus,
    transferProcessorReferenceRegularised,
  } = props.transfer;
  const statusVariant =
            status === "successful" ||
            status === "success" ||
            status === "SUCCESSFUL" ||
            status === "SUCCESS"
              ? "success"
              : status === "pending" ||
                status === "Pending" ||
                status === "PENDING"
              ? "warning"
              : status === "FAILLED" ||
                status === "failed" ||
                status === "FAILED" ||
                status === "failled"
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
          <span className="h6 mb-0 text-start">{id ? id : ""}</span>
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
          <span className="h6 mb-0 text-start">{phoneNumber ? phoneNumber : ""}</span>
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
          status
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <Badge  bg={statusVariant}>
            <span className="h6 mb-0 text-start">{status ? status : ""}</span>
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