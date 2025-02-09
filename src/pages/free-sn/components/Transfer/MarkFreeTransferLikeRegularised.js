import React, {useState, useEffect} from 'react'
import {
    Col,
    Spinner,
    Row,
    Form,
    Button,
    InputGroup,
} from "@themesberg/react-bootstrap";
import {useCookies} from 'react-cookie';
import {format, addMinutes, subDays} from 'date-fns';
import AxiosWebHelper from '../../../../utils/axios-helper';
import {APPKEY, FIRST_PAGE_INDEX, GET_MARK_FREE_REPORT_TRANSFER_LIKE_REGULARISED, EXPORT_FREE_REPORT_TRANSFER_MARK_LIKE_REGULARISED} from '../../../constante/Const';
import {Routes} from '../../../../routes';
import {Redirect} from 'react-router-dom';

import AlertDismissable from '../../../../components/AlertDismissable';
import {MarkFreeTransferLikeRegularisedList} from './MarkFreeTransferLikeRegularisedList';

export default () => {

    const currentDate = new Date();
    const startDateToUse = subDays(currentDate, 2);
    const formatStartDateToUse = format(startDateToUse, "yyyy-MM-dd");
    const defaultStartDate = `${formatStartDateToUse}T00:00:00Z`;
    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
    const defaultEndDate = `${formattedCurrentDate}T23:59:59Z`;

    const [errorData, setErrorData] = useState(null);
    const [errorDataCSV, setErrorDataCSV] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedCSV, setIsLoadedCSV] = useState(true);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [markLikeRegularisedList, setMarkLikeRegularisedList] = useState([]);

    const [count, setCount] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);

    const handleStartDate = (value) => {

        setStartDate(value);
    
    };
    const handleEndDate = (value) => {

        setEndDate(value);
    
    };

    const [cookies] = useCookies(["token", "user"]);

    const userCanAddFreeTransferRegularised = cookies.user.canAddTransferRegularised;

    const axios = AxiosWebHelper.getAxios();

    const getMarkFreeReportTransferListRegularised = () => {

        setIsLoaded(false)
        setErrorData(null)
        axios.get(GET_MARK_FREE_REPORT_TRANSFER_LIKE_REGULARISED, {
            params: {
                from: startDate,
                to: endDate,
            },
            headers: {
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            }
        }).then((result) => {

            setIsLoaded(true)
            setMarkLikeRegularisedList(result.data.data)
            setCount(result.data.count)
        
        }).catch((error) => {

            setIsLoaded(true);
            if (error.response) {

                if (error.response.status === 401) {

                    setShouldLogin(true);
                
                } else {

                    setErrorData(error.response.data.message);
                
                }
            
            }
        
        });
    
    }

    const fileName = "free-report-transfer-who-must-be-regularise-export";
    const exportData = () => {

        setErrorDataCSV(null);
        setIsLoadedCSV(false);

        axios.get(EXPORT_FREE_REPORT_TRANSFER_MARK_LIKE_REGULARISED, {
            params: {
                from: startDate,
                to: endDate,
            },
            headers: {
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            },
        }).then((result) => {

            setIsLoadedCSV(true);
            setErrorDataCSV(null);
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName + ".csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
        
        }).catch((error) => {

            setIsLoaded(true);
            console.log("une erreur s'est produite", error);
        
        });
    
    }

    const onPageChange = (page = 0) => {

        setCurrentPage(page);
    
    };
    const incrementVersion = () =>
        setVersion((currentVersion) => {
            
            return currentVersion + 1;
        
        });

    const onClearFilters = () => {

        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
    
    };

    useEffect(() => {

        getMarkFreeReportTransferListRegularised();
    
    }, [currentPage, version]);

    if (!cookies.token) {

        return <Redirect to={Routes.Signin.path} />;
    
    }

    if (shouldLogin) {

        return <Redirect to={Routes.Signin.path} />;
    
    }

    return (
        <>
            <div className="align-items-center d-flex flex-wrap">
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Date début</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Date début"
                            value={startDate}
                            onChange={(event) => handleStartDate(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Date fin</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Date fin"
                            value={endDate}
                            onChange={(event) => handleEndDate(event.target.value)}
                        />
                    </InputGroup>
                </Col>

                <Col xs={12} md={3} lg={3} className="px-2 mt-4">
                    <div className="mt-3 mb-4">
                        <Button
                            variant="outline-primary"
                            type="button"
                            onClick={onClearFilters}
                        >
                            Effacer
                        </Button>
                        <Button
                            className="mx-2"
                            variant="primary"
                            type="button"
                            onClick={() => getMarkFreeReportTransferListRegularised()}
                        >
                            Filtrer
                        </Button>

                        {isLoadedCSV ? (
                            <Button
                                variant="outline-primary"
                                className=""
                                type="button"
                                onClick={() => exportData()}
                            >
                                Exporter
                            </Button>
                        ) : (
                            <div className="d-flex justify-content-center">
                                <Spinner animation="border " size="sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        )}
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
            {isLoaded ? (
                <Row>
                    <MarkFreeTransferLikeRegularisedList
                        key={version}
                        listInfo={markLikeRegularisedList}
                        count={count}
                        currentpage={currentPage}
                        onPageChange={onPageChange}
                        onRefresh={incrementVersion}
                        userCanAddFreeTransferRegularised={userCanAddFreeTransferRegularised}
                    />
                </Row>
            ) : (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border " size="sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
        </>
    )

}
