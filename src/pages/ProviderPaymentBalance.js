import React, {useState, useEffect} from "react";
import {CounterWidget} from "../components/Widgets";
import AxiosWebHelper from "../utils/axios-helper";
import {APPKEY, PROVIDER_PAYMENT_BALANCE_URL, PROVIDERS_URL} from "./constante/Const";
import {Redirect} from "react-router-dom";
import {Routes} from "../routes";

import {useCookies} from "react-cookie";
import {Col, Row, Spinner} from "@themesberg/react-bootstrap";
import {ProviderBalancePayment} from "./ProviderBalancePayment";

export default()=> {

    const [isLoaded, setIsLoaded] = useState(false);
    const [balanceList, setBalanceList] = useState([]);
    const [providerList, setProviderList] = useState([]);

    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);

    const [cookies] = useCookies(["token", ]);

    const axios = AxiosWebHelper.getAxios();
    // const getBalances = () => {
    //   setIsLoaded(false);
    //   axios
    //     .get(PROVIDER_PAYMENT_BALANCE_URL, {
    //       headers: {
    //         AppKey: APPKEY,
    //         authenticationtoken: cookies.token,
    //       },
    //     })
    //     .then((result) => {
    //       setIsLoaded(true);
    //       setBalanceList(result.data);
    //     })
    //     .catch((error) => {
    //       setIsLoaded(true);
    //       if (error.response) {
    //         if (error.response.status === 401) {
    //           setShouldLogin(true);
    //         } else {
    //           console.log(error.response.data.message);
    //         }
    //       }
    //     });
    // };

    const getProviderList = () => {

        setIsLoaded(false);
        setErrorData(null);
        axios
            .get(PROVIDERS_URL, {
                headers: {
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token,
                },
            }).then((result) => {

                // TODO: This is a temporary fix.
                // Pay-Out accounts should not be displayed on this page.
                // We just filter providers by name and skip those with name contains 'Pay-Out'.
                const providers = result.data;
                const filtered = providers.filter(p => {
                    const haystack = p.name.toLowerCase();
                    return !(haystack.includes('pay-out') || haystack.includes('payout'));
                });

                setIsLoaded(true);
                setProviderList(filtered);
            
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

    useEffect(getProviderList, []);

    if(!cookies.token) {

        return <Redirect to={Routes.Signin.path}/>
    
    }
  
    if (shouldLogin) {

        return <Redirect to={Routes.Signin.path} />;
    
    }

    return (
        <>
            {isLoaded ? (
                <Row className="flex-wrap">
                    {providerList.map((provider) => (
                        <Col
                            key={provider.id}
                            xs={12}
                            sm={6}
                            md={5}
                            lg={4}
                            className="mb-4 border-warning d-flex flex-column"
                        >
                            <ProviderBalancePayment key={provider.id} provider={provider} />
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

}
