import { Col, Form, Button, Spinner, Modal, Badge } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { Routes } from "../../../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APPKEY, FIRST_PAGE_INDEX, etatDesRetourDeFonds, ADD_RETOUR_DE_FONDS, RETRIEVE_A_TRANSFER_TRANSACTION, GET_RETOUR_DE_FONDS_TYPE, ADD_RETOUR_DE_FONDS_LOGS } from "../../constante/Const";
import { useCookies } from "react-cookie";
import AxiosWebHelper from "../../../utils/axios-helper";
import { Redirect } from "react-router-dom";
import { faExclamationTriangle, faPlus } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";

export const AddReturnFunding = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const currentDate = new Date()
    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
    const defaultDate = `${formattedCurrentDate}T00:00:00Z`
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [show, setShow] = useState(false);
    const [showHiddenData, setShowHiddenData] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const [transactionDetails, setTransactionDetails] = useState([])
    const [providerData, setProviderData] = useState([])
    const [transfer, setTransfer] = useState([])
    const [refMarchand, setRefMarchand] = useState(undefined)
    const [commentaire, setCommentaire] = useState(undefined)
    const [dateRecu, setDateRecu] = useState(defaultDate)
    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [valueErrorMessage, setValueErrorMessage] = useState("");

    const [cookies] = useCookies(["token", "user"])
    const axios = AxiosWebHelper.getAxios();
    const onRefresh = props.onRefresh

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setErrorData(null)
        setShow(false)
        setRefMarchand(undefined)
        setCommentaire(undefined)
        setDateRecu(undefined)
    }

    const badgeColor = (status) => {
        if (status === "successful" || status === "success" || status === "SUCCESSFUL" || status === "SUCCESS") {
            return "success";
        }
        if (status === "pending" || status === "PENDING" || status === "processing" || status === "PROCESSING") {
            return "warning";
        }
        if (status === "FAILLED" || status === "failed" || status === "FAILED" || status === "failled") {
            return "danger";
        }
        return "primary";
    }

    const warningMessageStatus = (status) => {
        if (status === true) {
            return (
                <Badge bg="warning">
                    <span className="h6 mb-0 text-start">La transaction ne peut être traité en raison de son status</span>
                </Badge>
            )
        }
    }

    const decryptProviderByGatewayId = (gatewayId) => {
        if (gatewayId === "hub2_mm_ci_orange_live") return "orange"
        if (gatewayId === "hub2_mm_ci_moov_live") return "moov"
        if (gatewayId === "hub2_mm_ci_mtn_live") return "mtn"
        if (gatewayId === "hub2_mm_ci_wave_live") return "wave"
        return ""
    }

    const addRetourDeFonds = () => {
        setIsLoading(true)
        setErrorData(null)

        const data = {
            refMarchand,
            refHub2: transactionDetails.id,
            refOperateur: providerData.processorReference,
            dateRecu,
            numero: transactionDetails.destination.number,
            currency: transactionDetails.currency,
            provider: decryptProviderByGatewayId(providerData.gatewayId),
            montant: transactionDetails.amount,
            commentaire,
        }
        axios.post(ADD_RETOUR_DE_FONDS, data, {
            headers: {
                "Content-Type": "application/json",
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            }
        }).then((addResult) => {
            if (addResult.status === 201) {
                axios.get(GET_RETOUR_DE_FONDS_TYPE, {
                    headers: {
                        "Content-Type": "application/json",
                        AppKey: APPKEY,
                        authenticationtoken: cookies.token
                    }
                }).then((result) => {
                    if (result.status === 200) {
                        const allType = result.data.list
                        const logType = allType.find(type => type.name === result.data.list[result.data.list.length - 1].name)
                        const data = {
                            type: logType,
                            message: cookies.user.name + "à été crée le retour de fonds",
                            idRetourDeFonds: addResult.data,

                        }
                        axios.post(ADD_RETOUR_DE_FONDS_LOGS, data, {
                            headers: {
                                "Content-Type": "application/json",
                                AppKey: APPKEY,
                                authenticationtoken: cookies.token
                            }
                        }).then((result) => {
                            if (result.status === 201) {
                                setIsLoading(false)
                                handleClose()
                                onRefresh()
                            }
                        })
                    }
                }).catch((error) => {
                    setIsLoading(false)
                    if (error.response) {
                        if (error.response.status === 401) {
                            setShouldLogin(true)
                        } else {
                            setErrorData(error.response.data.message)
                        }
                    }
                })

            }
        }).catch((error) => {
            setIsLoading(false)
            if (error.response) {
                if (error.response.status === 401) {
                    setShouldLogin(true)
                } else {
                    setErrorData(error.response.data.message)
                }
            }
        })
    }

    const handlePostData = () => {
        addRetourDeFonds()
    }

    /**
     * Retrieves a transfer transaction.
     *
     * @return {void}
     */
    const retrieveTransferTransaction = () => {
        setIsLoading(true)
        setErrorData(null)

        axios.get(RETRIEVE_A_TRANSFER_TRANSACTION,
            {
                headers: {
                    "Content-Type": "application/json",
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token
                },
                params: {
                    reference: refMarchand,
                    page: currentPage,
                    perPage: FIRST_PAGE_INDEX
                }
            },
        ).then((result) => {
            setTransactionDetails(result.data.list[0])
            console.log("azertyu", result.data.list[0]);
            setProviderData(result.data.list[0].providerData)
            setTransfer(result.data.list[0].providerData.transfer.response)
            setIsLoading(false)
            setShowHiddenData(true)
            setShowWarning(true)
        }).catch((error) => {
            setIsLoading(false)
            if (error.response) {
                if (error.response.status === 401) {
                    setShouldLogin(true)
                } else {
                    setErrorData(error.response.data.message)
                    console.log("error", error.response.data.message);
                }
            }
        })
    }

    if (!cookies.token) {
        return <Redirect to={Routes.Signin.path} />
    }

    if (shouldLogin) {
        return <Redirect to={Routes.Signin.path} />
    }

    return (
        <>
            <Col xs={12} md={3} lg={8}>
                <Button variant="outline-primary" size="sm" onClick={handleShow}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    <span> Ajouter un retour de fonds</span>
                </Button>
            </Col>
            <Modal
                size="lg"
                show={show}
                onHide={() => {
                    handleClose()
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton closeVariant="white" className="bg-primary">
                    <Modal.Title className="text-white">
                        Ajouter un retour de fonds
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Référence Marchand <span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Control value={refMarchand} required onChange={(e) => setRefMarchand(e.target.value)} type="text" placeholder="Reference marchand" />
                        <p style={{ color: "red" }}>{valueErrorMessage}</p>
                        {showHiddenData && (
                            <>
                                <h3>Détails de la transaction</h3>
                                <br />
                                <p style={{ fontWeight: "bold" }}>Référence du marchand: <span>{transactionDetails.reference}</span></p>
                                <p style={{ fontWeight: "bold" }}>Référence HUB2: <span>{transactionDetails.id}</span></p>
                                <p style={{ fontWeight: "bold" }}>Référence opérateur: <span>{providerData.processorReference}</span></p>
                                <p style={{ fontWeight: "bold" }}>Numéro de téléphone: <span>{transactionDetails.destination.number}</span></p>
                                <p style={{ fontWeight: "bold" }}>Montant de la transaction: <span>{transactionDetails.amount} {transactionDetails.currency}</span></p>
                                <p style={{ fontWeight: "bold" }}>Status de la transaction:
                                    <span>
                                        <Badge bg={badgeColor(transactionDetails.status)}>
                                            <span className="h6 mb-0 text-start">{transactionDetails.status}</span>
                                        </Badge>
                                    </span>
                                </p>

                                <Form.Label>Date de reception <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control value={dateRecu} required onChange={(e) => setDateRecu(e.target.value)} type="text" placeholder="Date de reception" />
                                <p style={{ color: "red" }}>{valueErrorMessage}</p>

                                <Form.Label>Commentaire</Form.Label>
                                <Form.Control value={commentaire} onChange={(e) => setCommentaire(e.target.value)} type="text" placeholder="Commentaire" />
                                <p style={{ color: "red" }}>{valueErrorMessage}</p>
                                <p> <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" /> Le signe <span style={{ color: "red" }}>* </span>signifie que ce champ est obligatoire</p>
                            </>

                        )}

                        <Col xs={12} md={6} lg={12} className="px-2 mt-4">
                            <div className="mt-3 mb-4">
                                {
                                    !isLoading ?
                                        <Button
                                            className="mx-2"
                                            variant="primary"
                                            type="button"
                                            disabled={showHiddenData}
                                            onClick={() => retrieveTransferTransaction()}
                                        >
                                            Retrouver la transaction
                                        </Button> :
                                        <div className="d-flex justify-content-center">
                                            <Spinner animation="border " size="sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        </div>
                                }
                                {transactionDetails.status === "successful" ? (
                                    <Button
                                        variant="outline-primary"
                                        type="button"
                                        onClick={() => handlePostData()}
                                    >
                                        Ajouter la transaction
                                    </Button>
                                ) : (
                                    warningMessageStatus(showWarning)
                                )}
                            </div>
                        </Col>
                    </Form.Group>
                </Modal.Body>
            </Modal>
        </>
    )

}