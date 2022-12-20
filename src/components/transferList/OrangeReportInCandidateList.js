import { Col, Row, Card, Badge } from "@themesberg/react-bootstrap";
import React from "react";

export const OrangeReportInCandidateList = (props) => {
  const candidates = props.candidates;
  let orangeReportTransferCandidates = candidates?.orangeReportTransferCandidates;
  const amountTransfer = candidates?.amount;
  const createdAt = candidates?.createdAt

  if (orangeReportTransferCandidates && orangeReportTransferCandidates.length === 0) {
    return (
      <Card>
        <Card.Body>Pas de rapport candidate</Card.Body>
      </Card>
    );
  }
  return (
    <>
      {orangeReportTransferCandidates.map((candidate) => {
        const createDate = new Date(createdAt);
        const createFormated = createDate.toLocaleString("pt-BR");

        const transactionDateUtc = new Date(candidate.reportDate);
        const transactionDatFormated =
          transactionDateUtc.toLocaleString("pt-BR");
        const amount = candidate?.flowRateAmount;
        const isAmount = amountTransfer.toString() === amount;
        const statusVariant = isAmount ? "success" : "danger";
        return (
          <>
            <Card border="light" className="shadow-sm ">
              <Card.Body>
                <img
                  className="p-2 d-xl-flex rounded mx-auto"
                  src={require("../../assets/img/technologies/orange.jpg")}
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
                    <span className="h6 mb-0 text-start">
                      {candidate.id ? candidate.id : ""}
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
                      {candidate.receiverPhoneNumber ? candidate.receiverPhoneNumber : ""}
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
                        {candidate.flowRateAmount ? candidate.flowRateAmount : ""}
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
                      operatorRef
                    </h4>
                  </Col>

                  <Col className="ms--2">
                    <span className="h6 mb-0 text-start">
                      {candidate.reference ? candidate.reference : ""}
                    </span>
                  </Col>
                </Row>
                <Row className="d-block d-xl-flex align-items-center">
                  <Col className="ms--2">
                    <h4
                      className="h6 mb-0 text-end"
                      style={{ color: "#8a8a86" }}
                    >
                      transactionDate
                    </h4>
                  </Col>

                  <Col className="ms--2">
                    <span className="h6 mb-0 text-start">
                      {transactionDatFormated == "Invalid Date"
                        ? ""
                        : transactionDatFormated}
                    </span>
                  </Col>
                </Row>
                {/* <Row className="d-block d-xl-flex align-items-center">
                  <Col className="ms--2">
                    <h4
                      className="h6 mb-0 text-end"
                      style={{ color: "#8a8a86" }}
                    >
                      createDate
                    </h4>
                  </Col>

                  <Col className="ms--2">
                    <span className="h6 mb-0 text-start text-">
                      {createFormated == "Invalid Date" ? "" : createFormated}
                    </span>
                  </Col>
                </Row> */}
                {/* <Row>
                  <Badge bg="danger">
                    <span className="h6 mb-0 text-wrap text-white">
                    Attention, merci de vérifier que la référence opérateur n'est pas déjà associée à un autre transfert.
                    </span>
                  </Badge>
                </Row> */}
              </Card.Body>
            </Card>
          </>
        );
      })}
    </>
  );
};
