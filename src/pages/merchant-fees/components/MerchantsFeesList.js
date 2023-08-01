import { Card, Table, Badge, Button, Spinner, Modal, Form } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { TablePagination } from "../../../components/TablePagination";
import { APPLY_MERCHANT_FEES_URL, APPKEY, MERCHANTS_FEES_URL } from "../../constante/Const";
import AxiosWebHelper from "../../../utils/axios-helper";
import { useCookies } from "react-cookie";
import AlertDismissable from "../../../components/AlertDismissable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";


export const MerchantsFeesList = (props) => {
    const {
        listInfo,
        count,
        currentPage,
        onPageChange,
        userCanApplyMerchantFees,
        onRefresh
    } = props;
    const listSize = listInfo.length;

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Identifiant marchant</th>
                                <th className="border-bottom">Pays</th>
                                <th className="border-bottom">Provider</th>
                                <th className="border-bottom">Méthode</th>
                                <th className="border-bottom">Type de la transaction</th>
                                <th className="border-bottom">Type</th>
                                <th className="border-bottom">Value</th>
                                <th className="border-bottom">Crée par</th>
                                <th className="border-bottom">Date de creation</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <MerchantsFeesList.TableRow userCanApplyMerchantFees={userCanApplyMerchantFees} onRefresh={onRefresh} key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )
}

MerchantsFeesList.TableRow = (props) => {
    const {
        id,
        type,
        merchantId,
        value,
        method,
        country,
        transactionType,
        provider,
        hasBeenApplied,
        userCanApplyMerchantFees,
        createdBy,
        createdAt,
        onRefresh
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [show, setShow] = useState(false);
    const axios = AxiosWebHelper.getAxios();
    const [cookies] = useCookies(["token","user"])
    const userCanCreateMerchantFees = cookies.user.canAddMerchantFee

    const handleShow = () => {
        setShow(true);
    }

    const applyMerchantFees = (id) => {
        if (!id) return 'Fees id is required';

        setIsLoading(true)
        setErrorData(null)
        axios.post(APPLY_MERCHANT_FEES_URL, {}, {
            headers: {
                "Content-Type": "multipart/form-data",
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            },
            params: { id }
        }).then((result) => {
            console.log("result", result);
            setIsLoading(false)
            // handleClose()
            onRefresh()
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

    const deleteMerchantFees = async(id) => {
        if (!id) return 'Fees id is required';

        setIsLoading(true)
        setErrorData(null)
        const url = `${MERCHANTS_FEES_URL}/${id}`;
        await axios.delete(url, {
            headers: {
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            },
        }).then((_result) => {
            setIsLoading(false)
            onRefresh()
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

    return (
        <>
            <tr>
                <td>
                    <span className="fw-normal">{merchantId}</span>
                </td>
                <td>
                    <span className="fw-normal">{country}</span>
                </td>
                <td>
                    <span className="fw-normal">{provider}</span>
                </td>
                <td>
                    <span className="fw-normal">{method}</span>
                </td>
                <td>
                    <span className="fw-normal">{transactionType}</span>
                </td>
                <td>
                    <span className="fw-normal">{type}</span>
                </td>
                <td>
                    <span className="fw-normal">{value}</span>
                </td>
                <td>
                    <span className="fw-normal">{createdBy}</span>
                </td>
                <td>
                    <span className="fw-normal">{createdAt}</span>
                </td>
                {hasBeenApplied ? (
                    <td>
                        <p>Frais appliqué</p>
                    </td>
                ) : (
                    <>
                        {isLoading ? (
                            <div className="d-flex justify-content-center">
                                <Spinner animation="border " size="sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <>
                                <td>
                                    <Button variant="primary" onClick={() => applyMerchantFees(id)} disabled={!userCanApplyMerchantFees}>Appliquer</Button>
                                    <Button variant="danger" className="ms-2" onClick={() => handleShow()} disabled={!userCanCreateMerchantFees}>Supprimer</Button>
                                </td>
                            </>
                        )}

                    </>
                )}
            </tr>
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
                        Suppresion de frais marchand
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="file-field">
                        <div className="d-flex justify-content-xl-center ms-xl-3">
                            <div className="d-flex">
                                <div>
                                    <h5>Voulez vous supprimer ce frais marchand ?</h5>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        onClick={() => { deleteMerchantFees(id) }}
                    >
                        Supprimer
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