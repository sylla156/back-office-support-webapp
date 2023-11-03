import React, {useState, useEffect} from "react";
import {Card, Table, Badge, Col} from "@themesberg/react-bootstrap";
import AxiosWebHelper from "../../utils/axios-helper";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useCookies} from "react-cookie";
import {Redirect} from "react-router-dom";
import {Routes} from "../../routes";
import AlertDismissable from "../AlertDismissable";

export const NeedToUpdateLocalDate = (props) => {

    const messageLocalData = props.messageLocalData;
    const userCanUpdateLocalData = props.userCanUpdateLocalData;

    return (
        <>
            <Col md={6} className="">
                <Badge className="mx-1 mb-3" bg={`warning`}>
                    <span className="h6 text-dark"> {messageLocalData} </span>
                </Badge>

            </Col>
        </>
    );

};
