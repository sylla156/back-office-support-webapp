import { Card, Table, Button, Spinner, Toast } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { TablePagination } from "../../components/TablePagination";
import { ForceStatusTableListInfos } from "../../components/ForceStatusTableListInfos";
import { UpdateStatusConfirmation } from "./UpdateStatusConfirmation";
import { NeedToUpdateLocalDate } from "../../components/statusConfirmation/NeedToUpdateLocalDate";
import { CandidateSuggestion } from "./CandidateSuggestion";
import { DangerouslyForceStatus } from "./DangerouslyForceStatus";
import { AddStatusConfirmation } from "./AddStatusConfirmation";
import { REFRESH_PAYMENT_STATUS, APPKEY } from "../constante/Const";
import AxiosWebHelper from "../../utils/axios-helper";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";

export const StatusConfirmationReportingList = (props) => {
    let {
        listInfo,
        count,
        currentPage,
        onPageChange,
        onRefresh,
        userCanForceStatus,
        userCanUpdateLocalData,
    } = props;
    const listSize = listInfo.length;
    return (
        <>
            {/* Payment table liste  */}
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Infos</th>
                                <th className="border-bottom">Status confirmation</th>
                                {userCanForceStatus && (
                                    <th className="border-bottom">action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t, index) => {
                                return (
                                    <StatusConfirmationReportingList.TableRow
                                        key={`transaction-${t.transactionsInfos.id}-${index}`}
                                        onRefresh={onRefresh}
                                        userCanForceStatus={userCanForceStatus}
                                        userCanUpdateLocalData={userCanUpdateLocalData}
                                        {...t}
                                    />
                                )
                            })}
                        </tbody>
                    </Table>
                    <TablePagination
                        size={listSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        count={count}
                    />
                </Card.Body>
            </Card>
        </>
    )
}

