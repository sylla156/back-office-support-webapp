import React from 'react';
import {Col, Row, Card, Badge} from '@themesberg/react-bootstrap';

export default function Hub2TransactionStatus(props) {

    console.log("props hub value")
    console.log(props);
    // check if hub2IdResult esle affiche error
    const {hub2IdResult: {id, status, merchantId, reference, amount, currency, mode, description, createdAt, updatedAt}} = props;


    const destination = props.hub2IdResult.destination;
    let country;
    let type;
    let provider;
    let number;
    let concetaneNumber;
  
    if(destination){

        console.log("destination define")
        country = destination.country;
        type = destination.type;
        provider = destination.provider;
        number = destination.number;

        concetaneNumber = "****" + number;
    
    }
  
    const failureCause = props.hub2IdResult.failureCause;
    let code;
    let message;
  
    if(failureCause){

        console.log("failureCause define");
        code = failureCause.code;
        message = failureCause.message;
    
    }

    const providerData = props.hub2IdResult.providerData;
    let transfer;
    let gatewayId;
    let processorReference;

    // let amountResponse;
    // let gu_transaction_id;
    // let messageResponse;
    // let partner_transaction_id;
    // let recipient_phone_number;
    // let service_id;
    // let statusResponse;
    let providerDataString;

    if(providerData){

        console.log("providerData define");
        gatewayId = providerData.gatewayId;
        processorReference = providerData.processorReference;
        transfer = providerData.transfer;
        console.log(transfer);
        console.log(transfer.response);

        providerDataString = JSON.stringify(providerData, null, 2);
    
    }
  
  
    const createdAtUtc = new Date(createdAt);
    const createdAtFormated = createdAtUtc.toLocaleString('pt-BR');

    const updatedAtUtc = new Date(updatedAt);
    const updatedAtFormated = updatedAtUtc.toLocaleString('pt-BR');

    const statusVariant = status === "successful"
        ? 'success'
        : status === 'Due'
            ? 'warning'
            : status === 'failed' ? 'danger' : 'primary'
    return (
        <>
            <Card border="light" className="shadow-sm ">
       
                <Card.Body> 
                    <img className="p-2 d-xl-flex rounded mx-auto" src={require("../assets/img/technologies/logo_o.png")} width="100" style={{position:'absolute', top:12, left:14}} />
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2 ">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}} >
                  Id
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {id}
                            </span>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  merchantId
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {merchantId}
                            </span>
                        </Col>
                    </Row>

                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  createdAt
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {createdAtFormated == "Invalid Date" ? "" : createdAtFormated}
                            </span>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  updatedAt
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {updatedAtFormated == "Invalid Date" ? "" : updatedAtFormated }
                            </span>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  reference
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {reference}
                            </span>
                        </Col>
                    </Row>

                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  description
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {description}
                            </span>
                        </Col>
                    </Row>

                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  status
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <Badge bg={`${statusVariant}`} >
                                <span className="h6 mb-0 text-start text-light">
                                    {status}
                                </span>
                            </Badge> 
                        </Col>
                    </Row>

                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  amount
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {amount}
                            </span>
                        </Col>
                    </Row>

                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  currency
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {currency}
                            </span>
                        </Col>
                    </Row>

                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  mode
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {mode}
                            </span>
                        </Col>
                    </Row>
            
                </Card.Body>

                {/* ------------------------------- */}
                <h5 className="mb-0 text-justify" style={{paddingLeft:20}}>Destination</h5>
                <hr style={{borderTop: "1px double #111", marginRight:30, marginLeft:20, marginTop:1}} />
                <Card.Body style={{marginTop:-30}} >
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2 ">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  type
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-center">
                                {type}
                            </span>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  country
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-center">
                                {country}
                            </span>
                        </Col>
                    </Row>

                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  provider
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-center">
                                {provider}
                            </span>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center ">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                  number
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 ml-0 text-center ">
                                {concetaneNumber}
                            </span>
                        </Col>
                    </Row>
                </Card.Body>


                {/* ------------------------------- */}
                <h5 className="mb-0 text-justify" style={{paddingLeft:20}}>Failure cause</h5>
                <hr style={{borderTop: "1px double #111", marginRight:30, marginLeft:20, marginTop:1}} />
                <Card.Body style={{marginTop:-30}}>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2 ">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                code
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-center">
                                {code}
                            </span>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                message
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mt-0 text-center">
                                {message}
                            </span>
                        </Col>
                    </Row>
                </Card.Body>
          

                {/* ------------------------------- */}
                <h5 className="mb-0 text-justify" style={{paddingLeft:20}}>Provider data</h5>
                <hr style={{borderTop: "1px double #111", marginRight:30, marginLeft:20, marginTop:1}} />
                <Card.Body style={{marginTop:-30}}>

                    {gatewayId && <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                gatewayId
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-center">
                                {gatewayId}
                            </span>
                        </Col>
                    </Row>}


                    {processorReference && <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color:"#8a8a86"}}>
                processorReference
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-center">
                                {processorReference}
                            </span>
                        </Col>
                    </Row>}

                    {providerData && <Row className="d-block d-xl-flex align-items-center">
            
                        <Col className="ms--2">
                            <div className="text-sm fw-normal p-4 mt-3 rounded border" style={{backgroundColor:"#f5f4f2"}} >
                                <pre className="">
                                    <code>
                                        {providerDataString}
                                    </code>
                                </pre>
                            </div>
                        </Col>
                    </Row>}
            
                </Card.Body>

            </Card>

            {/* <Card border="light" className="shadow-sm text-start">
          <Card.Header className="border-bottom border-light d-flex">
            <div className="px-1 rounded d-block"></div>
            <h5 className="mb-0 text-center" >Destination</h5>
          </Card.Header>
          <Card.Body>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2 ">
                <h4 className="h6 mb-0 text-end">
                  type
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-center">
                mobile_money
                </span>
              </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2">
                <h4 className="h6 mb-0 text-end">
                  country
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-center">
                  sn
                </span>
              </Col>
            </Row>

            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2">
                <h4 className="h6 mb-0 text-end">
                  provider
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-center">
                  orange
                </span>
              </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center ">
              <Col className="ms--2">
                <h4 className="h6 mb-0 text-end">
                  number
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 ml-0 text-center ">
                  6242
                </span>
              </Col>
            </Row>
          </Card.Body>
        </Card> */}


            {/* <Card border="light" className="shadow-sm text-start">
          <Card.Header className="border-bottom border-light d-flex">
            <div className="px-1 rounded d-block"></div>
            <h5 className="mb-0 text-center" >Failure cause</h5>
          </Card.Header>
          <Card.Body>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2 ">
                <h4 className="h6 mb-0 text-end">
                  code
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-center">
                internal_error
                </span>
              </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2">
                <h4 className="h6 mb-0 text-end">
                message
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-center">
                Une erreur interne est survenue. Veuillez réessayer plus tard
                </span>
              </Col>
            </Row>
            
            
          </Card.Body>
        </Card> */}

            {/* <Card border="light" className="shadow-sm text-start">
          <Card.Header className="border-bottom border-light d-flex">
            <div className="px-1 rounded d-block"></div>
            <h5 className="mb-0 text-center" >Provider Data</h5>
          </Card.Header>
          <Card.Body>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2 ">
                <h4 className="h6 mb-0 text-end">
                  Data
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-center">
                amount 216000
                </span>
              </Col>
            </Row>
            <Row className="d-block d-xl-flex align-items-center">
              <Col className="ms--2">
                <h4 className="h6 mb-0 text-end">
                gatewayId
                </h4>
              </Col>

              <Col className="ms--2">
                <span className="h6 mb-0 text-center">
                intouch_mm_sn_orange_live
                </span>
              </Col>
            </Row>
            
            
          </Card.Body>
        </Card> */}

        </>
    )

}

