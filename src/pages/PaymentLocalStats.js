import React, {useState, useEffect} from "react";
import {useCookies} from "react-cookie";
import {Redirect} from "react-router-dom";
import PaymentLocalStatsCommissionCountryCategoryWeek from "../components/LocalStats/payments/PaymentLocalStatsCommissionCountryCategoryWeek";
import {Routes} from "../routes";
import AxiosWebHelper from "../utils/axios-helper";
import {APPKEY, chooseOrderList, LOCAL_STATS_COMMISSION_COUNTRY_PAYMENT_WEEK, SelectDefaultValues} from "./constante/Const";
import {
    Col,
    Form,
} from "@themesberg/react-bootstrap";
import {format} from "date-fns";

export default () => {

    const [errorData, setErrorData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [weekList, setWeekList] = useState([]);
    const [order, setOrder] = useState(undefined);
    const [week, setWeek] = useState(undefined);

    const axios = AxiosWebHelper.getAxios();
    const [cookies] = useCookies(["token", ]);
  
    const currentDate = new Date();

    const formattedCurrentDate = format(currentDate, 'yyyy-I');

    const weekValue = () => week ? weekList.pay_week : formattedCurrentDate;
    const orderValue = ()=> order ? chooseOrderList.sorted : SelectDefaultValues.order;
 

    const getSuccessfulCountriesPaymentCommissionWeek = ()=> {

        setIsLoaded(false);
        setErrorData(null);
        axios
            .get(LOCAL_STATS_COMMISSION_COUNTRY_PAYMENT_WEEK, {
                headers: {
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token,
                }
            })
            .then((result) => {

                setIsLoaded(true);
                setWeekList(result.data);
            
            })
            .catch((error) => {

                setIsLoaded(true);
                // onFilters();
                if (error.response) {

                    if (error.response.status === 401) {

                        setShouldLogin(true);
                    
                    } else {

                        setErrorData(error.response.data.message);
                    
                    }
                
                }
            
            });
    
    }

    useEffect(() => {

        getSuccessfulCountriesPaymentCommissionWeek();
    
    }, []);
    if(!cookies.token) {

        return <Redirect to={Routes.Signin.path}/>
    
    }
  
    if(shouldLogin) {

        return <Redirect to={Routes.Signin.path} />;
    
    }

    return (
        <>
            <div className="align-items-center d-flex flex-wrap">
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="status">
                        <Form.Label>Choisissez une semaine</Form.Label>
                        <Form.Select
                            value={weekValue()}
                            onChange={(event) => {

                                setWeek(event.target.value);
                            
                            }}
                        >
                            <option
                                key={formattedCurrentDate}
                                value={formattedCurrentDate}
                            >
                Choisissez une semaine
                            </option>
                            {weekList.map((item) => (
                                <option key={item.id} value={item.pay_week}>
                                    {item.week}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="status">
                        <Form.Label>Ordonner</Form.Label>
                        <Form.Select
                            value={orderValue()}
                            onChange={(event) => {

                                setOrder(event.target.value);
                            
                            }}
                        >
                            <option
                                key={SelectDefaultValues.order}
                                value={SelectDefaultValues.order}
                            >
                Ordonner
                            </option>
                            {chooseOrderList.map((item) => (
                                <option key={item.id} value={item.sorted}>
                                    {item.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </div>
            <PaymentLocalStatsCommissionCountryCategoryWeek week={week} order={order}/>
        </>
    );

};
