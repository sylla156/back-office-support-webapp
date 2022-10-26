import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Modal,
  Button,
  Card,
  Form,
  Badge,
  InputGroup,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  SelectDefaultValues,
  AddStatusConfirmationList,
  UPDATE_STATUS_CONFIRMATION_TRANSFER_LIST,
  APPKEY,
} from "../../pages/constante/Const";
import AxiosWebHelper from "../../utils/axios-helper";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";
import AlertDismissable from "../AlertDismissable";
import SplitString from "../../utils/splitString";
import { DeleteStatusConfirmation } from "./DeleteStatusConfirmation";

export const UpdateStatusConfirmation = (props) => {
  const {
    statusConfirmation,
    statusVariantColor: statusVariant,
    onRefresh,
    userCanForceStatus,
  } = props;

  const {
    id: statusConfirmationId,
    processorReference,
    description,
    user,
    confirmedStatus,
  } = statusConfirmation;

  const [modalVersion, setModalVersion] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [show, setShow] = useState(false);

  const [newConfirmedStatus, setNewConfirmedStatus] = useState(
    SelectDefaultValues.status
  );
  let [newProcessorReference, setNewProcessorReference] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [cookies] = useCookies(["token", "user"]);

  if (!cookies) {
    return <Redirect to={Routes.Signin.path} />;
  }

  const sessionUser = cookies.user;

  const setData = () => {
    const { processorReference, description, confirmedStatus } =
      statusConfirmation;

    setNewConfirmedStatus(confirmedStatus);
    setNewProcessorReference(processorReference);
    setNewDescription(description);
  };

  const axios = AxiosWebHelper.getAxios();
  const updateStatusConfirmation = () => {
    axios
      .patch(
        UPDATE_STATUS_CONFIRMATION_TRANSFER_LIST + "/" + statusConfirmationId,
        {
          confirmedStatus: newConfirmedStatus,
          processorReference: newProcessorReference,
          description: newDescription,
        },
        {
          headers: {
            AppKey: APPKEY,
            authenticationtoken: cookies.token,
          },
        }
      )
      .then((result) => {
        setIsLoaded(true);
        handleClose();
        onRefresh();
      })
      .catch((error) => {
        setIsLoaded(true);
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
    setData();
    setErrorData(null);
    setShow(false);
  };

  const handlePatchStatusConfirmation = () => {
    updateStatusConfirmation();
  };

  const isFormValid = () => {
    if (!newConfirmedStatus) return false;
    if (
      newConfirmedStatus === "successful" &&
      (!newProcessorReference || newProcessorReference.trim().length === 0)
    )
      return false;
    if (!newDescription) return false;
    if (newDescription.trim().length === 0) return false;

    return true;
  };

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  useEffect(() => {
    setData();
  }, [processorReference, description, confirmedStatus]);

  return (
    <>
      <Col md={6} className="">
        {userCanForceStatus && user.id === sessionUser?.id ? (
          <Button
            className="mb-3"
            variant="outline-light"
            size="xs"
            onClick={handleShow}
          >
            <Badge className="mx-1 mb-3" bg={`${statusVariant}`}>
              <span className="h6 text-light"> {confirmedStatus} </span>
            </Badge>
            <span
              title={user.name}
              className=" text-light p-2 mb-2 rounded-circle text-center border bg-dark border-primary"
              style={{ width: 10, height: 10 }}
            >
              {SplitString.takeFirstLetterOfEachString(user.name)}
            </span>

            <br />
          </Button>
        ) : (
          <>
            <Badge className="mx-1 mb-3" bg={`${statusVariant}`}>
              <span className="h6 text-light"> {confirmedStatus} </span>
            </Badge>
            <span
              title={user.name}
              className=" text-light p-2 mb-2 rounded-circle text-center border bg-dark border-primary"
              style={{ width: 10, height: 10 }}
            >
              {SplitString.takeFirstLetterOfEachString(user.name)}
            </span>

            <br />
          </>
        )}
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
            Mise à jour d'un status confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card border="light" className="bg-white  mb-4">
            <Card.Body>
              <h5 className="mb-4"></h5>
              <Form>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group id="status">
                      <Form.Label>Status (*)</Form.Label>
                      <Form.Select
                        value={newConfirmedStatus}
                        onChange={(event) => {
                          setNewConfirmedStatus(event.target.value);
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
                        value={newProcessorReference}
                        onChange={(event) => {
                          setNewProcessorReference(event.target.value);
                        }}
                        placeholder="Entrer un processor reference "
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group id="firstName">
                      <Form.Label>Description (*)</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows="3"
                        value={newDescription}
                        onChange={(event) => {
                          setNewDescription(event.target.value);
                        }}
                        placeholder="Entrer une description "
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <DeleteStatusConfirmation
            statusConfirmationId={statusConfirmationId}
            onRefresh={onRefresh}
          />
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
              handlePatchStatusConfirmation();
            }}
          >
            Mise à jour
          </Button>
          <div className="mt-3">
            <AlertDismissable
              message={errorData}
              variant="danger"
              show={!!errorData}
              onClose={() => setErrorData(null)}
              isLoaded={isLoaded}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
