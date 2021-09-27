import React, { useState, useEffect,Component } from "react";
import { withCookies,useCookies,Cookies } from 'react-cookie';

import { Col, Row, Form, ButtonGroup,Modal, Button,Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
export default function Logout() {
    const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const [cookies, , removeCookie] = useCookies(['token','id', 'user']);


   const logout = ()=>{
    removeCookie("token");
    removeCookie("id");
    removeCookie("user");
  }
    return (
      <>
       <Button variant="" size="sm" onClick={handleShow} >
         <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Deconnexion
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="bg-primary">
            <Modal.Title className="text-white">Deconnexion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Appuyer sur le bouton Déconnexion pour fermer la session.
          </Modal.Body> 
          <Modal.Footer>
            <Button variant="primary" color="" onClick={handleClose}>
              Fermer
            </Button>
            <ButtonGroup>
                <Button variant="danger" color=""  onClick={logout}>Deconnexion</Button>
              </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </>
    );
}
