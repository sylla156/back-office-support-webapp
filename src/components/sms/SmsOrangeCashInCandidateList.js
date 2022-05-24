import { Col, Row, Card, Badge} from "@themesberg/react-bootstrap";
import React from "react";

export const SmsOrangeCashInCandidateList = (props) => {
  const candidates = props.candidates;

  if (candidates && candidates.length === 0) {
    return (
      <Card>
        <Card.Body>Pas de transaction</Card.Body>
      </Card>
    );
  }
  return (
    <>
      {candidates.map((item) => {
        const smsCandidates = item?.smsCandidates;
        const amountTransfer = item?.amount;
        if (smsCandidates && smsCandidates.length === 0) {
          return (
            <Card>
              <Card.Body>Pas de sms candidate</Card.Body>
            </Card>
          );
        }

        return smsCandidates.map((candidate) => {
          const createDate = new Date(candidate.createDate);
          const createFormated = createDate.toLocaleString("pt-BR");

          const transactionDateUtc = new Date(candidate.transactionDate);
          const transactionDatFormated =
            transactionDateUtc.toLocaleString("pt-BR");
          const amount = candidate?.amount;
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
                        {candidate.msisdn ? candidate.msisdn : ""}
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
                          {candidate.amount ? candidate.amount : ""}
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
                        {candidate.operatorRef ? candidate.operatorRef : ""}
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
                  <Row className="d-block d-xl-flex align-items-center">
                    <Col className="ms--2">
                      <h4
                        className="h6 mb-0 text-end"
                        style={{ color: "#8a8a86" }}
                      >
                        createDate
                      </h4>
                    </Col>

                    <Col className="ms--2">
                      <span className="h6 mb-0 text-start">
                        {createFormated == "Invalid Date" ? "" : createFormated}
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <div className="mt-4"></div>
            </>
          );
        });
      })}
    </>
  );
};
