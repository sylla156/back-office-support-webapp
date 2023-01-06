import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import React from "react";
import { TablePagination } from "../TablePagination";
import { AddStatusConfirmation } from "./AddStatusConfirmation";
import { DangerouslyForceStatus } from "./DangerouslyForceStatus";
import { UpdateStatusConfirmation } from "./UpdateStatusConfirmation";
import { ForceStatusTableListInfos } from "../ForceStatusTableListInfos";
import { CandidateSuggestion } from "./CandidateSuggestion";
import { NeedToUpdateLocalDate } from "./NeedToUpdateLocalDate";

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
      {/* Transfer table liste  */}
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                {/* <th className="border-bottom">id</th> */}
                {/* <th className="border-bottom">type</th> */}
                <th className="border-bottom">Infos</th>
                {/* <th className="border-bottom">Référence du frs</th> */}
                {/* <th className="border-bottom">amount</th> */}
                {/* <th className="border-bottom">net</th> */}
                {/* <th className="border-bottom">fees</th> */}
                {/* <th className="border-bottom">currency</th> */}
                {/* <th className="border-bottom">Date</th> */}
                {/* <th className="border-bottom">time</th> */}
                {/* <th className="border-bottom">timezone</th> */}
                {/* <th className="border-bottom">reference</th> */}
                {/* <th className="border-bottom">status</th> */}
                {/* <th className="border-bottom">customer Reference</th> */}
                {/* <th className="border-bottom">method</th> */}
                {/* <th className="border-bottom">country</th> */}
                {/* <th className="border-bottom">provider</th>
                <th className="border-bottom">fournisseur</th>
                <th className="border-bottom">transaction Identifier</th>
                <th className="border-bottom">description</th> */}
                <th className="border-bottom">status confirmation</th>
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
                );
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
  );
};

StatusConfirmationReportingList.TableRow = (props) => {
  const {
    transactionsInfos,
    canForceStatus, // ok
    canForceStatusMessage, //ok
    statusConfirmations, // ok
    onRefresh, // ok
    userCanForceStatus, // ok
    smsContents, // ok
    smsContentMessage, // ok
    orangeReportTransfers, // ok
    orangeReportTransferMessage, // ok
    shouldUpdateLocalData,
    messageLocalData,
    userCanUpdateLocalData,
    messageReportLocalData,
    shouldUpdateReportLocalData
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
    gatewayId,
    transactionIdentifier,
    description,
  } = transactionsInfos;

  const actionButton = () => {
    if (canForceStatus) return;

    // Here we can not force status
    // If we have a message, display it instead of allowing to add
    if (canForceStatusMessage)
      return (
        <p className="fw-normal font-small text-wrap bg-light rounded rounded-lg py-1 px-2 mb-2">
          {canForceStatusMessage}
        </p>
      );
  };

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
          {transactionsInfos?.gatewayId === "hub2_mm_ci_orange_live" && (
            <>
              <div
                className="bg-dark m-auto mt-3"
                style={{ height: 1, width: "100%" }}
              ></div>
              <p>Candidates suggestions</p>
            </>
          ) }
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
              transfer={transactionsInfos}
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
          /> :<CandidateSuggestion
              candidates={orangeReportTransfers}
              message={orangeReportTransferMessage}
              label={"RO"}
              id={id}
              onRefresh={onRefresh}
              userCanForceStatus={userCanForceStatus}
              transfer={transactionsInfos}
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
                  transfer={transactionsInfos}
                />
              ) : (
                <AddStatusConfirmation
                  id={id}
                  onRefresh={onRefresh}
                  transfer={transactionsInfos}
                />
              )}
            </span>
          </td>
        )}
      </tr>
    </>
  );
};
