import {Card, Table, Badge, Col} from "@themesberg/react-bootstrap";
import React from "react";
import {TablePagination} from "../../../../components/TablePagination";
import {WavePaymentMarkLikeRegularisedList} from "./WavePaymentMarkLikeRegularisedList";
import {WaveReportPaymentInProcessMarkLikeRegularisedList} from "./WaveReportPaymentInProcessMarkLikeRegularisedList";


export const MarkWavePaymentLikeRegularidesList = (props) => {

    let {
        listInfo,
        onRefresh,
        userCanAddWavePaymentRegularised,
    } = props

    return(
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Paiement Hub2</th>
                                <th className="border-bottom">Paiement wave</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((datum, index) => {

                                return (
                                    <MarkWavePaymentLikeRegularidesList.TableRow
                                        key={`transaction-${index}`}
                                        onRefresh={onRefresh}
                                        processorPayment={datum.processorPayment}
                                        candidates={datum.candidates}
                                        userCanAddWavePaymentRegularise={userCanAddWavePaymentRegularised}
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

MarkWavePaymentLikeRegularidesList.TableRow = (props) => {

    const {
        processorPayment,
        candidates,
        userCanAddWavePaymentRegularised
    } = props;

    return(
        <>
            <tr>
                <td>
                    <WavePaymentMarkLikeRegularisedList candidates={candidates} />
                </td>
                <td>
                    <WaveReportPaymentInProcessMarkLikeRegularisedList processorPayment={processorPayment} />
                </td>
                {
                    userCanAddWavePaymentRegularised && (
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
