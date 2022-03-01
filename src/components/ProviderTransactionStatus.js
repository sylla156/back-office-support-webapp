import React from 'react';
import {Col, Row, Card, Badge} from '@themesberg/react-bootstrap';
import ProviderTransferFedapay from './providerTransfer/fedapay/ProviderTransferFedapay';
import ProviderTransferGtBank from './providerTransfer/gtBank/ProviderTransferGtBank';
import ProviderTransferIntouch from './providerTransfer/intouch/ProviderTransferIntouch';
import {providerTransferGatewayId} from './providerTransfer/constante/providerEnum';

export default function ProviderTransactionStatus(props) {

    const {providerTransfer: {gatewayId, status, requireCheckStatus, transferId, logo}} = props;

    const checkProvider = props.providerTransfer;


    console.log("props value " + props);
    console.log("provider value " + props.providerTransfer);

    const processorData = props.providerTransfer.processorData;


    const failureCause = props.providerTransfer.failureCause;
    let cause;
    let message;

    if (failureCause) {

        console.log("failureCause define");
        cause = failureCause.cause;
        message = failureCause.message;
    
    }

    const statusVariant = status === 'successful' || status === 'success' || status === "SUCCESSFUL" || status === 'SUCCESS'
        ? 'success'
        : status === 'pending' || status === 'Pending' || status === 'PENDING'
            ? 'warning'
            : status === 'FAILLED' || status === 'failed' || status === 'FAILED' || status === 'failled' ? 'danger' : 'primary'


    const requireCheckStatusVariant = String(requireCheckStatus) === "true" ? 'primary' : 'primary';

    return (
        <>
            {checkProvider && <Card border="light" className="shadow-sm">

                <Card.Body>
                    {logo ? <img className="p-2 d-xl-flex rounded" src={require("../assets/img/technologies/" + logo).default} width="100" style={{position: 'absolute', top: 12, left: 14}} /> :
                        <img className="p-2 d-xl-flex rounded" src={require("../assets/img/technologies/question.jpg").default} width="100" style={{position: 'absolute', top: 12, left: 14}} />
                    }
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2 ">
                            <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}} >
                gatewayId
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {gatewayId}
                            </span>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                status
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <Badge bg={`${statusVariant}`}>
                                <span className="h6 mb-0 text-start text-light">
                                    {status}
                                </span>
                            </Badge>
                        </Col>
                    </Row>

                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                requireCheckStatus
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <Badge bg={`${requireCheckStatusVariant}`}>
                                <span className="h6 mb-0 text-start text-light">
                                    {requireCheckStatus === undefined ? "" : String(requireCheckStatus)}
                                </span>
                            </Badge>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                transferId
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {transferId}
                            </span>
                        </Col>
                    </Row>
                </Card.Body>

                {/* -------------------------------------- */}

                <h5 className="mb-0 text-justify" style={{paddingLeft: 20}}>Processor Data</h5>
                <hr style={{borderTop: "1px double #111", marginRight: 30, marginLeft: 20, marginTop: 1}} />

                {gatewayId === providerTransferGatewayId.FEDAPAY ? <ProviderTransferFedapay providerTransferFedapay={processorData} /> : ""}

                {gatewayId === providerTransferGatewayId.GTBANKCI ? <ProviderTransferGtBank providerTransferGtBank={processorData} /> : ''}

                {gatewayId === providerTransferGatewayId.INTOUCHSNORANGELIVE || providerTransferGatewayId.INTOUCHCIORANGELIVE || providerTransferGatewayId.INTOUCHCIMOOVLIVE || providerTransferGatewayId.INTOUCHGNORANGELIVE ? <ProviderTransferIntouch providerTransferIntouch={processorData} /> : ''}


                {/* ------------------------------- */}
                <h5 className="mb-0 text-justify" style={{paddingLeft: 20}}>Failure cause</h5>
                <hr style={{borderTop: "1px double #111", marginRight: 30, marginLeft: 20, marginTop: 1}} />
                {failureCause && <Card.Body style={{marginTop: -30}}>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2 ">
                            <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                cause
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mb-0 text-start">
                                {cause}
                            </span>
                        </Col>
                    </Row>
                    <Row className="d-block d-xl-flex align-items-center">
                        <Col className="ms--2">
                            <h4 className="h6 mb-0 text-end" style={{color: "#8a8a86"}}>
                message
                            </h4>
                        </Col>

                        <Col className="ms--2">
                            <span className="h6 mt-0 text-start">
                                {message}
                            </span>
                        </Col>
                    </Row>
                </Card.Body>}
        
            </Card>

            }


        </>
    )

}


{ /* <Card border="light" className="shadow-sm border-warning">
<Card.Body>
    <Row className="d-block d-xl-flex align-items-center">
    <Col xl={3} className="text-center d-flex align-items-center justify-content-center mb-3 mb-xl-0">
        <img className="mb-4 rounded mx-auto d-block" src={require("../assets/img/technologies/intouch.jpg").default} width="80"/> 
    </Col>

    <Col xs={12} xl={9} className="px-xl-0">
    <Form.Group id="firstName">
        <Form.Label>Transaction Id : {transactionId} </Form.Label><br/>
        <Form.Label></Form.Label>
      </Form.Group>
     <Form.Group id="firstName">
        <Form.Label>Réference Hub2 : </Form.Label><br/>
        <Form.Label></Form.Label>
      </Form.Group>


      <Form.Group id="firstName">
        <Form.Label>Status : {status} </Form.Label><br/>
        <Form.Label></Form.Label>
      </Form.Group>
      
      <Form.Group id="firstName">
        <Form.Label>Montant : {amount} {currency} </Form.Label><br/>
        <Form.Label></Form.Label>
      </Form.Group>
      <Form.Group id="firstName">
        <Form.Text>Description : </Form.Text><br/>
        <Form.Label></Form.Label>
      </Form.Group>
      <Form.Group id="firstName">
        <Form.Text>Date de transaction : {transactionDateFormated}</Form.Text><br/>
        <Form.Label></Form.Label>
      </Form.Group>
      
    
    </Col>
    
    </Row>
    
</Card.Body>
</Card> */ }
