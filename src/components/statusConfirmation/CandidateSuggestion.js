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
  const id= props.id;
  const shouldExtendSearch = props.shouldExtendSearch;
  const extendSearchMessage = props.extendSearchMessage;
  
  if(!candidates) {
    return;
  }
  // if(messageLocalData) {
  //   return (
  //     <>
  //       <Badge className="mx-1 mb-3" bg={`danger`}>
  //            <span className="h6 text-light"> {messageLocalData} </span>
  //       </Badge>
  //     </>
  //   )
  // }
  if (candidates.length !== 0) {
    return candidates.map((item, index) => {
      // const {content, orangeReport, message, isLocalTransfer, localTransfer} = item
      const isStatus = item?.content?.status === 'successful';
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
            {item?.content.id && (
              <>
                {item?.content?.status ?<Badge className="mx-1 mb-3" bg={`${statusVariant}`}>
                  <span className="h6 text-light"> {item?.content?.id} </span>
                </Badge> : <Badge className="mx-1 mb-3" bg={`success`}>
                  <span className="h6 text-light"> {item?.content?.id} </span>
                </Badge>}

                {item?.isLocalTransfer ?<Badge className="mx-1 mb-3" bg={`danger`}>
                  <span className="h6 text-light"> {item?.message} </span>
                </Badge> : <Badge className="mx-1 mb-3" bg={`success`}>
                  <span className="h6 text-light"> {item?.message} </span>
                </Badge>}

                {item?.isLocalTransfer && <Badge className="mx-1 mb-3" bg={`danger`}>
                  <span className="h6 text-light"> Local transfer : {item?.localTransfer?.id} </span>
                </Badge>}
                
                {userCanForceStatus && (
                  <span>
                    {item?.isLocalTransfer ? <AddCandidatesSuggestions id={id} extendSearchMessage={"Introuvable dans le rapport opérateur"} onRefresh={onRefresh} transfer={transfer}  /> : <AddCandidatesSuggestions id={id} candidate={item?.content} onRefresh={onRefresh} transfer={transfer}  />}
                  </span>
                )}
              </>
            )}
          </Col>
        </>
      );
    });
  }
  if(shouldExtendSearch) {
    return (
      <>
        <Col md={6} className="">
        <br />
        <span
          className=" p-2 mb-2 rounded text-center border bg-warning border-warning"
          style={{ width: 10, height: 10 }}
        >
          {label}
        </span>
          <Badge className="mx-1 mb-3" bg={`danger`}>
            <span className="h6 text-light"> {extendSearchMessage} </span>
          </Badge>
          {userCanForceStatus && (<AddCandidatesSuggestions id={id} extendSearchMessage={extendSearchMessage} onRefresh={onRefresh} transfer={transfer}  />)}
        </Col>
      </>
    );
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