import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import React from "react";
import { OrangePaymentMarkLikeRegularisedList } from "../components/PaymentList/OrangePaymentMarkLikeRegularisedList";
import { OrangeReportPaymentInProcessMarkLikeRegularisedList } from "../components/PaymentList/OrangeReportPaymentInProcessMarkLikeRegularisedList";
import { MarkLikeRegularised } from "../components/PaymentList/MarkLikeRegularised";

export const MarkOrangePaymentLikeRegularisedList = (props)=> {
  let {
    listInfo,
    count,
    currentPage,
    onPageChange,
    onRefresh,
    userCanAddOrangePaymentRegularised,
  } = props
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
                <th className="border-bottom">Local payment infos</th>
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
                <th className="border-bottom">Orange report payment</th>
                {userCanAddOrangePaymentRegularised && (
                  <th className="border-bottom">action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {listInfo.map((t, index) => {
                return (
                  <MarkOrangePaymentLikeRegularisedList.TableRow
                    key={`transaction-${t.paymentIntent.id}-${index}`}
                    onRefresh={onRefresh}
                    userCanAddOrangePaymentRegularised={userCanAddOrangePaymentRegularised}
                    {...t}
                  />
                );
              })}
            </tbody>
          </Table>
          {/* <TablePagination
            size={listSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
            count={count}
          /> */}
        </Card.Body>
      </Card>
    </>
  )
}

MarkOrangePaymentLikeRegularisedList.TableRow = (props) => {
  const {
    onRefresh,
    paymentIntent,
    orangeReportPaymentCandidates,
    userCanAddOrangePaymentRegularised
  } = props;

  return (
    <>
      <tr>
        <td>
          <OrangePaymentMarkLikeRegularisedList paymentIntent={paymentIntent} />
        </td>
        <td>
          <OrangeReportPaymentInProcessMarkLikeRegularisedList orangeReportPaymentCandidates={orangeReportPaymentCandidates} />
        </td>
        {
          userCanAddOrangePaymentRegularised && (
            <td>
              <span>
                <MarkLikeRegularised
                  onRefresh={onRefresh}
                  paymentIntent={paymentIntent}
                  orangeReportPaymentCandidates={orangeReportPaymentCandidates}
                />
              </span>
            </td>
          )
        }
      </tr>
    </>
  );
};