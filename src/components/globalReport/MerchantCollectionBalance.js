import React, { useState, useEffect } from "react";
import {
  Col,
  Spinner,
  Row,
} from "@themesberg/react-bootstrap";
import { useCookies } from "react-cookie";
import AxiosWebHelper from "../../utils/axios-helper";
import { APPKEY, BASE_URL_MERCHANT_COLLECTION_BALANCE } from "../../pages/constante/Const";
import { CounterWidget } from "../Widgets";

export const MerchantCollectionBalance = (props) => {
  const version = props.version;

  const [isLoaded, setIsLoaded] = useState(true);
  const [merchantCollectionBalance, setMerchantCollectionBalance] = useState([]);
  const [errorData, setErrorData] = useState(null);
  const [shouldLogin, setShouldLogin] = useState(false);

  const axios = AxiosWebHelper.getAxios();
  const [cookies] = useCookies(["token"]);

  const getMerchantCollectionBalance = () => {
    setIsLoaded(false);
    axios
      .get(BASE_URL_MERCHANT_COLLECTION_BALANCE, {
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setMerchantCollectionBalance(result.data);
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
    getMerchantCollectionBalance();
  }, [version]);


  return (
    <>
     {isLoaded ? <Row className="">
                {merchantCollectionBalance.map((balanceCollection) => (
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
  );
};