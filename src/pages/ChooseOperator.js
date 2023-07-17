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
import { Link, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import AlertDismissable from "../components/AlertDismissable";
import AxiosWebHelper from "../utils/axios-helper";
import { APPKEY } from "./constante/Const";
import { UpdatePaymentLocalData } from "../components/PaymentList/UpdatePaymentLocalData";

export default () => {
    const [isLoaded, setIsLoaded] = useState(true);
    const [dateNow, setDateNow] = useState(new Date());
    const [data, setData] = useState([
        {
            id:1,
            name:"Orange CI",
            image:"orange.jpg",
            order:0,
            routeRapportPaymentUrl:"/orange-report-payment",
            routeRegularisation:"/orange-payment/regularised",
        },
        {
            id:2,
            name:"Wave CI",
            image:"wave.jpg",
            order:0,
            routeRapportPaymentUrl:"/wave-report-payment",
            routeRegularisation:"/wave-payment/regularised",
        },
        {
            id:3,
            name:"Moov CI",
            image:"moov.jpg",
            order:0,
            routeRapportPaymentUrl:"/moov-report-payment",
            routeRegularisation:"/moov-payment/regularised",
        },
        {
            id:4,
            name:"Intouch",
            image:"intouch.jpg",
            order:0,
            routeRapportPaymentUrl:"/intouch-report-payment",
            routeRegularisation:"/intouch-payment/regularised",
        },
        {
            id:5,
            name:"Mtn",
            image:"mtn.jpg",
            order:0,
            routeRapportPaymentUrl:"/mtn-report-payment",
            routeRegularisation:"/mtn-payment/regularised",
        },
        {
            id:6,
            name:"Orange SN",
            image:"orange.jpg",
            order:0,
            routeRapportPaymentUrl:"/orange-sn-payment",
            routeRegularisation:"/orange-sn-payment/regularised",
        },
        {
            id:7,
            name:"Free SN",
            image:"free.jpg",
            order:0,
            routeRapportPaymentUrl:"/free-report-payment",
            routeRegularisation:"/free-payment/regularised",
        }
    ])
    const createdAtUtc = new Date();

    const axios = AxiosWebHelper.getAxios();
    const [cookies] = useCookies(["token", "user"]);
    const [version, setVersion] = useState(0);

    const incrementVersion = () =>
    setVersion((currentVersion) => {
      console;
      return currentVersion + 1;
    });
    const userCanUpdateLocalData = cookies.user?.canUpdateCachedTransaction;



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
                                    <div className="col-md-3 mb-2" key={operator.id}>
                                        <div className="card" style={{overflow:"hidden"}}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <img src={require(`../assets/img/technologies/${operator.image}`)} className="" style={{width:"100%", height:"100%"}} alt="Logo operateur"/>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                    <h5 className="card-title text-warning text-bold">{operator.name}</h5>
                                                    <div className="row" style={{marginTop:5}}>
                                                        <Link className="btn btn-outline-primary btn-xs mb-1" to={operator.routeRapportPaymentUrl}>
                                                            <p className="mb-0">Rapport paiement</p>
                                                        </Link>
                                                        <Link className="btn btn-outline-primary btn-xs" to={operator.routeRegularisation}>
                                                            <p className="mb-0">Régularisation paiement</p>
                                                        </Link>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                        <div className="row mt-5 justify-content align-items-center">
                            {userCanUpdateLocalData &&<UpdatePaymentLocalData 
                                onRefresh={incrementVersion}
                                userCanUpdateLocalData={userCanUpdateLocalData}
                            />}
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