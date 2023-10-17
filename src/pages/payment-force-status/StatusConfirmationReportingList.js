import { Card, Table, Button } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { TablePagination } from "../../components/TablePagination";
import { ForceStatusTableListInfos } from "../../components/ForceStatusTableListInfos";
import { UpdateStatusConfirmation } from "../../components/statusConfirmation/UpdateStatusConfirmation";
import { NeedToUpdateLocalDate } from "../../components/statusConfirmation/NeedToUpdateLocalDate";
import { CandidateSuggestion } from "./CandidateSuggestion";
import { DangerouslyForceStatus } from "./DangerouslyForceStatus";
import { AddStatusConfirmation } from "./AddStatusConfirmation";

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
                                    item.confirmedStatus === "PENDING"
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
                                    transfer={transactionsInfos}
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
                                    <Button className="mt-2">Refresh</Button>
                                </>
                            )}
                        </span>
                    </td>
                )}
            </tr>
        </>
    )
}