{ /* <Card border="light" className="shadow-sm border-warning">
  <Card.Body>
    <Row className="d-block d-xl-flex align-items-center">
      <Col xl={3} className="text-center d-flex align-items-center justify-content-center mb-3 mb-xl-0">

      </Col>

      <Col xs={12} xl={9} className="px-xl-0">
        <img className="px-1 rounded d-block" src={require("../assets/img/technologies/hub2.jpg")} width="40" />
        <h1>Transaction</h1>
        <Form.Group id="firstName">
          <Form.Label >Transaction Id : {transactionId}</Form.Label><br />
          <Form.Label></Form.Label>
        </Form.Group>
        <Form.Group id="firstName">
          <Form.Label>Reférence marchand : {reference}</Form.Label><br />
          <Form.Label></Form.Label>
        </Form.Group>
        <Form.Group id="firstName">
          <Form.Label>Marchand : {merchantId} {merchantName}</Form.Label><br />
          <Form.Label></Form.Label>
        </Form.Group>

        <Form.Group id="firstName">
          <Form.Label>Status : {status}</Form.Label><br />
          <Form.Label></Form.Label>
        </Form.Group>

        <Form.Group id="firstName">
          <Form.Label>Montant : {amount} {currency}</Form.Label><br />
          <Form.Label></Form.Label>
        </Form.Group>
        <Form.Group id="firstName">
          <Form.Text>Description : {description}</Form.Text><br />
          <Form.Label></Form.Label>
        </Form.Group>
        <Form.Group id="firstName">
          
          <Form.Text className="mb-0">Créé le : {createdAtFormated == null ? "" : createdAtFormated} Modfié le : {updatedAtFormated == null ? "" : updatedAtFormated}</Form.Text><br />
          <Form.Label></Form.Label>
        </Form.Group>

      </Col>

    </Row>

  </Card.Body>
</Card> */ }
