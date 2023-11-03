import {Card, Table, Badge, Col} from "@themesberg/react-bootstrap";
import React from "react";
import {FreeTransferMarkLikeRegularised} from "./FreeTransferMarkLikeRegularised";
import {FreeReportTransferInProcessMarkLikeRegularisedList} from "./FreeReportTransferInProcessMarkLikeRegularisedList";

export const MarkFreeTransferLikeRegularisedList = (props) => {

    let {listInfo, onRefresh, userCanAddFreeTransferRegularised} = props

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Transfert HUB2</th>
                                <th className="border-bottom">Transfert Free</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {

                                return (
                                    <MarkFreeTransferLikeRegularisedList.TableRow
                                        key={`transaction-${index}`}
                                        onRefresh={onRefresh}
                                        processorTransfer={datum.processorTransfer}
                                        candidates={datum.candidates}
                                        userCanAddFreeTransferRegularised={userCanAddFreeTransferRegularised}
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

MarkFreeTransferLikeRegularisedList.TableRow = (props) => {

    const {
        processorTransfer,
        candidates,
        userCanAddFreeTransferRegularised
    } = props;

    return(
        <>
            <tr>
                <td>
                    <FreeTransferMarkLikeRegularised candidates={candidates} />
                </td>
                <td>
                    <FreeReportTransferInProcessMarkLikeRegularisedList processorTransfer={processorTransfer} />
                </td>
                {
                    userCanAddFreeTransferRegularised && (
                        <td>
                            <span></span>
                        </td>
                    )
                }
            </tr>
        </>
    )

}
