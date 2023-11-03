import {Card, Table, Badge, Col} from "@themesberg/react-bootstrap";
import React from "react";
import {OrangeTransferMarkLikeRegularisedList} from "../components/transferList/OrangeTransferMarkLikeRegularisedList";
import {OrangeReportTransferInProcessMarkLikeRegularisedList} from "../components/transferList/OrangeReportTransferInProcessMarkLikeRegularisedList";
import MarkOrangeTransferLikeRegularised from "./MarkOrangeTransferLikeRegularised";

export const MarkOrangeTransferLikeRegularisedList = (props) => {

    let {
        listInfo,
        onRefresh,
        userCanAddOrangeTransactiontRegularised,
    } = props

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Transfert Hub2</th>
                                <th className="border-bottom">Transfert Orange</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {

                                return (
                                    <MarkOrangeTransferLikeRegularisedList.TableRow
                                        key={`transaction-${index}`}
                                        onRefresh={onRefresh}
                                        processorTransfer={datum.processorTransfer}
                                        candidates={datum.candidates}
                                        userCanAddOrangeTransactiontRegularised={userCanAddOrangeTransactiontRegularised}
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

MarkOrangeTransferLikeRegularisedList.TableRow = (props) => {

    const {
        candidates,
        processorTransfer,
        userCanAddOrangeTransactiontRegularised
    } = props;

    return (
        <>
            <tr>
                <td>
                    <OrangeTransferMarkLikeRegularisedList candidates={candidates} />
                </td>
                <td>
                    <OrangeReportTransferInProcessMarkLikeRegularisedList processorTransfer={processorTransfer} />
                </td>
                {
                    userCanAddOrangeTransactiontRegularised && (
                        <td>
                            <span></span>
                        </td>
                    )
                }
            </tr>
        </>
    );

};
