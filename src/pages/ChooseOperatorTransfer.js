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
import { UpdateLocalData } from "../components/statusConfirmation/UpdateLocalData";

export default () => {
    const [isLoaded, setIsLoaded] = useState(true);
    const [dateNow, setDateNow] = useState(new Date());
    const [data, setData] = useState([
        {
            id:1,
            name:"Orange CI",
            image:"orange.jpg",
            order:0,
            routeRapportTransfer:"/orange-report-transfer",
            routeRegularisation:"/orange-transfer/regularised",
        },
        {
            id:2,
            name:"Wave CI",
            image:"wave.jpg",
            order:0,
            routeRapportTransfer:"/wave-report-transfer",
            routeRegularisation:"/wave-transfer/regularised",
        },
        {
            id:3,
            name:"Moov CI",
            image:"moov.jpg",
            order:0,
            routeRapportTransfer:"/moov-report-transfer",
            routeRegularisation:"/moov-transfer/regularised",
        },
        {
            id:4,
            name:"Intouch",
            image:"intouch.jpg",
            order:0,
            routeRapportTransfer:"/intouch-report-transfer",
            routeRegularisation:"/intouch-transfer/regularised",
        },
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
                                    <div className="col-md-3" key={operator.id}>
                                        <div className="card" style={{overflow:"hidden"}}>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <img src={require(`../assets/img/technologies/${operator.image}`)} className="" style={{width:"100%", height:"100%"}} alt="Logo operateur"/>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                    <h5 className="card-title text-warning text-bold">{operator.name}</h5>
                                                    <div className="row" style={{marginTop:5}}>
                                                        <Link className="btn btn-outline-primary btn-xs mb-1" to={operator.routeRapportTransfer}>
                                                            <p className="mb-0">Rapport transfert</p>
                                                        </Link>
                                                        <Link className="btn btn-outline-primary btn-xs mb-1" to={operator.routeRegularisation}>
                                                            <p className="mb-0">Régularisation transfert</p>
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
                            <h3>Mise à jour des données de transfert en local</h3>
                            {userCanUpdateLocalData && <UpdateLocalData 
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