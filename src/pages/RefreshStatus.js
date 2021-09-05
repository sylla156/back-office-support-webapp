import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { TransactionsTable } from "../components/Tables";
import {FormDialogRefreshStatus} from '../components/Dialog';

const momentTz = require('moment-timezone');
export default () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hub2RefreshStatus, setHub2refreshStatus] = useState([]);

  const [inputSearchFrom, setInputSearchFrom] = useState('');
  const [inputSearchTo, setInputSearchTo] = useState('');
  
  const resquestHeaderSupportHub2 = {
    headers:{
      "ApiKey":"bD8Yryye98rKpzfBq5jqtfDrRfd5JwP4YGPEbwZTsGMaV3bwD7",
      "Environment":"live"
    }
  };

  

  console.log("input Search From "+inputSearchFrom +" "+typeof(inputSearchFrom));
  console.log("input Search To "+inputSearchTo +" "+typeof(inputSearchTo));

  //const inputSearchFromDate = new Date(inputSearchFrom);
  

  // formattage de la date dans la partie refresh status
  const inputSearchFromDate = momentTz.tz(inputSearchFrom, "DD/MM/YYYY HH:mm:ss",'en-US' ).toISOString();

  console.log("input Search From Date [tdkf]: "+ inputSearchFromDate +" "+ typeof(inputSearchFromDate));


  const inputSeachToDate = momentTz.tz(inputSearchTo, "DD/MM/YYYY HH:mm:ss", 'en-US').toISOString();
  console.log("input Search To Date [tdkf]: "+ inputSeachToDate +" "+ typeof(inputSeachToDate));

  


  const baseUrlRefreshStatus = "https://support-api.hub2.io/transfers";



  const baseUrlRefreshStatusWithParams = baseUrlRefreshStatus+"?from="+inputSearchFrom+"&isForceStatus="+false+"&merchantId="+"&status=pending"+"&to="+inputSearchTo; // change status = failed to status=pending

  console.log("Base url with params : "+baseUrlRefreshStatusWithParams);
  const checkRefreshStatus = function() {
    fetch(baseUrlRefreshStatusWithParams,resquestHeaderSupportHub2)
       .then(res => res.json())
       .then((result)=>{
        setIsLoaded(true);
        setHub2refreshStatus(result);
        console.log("result")
        console.log(result);
       },
       (error)=>{
        setIsLoaded(true);
        setError(error);
        console.log("error: " + error);
       }
      )
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
          <InputGroup>
              <InputGroup.Text>
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" onChange={event => setInputSearchFrom(event.target.value)} />
            </InputGroup>
          </Col>
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
                <InputGroup.Text>
                </InputGroup.Text>
                <Form.Control type="text" placeholder="Search" onChange={event=>setInputSearchTo(event.target.value)} />
              </InputGroup>
          </Col>

          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
                <ButtonGroup>
              <Button variant="outline-primary" size="sm" onClick={checkRefreshStatus}>Check</Button>
              
              </ButtonGroup>
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <TransactionsTable tableTransfer={hub2RefreshStatus}/>

      <FormDialogRefreshStatus formTransfer={hub2RefreshStatus}/>
    </>
  );
};
