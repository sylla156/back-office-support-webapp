import React from "react";
import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";

export const CandidateSuggestion = (props)=>{
  const candidates = props.candidates;
  const message = props.message;
  const label = props.label;
  if (candidates.length !== 0) {
    return candidates.map((item, index) => {
      return (
        <>
          <Col md={6} className="">
            <br />
            <span
              className="p-2 mb-2 rounded text-center border bg-warning border-warning"
              style={{ width: 10, height: 10 }}
            >
              {label}
            </span>
            {item.id && (
              <>
                <Badge className="mx-1 mb-3" bg={`success`}>
                <span className="h6 text-light"> {item.id} </span>
              </Badge>
              </>
            )}
          </Col>
        </>
      );
    });
  }
  return (
    <>
      {message && <Col md={12} className="">
        <br />
        <span
          className=" p-2 mb-2 rounded text-center border bg-warning border-warning"
          style={{ width: 10, height: 10 }}
        >
          {label}
        </span>
        <Badge className="mx-1 mb-2" bg={`light`}>
          <span className="h6 text-wrap d-block text-left">
            {" "}
            {message}{" "}
          </span>
        </Badge>
      </Col>}
    </>
  );
}