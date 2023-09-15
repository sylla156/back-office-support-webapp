import { Card, Table, Badge, Button, Spinner, Form, InputGroup } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { TablePagination } from "../../components/TablePagination";
import { APPKEY, APPLY_RIGHTS_UPDATE } from "../constante/Const";
import AxiosWebHelper from "../../utils/axios-helper";

export const ListUsers = (props) => {
    const {
        listInfo,
        count,
        currentPage,
        onPageChange,
        userCanUpdateRights,
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
                                <th className="border-bottom">Nom & Prénoms</th>
                                <th className="border-bottom">Email</th>
                                <th className="border-bottom">can Force Status</th>
                                <th className="border-bottom">can Update Cached Transaction</th>
                                <th className="border-bottom">can Add Payment Regularised</th>
                                <th className="border-bottom">can Apply Merchant Fee</th>
                                <th className="border-bottom">can Add Merchant Fee</th>
                                <th className="border-bottom">can Update User Rights</th>
                                <th className="border-bottom">can Delete Merchant Live Fee</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <ListUsers.TableRow userCanUpdateRights={userCanUpdateRights} onRefresh={onRefresh} key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )
}

ListUsers.TableRow = (props) => {
    const {
        id,
        name,
        email,
        canForceStatus,
        canUpdateCachedTransaction,
        canAddPaymentRegularised,
        canApplyMerchantFee,
        canAddMerchantFee,
        canUpdateUserRights,
        userCanUpdateRights,
        canDeleteMerchantFee,
        onRefresh
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [userCanForceStatus, setUserCanForceStatus] = useState(canForceStatus);
    const [userCanUpdateCachedTransaction, setUserCanUpdateCachedTransaction] = useState(canUpdateCachedTransaction);
    const [userCanAddPaymentRegularised, setUserCanAddPaymentRegularised] = useState(canAddPaymentRegularised);
    const [userCanApplyMerchantFee, setUserCanApplyMerchantFee] = useState(canApplyMerchantFee);
    const [userCanAddMerchantFee, setUserCanAddMerchantFee] = useState(canAddMerchantFee);
    const [userCanUpdateUserRights, setUserCanUpdateUserRights] = useState(canUpdateUserRights);
    const [userCanDeleteMerchantFee, setUserCanDeleteMerchantFee] = useState(canDeleteMerchantFee);

    const axios = AxiosWebHelper.getAxios();
    const [cookies] = useCookies(["token"])

    const convertStringToBoolean = (str) => {
        return str === "true";
    }

    const applyChanges = () => {
        setIsLoading(true);
        setErrorData(null);
        const data = {
            canForceStatus: convertStringToBoolean(userCanForceStatus),
            canUpdateCachedTransaction: convertStringToBoolean(userCanUpdateCachedTransaction),
            canAddPaymentRegularised: convertStringToBoolean(userCanAddPaymentRegularised),
            canApplyMerchantFee: convertStringToBoolean(userCanApplyMerchantFee),
            canAddMerchantFee: userCanAddMerchantFee,
            canUpdateUserRights: convertStringToBoolean(userCanUpdateUserRights),
            canDeleteMerchantFee: convertStringToBoolean(userCanDeleteMerchantFee)
        }
        const URL = `${APPLY_RIGHTS_UPDATE}/${id}`;
        axios.patch(URL, data, {
            headers: {
                "Content-Type": "application/json",
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            }
        }).then((result) => {
            if(result.data.status === "success") {
                setIsLoading(false);
                onRefresh();
            }
        }).catch((error) => {
            setIsLoading(false);
            if (error.response) {
                if (error.response.status === 401) {
                    setShouldLogin(true);
                } else {
                    setErrorData(error.response.data.message);
                }
            }
        })
    }

    return (
        <>
            <tr>
                <td>
                    <span className="fw-normal">{name}</span>
                </td>
                <td>
                    <span className="fw-normal">{email}</span>
                </td>
                <td>
                    <span className="fw-normal">
                        <Form.Select disabled={!userCanUpdateRights} value={userCanForceStatus} onChange={(e) => setUserCanForceStatus(e.target.value)}>
                            <option key="1" value={true}>
                                Activé
                            </option>
                            <option key="2" value={false}>
                                Désactivé
                            </option>
                        </Form.Select>
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        <Form.Select disabled={!userCanUpdateRights} value={userCanUpdateCachedTransaction} onChange={(e) => setUserCanUpdateCachedTransaction(e.target.value)}>
                            <option key="1" value={true}>
                                Activé
                            </option>
                            <option key="2" value={false}>
                                Désactivé
                            </option>
                        </Form.Select>
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        <Form.Select disabled={!userCanUpdateRights} value={userCanAddPaymentRegularised} onChange={(e) => setUserCanAddPaymentRegularised(e.target.value)}>
                            <option key="1" value={true}>
                                Activé
                            </option>
                            <option key="2" value={false}>
                                Désactivé
                            </option>
                        </Form.Select>
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        <Form.Select disabled={!userCanUpdateRights} value={userCanApplyMerchantFee} onChange={(e) => setUserCanApplyMerchantFee(e.target.value)}>
                            <option key="1" value={true}>
                                Activé
                            </option>
                            <option key="2" value={false}>
                                Désactivé
                            </option>
                        </Form.Select>
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        <Form.Select disabled={!userCanUpdateRights} value={canAddMerchantFee} onChange={(e) => setUserCanAddMerchantFee(e.target.value)}>
                            <option key="1" value={true}>
                                Activé
                            </option>
                            <option key="2" value={false}>
                                Désactivé
                            </option>
                        </Form.Select>
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        <Form.Select disabled={!userCanUpdateRights} value={userCanUpdateUserRights} onChange={(e) => setUserCanUpdateUserRights(e.target.value)}>
                            <option key="1" value={true}>
                                Activé
                            </option>
                            <option key="2" value={false}>
                                Désactivé
                            </option>
                        </Form.Select>
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        <Form.Select disabled={!userCanUpdateRights} value={userCanDeleteMerchantFee} onChange={(e) => setUserCanDeleteMerchantFee(e.target.value)}>
                            <option key="1" value={true}>
                                Activé
                            </option>
                            <option key="2" value={false}>
                                Désactivé
                            </option>
                        </Form.Select>
                    </span>
                </td>
                <td>
                    <Button variant="primary" onClick={() => applyChanges()} disabled={!userCanUpdateRights}>Appliquer</Button>
                </td>
            </tr>
        </>
    )
}
