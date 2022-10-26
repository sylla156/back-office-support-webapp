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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { DANGEROUSLY_FORCE_STATUS_STATUS_CONFIRMATION, SelectDefaultValues, StatusConfirmationList } from "../../pages/constante/Const";
import AxiosWebHelper from "../../utils/axios-helper";
import {
  faTools
} from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";
import AlertDismissable from "../AlertDismissable";

export const DangerouslyForceStatus = (props)=> {
  const [isLoaded, setIsLoaded] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [show, setShow] = useState(false);

  const [status, setStatus] = useState(undefined);
  const [processorReference, setProcessorReference] = useState(undefined);
  const [description, setDescription] = useState(undefined);

  const transactionId = props.id;
  const onRefresh = props.onRefresh; 

  const statusValue = () =>
    status ? StatusConfirmationList.id : SelectDefaultValues.status;

  const [cookies, ] = useCookies(["token"]);

  if(!cookies) {
    return <Redirect to={Routes.Signin.path}/>
  }

  const axios = AxiosWebHelper.getAxios();
  const dangerouslyForceStatus = ()=> {
    setIsLoaded(false);
    setErrorData(null)
    axios.post(
      DANGEROUSLY_FORCE_STATUS_STATUS_CONFIRMATION,
      {
        params: {
          transactionId
        }
      }
    )
    .then((result)=> {
      setIsLoaded(true);
      onRefresh();
    })
    .catch((error)=> {
      setIsLoaded(true);
        if (error.response) {
          if (error.response.status === 401) {
            setShouldLogin(true);
          } else {
            setErrorData(error.response.data.message);
          }
        }
    })
  };

  const handleShow = () => {
    if(!errorData) {
      return setShow(true);
    }
    return setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDangerouslyClose = () => {
    dangerouslyForceStatus();
    handleShow();
  };

  if(shouldLogin) {
    return <Redirect to={Routes.Signin.path}/>;
  }
  return (
    <>
    <Col md={6} className="">
        <Button variant="outline-primary" size="sm" onClick={handleShow}>
          <FontAwesomeIcon icon={faTools} className="me-2" />
          Forcer 
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
          <Modal.Title className="text-white">Forcer le status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Vous voulez forcer le status de cette transaction ?</h4>
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
            variant="danger"
            color=""
            onClick={() => {
              handleDangerouslyClose();
            }}
          >
            Forcer status
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
}