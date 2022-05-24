import { Col, Row, Card, Badge } from "@themesberg/react-bootstrap";
import React from "react";

export const OrangeCashInInfoList = (props) => {
  const candidates = props.candidates;
  if (candidates && candidates.length === 0) {
    return (
      <Card>
        <Card.Body>Pas de transaction</Card.Body>
      </Card>
    );
  }
  return candidates.map((item) => {
    const smsCandidates = item.smsCandidates;

        const amountTransfer = item?.amount;
        const merchantId = item?.merchantId;
        const id = item?.id;
        const msisdn = item?.msisdn;
        const createdAtUtc = new Date(item.createdAt);
        const createdAtFormated = createdAtUtc.toLocaleString("pt-BR");
        const amount =
          smsCandidates.length === 0
            ? 0
            : smsCandidates.map((item) => {
                return item.amount;
              });
        const isAmount = amountTransfer.toString() === amount[0];
        const statusVariant = isAmount ? "success" : "danger";
    return (
      <>
         <Card border="light" className="shadow-sm ">
              <Card.Body>
                <img
                  className="p-2 d-xl-flex rounded mx-auto"
                  src={require("../../assets/img/technologies/logo_o.png")}
                  width="100"
                  style={{ position: "absolute", top: 12, left: 14 }}
                />
                <Row className="d-block d-xl-flex align-items-center">
                  <Col className="ms--2 ">
                    <h4
                      className="h6 mb-0 text-end"
                      style={{ color: "#8a8a86" }}
                    >
                      Id
                    </h4>
                  </Col>

                  <Col className="ms--2">
                    <span className="h6 mb-0 text-start">{id ? id : ""}</span>
                  </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                  <Col className="ms--2">
                    <h4
                      className="h6 mb-0 text-end"
                      style={{ color: "#8a8a86" }}
                    >
                      merchantId
                    </h4>
                  </Col>

                  <Col className="ms--2">
                    <span className="h6 mb-0 text-start">
                      {merchantId ? merchantId : ""}
                    </span>
                  </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                  <Col className="ms--2">
                    <h4
                      className="h6 mb-0 text-end"
                      style={{ color: "#8a8a86" }}
                    >
                      msisdn
                    </h4>
                  </Col>

                  <Col className="ms--2">
                    <span className="h6 mb-0 text-start">
                      {msisdn ? msisdn : ""}
                    </span>
                  </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                  <Col className="ms--2">
                    <h4
                      className="h6 mb-0 text-end"
                      style={{ color: "#8a8a86" }}
                    >
                      amount
                    </h4>
                  </Col>

                  <Col className="ms--2">
                    <Badge bg={`${statusVariant}`}>
                      <span className="h6 mb-0 text-start text-light">
                        {" "}
                        {amountTransfer ? amountTransfer : ""}
                      </span>
                    </Badge>
                  </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                  <Col className="ms--2">
                    <h4
                      className="h6 mb-0 text-end"
                      style={{ color: "#8a8a86" }}
                    >
                      createdAt
                    </h4>
                  </Col>

                  <Col className="ms--2">
                    <span className="h6 mb-0 text-start">
                      {createdAtFormated == "Invalid Date"
                        ? ""
                        : createdAtFormated}
                    </span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
        <div className="mt-6"></div>
      </>
    );
  });
};
