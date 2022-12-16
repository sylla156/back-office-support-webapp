import { Card, Table, Badge } from "@themesberg/react-bootstrap";
import React from "react";
import { TablePagination } from "../TablePagination";

export const OrangeReportTransferList =(props)=> {
  const {
    listInfo,
    count,
    currentPage,
    onPageChange,
    onRefresh,
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
                <th className="border-bottom">pays</th>
                <th className="border-bottom">Date</th>
                <th className="border-bottom">Heure</th>
                <th className="border-bottom">Réference</th>
                <th className="border-bottom">Service</th>
                <th className="border-bottom">Application</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Mode</th>
                <th className="border-bottom">N° de compte agent</th>
                <th className="border-bottom">Wallet agent</th>
                <th className="border-bottom">N° de compte correspondant</th>
                <th className="border-bottom">Wallet correspondant</th>
                <th className="border-bottom">Montant Débit</th>
                <th className="border-bottom">Montant Credit</th>
                <th className="border-bottom">Commission</th>
                <th className="border-bottom">Sous-réseau</th>
              </tr>
            </thead>
            <tbody>
              {listInfo.map((t) => (
                <OrangeReportTransferList.TableRow key={`transaction-${t.id}`} {...t} />
              ))}
            </tbody>
          </Table>
          <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
        </Card.Body>
      </Card>
    </>
  );
}

OrangeReportTransferList.TableRow = (props) => {
  const {
    id,
    hour,
    date,
    reportDate,
    reportDateString,
    application,
    reference,
    status,
    service,
    mode,
    emitterPhoneNumber,
    emitterWallet,
    speudoNumber,
    receiverPhoneNumber,
    receiverWallet,
    creditAmount,
    flowRateAmount,
    fee,
    country,
  } = props;

  // const transactionDateUtc = new Date(transactionDate);
  // const transactionDateFormatted = transactionDateUtc.toLocaleString("pt-BR");

  return (
    <tr>
      <td>
        <Card.Link className="fw-normal">{id}</Card.Link>
      </td>
      <td>
        <span className="fw-normal">{country}</span>
      </td>
      <td>
        <span className="fw-normal">{date}</span>
      </td>
      <td>
        <span className="fw-normal">{hour}</span>
      </td>
      <td>
        <span className="fw-normal">{reference}</span>
      </td>
      <td>
        <span className="fw-normal">{service}</span>
      </td>
      <td>
        <span className="fw-normal">{application}</span>
      </td>
      <td>
        <span className="fw-normal">{status}</span>
      </td>
      <td>
        <span className="fw-normal">{mode}</span>
      </td>
      <td>
        <span className="fw-normal">{emitterPhoneNumber}</span>
      </td>
      <td>
        <span className="fw-normal">{emitterWallet}</span>
      </td>
      <td>
        <span className="fw-normal">{receiverPhoneNumber}</span>
      </td>
      <td>
        <span className="fw-normal">{receiverWallet}</span>
      </td>
      <td>
        <span className="fw-normal">{flowRateAmount}</span>
      </td>
      <td>
        <span className="fw-normal">{creditAmount}</span>
      </td>
      <td>
        <span className="fw-normal">{fee}</span>
      </td>
      <td>
        <span className="fw-normal">{}</span>
      </td>
      {/* <td>
      <span className="fw-normal">
          {amount} {"XOF"}{" "}
        </span>
      </td> */}
      {/* <td>
        <span className="fw-normal">{transactionDateFormatted}</span>
        <span className={`fw-normal text-${statusVariant}`}>{status}</span>
      </td> */}
      {/* <td>
        <span className="fw-normal text-wrap">{content}</span>
      </td> */}
    </tr>
  );
};
