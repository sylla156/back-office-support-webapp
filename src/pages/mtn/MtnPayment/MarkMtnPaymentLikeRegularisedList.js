import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import React from "react";
import { MtnPaymentMarkLikeRegularised } from "./MtnPaymentMarkLikeRegularised";
import { MtnReportPaymentInProcessMarkLikeRegularisedList } from "./MtnReportPaymentInProcessMarkLikeRegularisedList";

export const MarkMtnPaymentLikeRegularisedList = (props) => {
    let { listInfo, onRefresh, userCanAddMtnPaymentRegularised } = props

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Paiement Hub2</th>
                                <th className="border-bottom">Paiement Mtn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {
                                return (
                                    <MarkMtnPaymentLikeRegularisedList.TableRow
                                        key={`transaction-${index}`}
                                        onRefresh={onRefresh}
                                        processorPayment={datum.processorPayment}
                                        candidates={datum.candidates}
                                        userCanAddMtnPaymentRegularised={userCanAddMtnPaymentRegularised}
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

MarkMtnPaymentLikeRegularisedList.TableRow = (props) => {
    const {
        processorPayment,
        candidates,
        userCanAddMtnPaymentRegularised
    } = props;

    return(
        <>
            <tr>
                <td>
                    <MtnPaymentMarkLikeRegularised candidates={candidates} />
                </td>
                <td>
                    <MtnReportPaymentInProcessMarkLikeRegularisedList processorPayment={processorPayment} />
                </td>
                {
                    userCanAddMtnPaymentRegularised && (
                        <td>
                            <span></span>
                        </td>
                    )
                }
            </tr>
        </>
    )
}