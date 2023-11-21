import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { APPKEY, GET_RETOUR_DE_FONDS_LOGS } from "../constante/Const";
import { useCookies } from "react-cookie";
import AxiosWebHelper from "../../utils/axios-helper";
import { Routes } from "../../routes";
import { TransactionDetails } from "./components/TransactionDetails";
import { format } from "date-fns";
import { ActivityLogs } from "./components/ActivityLogs";
import { Spinner } from "@themesberg/react-bootstrap";

export default (props) => {
    const { rowData } = props.location.state

    const [logs, setLogs] = useState([])
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(["token"]);
    const axios = AxiosWebHelper.getAxios();

    const getLogs = () => {
        axios.get(GET_RETOUR_DE_FONDS_LOGS, {
            headers: {
                AppKey: APPKEY,
                authenticationtoken: cookies.token,
            },
            params: {
                idRetourDeFonds: rowData.id
            }
        }).then((result) => {
            setLogs(result.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            if (error.response.status === 401) {
                setShouldLogin(true);
            } else {
                setErrorData(error.response.data.message);
            }
        })
    }

    useEffect(() => {
        getLogs()
    }, [])

    if (shouldLogin) {
        return <Redirect to={Routes.Signin.path} />
    }

    if (!cookies.token) {
        return <Redirect to={Routes.Signin.path} />
    }

    return (
        <>
            <TransactionDetails rowData={rowData} />
            <ActivityLogs logs={logs} />
        </>
    )
}