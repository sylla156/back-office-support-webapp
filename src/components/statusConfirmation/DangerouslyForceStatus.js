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
import { DANGEROUSLY_FORCE_STATUS_STATUS_CONFIRMATION, APPKEY } from "../../pages/constante/Const";
import AxiosWebHelper from "../../utils/axios-helper";
import {
  faTools
} from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";
import AlertDismissable from "../AlertDismissable";
import { TransferSummary } from "./TransferSummary";

export const DangerouslyForceStatus = (props)=> {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [show, setShow] = useState(false);

  const transactionId = props.id;
  const onRefresh = props.onRefresh; 
  const transfer = props.transfer; 

  const [cookies, ] = useCookies(["token","user"]);

  

  const axios = AxiosWebHelper.getAxios();
  const dangerouslyForceStatus = ()=> {
    if (isLoading) return;

    setIsLoading(true);
    setErrorData(null);
    axios
      .post(
        DANGEROUSLY_FORCE_STATUS_STATUS_CONFIRMATION,
        {},
        {
          headers: {
            AppKey: APPKEY,
            authenticationtoken: cookies.token,
          },
          params: {
            transactionId,
          }
        }
      )
      .then((result) => {
        setIsLoading(false);
        handleClose();
        onRefresh();
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

  const handleDangerouslyClose = () => {
    dangerouslyForceStatus();
  };
  
  if(!cookies.token) {
    return <Redirect to={Routes.Signin.path}/>
  }
  if(!cookies.user.isActive2FA) {
    return <Redirect to={Routes.Signin.path} />
  }
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
          <TransferSummary {...transfer} />
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
            disabled={isLoading}
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
              isLoading={isLoading}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}