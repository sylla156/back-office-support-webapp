import {Card, Table, Badge, Col} from "@themesberg/react-bootstrap";
import React from "react";
import {FedapayTransferMarkLikeRegularisedList} from "./FedapayTransferMarkLikeRegularisedList";
import {FedapayReportTransferInProcessMarkLikeRegularisedList} from "./FedapayReportTransferInProcessMarkLikeRegularisedList";


export const MarkFedapayTransferLikeRegularisedList = (props) => {

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
                                <th className="border-bottom">Transfer Fedapay</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {

                                return (
                                    <MarkFedapayTransferLikeRegularisedList.TableRow
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

MarkFedapayTransferLikeRegularisedList.TableRow = (props) => {

    const {
        processorTransfer,
        candidates,
        userCanAddWaveTransferRegularised
    } = props;

    return(
        <>
            <tr>
                <td>
                    <FedapayTransferMarkLikeRegularisedList candidates={candidates} />
                </td>
                <td>
                    <FedapayReportTransferInProcessMarkLikeRegularisedList processorTransfer = {processorTransfer} />
                </td>
            </tr>
        </>
    )

}
