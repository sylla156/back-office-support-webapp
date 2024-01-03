import React, { useState, useEffect } from "react";
import { Button, Col, Badge, ButtonGroup, Modal, Row } from "@themesberg/react-bootstrap";
import { etatDesRetourDeFonds, CHANGE_STATUS_RETOUR_DE_FONDS, APPKEY } from "../../constante/Const";
import AxiosWebHelper from "../../../utils/axios-helper";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

export const TransactionDetails = (props) => {
    const data = props.rowData
    const [returnFundingGroup1, setReturnFundingGroup1] = useState(data.user.returnFundingGroup1)
    const [returnFundingGroup2, setReturnFundingGroup2] = useState(data.user.returnFundingGroup2)
    const [returnFundingGroup3, setReturnFundingGroup3] = useState(data.user.returnFundingGroup3)
    const [isLoading, setIsLoading] = useState(false)
    const [errorData, setErrorData] = useState(null)
    const axios = AxiosWebHelper.getAxios()
    const [cookies] = useCookies(["token"])
    const history = useHistory();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDetailsClick = () => {
        history.push("/retour-de-fonds");
    }

    /**
     * Generates a badge color based on the given status.
     *
     * @param {string} status - The status of the badge.
     * @return {string} The color of the badge.
     */
    const badgeColor = (status) => {
        if (status === etatDesRetourDeFonds[0].ouvert) {
            return "success";
        }
        if (status === etatDesRetourDeFonds[7].fermé) {
            return "danger";
        }
        return "warning";
    }

    const changeRetourDeFondsStatus = (id, newState) => {
        setIsLoading(true)
        setErrorData(null)

        const dataToPatch = {
            etat: newState
        }

        axios.patch(CHANGE_STATUS_RETOUR_DE_FONDS, dataToPatch, {
            headers: {
                "Content-Type": "application/json",
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            },
            params: {
                id: id
            }
        }).then((response) => {
            setIsLoading(false)
            handleDetailsClick()
        }).catch((error) => {
            setIsLoading(false)
            if (error.response) {
                if (error.response.status === 401) {
                    sconsole.log('Unauthorized');
                } else {
                    setErrorData(error.response.data.message);
                }
            }
        })
    }

    /**
 * Generates a NextStepButton component based on the current step and provider.
 *
 * @param {string} currentStep - The current step in the process.
 * @param {string} provider - The provider of the button.
 * @return {JSX.Element} The NextStepButton component.
 */
    const NextStepButton = (currentStep, provider) => {
        if (currentStep === "OUVERT") {
            if (provider === "wave") {
                return (
                    <>
                        <Button className="btn btn-primary" disabled={!data.userCanMakeReturnFunding || !returnFundingGroup1 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "A SECURISER")}>A SÉCURISER</Button>

                    </>
                )
            } else {
                return (<Button disabled={!data.userCanMakeReturnFunding || !returnFundingGroup1 || isLoading} className="btn btn-primary" onClick={() => changeRetourDeFondsStatus(data.id, "A TRANSMETTRE")}>A TRANSMETTRE</Button>)
            }
        } else if (currentStep === "A SECURISER") {
            return (
                <>
                    <Button style={{ marginRight: 4 }} disabled={!data.userCanMakeReturnFunding || !returnFundingGroup1 || isLoading} className="btn btn-primary" onClick={() => changeRetourDeFondsStatus(data.id, "A TRANSMETTRE")}>A TRANSMETTRE</Button>
                    <Button style={{ marginRight: 4 }} disabled={!data.userCanMakeReturnFunding || !returnFundingGroup1 || isLoading} className="btn btn-primary" onClick={() => changeRetourDeFondsStatus(data.id, "INSUFFISANTS")}>FONDS INSUFFISANTS</Button>
                    <Button style={{ marginRight: 4 }} disabled={!data.userCanMakeReturnFunding || !returnFundingGroup1 || isLoading} className="btn btn-primary" onClick={() => changeRetourDeFondsStatus(data.id, "A REGULARISER")}>A REGULARISER</Button>
                </>
            )
        } else if (currentStep === "A TRANSMETTRE") {
            return (
                <>
                    <Button className="btn btn-primary" style={{ marginRight: 4 }} disabled={!data.userCanMakeReturnFunding || !returnFundingGroup1 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "INSUFFISANTS")}>FONDS INSUFFISANTS</Button>
                    <Button className="btn btn-primary" style={{ marginRight: 4 }} disabled={!data.userCanMakeReturnFunding || !returnFundingGroup1 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "A REGULARISER")}>A REGULARISER</Button>
                </>
            )
        } else if (currentStep === "A REGULARISER") {
            return (<Button className="btn btn-primary" disabled={!data.userCanMakeReturnFunding || !returnFundingGroup2 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "A VALIDER")}>VALIDER</Button>)
        } else if (currentStep === "A VALIDER") {
            return (<Button className="btn btn-primary" disabled={!data.userCanMakeReturnFunding || !returnFundingGroup3 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "A NOTIFIER")}>VALIDER</Button>)
        } else if (currentStep === "A NOTIFIER") {
            return (<Button className="btn btn-primary" disabled={!data.userCanMakeReturnFunding || !returnFundingGroup1 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "FERMÉ")}>VALIDER</Button>)
        } else if(currentStep === "INSUFFISANTS") {
            return (<Button className="btn btn-primary" disabled={!data.userCanMakeReturnFunding || !returnFundingGroup1 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "A NOTIFIER")}>VALIDER</Button>)
        }
    }

    const findNewSteps = (provider, currentStep) => {
        if (currentStep === "OUVERT") {
            if (provider === "wave") {
                return "A SECURISER"
            }

        } else if (currentStep === "A SECURISER") {
            return "A TRANSMETTRE"
        } else if (currentStep === "A TRANSMETTRE") {
            return "A REGULARISER"
        } else if (currentStep === "A REGULARISER") {
            return "A VALIDER"
        } else if (currentStep === "INSUFFISANTS") {
            return "A NOTIFIER"
        } else if (currentStep === "A VALIDER") {
            return "A NOTIFIER"
        } else if (currentStep === "A NOTIFIER") {
            return "FERMÉ"
        }
    }

    return (
        <>
            <div className="d-flex flex-column p-4">
                <div className="justify-content-between d-flex flex-row">
                    <h4>Résumé des détails de la transaction {data.refMarchand}</h4>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton className="bg-primary">
                        <Modal.Title className="text-white">Confirmez votre action</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Voulez vous vraiment passer à l'étape suivante ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-primary" color="" onClick={handleClose}>
                            Fermer
                        </Button>
                        <ButtonGroup>
                            {NextStepButton(data.etat, data.provider)}
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>
                <div>
                    <br />
                    <p style={{ fontWeight: "bold" }}>Référence du marchand: <span>{data.refMarchand}</span></p>
                    <p style={{ fontWeight: "bold" }}>Référence HUB2: <span>{data.refHub2}</span></p>
                    <p style={{ fontWeight: "bold" }}>Référence opérateur: <span>{data.refOperateur}</span></p>
                    <p style={{ fontWeight: "bold" }}>Numéro de téléphone: <span>{data.numero}</span></p>
                    <p style={{ fontWeight: "bold" }}>Montant de la transaction: <span>{data.montant} {data.currency}</span></p>
                    <p style={{ fontWeight: "bold" }}>Status de la transaction:
                        <span>
                            <Badge bg={"success"}>
                                <span className="h6 mb-0 text-start">SUCCESSFUL</span>
                            </Badge>
                        </span>
                    </p>
                    <p style={{ fontWeight: "bold" }}>Date de reception: <span>{data.dateRecu}</span></p>
                    <p style={{ fontWeight: "bold" }}>Commentaire: <span>{data.commentaire !== "" ? data.commentaire : "N/A"}</span></p>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <Col xs={12} md={6} lg={6} className="d-flex justify-content-center align-items-center flex-column">
                            <span>Statut actuel</span>
                            <Badge bg={badgeColor(data.etat)} style={{ padding: 5, fontSize: "1em" }}>
                                <small>{data.etat}</small>
                            </Badge>
                        </Col>
                        <Col xs={12} md={6} lg={6} className="d-flex justify-content-center align-items-center flex-column">
                            {data.etat !== "FERMÉ" && (
                                <>
                                    <span>Prochain statut</span>
                                    <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Button className="btn btn-primary" style={{ marginRight: 2 }} disabled={!data.userCanMakeReturnFunding || !data.returnFundingGroup1 || isLoading} onClick={() => handleShow()}>{findNewSteps(data.provider, data.etat)}</Button>
                                        {data.etat === "A TRANSMETTRE" && (
                                            <>
                                                <Button className="btn btn-primary" style={{ marginRight: 2 }} disabled={!data.userCanMakeReturnFunding || !data.returnFundingGroup1 || isLoading} onClick={() => handleShow()}>FONDS INSUFFISANTS</Button>
                                            </>
                                        )}
                                        {data.provider === "wave" && data.etat === "A SECURISER" && (
                                            <>
                                                <Button className="btn btn-primary" style={{ marginRight: 2 }} disabled={!data.userCanMakeReturnFunding || !data.returnFundingGroup1 || isLoading} onClick={() => handleShow()}>FONDS INSUFFISANTS</Button>
                                                <Button className="btn btn-primary" style={{ marginRight: 2 }} disabled={!data.userCanMakeReturnFunding || !data.returnFundingGroup1 || isLoading} onClick={() => handleShow()}>A REGULARISER</Button>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                            {/* {NextStepButton(data.etat, data.provider)} */}
                        </Col>
                    </div>
                </div>
            </div>
        </>
    )
}