StatusConfirmationReportingList.TableRow = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const axios = AxiosWebHelper.getAxios();
    const [cookies] = useCookies(["token"]);
    const [version, setVersion] = useState(0);
    
    const {
        transactionsInfos,
        canForceStatus,
        canForceStatusMessage,
        statusConfirmations,
        onRefresh,
        userCanForceStatus,
        smsContents,
        smsContentMessage,
        orangeReportTransfers,
        orangeReportTransferMessage,
        shouldUpdateLocalData,
        messageLocalData,
        userCanUpdateLocalData,
        messageReportLocalData,
        shouldUpdateReportLocalData,
        shouldExtendSearch,
        extendSearchMessage
    } = props;
    let {
        id,
        merchantId,
        transactionId,
        amount,
        currency,
        createdAt,
        timezone,
        transactionReference,
        status,
        customerReference,
        method,
        country,
        provider,
        transactionIdentifier,
        description,
    } = transactionsInfos;

    const [gatewaysId, setGatewaysId] = useState([
        "hub2_mm_ci_orange_live",
        "hub2_mm_ci_mtn_live",
        "hub2_mm_ci_moov_live",
        "hub2_mm_ci_wave_live",
    ]);

    const actionButton = () => {
        if (canForceStatus) return;

        if (canForceStatusMessage) {
            return (
                <p className="fw-normal font-small text-wrap bg-light rounded rounded-lg py-1 px-2 mb-2">
                    {canForceStatusMessage}
                </p>
            );
        }
    }

    const RefreshStatus = (id, transactionId) => {
        setIsLoaded(true);
        setErrorData(null);
        axios.get(REFRESH_PAYMENT_STATUS, {
            params: {
                pi_id: id,
                pay_id: transactionId
            },
            headers: {
                AppKey: APPKEY,
                authenticationtoken: cookies.token,
            }
        }).then((result) => {
            console.log("result", result.data);
            setIsLoaded(false);
            onRefresh();
        }).catch((error) => {
            setIsLoaded(false);
            // if (error.response) {
            //     if (error.response.status === 401) {
            //         setShouldLogin(true);
            //     } else {
            //         setErrorData(error.response.data.message);
            //     }
            // }
        })
    }

    if(shouldLogin){
        return <Redirect to={Routes.Signin.path} />
    }

    return (
        <>
            <tr>
                <td>
                    <ForceStatusTableListInfos transactionsInfos={transactionsInfos} />
                </td>
                <td>
                    {statusConfirmations.map((item, index) => {
                        const statusVariant =
                            item.confirmedStatus === "successful" ||
                                item.confirmedStatus === "success" ||
                                item.confirmedStatus === "SUCCESSFUL" ||
                                item.confirmedStatus === "SUCCESS"
                                ? "success"
                                : item.confirmedStatus === "pending" ||
                                    item.confirmedStatus === "Pending" ||
                                    item.confirmedStatus === "PENDING" ||
                                    item.confirmedStatus === "processing"
                                    ? "warning"
                                    : item.confirmedStatus === "FAILLED" ||
                                        item.confirmedStatus === "failed" ||
                                        item.confirmedStatus === "FAILED" ||
                                        item.confirmedStatus === "failled"
                                        ? "danger"
                                        : "primary";
                        return (
                            <>
                                <UpdateStatusConfirmation
                                    statusConfirmation={item}
                                    statusVariantColor={statusVariant}
                                    onRefresh={onRefresh}
                                    userCanForceStatus={userCanForceStatus}
                                    payment={transactionsInfos}
                                />
                            </>
                        );
                    })}
                    {actionButton()}
                    {gatewaysId.includes(transactionsInfos?.gatewayId) && (
                        <>
                            <div className="bg-dark m-auto mt-3" style={{ height: 1, width: "100%" }}></div>
                            <p>Candidates suggestions</p>
                        </>
                    )}
                    {shouldUpdateLocalData ? (
                        <NeedToUpdateLocalDate
                            userCanUpdateLocalData={userCanUpdateLocalData}
                            messageLocalData={messageLocalData}
                        />
                    ) : (
                        <CandidateSuggestion
                            candidates={smsContents}
                            message={smsContentMessage}
                            label={"SMS"}
                            id={id}
                            onRefresh={onRefresh}
                            userCanForceStatus={userCanForceStatus}
                            payment={transactionsInfos}
                            messageLocalData={messageLocalData}
                        />
                    )}
                    {shouldUpdateLocalData ? (
                        <NeedToUpdateLocalDate
                            userCanUpdateLocalData={userCanUpdateLocalData}
                            messageLocalData={messageLocalData}
                        />
                    ) : (
                        shouldUpdateReportLocalData ? <NeedToUpdateLocalDate
                            userCanUpdateLocalData={userCanUpdateLocalData}
                            messageLocalData={messageReportLocalData}
                        /> : <CandidateSuggestion
                            candidates={orangeReportTransfers}
                            message={orangeReportTransferMessage}
                            shouldExtendSearch={shouldExtendSearch}
                            extendSearchMessage={extendSearchMessage}
                            label={"RO"}
                            id={id}
                            onRefresh={onRefresh}
                            userCanForceStatus={userCanForceStatus}
                            payment={transactionsInfos}
                            messageLocalData={messageLocalData}
                        />
                    )}
                </td>
                {userCanForceStatus && (
                    <td>
                        <span className="fw-normal text-wrap">
                            {canForceStatus ? (
                                <DangerouslyForceStatus
                                    id={id}
                                    onRefresh={onRefresh}
                                    payment={transactionsInfos}
                                />
                            ):(
                                <>
                                    <AddStatusConfirmation
                                        id={id}
                                        onRefresh={onRefresh}
                                        payment={transactionsInfos}
                                    />
                                    {isLoaded === false ? (
                                        <Button className="mt-2" onClick={() => RefreshStatus(id, transactionId)}>Refresh</Button>
                                    ) : (
                                        <div className="d-flex justify-content-center">
                                            <Spinner animation="border " size="sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        </div>
                                    )}
                                </>
                            )}
                        </span>
                    </td>
                )}
            </tr>
        </>
    )
}