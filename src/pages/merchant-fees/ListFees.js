import {format} from 'date-fns'
import React, {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {Redirect} from 'react-router-dom'
import {FIRST_PAGE_INDEX, APPKEY, PAGE_SIZE, MERCHANTS_FEES_URL, MerchantsCountry, MerchantFeeType, MerchantFeeTransactionType, merchantFeeProviders, MerchantFeeMethod} from '../constante/Const'
import AlertDismissable from '../../components/AlertDismissable'
import {Col, Spinner, Row, Form, Button, InputGroup} from '@themesberg/react-bootstrap'
import AxiosWebHelper from '../../utils/axios-helper'
import {Routes} from '../../routes'
import {MerchantsFeesList} from './components/MerchantsFeesList'
import {AddMerchantsFees} from './components/AddMerchantsFees'

export default () => {

    const [errorData, setErrorData] = useState(null);
    const [isLoadedCSV, setIsLoadedCSV] = useState(true);
    const [errorDataCSV, setErrorDataCSV] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [count, setCount] = useState(undefined);
    const [merchantFeesList, setMerchantFeesList] = useState([]);
    const [type, setType] = useState("Tous");
    const [merchantId, setMerchantId] = useState(undefined);
    const [transactionType, setTransactionType] = useState("Tous");
    const [valueMin, setValueMin] = useState(undefined);
    const [valueMax, setValueMax] = useState(undefined);
    const [country, setCountry] = useState("Tous");
    const [method, setMethod] = useState("Tous");
    const [provider, setProvider] = useState("Tous");
    const [hasBeenApplied, setHasBeenApplied] = useState(false);
    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);

    const [cookies] = useCookies(["token", "user"]);
    const axios = AxiosWebHelper.getAxios();

    const userCanUpdateLocalData = cookies.user?.canUpdateCachedTransaction;
    // const userCanApplyMerchantFees = cookies.user.email === "regis.animan@hub2.io"
    const userCanApplyMerchantFees = cookies.user.canApplyMerchantFee
    const userCanCreateMerchantFees = cookies.user.canAddMerchantFee


    const onPageChange = (page = 0) => {

        setCurrentPage(page);
    
    };

    const incrementVersion = () =>
        setVersion((currentVersion) => {

            console;
            return currentVersion + 1;
        
        });

    const onClearFilters = () => {

        setHasBeenApplied(false)
        setCountry("CI");
    
    };

    const getMerchantsFees = () => {

        setIsLoaded(false)
        setErrorData(null)

        axios
            .get(MERCHANTS_FEES_URL, {
                params: {
                    type,
                    merchantId,
                    transactionType,
                    country,
                    method,
                    hasBeenApplied,
                    provider,
                    page: currentPage,
                    perPage: PAGE_SIZE
                },
                headers: {
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token
                }
            }).then((result) => {

                setIsLoaded(true)
                setMerchantFeesList(result.data.result)
                setCount(result.data.count)
            
            }).catch((error) => {

                setIsLoaded(true)
                if (error.response) {

                    if (error.response.status === 401) {

                        setShouldLogin(true);
                    
                    } else {

                        setErrorData(error.response.data.message);
                    
                    }
                
                }
            
            })
    
    }

    useEffect(() => {

        getMerchantsFees()
    
    }, [currentPage, version]);

    if (!cookies.token) {

        return <Redirect to={Routes.Signin.path} />
    
    }
    if (shouldLogin) {

        return <Redirect to={Routes.Signin.path} />;
    
    }

    return (
        <div>
            {userCanCreateMerchantFees && <AddMerchantsFees onRefresh={incrementVersion} />}
            <div className='mb-3'></div>
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
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="hasBeenApply">
                        <Form.Label>HasBeenApply</Form.Label>
                        <Form.Select
                            value={hasBeenApplied}
                            onChange={(event) => {

                                setHasBeenApplied(event.target.value);
                            
                            }}
                        >
                            <option value={true}>Frais appliqués</option>
                            <option value={false}>Frais non appliqués</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={3} lg={6} className="px-0 mt-1">
                    <div className="mt-3 mb-4">
                        <Button
                            className="mx-2"
                            variant="primary"
                            type="button"
                            onClick={() => getMerchantsFees()}
                        >
                            Filtrer
                        </Button>
                    </div>
                </Col>
            </div>
            <div className="mb-4"></div>
            {
                isLoaded ?
                    <Row>
                        <MerchantsFeesList
                            key={version}
                            listInfo={merchantFeesList}
                            count={count}
                            userCanApplyMerchantFees={userCanApplyMerchantFees}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                            onRefresh={incrementVersion}
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
