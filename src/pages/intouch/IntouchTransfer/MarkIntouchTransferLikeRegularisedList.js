import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import React from "react";
import { IntouchTransferMarkLikeRegularised } from "./IntouchTransferMarkLikeRegularised";
import { IntouchReportTransferInProcessMarkLikeRegularisedList } from "./IntouchReportTransferInProcessMarkLikeRegularisedList";

export const MarkIntouchTransferLikeRegularisedList = (props) => {
    let { listInfo, onRefresh, userCanAddIntouchTransferRegularised } = props

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Transfert Hub2</th>
                                <th className="border-bottom">Transfert Intouch</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {
                                return (
                                    <MarkIntouchTransferLikeRegularisedList.TableRow
                                        key={`transaction-${index}`}
                                        onRefresh={onRefresh}
                                        processorTransfer={datum.processorTransfer}
                                        candidates={datum.candidates}
                                        userCanAddIntouchTransferRegularised={userCanAddIntouchTransferRegularised}
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

MarkIntouchTransferLikeRegularisedList.TableRow = (props) => {
    const {
        processorTransfer,
        candidates,
        userCanAddIntouchTransferRegularised
    } = props;

    return(
        <>
            <tr>
                <td>
                    <IntouchTransferMarkLikeRegularised candidates={candidates} />
                </td>
                <td>
                    <IntouchReportTransferInProcessMarkLikeRegularisedList processorTransfer={processorTransfer} />
                </td>
                {
                    userCanAddIntouchTransferRegularised && (
                        <td>
                            <span></span>
                        </td>
                    )
                }
            </tr>
        </>
    )
}