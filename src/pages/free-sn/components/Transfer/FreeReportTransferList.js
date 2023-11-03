import {Card, Table, Badge} from "@themesberg/react-bootstrap";
import React from "react";
import {TablePagination} from "../../../../components/TablePagination";


export const FreeReportTransferList = (props) => {

    const {
        listInfo,
        count,
        currentPage,
        onPageChange,
    } = props;
    const listSize = listInfo.length;

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">id</th>
                                <th className="border-bottom">N° transaction</th>
                                <th className="border-bottom">Date de la transaction</th>
                                <th className="border-bottom">Numéro de téléphone</th>
                                <th className="border-bottom">Statut</th>
                                <th className="border-bottom">Montant</th>
                                <th className="border-bottom">Solde avant</th>
                                <th className="border-bottom">Solde apres</th>
                                <th className="border-bottom">Raison</th>
                                <th className="border-bottom">Raw Data</th>
                                <th className="border-bottom">Local Payment Id</th>
                                <th className="border-bottom">Dernière date du Rapprochement</th>
                                <th className="border-bottom">CreatedAt</th>
                                <th className="border-bottom">UpdatedAt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <FreeReportTransferList.TableRow key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )

}

FreeReportTransferList.TableRow = (props) => {

    const {
        id,
        transactionId,
        transactionDate,
        phoneNumber,
        statut,
        amount,
        balanceBefore,
        balanceAfter,
        reason,
        rawData,
        localPaymentId,
        lastReconciliationDate,
        createDate,
        updateDate
    } = props

    return(
        <tr>
            <td>
                <Card.Link className="fw-normal">{id}</Card.Link>
            </td>
           
            <td>
                <span className="fw-normal">{transactionId}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionDate}</span>
            </td>
            <td>
                <span className="fw-normal">{phoneNumber}</span>
            </td>
            <td>
                <span className="fw-normal">{statut}</span>
            </td>
            <td>
                <span className="fw-normal">{amount}</span>
            </td>
            <td>
                <span className="fw-normal">{balanceBefore}</span>
            </td>
            <td>
                <span className="fw-normal">{balanceAfter}</span>
            </td>
            <td>
                <span className="fw-normal">{reason}</span>
            </td>
            <td>
                <span className="fw-normal">{rawData}</span>
            </td>
            <td>
                <span className="fw-normal">{localPaymentId}</span>
            </td>
            <td>
                <span className="fw-normal">{lastReconciliationDate}</span>
            </td>
            <td>
                <span className="fw-normal">{createDate}</span>
            </td>
            <td>
                <span className="fw-normal">{updateDate}</span>
            </td>
        </tr>
    )

}
