import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import React from "react";
import { MtnTransferMarkLikeRegularised } from "./MtnTransferMarkLikeRegularised";
import { MtnReportTransferInProcessMarkLikeRegularisedList } from "./MtnReportTransferInProcessMarkLikeRegularisedList";

export const MarkMtnTransferLikeRegularisedList = (props) => {
    let { listInfo, onRefresh, userCanAddMtnTransferRegularised } = props

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Transfert Hub2</th>
                                <th className="border-bottom">Transfert Mtn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {
                                return (
                                    <MarkMtnTransferLikeRegularisedList.TableRow
                                        key={`transaction-${index}`}
                                        onRefresh={onRefresh}
                                        processorTransfer={datum.processorTransfer}
                                        candidates={datum.candidates}
                                        userCanAddMtnTransferRegularised={userCanAddMtnTransferRegularised}
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

MarkMtnTransferLikeRegularisedList.TableRow = (props) => {
    const {
        processorTransfer,
        candidates,
        userCanAddMtnTransferRegularised
    } = props;

    return(
        <>
            <tr>
                <td>
                    <MtnTransferMarkLikeRegularised candidates={candidates} />
                </td>
                <td>
                    <MtnReportTransferInProcessMarkLikeRegularisedList processorTransfer={processorTransfer} />
                </td>
                {
                    userCanAddMtnTransferRegularised && (
                        <td>
                            <span></span>
                        </td>
                    )
                }
            </tr>
        </>
    )
}