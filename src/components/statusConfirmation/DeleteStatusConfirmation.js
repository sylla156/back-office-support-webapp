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
import { SelectDefaultValues, StatusConfirmationList, DELETE_STATUS_CONFIRMATION_TRANSFER_LIST, APPKEY } from "../../pages/constante/Const";
import AxiosWebHelper from "../../utils/axios-helper";
import {
  faTools
} from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";
import AlertDismissable from "../AlertDismissable";

export const DeleteStatusConfirmation = (props)=> {
  const onRefresh = props.onRefresh;
  const statusConfirmationId=props.statusConfirmationId;

  const [isLoading, setIsLoading] = useState(false);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [show, setShow] = useState(false);


  const axios = AxiosWebHelper.getAxios();
  const [cookies, ] = useCookies(["token"]);

  if(!cookies.token) {
    return <Redirect to={Routes.Signin.path}/>
  }

  const deleteStatusConfirmation = ()=> {
    if (isLoading) return;

    setIsLoading(true);
    setErrorData(null)
    axios.delete(
      DELETE_STATUS_CONFIRMATION_TRANSFER_LIST+"/"+statusConfirmationId,
      {
        headers: {
          AppKey: APPKEY,
          authenticationtoken: cookies.token,
        },
      }
    )
    .then((result)=> {
      setIsLoading(true);
      onRefresh();
    })
    .catch((error)=> {
      setIsLoading(true);
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

  const handleDeleteForceStatusClose = () => {
    deleteStatusConfirmation();
    handleShow();
  };

  if(shouldLogin){
    return <Redirect to={Routes.Signin.path}/>
  }
  return (
    <>
      <Col md={6} className="">
        <Button variant="danger" size="md" onClick={handleShow}>
          Supprimer
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
          <Modal.Title className="text-white">supprimer le status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Vous voulez supprimer ce status confirmation?</h4>
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
              handleDeleteForceStatusClose();
            }}
          >
            confirmer
          </Button>
        </Modal.Footer>
        <div className="mt-3">
          <AlertDismissable
            message={errorData}
            variant="danger"
            show={!!errorData}
            onClose={() => setErrorData(null)}
            isLoading={isLoading}
          />
        </div>
      </Modal>
    </>
  );
}