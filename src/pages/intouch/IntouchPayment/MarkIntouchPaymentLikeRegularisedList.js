import {Card, Table, Badge, Col} from "@themesberg/react-bootstrap";
import React from "react";
import {IntouchPaymentMarkLikeRegularised} from "./IntouchPaymentMarkRegularised";
import {IntouchReportPaymentInProcessMarkLikeRegularisedList} from "./IntouchReportPaymentInProcessMarkLikeRegularisedList";

export const MarkIntouchPaymentLikeRegularisedList = (props) => {

    let {listInfo, onRefresh, userCanAddIntouchPaymentRegularised} = props

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Paiement Hub2</th>
                                <th className="border-bottom">Paiement Intouch</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {

                                return (
                                    <MarkIntouchPaymentLikeRegularisedList.TableRow
                                        key={`transaction-${index}`}
                                        onRefresh={onRefresh}
                                        processorPayment={datum.processorTransfer}
                                        candidates={datum.candidates}
                                        userCanAddIntouchPaymentRegularised={userCanAddIntouchPaymentRegularised}
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

MarkIntouchPaymentLikeRegularisedList.TableRow = (props) => {

    const {
        processorPayment,
        candidates,
        userCanAddIntouchPaymentRegularised
    } = props;

    return(
        <>
            <tr>
                <td>
                    <IntouchPaymentMarkLikeRegularised candidates={candidates} />
                </td>
                <td>
                    <IntouchReportPaymentInProcessMarkLikeRegularisedList processorPayment={processorPayment} />
                </td>
                {
                    userCanAddIntouchPaymentRegularised && (
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
