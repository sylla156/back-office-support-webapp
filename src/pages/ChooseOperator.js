import React, { useState } from "react";
import {
    Col,
    Spinner,
    Row,
    Form,
    Button,
    InputGroup,
} from "@themesberg/react-bootstrap";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import AlertDismissable from "../components/AlertDismissable";
import AxiosWebHelper from "../utils/axios-helper";
import { APPKEY } from "./constante/Const";

export default () => {
    const [isLoaded, setIsLoaded] = useState(true);
    const [dateNow, setDateNow] = useState(new Date());
    const [data, setData] = useState([
        {
            id:1,
            name:"Wave CI",
            image:"wave.jpg",
            order:0,
            routeUrl:"/wave-report-payment",
            //routeUrl:"/payment/rapport-payment-wave-ci",
            createdDate:new Date(),
            updatedDate: new Date()
        },
        {
            id:2,
            name:"Wave SN",
            image:"wave.jpg",
            order:0,
            routeUrl:"/payment/rapport-payment-wave-sn",
            createdDate:new Date(),
            updatedDate: new Date()
        }
    ])
    const createdAtUtc = new Date();
    const createdAtFormated = createdAtUtc.toLocaleString("pt-BR");

    const axios = AxiosWebHelper.getAxios();
    const [cookies] = useCookies(["token"]);

    return(
        <>
        {!cookies.token ? (
            <Redirect to={Routes.Signin.path} />
        ):(
            <div>
                {isLoaded ? (
                <>
                    <div className="ms-2">
                        <div className="row">
                            {data.map((operator) => {
                                return(
                                    <div className="col-md-3">
                                        <div className="card">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <img src={require('../assets/img/technologies/wave.jpg')} className="card-img-left" alt="Image wave" height={137} />
                                                </div>
                                                <div className="col-md-7">
                                                    <div className="card-body">
                                                    <a className="card-title text-warning" href={operator.routeUrl}>{operator.name}</a>
                                                    <p className="card-text">{createdAtFormated}</p>
                                                    {/* <div className="row">
                                                        <button className="">Rapport transfert</button>
                                                        <button>Rapport paiement</button>
                                                    </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                    </div>
                </>):(
                <>
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border " size="sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </>
                )}
            </div>
        )}
        </>
    )
}