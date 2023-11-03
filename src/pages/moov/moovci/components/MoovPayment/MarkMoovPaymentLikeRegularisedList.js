import {Card, Table, Badge, Col} from "@themesberg/react-bootstrap";
import React from "react";
import {MoovPaymentMarkLikeRegularised} from "./MoovPaymentMarkLikeRegularisedList";
import {MoovReportPaymentInProcessMarkLikeRegularisedList} from "./MoovReportPaymentInProcessMarkLikeRegularisedList";


export const MarkMoovPaymentLikeRegularisedList = (props) => {

    let {listInfo, onRefresh, userCanAddMoovPaymentRegularised} = props

    return(
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Paiement HUB2</th>
                                <th className="border-bottom">Paiement Moov</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {

                                return (
                                    <MarkMoovPaymentLikeRegularisedList.TableRow
                                        key={`transaction-${index}`}
                                        onRefresh={onRefresh}
                                        processorPayment={datum.processorPayment}
                                        candidates={datum.candidates}
                                        userCanAddMoovPaymentRegularised={userCanAddMoovPaymentRegularised}
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

MarkMoovPaymentLikeRegularisedList.TableRow = (props) => {

    const {
        processorPayment,
        candidates,
        userCanAddMoovPaymentRegularised
    } = props;

    return(
        <>
            <tr>
                <td>
                    <MoovPaymentMarkLikeRegularised candidates={candidates} />
                </td>
                <td>
                    <MoovReportPaymentInProcessMarkLikeRegularisedList processorPayment={processorPayment} />
                </td>
                {
                    userCanAddMoovPaymentRegularised && (
                        <td>
                            <span>

                            </span>
                        </td>
                    )
                }
            </tr>
        </>
    )

}
