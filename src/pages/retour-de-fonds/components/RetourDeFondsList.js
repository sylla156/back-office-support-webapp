import { Card, Table, Form, Col, Button, Spinner, Badge } from "@themesberg/react-bootstrap";
import React, { useState } from "react"
import { TablePagination } from "../../../components/TablePagination";
import { etatDesRetourDeFonds, CHANGE_STATUS_RETOUR_DE_FONDS, APPKEY } from "../../constante/Const";
import AxiosWebHelper from "../../../utils/axios-helper";
import { useCookies } from "react-cookie";

export const RetourDeFondsList = (props) => {
    const {
        listInfo,
        count,
        currentPage,
        onPageChange,
        onRefresh,
        userCanMakeReturnFunding,
        returnFundingGroup1,
        returnFundingGroup2,
        returnFundingGroup3
    } = props

    const listSize = listInfo.length;

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Reference marchand</th>
                                <th className="border-bottom">Reference HUB2</th>
                                <th className="border-bottom">Reference Opérateur</th>
                                <th className="border-bottom">Numero</th>
                                <th className="border-bottom">Montant</th>
                                <th className="border-bottom">Date de reception</th>
                                <th className="border-bottom">Etat du retour de fonds</th>
                                <th className="border-bottom">Commentaire</th>
                                {/* <th className="border-bottom">AJouté par</th> */}
                                <th className="border-bottom">CreatedAt</th>
                                <th className="border-bottom">UpdatedAt</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <RetourDeFondsList.TableRow returnFundingGroup1={returnFundingGroup1} returnFundingGroup2={returnFundingGroup2} returnFundingGroup3={returnFundingGroup3} key={`operation-${t.id}`} userCanMakeReturnFunding={userCanMakeReturnFunding} onRefresh={onRefresh} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )
}

RetourDeFondsList.TableRow = (props) => {
    const {
        id,
        refMarchand,
        refHub2,
        refOperateur,
        numero,
        montant,
        dateRecu,
        etat,
        commentaire,
        createdAt,
        updatedAt,
        user,
        userCanMakeReturnFunding,
        returnFundingGroup1,
        returnFundingGroup2,
        returnFundingGroup3,
        onRefresh
    } = props

    const [isLoading, setIsLoading] = useState(false)
    const [errorData, setErrorData] = useState(null)
    const [shouldLogin, setShouldLogin] = useState(false);
    const axios = AxiosWebHelper.getAxios();
    const [cookies] = useCookies(["token"]);

    const badgeColor = (status) => {
        if(status === "OUVERT"){
            return "success";
        }
        if(status === "FERMÉ"){
            return "danger";
        }
        return "warning";
    }

    const changeStatus = (id, newState) => {
        if (!id || !newState) {
            throw new Error("Something went wrong")
        } else {
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
                console.log("response", response);
                setIsLoading(false)
                onRefresh()
            }).catch((error) => {
                setIsLoading(false)
                if (error.response) {
                    if (error.response.status === 401) {
                        setShouldLogin(true);
                    } else {
                        setErrorData(error.response.data.message);
                    }
                }
            })
        }
    }

    return (
        <tr>
            <td>
                <span className="fw-normal">
                    {refMarchand}
                </span>
            </td>
            <td>
                <span className="fw-normal">
                    {refHub2}
                </span>
            </td>
            <td>
                <span className="fw-normal">
                    {refOperateur}
                </span>
            </td>
            <td>
                <span className="fw-normal">
                    {numero}
                </span>
            </td>
            <td>
                <span className="fw-normal">
                    {montant}
                </span>
            </td>
            <td>
                <span className="fw-normal">
                    {dateRecu}
                </span>
            </td>
            <td>
                <span className="fw-normal">
                    <Badge bg={badgeColor(etat)} style={{padding:5, fontSize:"1em"}}>
                        {etat}
                    </Badge>
                </span>
            </td>
            <td>
                <span className="fw-normal">
                    {commentaire}
                </span>
            </td>
            {/* <td>
                <span className="fw-normal">
                    assia
                </span>
            </td> */}
            <td>
                <span className="fw-normal">
                    {createdAt}
                </span>
            </td>
            <td>
                <span className="fw-normal">
                    {updatedAt}
                </span>
            </td>
            <td>
                <Button variant="primary" type="button" onClick={() => console.log("okokok")}>
                    Détails
                </Button>
            </td>
        </tr>
    )
}