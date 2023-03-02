import React from "react";
import { Row, Col, Badge } from "@themesberg/react-bootstrap";

export const OrangeReportTransferInProcessMarkLikeRegularisedList = (props) => {
  let orangeReportTransferCandidates = props.orangeReportTransferCandidates;
  if (orangeReportTransferCandidates.length === 0) {
    return <p>Pas de candidate</p>;
  }
  
  return (
    <>
      {orangeReportTransferCandidates.map((candidate) => {
          const {
            id,
            hour,
            date,
            transactionDate,
            transactionDateString,
            reference,
            service,
            payment,
            status,
            mode,
            emitterPhoneNumber,
            emitterWallet,
            speudoNumber,
            receiverPhoneNumber,
            receiverWallet,
            creditAmount,
            flowRateAmount,
            fee,
            country,
            transactionDateMax,
            transactionDateMin,
            localPaymentId,
            lastReconciliationDate,
            regularisationDate,
            rawData,
            createDate,
            updateDate,

          } = candidate;

          const statusVariant =
        status === "successful" ||
        status === "success" ||
        status === "SUCCESSFUL" ||
        status === "SUCCESS"
          ? "success"
          : status === "pending" || status === "Pending" || status === "PENDING"
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
                  ref
                </h4>
              </Col>

              <Col className="ms--2" lg={9}>
                <span className="h6 mb-0 text-start">
                  {reference ? reference : ""}
                </span>
              </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2 " lg={3}>
                <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                trscDate
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
                creditA
                </h4>
              </Col>

              <Col className="ms--2" lg={9}>
                <span className="h6 mb-0 text-start">
                  {flowRateAmount} {"XOF"}
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
                  {receiverPhoneNumber ? receiverPhoneNumber : ""}
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
                <Badge bg={statusVariant}>
                  <span className="h6 mb-0 text-start">
                    {status ? status : ""}
                  </span>
                </Badge>
              </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2 " lg={3}>
                <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                  service
                </h4>
              </Col>

              <Col className="ms--2" lg={9}>
                <span className="h6 mb-0 text-start">
                  {service ? service : ""}
                </span>
              </Col>
            </Row>
            {/* <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2 " lg={3}>
                <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                  provider
                </h4>
              </Col>

              <Col className="ms--2" lg={9}>
                <span className="h6 mb-0 text-start">
                  {provider ? provider : ""}
                </span>
              </Col>
            </Row> */}
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
      })}
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
