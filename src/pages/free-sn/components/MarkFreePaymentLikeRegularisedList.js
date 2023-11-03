import {Card, Table, Badge, Col} from "@themesberg/react-bootstrap";
import React from "react";
import {FreePaymentMarkLikeRegularised} from "./FreePaymentMarkLikeRegularised";
import {FreeReportPaymentInProcessMarkLikeRegularisedList} from "./FreeReportPaymentInProcessMarkLikeRegularisedList";

export const MarkFreePaymentLikeRegularisedList = (props) => {

    let {listInfo, onRefresh, userCanAddFreePaymentRegularised} = props

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Paiement HUB2</th>
                                <th className="border-bottom">Paiement Free</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {

                                return (
                                    <MarkFreePaymentLikeRegularisedList.TableRow
                                        key={`transaction-${index}`}
                                        onRefresh={onRefresh}
                                        processorPayment={datum.processorPayment}
                                        candidates={datum.candidates}
                                        userCanAddFreePaymentRegularised={userCanAddFreePaymentRegularised}
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

MarkFreePaymentLikeRegularisedList.TableRow = (props) => {

    const {
        processorPayment,
        candidates,
        userCanAddFreePaymentRegularised
    } = props;

    return (
        <>
            <tr>
                <td>
                    <FreePaymentMarkLikeRegularised candidates={candidates} />
                </td>
                <td>
                    <FreeReportPaymentInProcessMarkLikeRegularisedList processorPayment={processorPayment} />
                </td>
                {
                    userCanAddFreePaymentRegularised && (
                        <td>
                            <span></span>
                        </td>
                    )
                }
            </tr>
        </>
    )

}
