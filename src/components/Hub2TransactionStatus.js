import React from "react";
import { Col, Row, Card, Badge } from "@themesberg/react-bootstrap";

export default function Hub2TransactionStatus(props) {
  const {
    hub2IdResult: {
      id,
      status,
      merchantId,
      reference,
      amount,
      currency,
      mode,
      description,
      createdAt,
      updatedAt,
    },
  } = props;

  const destination = props.hub2IdResult.destination;
  let country;
  let type;
  let provider;
  let number;
  let concetaneNumber;

  if (destination) {
    console.log("destination define");
    country = destination.country;
    type = destination.type;
    provider = destination.provider;
    number = destination.number;

    concetaneNumber = "****" + number;
  }

  const failureCause = props.hub2IdResult.failureCause;
  let code;
  let message;

  if (failureCause) {
    console.log("failureCause define");
    code = failureCause.code;
    message = failureCause.message;
  }

  const providerData = props.hub2IdResult.providerData;
  let transfer;
  let gatewayId;
  let processorReference;

  // let amountResponse;
  // let gu_transaction_id;
  // let messageResponse;
  // let partner_transaction_id;
  // let recipient_phone_number;
  // let service_id;
  // let statusResponse;
  let providerDataString;

  if (providerData) {
    gatewayId = providerData.gatewayId;
    processorReference = providerData.processorReference;
    transfer = providerData.transfer;
    console.log(transfer);
    console.log(transfer.response);

    providerDataString = JSON.stringify(providerData, null, 2);
  }

  const createdAtUtc = new Date(createdAt);
  const createdAtFormated = createdAtUtc.toLocaleString("pt-BR");

  const updatedAtUtc = new Date(updatedAt);
  const updatedAtFormated = updatedAtUtc.toLocaleString("pt-BR");

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
      <Card border="light" className="shadow-sm ">
        <Card.Body>
          <img
            className="p-2 d-xl-flex rounded mx-auto"
            src={require("../assets/img/technologies/logo_o.png")}
            width="100"
            style={{ position: "absolute", top: 12, left: 14 }}
          />
          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2 ">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                Id
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-start">{id}</span>
            </Col>
          </Row>
          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                merchantId
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-start">{merchantId}</span>
            </Col>
          </Row>

          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                createdAt
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-start">
                {createdAtFormated == "Invalid Date" ? "" : createdAtFormated}
              </span>
            </Col>
          </Row>
          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                updatedAt
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-start">
                {updatedAtFormated == "Invalid Date" ? "" : updatedAtFormated}
              </span>
            </Col>
          </Row>
          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                reference
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-start">{reference}</span>
            </Col>
          </Row>

          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                description
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-start">{description}</span>
            </Col>
          </Row>

          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                status
              </h4>
            </Col>

            <Col className="ms--2">
              <Badge bg={`${statusVariant}`}>
                <span className="h6 mb-0 text-start text-light">{status}</span>
              </Badge>
            </Col>
          </Row>

          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                amount
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-start">{amount}</span>
            </Col>
          </Row>

          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                currency
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-start">{currency}</span>
            </Col>
          </Row>

          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                mode
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-start">{mode}</span>
            </Col>
          </Row>
        </Card.Body>

        {/* ------------------------------- */}
        <h5 className="mb-0 text-justify" style={{ paddingLeft: 20 }}>
          Destination
        </h5>
        <hr
          style={{
            borderTop: "1px double #111",
            marginRight: 30,
            marginLeft: 20,
            marginTop: 1,
          }}
        />
        <Card.Body style={{ marginTop: -30 }}>
          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2 ">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                type
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-center">{type}</span>
            </Col>
          </Row>
          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                country
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-center">{country}</span>
            </Col>
          </Row>

          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                provider
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-center">{provider}</span>
            </Col>
          </Row>
          <Row className="d-block d-xl-flex align-items-center ">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                number
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 ml-0 text-center ">{concetaneNumber}</span>
            </Col>
          </Row>
        </Card.Body>

        {/* ------------------------------- */}
        <h5 className="mb-0 text-justify" style={{ paddingLeft: 20 }}>
          Failure cause
        </h5>
        <hr
          style={{
            borderTop: "1px double #111",
            marginRight: 30,
            marginLeft: 20,
            marginTop: 1,
          }}
        />
        <Card.Body style={{ marginTop: -30 }}>
          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2 ">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                code
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mb-0 text-center">{code}</span>
            </Col>
          </Row>
          <Row className="d-block d-xl-flex align-items-center">
            <Col className="ms--2">
              <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                message
              </h4>
            </Col>

            <Col className="ms--2">
              <span className="h6 mt-0 text-center">{message}</span>
            </Col>
          </Row>
        </Card.Body>

        {/* ------------------------------- */}
        <h5 className="mb-0 text-justify" style={{ paddingLeft: 20 }}>
          Provider data
        </h5>
        <hr
          style={{
            borderTop: "1px double #111",
            marginRight: 30,
            marginLeft: 20,
            marginTop: 1,
          }}
        />
        <Card.Body style={{ marginTop: -30 }}>
          {gatewayId && (
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2">
                <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                  gatewayId
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-center">{gatewayId}</span>
              </Col>
            </Row>
          )}

          {processorReference && (
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2">
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
          )}

          {providerData && (
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2">
                <div
                  className="text-sm fw-normal p-4 mt-3 rounded border"
                  style={{ backgroundColor: "#f5f4f2" }}
                >
                  <pre className="">
                    <code>{providerDataString}</code>
                  </pre>
                </div>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
