import React, {useState, useEffect} from "react";
import {Card,Col,Spinner,Row,Form, InputGroup, Button} from '@themesberg/react-bootstrap';
import {CounterWidgetHistory} from "../components/Widgets";
import {Redirect} from 'react-router-dom';
import {Routes} from "../routes";
import {useCookies} from 'react-cookie';
import AxiosWebHelper from "../utils/axios-helper";
import moment from 'moment-timezone'
import Datetime from 'react-datetime';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarAlt, faDollarSign, faLessThanEqual} from '@fortawesome/free-solid-svg-icons'
import { APPKEY, HISTORY_MERHCANT_BALANCE_COLLECTION,HISTORY_MERHCANT_BALANCE_COLLECTION_PARAMS } from "./constante/Const";
import AlertDismissable from "../components/AlertDismissable";

export default () => {
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [balanceList, setBalanceList] = useState([]);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);
  
  const [cookies] = useCookies(['token']);
  const [day, setDateDay] = useState(undefined);
  // const [dateEnd, setDateEnd] = useState(undefined);

  const handleDateChange = (event) => {
      const value = event.target.value;
      
      setDateDay(value);
  }
  
  const format = "YYYY-MM-DD";
  const dateFormated = moment(day).format(format);
  console.log("dateFormated ",dateFormated);
  const axios = AxiosWebHelper.getAxios();

  const getHistoryMerchantBalanceCollection = ()=>{
    
    setIsLoaded(false);
    axios.get(
      HISTORY_MERHCANT_BALANCE_COLLECTION,
      {
        headers:{
          AppKey: APPKEY,
          authenticationtoken:cookies.token
        },
        params:{
          type:HISTORY_MERHCANT_BALANCE_COLLECTION_PARAMS,
          day:dateFormated
        }
      },
    )
    .then((result)=> {
        setIsLoaded(true);
        console.log("isLoaded value : " + isLoaded);
        setBalanceList(result.data);
        console.log("In then")
        console.log(result.data);
    })
    .catch((error) => {

      setIsLoaded(true);
      console.log("In the catch")
      if (error.response) {

          console.log("In catch error solde", error.response.data);
          // console.log(error.response.data);
          console.log("Status code error : " + error.response.status);
          // console.log(error.response.headers);
          if (error.response.status === 401) {

              setShouldLogin(true);
          
          } else {

              console.log(error.response.data.message);
          
          }
      }
    });
  }

   useEffect(() => {

     getHistoryMerchantBalanceCollection();

  }, []);  

  const onFilters = ()=>{
    setDateDay(dateFormated);
    setBalanceList({});
};

  if(shouldLogin){

    return <Redirect to={Routes.Signin.path} />;

   }

  return (
    <>
      <Card border="light" className="mb-2 shadow-sm" >
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3">
            <Col xs={12} md={2} lg={4} className="">
                  <Form.Group id="dateStart">
                      <Form.Label>Date Solde</Form.Label>
                      <Datetime
                          timeFormat={false}
                          onChange={setDateDay}
                          renderInput={(props, openCalendar) => (
                              <InputGroup>
                                  <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                                  <Form.Control
                                      type="text"
                                      value={day ? moment(day).format('YYYY-MM-DD') : ''}
                                      placeholder="yyyy-mm-dd"
                                      onFocus={openCalendar}
                                      onChange={event => {
                                          handleDateChange(event) 
                                      }}
                                  />
                              </InputGroup>
                          )}
                      />
                  </Form.Group>
              </Col>  
              <Col xs={12} md={6} lg={6} className="mt-4 ">
                        <Button
                            className="ml-3"
                            variant="primary"
                            type="button"
                            onClick={getHistoryMerchantBalanceCollection}
                        >
                          Solde
                        </Button>
                </Col>        
            </div>
      </Card>

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
            <div >
                <AlertDismissable message={errorData} variant="danger" show={!!errorData} onClose={()=>setErrorData(null)} />
                <div>
      
                </div>
      </div>

      {isLoaded ? <Row className="">
                {balanceList.map((balance) => (
                    <Col key={balance.id} xs={12} sm={6} md={5} lg={4} className="mb-4 border-warning ">
                        <CounterWidgetHistory key={balance.id} balance={balance} />
                    </Col>
                ))}
            </Row> : <div className="d-flex justify-content-center">
                <Spinner animation="border " size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>}
    </>
  );
};
