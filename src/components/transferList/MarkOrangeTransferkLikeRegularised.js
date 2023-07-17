import React, { useState, useEffect } from "react";
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
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  SelectDefaultValues,
  AddStatusConfirmationList,
  APPKEY,
  SINGLE_MARK_ORANGE_REPORT_TRANSFER_LIKE_REGULARISED,
} from "../../pages/constante/Const";
import AxiosWebHelper from "../../utils/axios-helper";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";
import AlertDismissable from "../AlertDismissable";


export const MarkOrangeTransferkLikeRegularised = (props)=> {

  const {
    onRefresh,
    transfer,
    orangeReportTransferCandidates,
  } = props;
  const dateNow = new Date();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [show, setShow] = useState(false);

  const [confirmedStatus, setConfirmedStatus] = useState("successful");
  let [processorReference, setProcessorReference] = useState(orangeReportTransferCandidates[0]?.reference);
  let [id, setId] = useState(transfer.id);
  let [regularisedDate, setRegularisedDate] = useState(dateNow.toISOString());

  const [cookies, ] = useCookies(["token","user"]);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setErrorData(null);
    setShow(false);
    setIsLoading(false);
    // setConfirmedStatus(undefined)
    // setProcessorReference(undefined)
    // setPaymentId(undefined)
    // setRegularisedDate(undefined)
  };

  const axios = AxiosWebHelper.getAxios();
  const markLikeRegularised = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setErrorData(null);

    axios
      .post(
        SINGLE_MARK_ORANGE_REPORT_TRANSFER_LIKE_REGULARISED,
        {
          finalStatus: confirmedStatus,
          operatorReference: processorReference,
          id,
          regularisationDate: regularisedDate,
        },
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
        handleClose();
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

  const handleAddStatusConfirmation = () => {
    markLikeRegularised();
  };

  const isFormValid = () => {
    if (!confirmedStatus) return false;
    if (
      confirmedStatus === "successful" &&
      (!processorReference || processorReference.trim().length === 0)
    )
      return false;
  
    if (!paymentId) return false;
    if (paymentId.trim().length === 0) return false;

    if (!regularisedDate) return false;
    if (regularisedDate.trim().length === 0) return false;

    return true;
  }
  
  if (!cookies.token) {
    return <Redirect to={Routes.Signin.path} />;
  }
  if(shouldLogin) {
    return <Redirect to={Routes.Signin.path}/>
  }
  

  return (
    <>
       <Col md={6} className="">
        <Button variant="outline-primary" size="xs" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          <span className=""> Ajouter </span>
        </Button>
      </Col>

      <Modal
        size="md"
        show={show}
        onHide={() => {
          handleClose(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton closeVariant="white" className="bg-primary">
          <Modal.Title className="text-white">
            Marquer comme régularié
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card border="light" className="bg-white  mb-4">
            <Card.Body>
              <Form>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group id="status">
                      <Form.Label>status final (*)</Form.Label>
                      <Form.Select
                        value={confirmedStatus}
                        onChange={(event) => {
                          setConfirmedStatus(event.target.value);
                        }}
                      >
                        <option
                          key={SelectDefaultValues.status}
                          value={SelectDefaultValues.status}
                        >
                          Choisissez un status
                        </option>
                          {AddStatusConfirmationList.map((item) => (
                          <option key={item.id} value={item.status}>
                            {item.status}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group id="firstName">
                      <Form.Label>Processor reference </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={processorReference}
                        onChange={(event) => {
                          setProcessorReference(event.target.value);
                        }}
                        placeholder="Entrer un processor reference "
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group id="firstName">
                      <Form.Label>Transfer id </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={id}
                        onChange={(event) => {
                          setId(event.target.value);
                        }}
                        placeholder="Entrer un paiement id "
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group id="firstName">
                      <Form.Label> date de régularisation </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={regularisedDate}
                        onChange={(event) => {
                          setRegularisedDate(event.target.value);
                        }}
                        placeholder="Entrer la date régularisation "
                      />
                    </Form.Group>
                  </Col>
                </Row>
               
              </Form>

              {/* <TransferSummary {...transfer} /> */}
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            color=""
            onClick={() => {
              handleClose(false);
            }}
          >
            Fermer
          </Button>
          <Button
            disabled={!isFormValid()}
            variant={isFormValid() ? "success" : "primary"}
            onClick={() => {
              handleAddStatusConfirmation();
            }}
          >
            Marquer
          </Button>
          <div className="mt-3">
            <AlertDismissable
              message={errorData}
              variant="danger"
              show={!!errorData}
              onClose={() => setErrorData(null)}
              isLoading={isLoading}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}