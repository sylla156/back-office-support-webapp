import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import AlertDismissable from "../components/AlertDismissable";
import AxiosWebHelper from "../utils/axios-helper";
import { format } from "date-fns";
import { MerchantTransferBalance } from "../components/globalReport/MerchantTransferBalance";
import { MerchantCollectionBalance } from "../components/globalReport/MerchantCollectionBalance";
import { ProviderBalance } from "../components/globalReport/ProviderBalance";
import { DateWidgetList } from "../components/globalReport/DateWidgetList";
import { APPKEY, MERCHANTS_URL } from "./constante/Const";
import { MultiSelect } from "react-multi-select-component";
import { useCookies } from "react-cookie";

export default () => {
  const currentDate = new Date();
  var currentDate1 = new Date();

  const subtractionDate = currentDate1.setDate(currentDate1.getDate() - 1);

  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
  const formattedsubtractionDate = format(subtractionDate, "yyyy-MM-dd");

  const [errorData, setErrorData] = useState(null);

  const [currentVersion, setCurrentVersion] = useState(0);
  const [merchantListFromDb, setMerchantListFromDb] = useState([]);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selected, setSelected] = useState([]);

  const [selectedMerchant, setSelectedMerchant] = useState([]);
  const [dateTimeList, setDateTimeList] = useState([]);

  const [startDate1, setStartDate1] = useState(
    `${formattedsubtractionDate}T00:00:00Z`
  );
  const [endDate1, setEndDate1] = useState(
    `${formattedsubtractionDate}T23:59:59Z`
  );

  const [startDate2, setStartDate2] = useState(
    `${formattedCurrentDate}T00:00:00Z`
  );
  const [endDate2, setEndDate2] = useState(`${formattedCurrentDate}T23:59:59Z`);

  const handleDateEvent = (value, setter) => {
    setter(value);
  };

  const [cookies] = useCookies(["token"]);
  const axios = AxiosWebHelper.getAxios();

  const getMerchantFromDbList = () => {
    setIsLoaded(false);
    setErrorData(null);
    axios
      .get(MERCHANTS_URL, {
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      })
      .then((result) => {
        setIsLoaded(true);
        setMerchantListFromDb(result.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        // onFilters();
        if (error.response) {
          console.log("In catch error getMerchantStats", error.response.data);
          // console.log(error.response.data);
          console.log("Status code error : " + error.response.status);
          if (error.response.status === 401) {
            console.log(
              "===========> in error.response.status === 401 of getMerchantStats"
            );
            setShouldLogin(true);
          } else {
            console.log("In atch error getMerchantStats");
            console.log(error.response.data);
            console.log(error.response.data.message);
            setErrorData(error.response.data.message);
          }
        }
      });
  };

  const formattedSelectedValue = () => {
    const values = merchantListFromDb.map((item) => {
      return {
        value: item.merchantId,
        label: item.name,
      };
    });
    return values;
  };

  const onClean = () => {
    setStartDate1("")
    setEndDate1("")
    setStartDate2("")
    setEndDate2("")
  };

  useEffect(() => {
    getMerchantFromDbList();
  }, []);

  // == Regis

  const buildDateIntervalList = (
    startDate1,
    endDate1,
    startDate2,
    endDate2
  ) => {
    let list = [];
    if (startDate1 && endDate1) {
      list.push({
        formattedStartDate: startDate1,
        formattedEndDate: endDate1,
      });
    }
    if (startDate2 && endDate2) {
      list.push({
        formattedStartDate: startDate2,
        formattedEndDate: endDate2,
      });
    }

    return list;
  };

  useEffect(() => {
    const newList = buildDateIntervalList(
      startDate1,
      endDate1,
      startDate2,
      endDate2
    );
    setDateTimeList(newList);
  }, [startDate1, endDate1, startDate2, endDate2]);

  useEffect(() => {
    setSelectedMerchant(selected);
  }, [currentVersion]);

  // ==

  const buildMapDateWidget = (list) => {
    return list.map((item) => (
      <>
        <h3>
          Rapport Journalier du {item.formattedStartDate} au{" "}
          {item.formattedEndDate}{" "}
        </h3>
        <DateWidgetList
          version={currentVersion}
          merchantList={selectedMerchant}
          date={item}
        />
      </>
    ));
  };

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-2"></div>
      <div>
        <AlertDismissable
          message={errorData}
          variant="danger"
          show={!!errorData}
          onClose={() => setErrorData(null)}
        />
        <div></div>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          {/* Merchant input */}
          <Col xs={12} md={3} lg={3} className="mb-2 px-2">
            <Form.Group id="">
              <Form.Label>Id merchand</Form.Label>
              <MultiSelect
                options={formattedSelectedValue()}
                value={selected}
                onChange={setSelected}
                labelledBy=""
              />
            </Form.Group>
          </Col>
          {/* Start date */}
          <Col xs={12} md={4} lg={4} className="mb-2 px-2">
            <Form.Label>Date début 1 </Form.Label>
            <InputGroup>
              <InputGroup.Text></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder=""
                value={startDate1}
                onChange={(event) =>
                  handleDateEvent(event.target.value, setStartDate1)
                }
              />
            </InputGroup>
          </Col>

          {/* End date */}
          <Col xs={12} md={4} lg={4} className="mb-2 px-2">
            <Form.Label>Date fin 1</Form.Label>
            <InputGroup>
              <InputGroup.Text></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder=""
                value={endDate1}
                onChange={(event) =>
                  handleDateEvent(event.target.value, setEndDate1)
                }
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-between align-items-center">
          <Col xs={12} md={3} lg={3} className="mb-2 px-2"></Col>
          {/* Start date */}
          <Col xs={12} md={4} lg={4} className="mb-2 px-2">
            <Form.Label>Date début 2 </Form.Label>
            <InputGroup>
              <InputGroup.Text></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder=""
                value={startDate2}
                onChange={(event) =>
                  handleDateEvent(event.target.value, setStartDate2)
                }
              />
            </InputGroup>
          </Col>

          {/* End date */}
          <Col xs={12} md={4} lg={4} className="mb-2 px-2">
            <Form.Label>Date fin 2</Form.Label>
            <InputGroup>
              <InputGroup.Text></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder=""
                value={endDate2}
                onChange={(event) =>
                  handleDateEvent(event.target.value, setEndDate2)
                }
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-between align-items-center">
          <Col xs={12} md={6} lg={6} className="mt-5 px-2">
            <Button
              variant="outline-primary"
              className="mx-2"
              type="button"
              onClick={onClean}
            >
              Effacer
            </Button>
            <Button
              className="ml-3"
              variant="primary"
              type="button"
              onClick={() => setCurrentVersion(currentVersion + 1)}
            >
              Générer le rapport
            </Button>
          </Col>
        </Row>
      </div>

      <div className="mt-5">
        <h3>Solde fournisseur Hub2</h3>
      </div>

      <ProviderBalance version={currentVersion} />

      <div  className="mt-4">
      <h3>Transfert-Solde Marchand</h3>
      </div>
      <MerchantTransferBalance version={currentVersion} />

      <div className="mt-4">
      <h3>Paiement - Solde Marchand</h3>
      </div>
      <MerchantCollectionBalance version={currentVersion} />

      <div className="mt-5"></div>
      {buildMapDateWidget(dateTimeList)}
      <div className="mb-4"></div>
    </>
  );
};