import { format } from 'date-fns'
import React,{useState, useEffect} from 'react'
import { useCookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'
import { FIRST_PAGE_INDEX, APPKEY, PAGE_SIZE, MERCHANTS_FEES_URL } from '../constante/Const'
import AlertDismissable from '../../components/AlertDismissable'
import { Col, Spinner, Row, Form, Button, InputGroup } from '@themesberg/react-bootstrap'
import AxiosWebHelper from '../../utils/axios-helper'
import { Routes } from '../../routes'
import { MerchantsFeesList } from './components/MerchantsFeesList'
import { AddMerchantsFees } from './components/AddMerchantsFees'

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
    const [country, setCountry] = useState(undefined);
    const [method, setMethod] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [hasBeenApplied, setHasBeenApplied] = useState(false);
    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);

    const [cookies] = useCookies(["token","user"]);
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
                    transactionType,
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