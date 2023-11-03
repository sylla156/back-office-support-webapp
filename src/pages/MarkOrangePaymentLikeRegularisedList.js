import {Card, Table, Badge, Col} from "@themesberg/react-bootstrap";
import React from "react";
import {OrangePaymentMarkLikeRegularisedList} from "../components/PaymentList/OrangePaymentMarkLikeRegularisedList";
import {OrangeReportPaymentInProcessMarkLikeRegularisedList} from "../components/PaymentList/OrangeReportPaymentInProcessMarkLikeRegularisedList";
import {MarkLikeRegularised} from "../components/PaymentList/MarkLikeRegularised";

export const MarkOrangePaymentLikeRegularisedList = (props)=> {

    let {
        listInfo,
        onRefresh,
        userCanAddOrangePaymentRegularised,
    } = props
    console.log("listInfo", listInfo);
    return (
        <>
        
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Paiement HUB2</th>
                                <th className="border-bottom">Paiement Orange</th>
                                {userCanAddOrangePaymentRegularised && (
                                    <th className="border-bottom">action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {

                                return (
                                    <MarkOrangePaymentLikeRegularisedList.TableRow
                                        key={`transaction-${index}`}
                                        processorPayment={datum.processorPayment}
                                        candidates={datum.candidates}
                                        onRefresh={onRefresh}
                                        userCanAddOrangePaymentRegularised={userCanAddOrangePaymentRegularised}
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

MarkOrangePaymentLikeRegularisedList.TableRow = (props) => {

    const {
        onRefresh,
        paymentIntent,
        orangeReportPaymentCandidates,
        processorPayment,
        candidates,
        userCanAddOrangePaymentRegularised
    } = props;

    return (
        <>
            <tr>
                <td>
                    <OrangePaymentMarkLikeRegularisedList candidates={candidates} />
                </td>
                <td>
                    <OrangeReportPaymentInProcessMarkLikeRegularisedList processorPayment={processorPayment} />
                </td>
                {
                    userCanAddOrangePaymentRegularised && (
                        <td>
                            <span></span>
                        </td>
                    )
                }
            </tr>
        </>
    );

};
