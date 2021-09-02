
import React, { useState, useEffect,Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt,faWallet } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

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
  },900000)

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
    
    fetch(baseUrlSolde)
      .then(res => res.json())
      .then((result) => {
        setBalanceList(result);
        console.log("In then")
        console.log(result);
      },
        (error) => {
          
          setError(error);
        }
      )
   
  };


  useEffect(()=>{
    checkSolde();
  }, [])
  
  return (
    <>

        <Row className="">
        {console.log("solde value")}
        {console.log(balanceList)}
        {balanceList.map((balance)=>(
          <Col xs={12} sm={6} md={5} lg={4}   className="mb-4 border-warning ">
            <CounterWidget key={balance.id} balance= {balance}/>
            </Col>
        ))}
      </Row>
      
      
    </>
  );
};
