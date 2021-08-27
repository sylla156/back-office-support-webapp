
import React, { useState, useEffect,Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt,faWallet } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets";
import { PageVisitsTable } from '../components/Tables';
import { trafficShares, totalOrders } from "../data/charts";

export default () => {


  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [balanceList, setBalanceList] = useState([]);

  
  const requestHeaderSolde = {
    headers:{
      "ApiKey":"b1413ec5-e76c-4c38-8a1f-38a7a67e0f7c",
      "AuthenticationToken":"00cc25fc-bce5-48f2-a92f-4b14e1df386f"
    }
  }; 

  const baseUrlSolde = "/balances";

  const checkSolde = ()=>{
    
    fetch(baseUrlSolde, requestHeaderSolde)
      .then(res => res.json())
      .then((result) => {
        setBalanceList(result);
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
