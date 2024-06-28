import React from 'react'
import { Alert, Button, Spinner } from '@themesberg/react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'

function AlertDismissable({ message, variant, show, onClose, isLoading }) {

  return (
    <>
      {isLoading
        ? <div className="text-center">
          <Spinner animation="border " size="sm" role="status">
            <span className="visually-hidden">Chargement...</span>
          </Spinner>
        </div>
        : <></>}
      <Alert show={show} variant={variant} onClose={onClose}>
        <div className="d-flex justify-content-between">
          <div>
            <FontAwesomeIcon icon={faBullhorn} className="mr-3" />
            <span>{message}</span>
          </div>
          <Button variant="close" size="xs" onClick={() => onClose(variant)} />
        </div>
      </Alert>
    </>
  )

}

export default AlertDismissable

