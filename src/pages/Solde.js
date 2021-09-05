
import React, { useState, useEffect } from "react";
import { Col, Row, Spinner } from '@themesberg/react-bootstrap';

import { CounterWidget } from "../components/Widgets";
import AxiosWebHelper from "../utils/axios-helper";

export default () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [balanceList, setBalanceList] = useState([]);

  const baseUrlSolde = "/balances";
  const axios = AxiosWebHelper.getAxios();

  const checkSolde = ()=>{
    setIsLoaded(false);

    console.log("isLoaded value : "+isLoaded);
    
    axios.get(baseUrlSolde)
    .then((result) => {
      setIsLoaded(true);
      console.log("isLoaded value : " + isLoaded);
      setBalanceList(result.data);
      console.log("In then")
      console.log(result.data);
    })
    .catch( error => {
      setIsLoaded(true);

      console.log(error);
      console.log("isLoaded value : " + isLoaded);
      setError(error);
    });
   
  };


  useEffect(()=>{
    checkSolde();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     checkSolde();
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);
  
  return (
    <>

       
      {isLoaded ?  <Row className="">
        {balanceList.map((balance)=>(
          <Col key={balance.id} xs={12} sm={6} md={5} lg={4}   className="mb-4 border-warning ">
            { console.log("isLoaded value : "+isLoaded)}
            <CounterWidget key={balance.id} balance= {balance}/>
            </Col>
        ))}
      </Row> : <div className="d-flex justify-content-center">
            <Spinner animation="border " size="sm"  role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
     </div> }
      
    </>
  );
};
