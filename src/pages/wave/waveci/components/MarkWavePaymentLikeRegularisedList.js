import { Card, Table, Badge, Col } from "@themesberg/react-bootstrap";
import React from "react";
import { TablePagination } from "../../../../components/TablePagination";


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
                            <th className="border-bottom">Local payment infos</th>
                            
                            <th className="border-bottom">Wave report payment</th>
                            {userCanAddWavePaymentRegularised && (
                            <th className="border-bottom">action</th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {listInfo.map((t, index) => {
                            return (
                            <MarkWavePaymentLikeRegularidesList.TableRow
                                key={`transaction-${t.paymentIntent.id}-${index}`}
                                onRefresh={onRefresh}
                                userCanAddWavePaymentRegularised={userCanAddWavePaymentRegularised}
                                {...t}
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