import React from "react";
import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import { AddCandidatesSuggestions } from "../candidates/AddCandidatesSuggestions";

export const CandidateSuggestion = (props)=>{
  const candidates = props.candidates;
  const message = props.message;
  const label = props.label;
  const onRefresh = props.onRefresh;
  const userCanForceStatus = props.userCanForceStatus;
  const transfer=props.transfer;
  const id= props.id

  if (candidates.length !== 0) {
    return candidates.map((item, index) => {
      const isStatus = item?.status === 'successful';
      const statusVariant = isStatus ? "success" : "danger";
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
                {item?.status ?<Badge className="mx-1 mb-3" bg={`${statusVariant}`}>
                  <span className="h6 text-light"> {item.id} </span>
                </Badge> : <Badge className="mx-1 mb-3" bg={`success`}>
                  <span className="h6 text-light"> {item.id} </span>
                </Badge>}
               
                <AddCandidatesSuggestions id={id} candidate={item} onRefresh={onRefresh} transfer={transfer}  />
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