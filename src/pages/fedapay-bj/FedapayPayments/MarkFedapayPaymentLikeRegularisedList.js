import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import React from "react";
import { FedapayPaymentMarkLikeRegularisedList } from "./FedapayPaymentMarkLikeRegularisedList";
import { FedapayReportPaymentInProcessMarkLikeRegularisedList } from "./FedapayReportPaymentInProcessMarkLikeRegularisedList";

export const MarkFedapayPaymentLikeRegularisedList = (props) => {
    let {
        listInfo,
        onRefresh,
        userCanAddFedapayPaymentRegularised
    } = props

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Paiement Hub2</th>
                                <th className="border-bottom">Paiement Fedapay</th>

                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {
                                return (
                                    <MarkFedapayPaymentLikeRegularisedList.TableRow
                                        key={`transaction-${index}`}
                                        onRefresh={onRefresh}
                                        processorPayment={datum.processorPayment}
                                        candidates={datum.candidates}
                                        userCanAddWavePaymentRegularise={userCanAddFedapayPaymentRegularised}
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

MarkFedapayPaymentLikeRegularisedList.TableRow = (props) => {
    const {
        processorPayment,
        candidates,
        userCanAddFedapayPaymentRegularised
    } = props

    return(
        <>
            <tr>
                <td>
                    <FedapayPaymentMarkLikeRegularisedList candidates={candidates} />
                </td>
                <td>
                    <FedapayReportPaymentInProcessMarkLikeRegularisedList processorPayment={processorPayment} />
                </td>
            </tr>
        </>
    )
}