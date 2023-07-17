import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'
import { FIRST_PAGE_INDEX, APPKEY, PAGE_SIZE, MERCHANTS_LIVE_FEES_URL, MerchantsCountry } from '../constante/Const'
import { Spinner, Row, Form, Button, InputGroup, Col } from '@themesberg/react-bootstrap'
import AxiosWebHelper from '../../utils/axios-helper'
import { Routes } from '../../routes'
import { MerchantsLiveFees } from './components/MerchantsLiveFeesList'
import AlertDismissable from '../../components/AlertDismissable'

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
    const [valueMin, setValueMin] = useState(undefined);
    const [valueMax, setValueMax] = useState(undefined);
    const [country, setCountry] = useState("CI");
    const [method, setMethod] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [hasBeenApplied, setHasBeenApplied] = useState(false);
    // const [filters, setFilters] = useState({
    //     country: country,
    //     priceMin: null,
    //     priceMax: null
    // });
    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);

    const [cookies] = useCookies(["token", "user"]);
    const axios = AxiosWebHelper.getAxios();

    const onPageChange = (page = 0) => {
        setCurrentPage(page);
    };

    const incrementVersion = () =>
        setVersion((currentVersion) => {
            console;
            return currentVersion + 1;
        });
    
    const getMerchantsFeesLive = () => {
        setIsLoaded(false);
        axios.get(
            MERCHANTS_LIVE_FEES_URL,
            {
                headers: {
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token
                }
            }
        ).then((result) => {
            setMerchantFeesList(result.data);
            setCount(result.data.length);
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

    // const filterData = (data, filters) => {
    //     // Appliquer les filtres un par un
    //     let filteredData = data;

    //     // Filtrer par pays
    //     if (filters.country) {
    //         filteredData = filteredData.filter(item => item.country === filters.country);
    //     }

    //     // Filtrer par intervalle de prix
    //     if (filters.priceMin && filters.priceMax) {
    //         filteredData = filteredData.filter(item => item.price >= filters.priceMin && item.price <= filters.priceMax);
    //     }

    //     // Ajouter d'autres conditions de filtrage si nécessaire
    //     setMerchantFeesList(filteredData);
    //     setCount(filteredData.length);
    //     return filteredData;
    // }

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
            {/* <div className="align-items-center d-flex flex-wrap">
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="country">
                        <Form.Label>Pays</Form.Label>
                        <Form.Select
                            value={country}
                            onChange={(event) => {
                                setCountry(event.target.value);
                                console.log(event.target.value);
                                console.log(country)
                            }}
                        >
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
                            onClick={() => filterData(merchantFeesList, filters)}
                        >
                            Filtrer
                        </Button>
                    </div>
                </Col>
            </div> */}
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