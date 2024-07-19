import React from 'react';
import { Row, Col, Badge } from '@themesberg/react-bootstrap';


export const ForceStatusTableListInfos = (props) => {
  let {
    merchantId,
    amount,
    currency,
    createdAt,
    transactionId,
    transactionReference,
    status,
    paymentStatus,
    provider,
    gatewayId,
    transactionIdentifier,
    description,
  } = props.transactionsInfos;

  const badgeColor = (status) => {
    const colorMap = {
      successful: 'success',
      pending: 'warning',
      failed: 'danger',
      created: 'primary'
    };

    return colorMap[status.toLowerCase()] || 'secondary';
  }

  return (
    <>
      <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
            Id
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <span className="h6 mb-0 text-start">{transactionId}</span>
        </Col>
      </Row>
      <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
            createdAt
          </h4>
        </Col>

        <Col className="ms--2" lg={9} >
          <span className="h6 mb-0 text-start">{createdAt === "Invalid Date" ? "" : createdAt}</span>
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
          <Badge bg={badgeColor(paymentStatus || status)} color="white">
            <span className="h6 mb-0 text-start" style={{ color: "#fff" }}>{paymentStatus || status}</span>
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
      <Row className="d-block d-xl-flex align-items-center">
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
      </Row>
      <Row className="d-block d-xl-flex align-items-center">
        <Col className="ms--2 " lg={3}>
          <h4 className="h6 mb-0 text-end text-wrap" style={{ color: "#8a8a86" }}>
            trRef
          </h4>
        </Col>

        <Col className="ms--2" lg={9}>
          <span className="h6 mb-0 text-start text-wrap">{transactionReference ? transactionReference : ""}</span>
        </Col>
      </Row>
    </>
  );
};
