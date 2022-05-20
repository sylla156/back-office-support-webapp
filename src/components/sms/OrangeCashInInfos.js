import { Col, Row, Card } from "@themesberg/react-bootstrap";
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
    const createAtUtc = new Date(item.createAt);
    const createAtFormated = createAtUtc.toLocaleString("pt-BR");
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
                <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                  Id
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-start">
                  {item.id ? item.id : ""}
                </span>
              </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2">
                <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                  merchantId
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-start">
                  {item.merchantId ? item.merchantId : ""}
                </span>
              </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2">
                <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                  msisdn
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-start">
                  {item.msisdn ? item.msisdn : ""}
                </span>
              </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2">
                <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                  amount
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-start">
                  {item.amount ? item.amount : ""}
                </span>
              </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2">
                <h4 className="h6 mb-0 text-end" style={{ color: "#8a8a86" }}>
                  createAt
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-start">
                  {createAtFormated == "Invalid Date" ? "" : createAtFormated}
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