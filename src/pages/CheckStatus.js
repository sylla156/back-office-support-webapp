import React, {useState} from "react";

import {Col, Spinner, Row, Form, Button, InputGroup} from '@themesberg/react-bootstrap';
import AxiosWebHelper from "../utils/axios-helper";

import {APPKEY, TRANSFER_HUB2_STATUS} from "./constante/Const";
import {Redirect} from 'react-router-dom';
import {Routes} from "../routes";
import Hub2TransactionStatus from "../components/Hub2TransactionStatus";
import ProviderTransactionStatus from "../components/ProviderTransactionStatus";
import {useCookies} from 'react-cookie';
import AlertDismissable from "../components/AlertDismissable";

export default () => {

    const [errorData, setErrorData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [hub2Transfer, setHub2Transfer] = useState({});
    const [transferIdSupport, setTransferIdSupport] = useState('');
    const [providerTransfer, setProviderTransfer] = useState({});
    const [shouldLogin, setShouldLogin] = useState(false);

    const [cookies] = useCookies(["token", ]);

    const axios = AxiosWebHelper.getAxios();

    const resquestHeaderSupportHub2 = {
        headers: {
            AppKey: APPKEY,
            authenticationtoken: cookies.token
        }
    };

    const checkSupportTransferStatus = ()=> {

        setErrorData(null)
        setIsLoaded(false);
        axios.get(
            TRANSFER_HUB2_STATUS + transferIdSupport,
            resquestHeaderSupportHub2
        )
            .then((result) => {

                setIsLoaded(true);
                setHub2Transfer(result.data.hub2);
                if (result.data.provider) {

                    setProviderTransfer(result.data.provider);
                
                } else{

                    setProviderTransfer({});
                
                }
            
            })
            .catch(error => {

                setIsLoaded(true);
                onFilters();
                if (error.response) {

                    if (error.response.status === 401) {

                        setShouldLogin(true);
                    
                    } else {

                        setErrorData(error.response.data.message);
                    
                    }
                
                }
            
            });
    
    }

    const onFilters = ()=>{

        setTransferIdSupport("");
        setProviderTransfer({});
        setHub2Transfer({});
    
    };

    if(!cookies.token) {

        return <Redirect to={Routes.Signin.path} />;
    
    }

    if (shouldLogin) {

        return <Redirect to={Routes.Signin.path} />;
    
    }
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
            <div >
                <AlertDismissable message={errorData} variant="danger" show={!!errorData} onClose={()=>setErrorData(null)} />
                <div>
      
                </div>
            </div>

            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">

                    <Col xs={12} md={6} lg={6} className="mb-2 px-2">
                        <InputGroup>
                            <InputGroup.Text>

                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Transaction id" value={transferIdSupport} onChange={event => setTransferIdSupport(event.target.value)} />

                            {/* <Button variant="outline-primary" size="sm" className="px-5" onClick={checkHub2Status}>Vérifier</Button> */}
                            <Button variant="outline-primary" className="mx-2" type="button" onClick={onFilters}>Effacer</Button>
                            <Button className="ml-3" variant="primary" type="button" onClick={checkSupportTransferStatus} >Vérifier</Button>
                        </InputGroup>

                    </Col>
                </Row>
            </div>

            {isLoaded ? <Row>
                <Col xs={12} xl={6} >
                    <Hub2TransactionStatus hub2IdResult={hub2Transfer} hub2ErroData={errorData}/>
                </Col>
                <Col xs={12} xl={6} >
                    <ProviderTransactionStatus providerTransfer={providerTransfer} />
                </Col>
            </Row> : <div className="d-flex justify-content-center">
                <Spinner animation="border " size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>}


        </>
    );

};
