import React, {useState, useEffect} from "react";
import {
    Col,
    Row,
    Modal,
    Button,
    Card,
    Form,
    InputGroup,
    Dropdown,
    ButtonGroup,
    Spinner,
} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    APPKEY,
    GET_LOCAL_TRANSFER_DATA,
    UPDATE_LOCAL_TRANSFER_DATA,
} from "../../pages/constante/Const";
import AxiosWebHelper from "../../utils/axios-helper";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useCookies} from "react-cookie";
import {Redirect} from "react-router-dom";
import {Routes} from "../../routes";
import {format, addMinutes, parseISO, subDays} from "date-fns";

export const UpdateLocalData = (props)=> {

    const currentDate = new Date();

    const formatStartDateToUse = format(currentDate, "yyyy-MM-dd");
    const defaultStartDate = `${formatStartDateToUse}T00:00:00Z`;
    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
    const defaultEndDate = `${formattedCurrentDate}T23:59:59Z`;

    const addMinutesInEndDate = addMinutes(currentDate, 30);
    const formattedCurrentEndDateTime = format(addMinutesInEndDate, "HH:mm:ss");

    const onRefresh = props.onRefresh;
    const userCanUpdateLocalData = props.userCanUpdateLocalData;

    const [isLoading, setIsLoading] = useState(false);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);

    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [cachedTransferLocal, setCachedTransferLocal] = useState({});
  
    const handleStartDate = (value) => {

        setStartDate(value);
    
    };
    const handleEndDate = (value) => {

        setEndDate(value);
    
    };

    const [cookies, ] = useCookies(["token", ]);

    const axios = AxiosWebHelper.getAxios();
    const getAndUpdateLocalData = () => {

        setIsLoading(true);
        setErrorData(null);

        axios
            .get(
                UPDATE_LOCAL_TRANSFER_DATA,
                {
                    params:{
                        from: startDate,
                        to: endDate
                    },
                    headers: {
                        AppKey: APPKEY,
                        authenticationtoken: cookies.token,
                    },
                }
            )
            .then((result) => {

                setIsLoading(false);
                // Here we should hide when add is done
                onRefresh()
            
            })
            .catch((error) => {

                setIsLoading(false);
                if (error.response) {

                    if (error.response.status === 401) {

                        setShouldLogin(true);
                    
                    } else {

                        setErrorData(error.response.data.message);
                    
                    }
                
                }
            
            });
    
    };
    const getCachedTransferLocalData = () => {

        setIsLoading(true);
        setErrorData(null);
        axios
            .get(
                GET_LOCAL_TRANSFER_DATA,
                {
                    headers: {
                        AppKey: APPKEY,
                        authenticationtoken: cookies.token,
                    },
                }
            )
            .then((result) => {

                setIsLoading(false);
                // Here we should hide when add is done
                setCachedTransferLocal(result.data);
                onRefresh()
            
            })
            .catch((error) => {

                setIsLoading(false);
                if (error.response) {

                    if (error.response.status === 401) {

                        setShouldLogin(true);
                    
                    } else {

                        setErrorData(error.response.data.message);
                    
                    }
                
                }
            
            });
    
    };

    const canActivateAndUpdate = ()=> {

        if(userCanUpdateLocalData) return true;
        return false;
    
    }
    const onClearFilters = () => {

        setStartDate(defaultStartDate);
        setEndDate(defaultEndDate);
    
    };

    useEffect(() => {

        getCachedTransferLocalData();
    
    }, []);

    if (!cookies.token) {

        return <Redirect to={Routes.Signin.path} />;
    
    }
  
    if(shouldLogin) {

        return <Redirect to={Routes.Signin.path}/>
    
    }

    return (
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
                    {isLoading ? <div className="d-flex justify-content-center">
                        <Spinner animation="border " size="sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div> : <Button
                        className="mx-2"
                        variant="primary"
                        disabled={!canActivateAndUpdate()}
                        type="button"
                        onClick={getAndUpdateLocalData}
                    >
                Mise à jour
                    </Button> }
                </div>
            </Col>
            <Col xs={12}>
                <p> Date min: {cachedTransferLocal?.minLocalDate} </p>
                <p> Date max: {cachedTransferLocal?.maxLocalDate} </p>
            </Col>
        </div>
    );

}
