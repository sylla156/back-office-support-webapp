import {Card, Table, Badge, Button, Spinner, Modal} from "@themesberg/react-bootstrap";
import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {TablePagination} from "../../../components/TablePagination";
import AxiosWebHelper from "../../../utils/axios-helper";
import AlertDismissable from "../../../components/AlertDismissable";
import {MERCHANTS_LIVE_FEES_URL, APPKEY} from "../../constante/Const";

export const MerchantsLiveFees = (props) => {

    const {
        listInfo,
        count,
        currentPage,
        onPageChange,
        onRefresh,
        userCanDeleteMerchantFee
    } = props;

    const listSize = 15;
    const startIndex = (currentPage - 1) * listSize;
    const endIndex = startIndex + listSize;

    const pageItemsToDisplay = listInfo.slice(startIndex, endIndex);

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
                                <th className="border-bottom">Date d'application</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageItemsToDisplay.map((t) => (
                                <MerchantsLiveFees.TableRow onRefresh={onRefresh} userCanDeleteMerchantFee={userCanDeleteMerchantFee} key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )

}

MerchantsLiveFees.TableRow = (props) => {

    const {
        id,
        type,
        merchantId,
        value,
        method,
        country,
        transactionType,
        userCanDeleteMerchantFee,
        provider,
        createdAt
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [show, setShow] = useState(false);
    const axios = AxiosWebHelper.getAxios();
    const [cookies] = useCookies(["token", "user"])

    const handleShow = () => {

        setShow(true);
    
    }

    const handleClose = () => {

        setShow(false);
    
    }

    const deleteMerchantFee = async(id) => {

        if(!id) return 'Fee id is required'

        setIsLoading(true)
        setErrorData(null)
        const url = `${MERCHANTS_LIVE_FEES_URL}/${id}`;
        await axios.delete(url, {
            headers:{
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            },
        }).then((result) => {

            console.log(result);
            handleClose()
            setIsLoading(false)
            // onRefresh()
        
        }).catch((error) => {

            setIsLoading(false)
            if(error.response.status === 401){

                setShouldLogin(true)
            
            }else{

                setErrorData(error.response.data.message)
            
            }
        
        })
    
    }

    return(
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
                    <span className="fw-normal">{createdAt}</span>
                </td>
                <td>
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
                                    <Button variant="danger" className="ms-2" onClick={() => handleShow()} disabled={!userCanDeleteMerchantFee}>Supprimer</Button>
                                </td>
                            </>
                        )}
                    </>
                </td>
            </tr>
            <Modal
                size="md"
                show={show}
                onHide={() => {

                    handleClose()
                
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton closeVariant="white" className="bg-primary">
                    <Modal.Title className="text-white">
                        Suppression de frais marchand live
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="file-field">
                        <div className="d-flex justify-content-xl-center ms-xl-3">
                            <div className="d-flex">
                                <div>
                                    <h5>Voulez vous supprimer ce frais marchand live?</h5>
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

                            handleClose();
                        
                        }}
                    >
                        Fermer
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {

                            deleteMerchantFee(id) 

                        }}
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
