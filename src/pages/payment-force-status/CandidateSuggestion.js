import React from "react";
import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import { AddCandidatesSuggestions } from "./AddCandidatesSuggestions";

export const CandidateSuggestion = (props) => {
    const candidates = props.candidates;
    const message = props.message;
    const label = props.label;
    const onRefresh = props.onRefresh;
    const userCanForceStatus = props.userCanForceStatus;
    const payment = props.payment;
    const id = props.id;
    const shouldExtendSearch = props.shouldExtendSearch;
    const extendSearchMessage = props.extendSearchMessage;

    if (!candidates) {
        console.log("pas de candidates");
    }

    if (candidates) {
        return candidates.map((item, index) => {
            const isStatus = item?.content?.status === 'successful';
            const statusVariant = isStatus ? "success" : "danger";
            return (
                <>
                    <Col md={6} className="">
                        <br />
                        <span className="p-2 mb-2 rounded text-center border bg-warning border-warning" style={{ width: 10, height: 10 }}>
                            {label}
                        </span>
                        {item?.content?.status ? (
                            <Badge className="mx-1 mb-3" bg={`${statusVariant}`}>
                                <span className="h6 text-light"> {item?.content?.id} </span>
                            </Badge>
                        ) : (
                            <Badge className="mx-1 mb-3" bg={`success`}>
                                <span className="h6 text-light"> {item?.content?.id} </span>
                            </Badge>
                        )}

                        {item.isLocalPayment ? (
                            <Badge className="mx-1 mb-3" bg={`danger`}>
                                <span className="h6 text-light"> {item?.message} </span>
                            </Badge>
                        ) : (
                            <Badge className="mx-1 mb-3" bg={`success`}>
                                <span className="h6 text-light"> {item?.message} </span>
                            </Badge>
                        )}

                        {item?.isLocalPayment && <Badge className="mx-1 mb-3" bg={`danger`}>
                            <span className="h6 text-light"> Local payment : {item?.localPayment?.id} </span>
                        </Badge>}

                        {userCanForceStatus && (
                            <span>
                                {item?.isLocalPayment ? <AddCandidatesSuggestions id={id} extendSearchMessage={"Introuvable dans le rapport opérateur"} onRefresh={onRefresh} payment={payment} /> : <AddCandidatesSuggestions id={id} candidate={item?.content} onRefresh={onRefresh} transfer={payment} />}
                            </span>
                        )}
                    </Col>
                </>
            )
        })
    }
    if(shouldExtendSearch) {
        return(
            <>
                <Col className="" md={6}>
                    <br />
                    <span
                        className=" p-2 mb-2 rounded text-center border bg-warning border-warning" style={{width:10, height:10}}
                    >
                        {label}
                    </span>
                    <Badge className="mx-1 mb-3" bg={`danger`}>
                        <span className="h6 text-light"> {extendSearchMessage} </span>
                    </Badge>
                    {userCanForceStatus && (
                        <AddCandidatesSuggestions
                            id={id} extendSearchMessage={extendSearchMessage} onRefresh={onRefresh} payment={payment}
                        />
                    )}
                </Col>
            </>
        )
    }
    
    return(
        <>
            {message && (
                <Col md={12} className="">
                    <br/>
                    <span className="p-2 mb-2 rounded text-center border bg-warning border-warning" style={{width:10, height:10}}>
                        {label}
                    </span>
                    <Badge className="mx-1 mb-3" bg={`light`}>
                        <span className="h6 text-wrap d-block text-left">
                            {" "}
                            {message}{" "}
                        </span>
                    </Badge>
                </Col>
            )}
        </>
    )
}