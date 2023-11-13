import React, { useState, useEffect } from "react";
import { Button, Col, Badge, Spinner } from "@themesberg/react-bootstrap";
import { etatDesRetourDeFonds, CHANGE_STATUS_RETOUR_DE_FONDS, APPKEY } from "../../constante/Const";
import AxiosWebHelper from "../../../utils/axios-helper";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

export const TransactionDetails = (props) => {
    const data = props.rowData
    const [isLoading, setIsLoading] = useState(false)
    const [errorData, setErrorData] = useState(null)
    const axios = AxiosWebHelper.getAxios()
    const [cookies] = useCookies(["token"])
    const history = useHistory();

    
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
        console.log("en cours");
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
                    <Button className="btn btn-primary" disabled={!data.userCanMakeReturnFunding || !data.returnFundingGroup1 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "A REGULARISER")}>A REGULARISER</Button>
                )
            } else {
                return (<Button disabled={!data.userCanMakeReturnFunding || !data.returnFundingGroup1 || isLoading} className="btn btn-primary" onClick={() => changeRetourDeFondsStatus(data.id, "A TRANSMETTRE")}>A TRANSMETTRE</Button>)
            }
        } else if (currentStep === "A TRANSMETTRE") {
            return (<Button className="btn btn-primary" disabled={!data.userCanMakeReturnFunding || !data.returnFundingGroup1 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "A REGULARISER")}>A REGULARISER</Button>)
        } else if (currentStep === "A REGULARISER") {
            return (<Button className="btn btn-primary" disabled={!data.userCanMakeReturnFunding || !data.returnFundingGroup2 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "A VALIDER")}>A VALIDER</Button>)
        } else if (currentStep === "A VALIDER") {
            return (<Button className="btn btn-primary" disabled={!data.userCanMakeReturnFunding || !data.returnFundingGroup3 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "A NOTIFIER")}>A NOTIFIER</Button>)
        } else if (currentStep === "A NOTIFIER") {
            return (<Button className="btn btn-primary" disabled={!data.userCanMakeReturnFunding || !data.returnFundingGroup1 || isLoading} onClick={() => changeRetourDeFondsStatus(data.id, "FERMÉ")}>FERMÉ</Button>)
        }
    }

    return (
        <>
            <div className="d-flex flex-column p-4">
                <div className="justify-content-between d-flex flex-row">
                    <h4>Résumé des détails de la transaction {data.refMarchand}</h4>
                </div>
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
                    <p style={{ fontWeight: "bold" }}>Commentaire: <span>{data.commentaire}</span></p>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <Col xs={12} md={6} lg={6} className="d-flex justify-content-center align-items-center flex-column">
                            <span>Statut actuel</span>
                            <Badge bg={badgeColor(data.etat)} style={{ padding: 5, fontSize: "1em" }}>
                                <small>{data.etat}</small>
                            </Badge>
                        </Col>
                        <Col xs={12} md={6} lg={6} className="d-flex justify-content-center align-items-center flex-column">
                            <span>Prochain statut</span>
                            {NextStepButton(data.etat, data.provider)}
                        </Col>
                    </div>
                </div>
            </div>
        </>
    )
}