import { Card, Table, Badge, Button, Spinner } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { TablePagination } from "../../../components/TablePagination";
import { APPLY_MERCHANT_FEES_URL, APPKEY } from "../../constante/Const";
import AxiosWebHelper from "../../../utils/axios-helper";
import { useCookies } from "react-cookie";


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
        onRefresh
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const axios = AxiosWebHelper.getAxios();
    const [cookies] = useCookies(["token"])



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

    return (
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

                        <td>
                            <Button variant="primary" onClick={() => applyMerchantFees(id)} disabled={!userCanApplyMerchantFees}>Appliquer</Button>
                        </td>
                    )}

                </>
            )}
        </tr>
    )
}