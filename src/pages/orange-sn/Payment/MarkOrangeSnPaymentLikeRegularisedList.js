import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import React from "react";
import { OrangeSnPaymentMarkLikeRegularised } from "./OrangeSnPaymentMarkLikeRegularised";
import { OrangeSnReportPaymentInProcessMarkLikeRegularisedList } from "./OrangeSnReportPaymentInProcessMarkLikeRegularisedList";

export const MarkOrangeSnPaymentLikeRegularisedList = (props) => {
    let { listInfo, onRefresh, userCanAddOrangeSnPaymentRegularised } = props

    return (
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
            <Card.Body className="pt-0">
                <Table hover className="user-table align-items-center">
                    <thead>
                        <tr>
                            <th className="border-bottom">Paiement Hub2</th>
                            <th className="border-bottom">Paiement Orange SN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listInfo.map((datum, index) => {
                            return (
                                <MarkOrangeSnPaymentLikeRegularisedList.TableRow
                                    key={`transaction-${index}`}
                                    onRefresh={onRefresh}
                                    processorPayment={datum.processorPayment}
                                    candidates={datum.candidates}
                                    userCanAddOrangeSnPaymentRegularised={userCanAddOrangeSnPaymentRegularised}
                                />
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}

MarkOrangeSnPaymentLikeRegularisedList.TableRow = (props) => {
    const {
        processorPayment,
        candidates,
        userCanAddOrangeSnPaymentRegularised
    } = props;

    return (
        <>
            <tr>
                <td>
                    <OrangeSnPaymentMarkLikeRegularised candidates={candidates} />
                </td>
                <td>
                    <OrangeSnReportPaymentInProcessMarkLikeRegularisedList processorPayment={processorPayment} />
                </td>
                {
                    userCanAddOrangeSnPaymentRegularised && (
                        <td>
                            <span></span>
                        </td>
                    )
                }
            </tr>
        </>
    )
}