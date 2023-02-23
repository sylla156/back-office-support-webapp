import {
  Card,
  Table,
} from "@themesberg/react-bootstrap";
import React from "react";
import { TablePagination } from "../TablePagination";
import { format, addMinutes, parseISO } from "date-fns";

export const LocalPaymentReportingList = (props) => {
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
                <th className="border-bottom">paymentId</th>
                <th className="border-bottom">type</th>
                <th className="border-bottom">merchantId</th>
                <th className="border-bottom">Référence du frs</th>
                <th className="border-bottom">amount</th>
                <th className="border-bottom">net</th>
                <th className="border-bottom">fees</th>
                <th className="border-bottom">currency</th>
                <th className="border-bottom">Date</th>
                <th className="border-bottom">time</th>
                <th className="border-bottom">timezone</th>
                <th className="border-bottom">transaction Reference</th>
                <th className="border-bottom">status</th>
                <th className="border-bottom">paymentStatus</th>
                <th className="border-bottom">customer Reference</th>
                <th className="border-bottom">method</th>
                <th className="border-bottom">country</th>
                <th className="border-bottom">provider</th>
                <th className="border-bottom">fournisseur</th>
                <th className="border-bottom">transaction Identifier</th>
                <th className="border-bottom">description</th>
              </tr>
            </thead>
            <tbody>
              {listInfo.map((t) => (
                <LocalPaymentReportingList.TableRow key={`transaction-${t.id}`} {...t} />
              ))}
            </tbody>
          </Table>
          <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
        </Card.Body>
      </Card>
    </>
  );
};

LocalPaymentReportingList.TableRow = (props) => {
  let {
   id,
   number,
   description,
   gatewayId,
   provider,
   country,
   method,
   paymentStatus,
   status,
   paymentId,
   paymentProcessorReference,
   currency,
   updatedAt,
   fees,
   amount,
   merchantId,
   customerReference
  } = props;

  const parseDate = parseISO(updatedAt);
  const date = format(parseDate, "dd/MM/yyyy");
  const time = format(parseDate, 'HH:mm:ss');

  return (
    <tr>
      <td>
        <Card.Link className="fw-normal">{id}</Card.Link>
      </td>
      <td>
        <span className="fw-normal">{paymentId}</span>
      </td>
      <td>
        <span className="fw-normal">{}</span>
      </td>
      <td>
        <span className="fw-normal">{merchantId}</span>
      </td>
      <td>
        <span className="fw-normal">{paymentProcessorReference}</span>
      </td>
      <td>
      <span className="fw-normal">
          {amount} {"XOF"}{" "}
        </span>
      </td>
      <td>
        <span className="fw-normal">{}</span>
      </td>
      <td>
        <span className="fw-normal">{fees}</span>
      </td>
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
        <span className="fw-normal">{"Z"}</span>
      </td>
      <td>
        <span className="fw-normal">{customerReference}</span>
      </td>
      <td>
        <span className="fw-normal">{status}</span>
      </td>
      <td>
        <span className="fw-normal">{paymentStatus}</span>
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
        <span className="fw-normal">{number}</span>
      </td>
  
  
      <td>
        <span className="fw-normal text-wrap">{description}</span>
      </td>
    </tr>
  );
};
