import {Col, Row, Spinner} from "@themesberg/react-bootstrap";
import React, {useState, useEffect} from "react";
import {CounterWidget} from "../components/Widgets";
import {APPKEY, BASE_URL_MERCHANT_COLLECTION_BALANCE} from "./constante/Const";
import {useCookies} from "react-cookie";
import AxiosWebHelper from "../utils/axios-helper";
import {Redirect} from "react-router-dom";
import {Routes} from "../routes";

export default () => {

    const [isLoaded, setIsLoaded] = useState(true);
    const [merchantCollectionBalanceList, setMerchantCollectionBalanceList] = useState([]);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);

    const [cookies] = useCookies(["token"]);

    // const baseUrlSolde = "/balances";
    const axios = AxiosWebHelper.getAxios();

    const checkMerchantCollectionBalance = () => {

        setIsLoaded(false);

        console.log("isLoaded value : " + isLoaded);

        console.log(" In check solde ");

        axios
            .get(BASE_URL_MERCHANT_COLLECTION_BALANCE, {
                headers: {
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token,
                },
            })
            .then((result) => {

                setIsLoaded(true);
                console.log("isLoaded value : " + isLoaded);
                setMerchantCollectionBalanceList(result.data);
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

        checkMerchantCollectionBalance();
    
    }, []);

    if (shouldLogin) {

        return <Redirect to={Routes.Signin.path} />;
    
    }

    return (
        <>
            {isLoaded ? <Row className="">
                {merchantCollectionBalanceList.map((balanceCollection) => (
                    <Col key={balanceCollection.id} xs={12} sm={6} md={5} lg={4} className="mb-4 border-warning ">
                        <CounterWidget key={balanceCollection.id} balance={balanceCollection} />
                    </Col>
                ))}
            </Row> : <div className="d-flex justify-content-center">
                <Spinner animation="border " size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>}


        </>
    )

}
