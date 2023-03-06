import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import React from "react";
import { OrangeTransferMarkLikeRegularisedList } from "../components/transferList/OrangeTransferMarkLikeRegularisedList";
import { OrangeReportTransferInProcessMarkLikeRegularisedList } from "../components/transferList/OrangeReportTransferInProcessMarkLikeRegularisedList";
import MarkOrangeTransferLikeRegularised from "./MarkOrangeTransferLikeRegularised";

export const MarkOrangeTransferLikeRegularisedList = (props)=> {
  let {
    listInfo,
    count,
    currentPage,
    onPageChange,
    onRefresh,
    userCanAddOrangeTransactiontRegularised,
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
                <th className="border-bottom">Local Transfer infos</th>
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
                <th className="border-bottom">Orange report transfer</th>
                {userCanAddOrangeTransactiontRegularised && (
                  <th className="border-bottom">action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {listInfo.map((t, index) => {
                return (
                  <MarkOrangeTransferLikeRegularisedList.TableRow
                    key={`transaction-${t.transfer.id}-${index}`}
                    onRefresh={onRefresh}
                    userCanAddOrangeTransactiontRegularised={userCanAddOrangeTransactiontRegularised}
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

MarkOrangeTransferLikeRegularisedList.TableRow = (props) => {
  const {
    onRefresh,
    transfer,
    orangeReportTransferCandidates,
    userCanAddOrangeTransactiontRegularised
  } = props;

  return (
    <>
      <tr>
        <td>
          <OrangeTransferMarkLikeRegularisedList transfer={transfer} />
        </td>
        <td>
          <OrangeReportTransferInProcessMarkLikeRegularisedList orangeReportTransferCandidates={orangeReportTransferCandidates} />
        </td>
        {
          userCanAddOrangeTransactiontRegularised && (
            <td>
              <span>
                <MarkOrangeTransferLikeRegularised
                  onRefresh={onRefresh}
                  tranfer={transfer}
                  orangeReportTransferCandidates={orangeReportTransferCandidates}
                />
              </span>
            </td>
          )
        }
      </tr>
    </>
  );
};