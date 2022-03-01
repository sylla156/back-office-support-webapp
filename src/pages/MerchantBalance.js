import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {Routes} from "../routes";
import {useCookies} from "react-cookie";
import AxiosWebHelper from "../utils/axios-helper";
import {CounterWidgetMerchantBalance} from "../components/Widgets";
import {APPKEY, BASEURLMERCHANTBALANCE} from "./constante/Const";
import {Col, Row, Spinner} from "@themesberg/react-bootstrap";
import AlertDismissable from "../components/AlertDismissable";

export default () => {

    const [isLoaded, setIsLoaded] = useState(true);
    const [merchantBalanceList, setMerchantBalanceList] = useState([]);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);

    const [cookies] = useCookies(["token"]);

    // const baseUrlSolde = "/balances";
    const axios = AxiosWebHelper.getAxios();

    const checkMerchantBalance = () => {

        setIsLoaded(false);

        console.log("isLoaded value : " + isLoaded);

        console.log("authenticationtokend value : " + cookies.token);

        console.log(" In check solde ");

        axios
            .get(BASEURLMERCHANTBALANCE, {
                headers: {
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token,
                },
            })
            .then((result) => {

                setIsLoaded(true);
                console.log("isLoaded value : " + isLoaded);
                setMerchantBalanceList(result.data);
                console.log("In then");
                console.log(result.data);
            
            })
            .catch((error) => {

                setIsLoaded(true);
                console.log("In the catch");
                if (error.response) {

                    console.log("In catch error solde", error.response.data);
                    // console.log(error.response.data);
                    console.log("Status code error : " + error.response.status);
                    // console.log(error.response.headers);
                    if (error.response.status === 401) {

                        setShouldLogin(true);
                    
                    } else {

                        console.log(error.response.data.message);
                        setErrorData(error.response.data.message);
                    
                    }
                
                }
            
            });
    
    };

    useEffect(() => {

        checkMerchantBalance();
    
    }, []);

    if (shouldLogin) {

        return <Redirect to={Routes.Signin.path} />;
    
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
            <div>
                <AlertDismissable
                    message={errorData}
                    variant="danger"
                    show={!!errorData}
                    onClose={() => setErrorData(null)}
                />
                <div></div>
            </div>
            {isLoaded ? (
                <Row>
                    {merchantBalanceList.map((merchantBalance) => (
                        <Col xs={12} sm={6} md={5} lg={4} className="mb-4 border-warning ">
                            <CounterWidgetMerchantBalance
                                key={merchantBalance.id}
                                merchantBalance={merchantBalance}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border " size="sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
        </>
    );

};
