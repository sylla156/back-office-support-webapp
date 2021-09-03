
import React, { useState, useEffect,Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt,faWallet } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Spinner,Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets";
import { PageVisitsTable } from '../components/Tables';
import { trafficShares, totalOrders } from "../data/charts";
import { APPKEY } from "./constante/Const";

export default () => {


  function refreshPage() {
    checkSolde();
  }

  window.setTimeout(()=>{
    refreshPage()
  },600000)

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [balanceList, setBalanceList] = useState([]);

  
  // const requestHeaderSolde = {
  //   headers:{
  //     "AppKey":APPKEY,
  //   }
  // }; 

  const baseUrlSolde = "/balances";

  const checkSolde = ()=>{
    setIsLoaded(false);
    console.log("isLoaded value : "+isLoaded);
    fetch(baseUrlSolde)
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        console.log("isLoaded value : "+isLoaded);
        setBalanceList(result);
        console.log("In then")
        console.log(result);
      },
        (error) => {
          setIsLoaded(true);
          console.log("isLoaded value : "+isLoaded);
          setError(error);
        }
      )
   
  };


  useEffect(()=>{
    checkSolde();
  }, [])
  
  return (
    <>

       
      {isLoaded ?  <Row className="">
        {console.log("solde value")}
        {console.log(balanceList)}
        { console.log("isLoaded value : "+isLoaded)}
        {balanceList.map((balance)=>(
          <Col xs={12} sm={6} md={5} lg={4}   className="mb-4 border-warning ">
            { console.log("isLoaded value : "+isLoaded)}
            <CounterWidget key={balance.id} balance= {balance}/>
            </Col>
        ))}
      </Row> : <div class="d-flex justify-content-center">
            <Spinner animation="border " size="sm"  role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
     </div> }
      
    </>
  );
};
