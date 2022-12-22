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
  STATUS_CONFIRMATION,
  APPKEY,
} from "../../pages/constante/Const";
import AxiosWebHelper from "../../utils/axios-helper";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";
import AlertDismissable from "../AlertDismissable";
import { TransferSummary } from "../statusConfirmation/TransferSummary";
export const AddCandidatesSuggestions = (props)=> {

  const transactionId = props.id;
  const onRefresh = props.onRefresh;
  const transfer = props.transfer;
  const candidate = props.candidate;

  const descriptionCand = candidate?.content ? candidate?.content : candidate?.rawData

  const [isLoading, setIsLoading] = useState(false);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [show, setShow] = useState(false);

  const [confirmedStatus, setConfirmedStatus] = useState(candidate?.status);
  let [processorReference, setProcessorReference] = useState(candidate?.reference);
  const [description, setDescription] = useState(descriptionCand);

  const [cookies, ] = useCookies(["token"]);

  if (!cookies.token) {
    return <Redirect to={Routes.Signin.path} />;
  }

  if (confirmedStatus === "failed" && !processorReference) {
    processorReference = "";
  }

  const axios = AxiosWebHelper.getAxios();
  const addStatusConfirmation = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setErrorData(null);

    axios
      .post(
        STATUS_CONFIRMATION,
        {
          transactionId,
          transactionType: "transfer",
          confirmedStatus,
          processorReference,
          description,
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

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setErrorData(null);
    setShow(false);
    setIsLoading(false);
  };
  
  const handleAddStatusConfirmation = () => {
    addStatusConfirmation();
  };

  const isFormValid = () => {
    if (!confirmedStatus) return false;
    if (
      confirmedStatus === "successful" &&
      (!processorReference || processorReference.trim().length === 0)
    )
      return false;
    if (!description) return false;
    if (description.trim().length === 0) return false;

    return true;
  }

  if(shouldLogin) {
    return <Redirect to={Routes.Signin.path}/>
  }

  return (
    <>
      
        <Button variant="outline-primary" size="xs" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          <span className="">  </span>
        </Button>

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
            Ajout d'une suggestion 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card border="light" className="bg-white  mb-4">
            <Card.Body>
              <Form>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group id="status">
                      <Form.Label>Status (*)</Form.Label>
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
                      <Form.Label>Description (*) </Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows="3"
                        value={description}
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                        placeholder="Entrer une description "
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>

              <TransferSummary {...transfer} />
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
            Ajouter un status
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