import {
  Card,
  Table,
} from "@themesberg/react-bootstrap";
import React from "react";
import { TablePagination } from "../TablePagination";

export const SmsOrangeCashInList = (props) => {
  const { listInfo, count, currentPage, onPageChange } = props;
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
                <th className="border-bottom">msisdn</th>
                <th className="border-bottom">Montant</th>
                <th className="border-bottom">Date transfert</th>
                <th className="border-bottom">Contenus</th>
              </tr>
            </thead>
            <tbody>
              {listInfo.map((t) => (
                <SmsOrangeCashInList.TableRow key={`transaction-${t.id}`} {...t} />
              ))}
            </tbody>
          </Table>
          <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
        </Card.Body>
      </Card>
    </>
  );
};

SmsOrangeCashInList.TableRow = (props) => {
  const {
    id,
    amount,
    content,
    msisdn,
    operatorRef,
    transactionDate,
    transactionDateMin,
    transactionDateMax,
    transferStatus,
    createDate,
    updateDate,
  } = props;

  const transactionDateUtc = new Date(transactionDate);
  const transactionDateFormatted = transactionDateUtc.toLocaleString("pt-BR");

  return (
    <tr>
      <td>
        <Card.Link className="fw-normal">{id}</Card.Link>
      </td>
      <td>
        <span className="fw-normal">{msisdn}</span>
      </td>
      <td>
      <span className="fw-normal">
          {amount} {"XOF"}{" "}
        </span>
      </td>
      <td>
        <span className="fw-normal">{transactionDateFormatted}</span>
        {/* <span className={`fw-normal text-${statusVariant}`}>{status}</span> */}
      </td>
      <td>
        <span className="fw-normal text-wrap">{content}</span>
      </td>
    </tr>
  );
};
