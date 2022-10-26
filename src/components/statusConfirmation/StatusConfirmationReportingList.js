import { Card, Table, Badge } from "@themesberg/react-bootstrap";
import React from "react";
import SplitString from "../../utils/splitString";
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
                <th className="border-bottom">type</th>
                <th className="border-bottom">merchantId</th>
                <th className="border-bottom">Référence du frs</th>
                <th className="border-bottom">amount</th>
                <th className="border-bottom">net</th>
                {/* <th className="border-bottom">fees</th> */}
                <th className="border-bottom">currency</th>
                <th className="border-bottom">Date</th>
                <th className="border-bottom">time</th>
                <th className="border-bottom">timezone</th>
                <th className="border-bottom">transaction Reference</th>
                <th className="border-bottom">status</th>
                <th className="border-bottom">customer Reference</th>
                <th className="border-bottom">method</th>
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
              {listInfo.map((t) => {
                return (
                  <StatusConfirmationReportingList.TableRow
                    key={`transaction-${t.transactionsInfos.id}`}
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
    statusConfirmations,
    onRefresh,
    userCanForceStatus,
  } = props;
  let {
    id,
    type,
    merchantId,
    referenceOfFrs,
    amount,
    net,
    fees,
    currency,
    date,
    time,
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

  return (
    <tr>
      <td>
        <Card.Link className="fw-normal">{id}</Card.Link>
      </td>
      <td>
        <span className="fw-normal">{type}</span>
      </td>
      <td>
        <span className="fw-normal">{merchantId}</span>
      </td>
      <td>
        <span className="fw-normal">{referenceOfFrs}</span>
      </td>
      <td>
        <span className="fw-normal">
          {amount} {"XOF"}{" "}
        </span>
      </td>
      <td>
        <span className="fw-normal">{net}</span>
      </td>
      {/* <td>
        <span className="fw-normal">{fees}</span>
      </td> */}
      <td>
        <span className="fw-normal">{currency}</span>
      </td>
      <td>
        <span className="fw-normal">{date}</span>
      </td>
      <td>
        <span className="fw-normal">{time}</span>
      </td>
      <td>
        <span className="fw-normal">{timezone}</span>
      </td>
      <td>
        <span className="fw-normal">{transactionReference}</span>
      </td>
      <td>
        <span className="fw-normal">{status}</span>
      </td>
      <td>
        <span className="fw-normal">{customerReference}</span>
      </td>
      <td>
        <span className="fw-normal">{method}</span>
      </td>
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
              />
            </>
          );
        })}
      </td>

      {userCanForceStatus && (
        <td>
          <span className="fw-normal text-wrap">
            {canForceStatus ? (
              <DangerouslyForceStatus id={id} onRefresh={onRefresh} />
            ) : (
              <AddStatusConfirmation id={id} onRefresh={onRefresh} />
            )}
          </span>
        </td>
      )}
    </tr>
  );
};
