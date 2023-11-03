import React, {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {Redirect} from 'react-router-dom'
import {FIRST_PAGE_INDEX, APPKEY, PAGE_SIZE, MERCHANTS_LIVE_FEES_URL, MerchantsCountry, MerchantFeeType, MerchantFeeTransactionType, merchantFeeProviders, MerchantFeeMethod} from '../constante/Const'
import {Spinner, Row, Form, Button, InputGroup, Col} from '@themesberg/react-bootstrap'
import AxiosWebHelper from '../../utils/axios-helper'
import {Routes} from '../../routes'
import {MerchantsLiveFees} from './components/MerchantsLiveFeesList'
import AlertDismissable from '../../components/AlertDismissable'
import csvDownload from 'json-to-csv-export'

export default () => {

    const [errorData, setErrorData] = useState(null);
    const [isLoadedCSV, setIsLoadedCSV] = useState(true);
    const [errorDataCSV, setErrorDataCSV] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [count, setCount] = useState(undefined);
    const [merchantFeesList, setMerchantFeesList] = useState([]);
    const [type, setType] = useState(undefined);
    const [merchantId, setMerchantId] = useState(undefined);
    const [transactionType, setTransactionType] = useState(undefined);
    const [country, setCountry] = useState(undefined);
    const [method, setMethod] = useState(undefined);
    const [provider, setProvider] = useState(undefined);

    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);

    const [cookies] = useCookies(["token", "user"]);
    const axios = AxiosWebHelper.getAxios();
    const userCanDeleteMerchantFee = cookies.user.canDeleteMerchantFee

    const onPageChange = (page = 0) => {

        setCurrentPage(page);
    
    };

    const incrementVersion = () =>
        setVersion((currentVersion) => {

            console;
            return currentVersion + 1;
        
        });
    
    const filterData = (data) => {

        const filteredData = data.map(item => {

            const {id, policies, createdAt, isDeleted, ...filteredItem} = item;
            return filteredItem;
        
        });
        
        return filteredData;
    
    };

    const fields = ['value', 'type', 'transactionType', 'merchantId', 'method', 'country', 'provider']
    const dataToConvert = {
        data: filterData(merchantFeesList),
        filename: 'merchant_fees_live',
        delimiter: ',',
        headers: fields
    }

    const getMerchantsFeesLive = () => {

        setIsLoaded(false);
        axios.get(
            MERCHANTS_LIVE_FEES_URL,
            {
                headers: {
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token
                },
                params: {
                    type,
                    transactionType,
                    provider,
                    method,
                    merchantId,
                    country
                }
            }
        ).then((result) => {

            setMerchantFeesList(result.data);
            setCount(result.data.length);
            console.log(result.data);
            setIsLoaded(true);
        
        }).catch((error) => {

            setIsLoaded(true);
            if (error.response) {

                if (error.response.status === 401) {

                    setShouldLogin(true);
                
                } else {

                    console.log(error.response.data.message);
                
                }
            
            }
        
        })
    
    }

    useEffect(() => {

        getMerchantsFeesLive();
    
    }, [currentPage, version]);

    if (!cookies.token) {

        return <Redirect to={Routes.Signin.path} />
    
    }
    if (shouldLogin) {

        return <Redirect to={Routes.Signin.path} />;
    
    }

    return (
        <div>
            <div className="align-items-center d-flex flex-wrap">
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Select
                            value={type}
                            onChange={(event) => {

                                setType(event.target.value);
                                console.log(event.target.value);
                            
                            }}
                        >
                            <option key="0" value={undefined}>
                                Tous
                            </option>
                            {MerchantFeeType.map((item) => (
                                <option key={item.id} value={item.type}>
                                    {item.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Identifiant du marchand</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Id marchand"
                            value={merchantId}
                            onChange={(event) => setMerchantId(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="transactionType">
                        <Form.Label>Type de transaction</Form.Label>
                        <Form.Select
                            value={transactionType}
                            onChange={(event) => {

                                setTransactionType(event.target.value);
                            
                            }}
                        >
                            <option>
                                Tous
                            </option>
                            {MerchantFeeTransactionType.map((item) => (
                                <option key={item.id} value={item.type}>
                                    {item.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="provider">
                        <Form.Label>Provider</Form.Label>
                        <Form.Select
                            value={provider}
                            onChange={(event) => {

                                setProvider(event.target.value);
                            
                            }}
                        >
                            <option>
                                Tous
                            </option>
                            {merchantFeeProviders.map((item) => (
                                <option key={item.id} value={item.type}>
                                    {item.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="method">
                        <Form.Label>Méthode</Form.Label>
                        <Form.Select
                            value={method}
                            onChange={(event) => {

                                setMethod(event.target.value);
                            
                            }}
                        >
                            <option>
                                Tous
                            </option>
                            {MerchantFeeMethod.map((item) => (
                                <option key={item.id} value={item.type}>
                                    {item.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="country">
                        <Form.Label>Pays</Form.Label>
                        <Form.Select
                            value={country}
                            onChange={(event) => {

                                setCountry(event.target.value);
                            
                            }}
                        >
                            <option>
                                Tous
                            </option>
                            {MerchantsCountry.map((item) => (
                                <option key={item.id} value={item.country}>
                                    {item.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>


                <Col xs={12} md={3} lg={6} className="px-2 mt-4">
                    <div className="mt-3 mb-4">
                        <Button
                            className="mx-2"
                            variant="primary"
                            type="button"
                            onClick={() => getMerchantsFeesLive()}
                        >
                            Filtrer
                        </Button>
                        <Button
                            className="mx-2"
                            variant="primary"
                            type="button"
                            onClick={() => csvDownload(dataToConvert)}
                        >
                            Exporter
                        </Button>
                    </div>
                </Col>
            </div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
            <div>
                <AlertDismissable
                    message={errorData}
                    variant="danger"
                    show={!!errorData}
                    onClose={() => setErrorData(null)}
                />
                <div></div>
            </div>
            {
                isLoaded ?
                    <Row>
                        <MerchantsLiveFees
                            key={version}
                            listInfo={merchantFeesList}
                            count={count}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                            onRefresh={incrementVersion}
                            userCanDeleteMerchantFee={userCanDeleteMerchantFee}
                        />
                    </Row> :
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border " size="sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
            }
        </div>
    )

}
