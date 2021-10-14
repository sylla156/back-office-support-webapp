import React, {useState} from "react";

import {Col, Row, Form, Button, ButtonGroup, InputGroup} from '@themesberg/react-bootstrap';
import base64 from 'base-64';
import axios from 'axios';

import {TransferFormInformForceStatusSourceHub, TransferFormInformForceStatusSourceProvider} from '../components/Forms';
import {FormDialog} from '../components/Dialog';
export default () => {

    const [, setError] = useState(null);
    const [, setIsLoaded] = useState(false);
    const [hub2TransferForce, setHub2TransferForce] = useState({});
    const [idSupportHubForce, setIdSupportHubForce] = useState('');

    const [partnerIdTransactionsForce, setPartnerIdTransactionsForce] = useState('');
    const [providerTransferForce, setProviderTransferForce] = useState({});

    console.log(idSupportHubForce)

    const baseUrlSupportApiHub2 = "https://support-api.hub2.io/";
    const baseUrlUrlInTouch = "/v1/CIHUB4699/check_status";
  

    const resquestHeaderSupportHub2 = {
        headers:{
            "ApiKey":"bD8Yryye98rKpzfBq5jqtfDrRfd5JwP4YGPEbwZTsGMaV3bwD7",
            "environment":"live"
        }
    };

    const checkHub2Status = function() {

        fetch(baseUrlSupportApiHub2 + "transfers/" + idSupportHubForce, resquestHeaderSupportHub2)
            .then(res => res.json())
            .then((result)=>{

                setIsLoaded(true);
                setHub2TransferForce(result);
                console.log(result);
            
            },
            (error)=>{

                setIsLoaded(true);
                setError(error);
            
            }
            )
        console.log("checkHub2Status");
    
    }

    const Username = "MTN";
    const Password = "passer";

    const checkProviderStatus = function() {

        axios.post(
            baseUrlUrlInTouch,
            {
                "partner_id": "",
                "partner_transaction_id": partnerIdTransactionsForce,
                "login_api": "",
                "password_api": ""
            },
            {
                auth:{
                    username:Username,
                    password:Password
                }
            }
        )
            .then((result)=>{

                setProviderTransferForce(result.data);
                setPartnerIdTransactionsForce(true);
                console.log(result);
            
            },
            (error)=>{

                setIsLoaded(true);
                console.log(error.message);
            
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
                                {/* <FontAwesomeIcon icon={faSearch} /> */}
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Source ID HUB2"onChange={event => setIdSupportHubForce(event.target.value)} />
                            <ButtonGroup>
                                <Button variant="outline-primary" size="sm" onClick={checkHub2Status} >Check</Button>
                                {/* <Button variant="outline-primary" size="sm">Export</Button> */}
                            </ButtonGroup>
                        </InputGroup>
                    </Col>
          
           
                    <Col xs={8} md={6} lg={3} xl={4}>
                        <InputGroup>
                            <select className="browser-default custom-select">
                                <option>Choose your option</option>
                                <option value="1">Intouch CI</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                            <InputGroup.Text>
               
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Identifiant" onChange={event => setPartnerIdTransactionsForce(event.target.value)} />
                            <ButtonGroup>
                                <Button variant="outline-primary" type="submit" size="sm" onClick={checkProviderStatus}>Check</Button>
                            </ButtonGroup>
                        </InputGroup>

            
                    </Col>
                </Row>
            </div>

            <Row>
                <Col xs={12} xl={6}>
                    < TransferFormInformForceStatusSourceHub transfer={hub2TransferForce}/>
                </Col>
                <Col xs={12} xl={6}>
                    <TransferFormInformForceStatusSourceProvider intouch={providerTransferForce} />
                </Col>

            </Row>
            {/* <div className="btn-toolbar">
          <Col md={6} className="mb-3">
            <ButtonGroup>
              <Button variant="outline-primary" size="sm"></Button>
              <Button variant="danger" size="lg">Force Status</Button>
            </ButtonGroup>
          </Col>
      </div> */}

            <FormDialog buttonForce={hub2TransferForce}/>
        </>
    );

};
