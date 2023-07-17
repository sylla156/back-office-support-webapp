import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
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
import { faPlus,faPaperclip } from "@fortawesome/free-solid-svg-icons";
import AlertDismissable from "../../../../../components/AlertDismissable";
import AxiosWebHelper from "../../../../../utils/axios-helper";
import { APPKEY,MOOV_REPORT_PAYMENT_UPLOAD_URL } from "../../../../constante/Const";
import { Routes } from "../../../../../routes";

export const MoovReportPaymentImportFile = (props) => {
    const onRefresh = props.onRefresh

    const [isLoading, setIsLoading] = useState(false);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [show, setShow] = useState(false);
    const [file, setFile] = useState();

    const [cookies] = useCookies(["token","user"])

    const handleChangeFile = async (event) => {
        let files = event.target.files;
        let file = files[0];
        setFile(file);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setErrorData(null);
        setShow(false);
        setIsLoading(false);
        setFile(undefined)
    };

    const axios = AxiosWebHelper.getAxios();

    const postFile = () => {
        if(!file) return

        setIsLoading(true)
        setErrorData(null)
        const formData = new FormData()
        formData.append('file', file)

        axios.post(MOOV_REPORT_PAYMENT_UPLOAD_URL, formData,{
            headers:{
                "Content-Type":"multipart/form-data",
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            },
            params:{
                country: "CI"
            }
        }).then((result) => {
            setIsLoading(false)
            handleClose()
            onRefresh()
        }).catch((error) => {
            setIsLoading(false)
            if(error.response){
                if(error.response.status === 401){
                    setShouldLogin(true)
                }else{
                    setErrorData(error.response.data.message)
                }
            }
        })
    }

    const handlePostFile = () => {
        postFile();
    }
    if(!cookies.token) {
        return <Redirect to={Routes.Signin.path}/>
    }

    if(shouldLogin){
        return <Redirect to={Routes.Signin.path} />
    }

    return(
        <>
            <Col xs={12} md={3} lg={8}>
                <Button variant="outline-primary" size="sm" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                <span className=""> Importer un fichier CSV ou Excel </span>
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
                        Ajouter le rapport moov
                    </Modal.Title>
                </Modal.Header> 
                <Modal.Body>
                    <Card border="light" className="bg-white  mb-4">
                        <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                                    <div className="file-field">
                                        <div className="d-flex justify-content-xl-center ms-xl-3">
                                        <div className="d-flex">
                                            <span className="icon icon-md">
                                            <FontAwesomeIcon
                                                icon={faPaperclip}
                                                className="me-3"
                                            />
                                            </span>
                                            <input
                                            type="file"
                                            // value={file}
                                            accept=".xlsx,.xls,.csv"
                                            onChange={(event) => {
                                                handleChangeFile(event);
                                            }}
                                            />
                                            <div className="d-md-block text-start">
                                            <div className="fw-normal text-dark mb-1">
                                                {file?.name ? file?.name : <b> Choisir un fichier CSV ou Excel</b>}
                                            </div>
                                            <div className="text-gray small">
                                                
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                            </Form.Group>
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
                        onClick={() => {handlePostFile()}}
                    >
                        Ajouter un fichier
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
    )
}