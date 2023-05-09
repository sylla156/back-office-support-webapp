import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import React from "react";
import { TablePagination } from "../../../../../components/TablePagination";
import { WaveTransferMarkLikeRegularisedList } from "./WaveTransferMarkLikeRegularisedList";
import { WaveReportTransferInProcessMarkLikeRegularisedList } from "./WaveReportTransferInProcessMarkLikeRegularisedList";

export const MarkWaveTransferLikeRegularisedList = (props) => {
    let {
        listInfo,
        onRefresh,
        userCanAddWaveTransferRegularised,
      } = props

      return(
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                        <tr>
                            <th className="border-bottom">Transfer Hub2</th>
                            <th className="border-bottom">Transfer wave</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listInfo.map((datum, index) => {
                            return (
                                <MarkWaveTransferLikeRegularisedList.TableRow
                                  key={`transaction-${index}`}
                                  onRefresh={onRefresh}
                                  processorTransfer={datum.processorTransfer}
                                  candidates={datum.candidates}
                                  userCanAddWaveTransferRegularised={userCanAddWaveTransferRegularised}
                                />
                              );
                        })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
      )
}

MarkWaveTransferLikeRegularisedList.TableRow = (props) => {
    const {
        processorTransfer,
        candidates,
        userCanAddWaveTransferRegularised
      } = props;

      return(
        <>
            <tr>
                <td>
                    <WaveTransferMarkLikeRegularisedList candidates={candidates} />
                </td>
                <td>
                    <WaveReportTransferInProcessMarkLikeRegularisedList processorTransfer = {processorTransfer} />
                </td>
            </tr>
        </>
      )
}