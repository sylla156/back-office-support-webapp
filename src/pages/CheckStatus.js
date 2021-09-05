import React, { useState, useEffect, Component } from "react";

import { Col, Row, Form, Button, Spinner, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import base64 from 'base-64';
import AxiosWebHelper from "../utils/axios-helper";



import Hub2TransactionStatus from "../components/Hub2TransactionStatus";
import ProviderTransactionStatus from "../components/ProviderTransactionStatus";
import axios from "axios";

export default () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLoadedProvider, setIsLoadedProvider] = useState(true);
  const [items, setItems] = useState([]);
  const [hub2Transfer, setHub2Transfer] = useState({});
  const [idSupportHub, setIdSupportHub] = useState('');

  const [partnerIdTransactions, setPartnerIdTransactions] = useState('');
  const [providerTransfer, setProviderTransfer] = useState({});

  const [selectOptionsProvider, setSelectOptionsProvider] = useState('');


  console.log("isLoaded before : " + isLoaded);

  const baseUrlSupportApiHub2 = "/transfers-status/hub2/";

  

 

 

  const resquestHeaderSupportHub2 = {
    headers: {
      "ApiKey": "b1413ec5-e76c-4c38-8a1f-38a7a67e0f7c",
      "AuthenticationToken":"00cc25fc-bce5-48f2-a92f-4b14e1df386f"
    }
  };

  console.log("id enter : " +idSupportHub);

  const checkHub2Status = function () {
    setIsLoaded(false);
    axios.get(baseUrlSupportApiHub2 + idSupportHub, resquestHeaderSupportHub2)
      .then((result) => {
        setIsLoaded(true);
        console.log("isLoaded in checkHub2Status: " + isLoaded);
        setHub2Transfer(result.data);
        console.log(result);
      })
      .catch( error => {
        setIsLoaded(true);
        setError(error);
      });
  }

  const takeProviderByTheSelectOptionValue = (value)=>{

    var baseUrlUrlProvider="";
    var provider = value;
    switch(provider){
      case "Intouch":
        return baseUrlUrlProvider = " /transfers-status/"+provider+"/ci/"+partnerIdTransactions;
      
      case "Orange":
        return baseUrlUrlProvider = " /transfers-status/"+provider+"/ci/"+partnerIdTransactions;
    }
  };

  const resquestHeaderProvider = {
    headers: {
      "ApiKey": "b1413ec5-e76c-4c38-8a1f-38a7a67e0f7c",
      "AuthenticationToken":"00cc25fc-bce5-48f2-a92f-4b14e1df386f"
    }
  };

  console.log("Fournisseur api provider url by the takeProviderByTheSelectOptionValue : "+takeProviderByTheSelectOptionValue(selectOptionsProvider));

  // const Username = "39b181301fc4a7b50c24177d6c7e12b0";
  // const Password = "3f74503792857dbd023663d111681842";
  const Username = "MTN";
  const Password = "passer";

  //setProviderTransfer
  const checkProviderStatus = function () {
    fetch(
      //baseUrlUrlProvider,
      takeProviderByTheSelectOptionValue(selectOptionsProvider),
      resquestHeaderProvider,
    )
    .then(res => res.json())
    .then((result)=>{
      setProviderTransfer(result)
      console.log(result)
    },
    (error) => {
      setError(error);
    })
  }

  

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">

      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">

          <Col xs={8} md={6} lg={3} xl={6}>
            <InputGroup>
              <InputGroup.Text>

              </InputGroup.Text>
              <Form.Control type="text" placeholder="Transaction id" onChange={event => setIdSupportHub(event.target.value)} />
            
              <Button variant="outline-primary" size="sm" className="px-5" onClick={checkHub2Status}>Vérifier</Button>
            </InputGroup>
            
          </Col>

          <Col xs={8} md={2} lg={1} xl={6}>
            <InputGroup>
              <Form.Select aria-label="Default select example" defaultValue="Intouch" onChange={event => setSelectOptionsProvider(event.target.value)}>
                  <option value="Intouch">Intouch CI</option>
                  <option value="Orange">Orange CI</option>
                  <option value="Mtn">Mtn CI</option>
               </Form.Select> 
              <InputGroup.Text>

              </InputGroup.Text>
              <Form.Control type="text" placeholder="Transaction Id" onChange={event => setPartnerIdTransactions(event.target.value)} />
              <Button variant="outline-primary" type="submit" size="sm" className="px-5" onClick={checkProviderStatus}>Vérifier</Button>
            </InputGroup>


          </Col>

        </Row>
      </div>

      <Row>
        <Col xs={12} xl={6} >
        {console.log("isLoaded in balise : " + isLoaded)}
          {/* {isLoaded ? < TransferFormInformSourceHub transfer={hub2Transfer} /> : <Spinner animation="grow" sm/>} */}
           
          {console.log("hub 2 value id ")}
          {console.log(hub2Transfer)}
          <Hub2TransactionStatus hub2IdResult={hub2Transfer}/>
        </Col>
        <Col xs={12} xl={6} >
          {console.log("isLoaded in balise : " + isLoadedProvider)}
          {/* {isLoadedProvider ? <TransferFormInformSourceProvider intouch={providerTransfer} /> : <Spinner animation="grow" xl />} */}
          <ProviderTransactionStatus provider={providerTransfer} />
        </Col>
      </Row>

    </>
  );
};
