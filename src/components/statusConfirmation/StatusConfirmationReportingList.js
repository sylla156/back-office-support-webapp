import { Card, Table, Badge } from "@themesberg/react-bootstrap";
import React from "react";
import { TablePagination } from "../TablePagination";
import { AddStatusConfirmation } from "./AddStatusConfirmation";
import { DangerouslyForceStatus } from "./DangerouslyForceStatus";
import { UpdateStatusConfirmation } from "./UpdateStatusConfirmation";

export const StatusConfirmationReportingList = (props) => {
  let {
    listInfo,
    count,
    currentPage,
    onPageChange,
    onRefresh,
    userCanForceStatus,
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
                <th className="border-bottom">id</th>
                {/* <th className="border-bottom">type</th> */}
                <th className="border-bottom">merchantId</th>
                {/* <th className="border-bottom">Référence du frs</th> */}
                <th className="border-bottom">amount</th>
                {/* <th className="border-bottom">net</th> */}
                {/* <th className="border-bottom">fees</th> */}
                {/* <th className="border-bottom">currency</th> */}
                <th className="border-bottom">Date</th>
                {/* <th className="border-bottom">time</th> */}
                {/* <th className="border-bottom">timezone</th> */}
                <th className="border-bottom">reference</th>
                <th className="border-bottom">status</th>
                {/* <th className="border-bottom">customer Reference</th> */}
                {/* <th className="border-bottom">method</th> */}
                <th className="border-bottom">country</th>
                <th className="border-bottom">provider</th>
                <th className="border-bottom">fournisseur</th>
                <th className="border-bottom">transaction Identifier</th>
                <th className="border-bottom">description</th>
                <th className="border-bottom">status confirmation</th>
                {userCanForceStatus && <th className="border-bottom">action</th>}
              </tr>
            </thead>
            <tbody>
              {listInfo.map((t, index) => {
                return (
                  <StatusConfirmationReportingList.TableRow
                    key={`transaction-${t.transactionsInfos.id}-${index}`}
                    onRefresh={onRefresh}
                    userCanForceStatus={userCanForceStatus}
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
    canForceStatus,
    canForceStatusMessage,
    statusConfirmations,
    onRefresh,
    userCanForceStatus,
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
    if (canForceStatusMessage) return (
      <p className="fw-normal font-small text-wrap bg-light rounded rounded-lg py-1 px-2 mb-2">
        {canForceStatusMessage}
      </p>
    );
  }

  return (
    <tr>
      <td>
        <Card.Link className="fw-normal">{id}</Card.Link>
      </td>
      {/* <td>
        <span className="fw-normal">{type}</span>
      </td> */}
      <td>
        <span className="fw-normal">{merchantId}</span>
      </td>
      {/* <td>
        <span className="fw-normal">{referenceOfFrs}</span>
      </td> */}
      <td>
        <span className="fw-normal">
          {amount} {currency}
        </span>
      </td>
      {/* <td>
        <span className="fw-normal">{net}</span>
      </td> */}
      {/* <td>
        <span className="fw-normal">{fees}</span>
      </td> */}
      {/* <td>
        <span className="fw-normal">{currency}</span>
      </td> */}
      <td>
        <span className="fw-normal">{createdAt}</span>
      </td>
      {/* <td>
        <span className="fw-normal">{time}</span>
      </td> */}
      {/* <td>
        <span className="fw-normal">{timezone}</span>
      </td> */}
      <td>
        <span className="fw-normal">{transactionReference}</span>
      </td>
      <td>
        <span className="fw-normal">{status}</span>
      </td>
      {/* <td>
        <span className="fw-normal">{customerReference}</span>
      </td> */}
      {/* <td>
        <span className="fw-normal">{method}</span>
      </td> */}
      <td>
        <span className="fw-normal">{country}</span>
      </td>
      <td>
        <span className="fw-normal">{provider}</span>
      </td>
      <td>
        <span className="fw-normal">{gatewayId}</span>
      </td>
      <td>
        <span className="fw-normal">{transactionIdentifier}</span>
      </td>

      <td>
        <span className="fw-normal text-wrap">{description}</span>
      </td>

      <td>
        {/* {statusConfirmations && statusConfirmations.length !==0 ? statusConfirmations[1].confirmedStatus : ""} */}
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
              {/* modal update */}
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
  );
};
