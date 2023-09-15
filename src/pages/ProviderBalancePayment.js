import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Routes } from "../routes";
import AxiosWebHelper from "../utils/axios-helper";
import { CounterWidget } from "../components/Widgets";
import { APPKEY, PROVIDER_PAYMENT_BALANCE_URL } from "./constante/Const";
import { Spinner } from "@themesberg/react-bootstrap";

export const ProviderBalancePayment = (props) => {
    const provider = props.provider
    const {gatewayId} = provider

    const [isLoaded, setIsLoaded] = useState(true);
    const [providerBalance, setProviderBalance] = useState([]);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [version, setVersion] = useState(0);

    const [cookies] = useCookies(["token",]);
    const axios = AxiosWebHelper.getAxios();

    const getProviderBalancePayment = () => {
        setIsLoaded(false);
        axios
            .get(PROVIDER_PAYMENT_BALANCE_URL + "/" + gatewayId, {
                headers: {
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token,
                },
                params:{
                    id: gatewayId
                }
            }).then((result) => {
                setIsLoaded(true);
                setProviderBalance(result.data);
                setVersion();
            }).catch((error) => {
                setIsLoaded(true);
                if (error.response) {
                    if (error.response.status === 401) {
                        setShouldLogin(true);
                    } else {
                        setErrorData(error.response.data.message);
                    }
                }
            })
    }

    const incrementVersion = () => setVersion((currentVersion) => {
        return currentVersion + 1;
    })

    useEffect(() => {
        getProviderBalancePayment();
    }, [gatewayId, version]);

    if (!cookies.token) {
        return <Redirect to={Routes.Signin.path} />
    }

    if (shouldLogin) {
        return <Redirect to={Routes.Signin.path} />
    }

    return(
        <>
            {isLoaded ? (
                <CounterWidget key={providerBalance.id} provider={provider} balance={providerBalance} onRefresh={incrementVersion} />
            ):(
                <div className="d-flex justify-content-center">
                    <Spinner animation="border " size="sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
        </>
    )
}