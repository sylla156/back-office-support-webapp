import {Card, Table, Badge, Col} from "@themesberg/react-bootstrap";
import React from "react";
import {MoovTransferMarkLikeRegularised} from "./MoovTransferMarkLikeRegularised";
import {MoovReportTransferInProcessMarkLikeRegularisedList} from "./MoovReportTransferInProcessMarkLikeRegularisedList";

export const MarkMoovTransferLikeRegularisedList = (props) => {

    let {listInfo, onRefresh, userCanAddMoovTransferRegularised} = props
    console.log("listInfo", listInfo);

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Paiement Hub2</th>
                                <th className="border-bottom">Transfert moov</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {

                                return (
                                    <MarkMoovTransferLikeRegularisedList.TableRow
                                        key={`transaction-${index}`}
                                        onRefresh={onRefresh}
                                        processorTransfer={datum.processorTransfer}
                                        candidates={datum.candidates}
                                        userCanAddMoovTransferRegularised={userCanAddMoovTransferRegularised}
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

MarkMoovTransferLikeRegularisedList.TableRow = (props) => {

    const {
        processorTransfer,
        candidates,
        userCanAddMoovTransferRegularised
    } = props;

    return(
        <>
            <tr>
                <td>
                    <MoovTransferMarkLikeRegularised candidates={candidates} />
                </td>
                <td>
                    <MoovReportTransferInProcessMarkLikeRegularisedList processorTransfer={processorTransfer} />
                </td>
                {
                    userCanAddMoovTransferRegularised && (
                        <td>
                            <span></span>
                        </td>
                    )
                }
            </tr>
        </>
    )

}
