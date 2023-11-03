import {Card, Table, Badge} from "@themesberg/react-bootstrap";
import React from "react";
import {TablePagination} from "../../../../../components/TablePagination";

export const WaveReportTransferList = (props) => {

    const {
        listInfo,
        count,
        currentPage,
        onPageChange,
        onRefresh,
    } = props;
    const listSize = listInfo.length;

    return(
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">id</th>
                                <th className="border-bottom">Date de la transaction</th>
                                <th className="border-bottom">Transaction ID</th>
                                <th className="border-bottom">Identifiant de groupe</th>
                                <th className="border-bottom">N° de téléphone</th>
                                <th className="border-bottom">Type de la transaction</th>
                                <th className="border-bottom">Résumé</th>
                                <th className="border-bottom">Montant</th>
                                <th className="border-bottom">Montant net</th>
                                <th className="border-bottom">Frais</th>
                                <th className="border-bottom">Montant brut</th>
                                <th className="border-bottom">Solde</th>
                                <th className="border-bottom">Devise</th>
                                <th className="border-bottom">Raison du paiement</th>
                                <th className="border-bottom">Caissier</th>
                                <th className="border-bottom">Nom du client</th>
                                <th className="border-bottom">N° d'identification national</th>
                                <th className="border-bottom">Référence</th>
                                <th className="border-bottom">Pays</th>
                                <th className="border-bottom">Local Payment Id</th>
                                <th className="border-bottom">Dernière date du Rapprochement</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <WaveReportTransferList.TableRow key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )

}

WaveReportTransferList.TableRow = (props) => {

    const {
        id,
        transactionDate,
        transactionId,
        transactionType,
        groupId,
        phoneNumber,
        description,
        netAmount,
        fee,
        grossAmount,
        amount,
        balance,
        country,
        currency,
        paymentReason,
        cashierName,
        customerName,
        nationalId,
        reference,
        localPaymentId,
        lastReconciliationDate
    } = props;

    const transactionDateUtc = new Date(transactionDate);
    const transactionDateFormatted = transactionDateUtc.toLocaleString("pt-BR");

    return(
        <tr>
            <td>
                <Card.Link className="fw-normal">{id}</Card.Link>
            </td>
            <td>
                <span className="fw-normal">{transactionDateFormatted}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionId}</span>
            </td>
            <td>
                <span className="fw-normal">{groupId}</span>
            </td>
            <td>
                <span className="fw-normal">{phoneNumber}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionType}</span>
            </td>
            <td>
                <span className="fw-normal">{description}</span>
            </td>
            <td>
                <span className="fw-normal">{amount}</span>
            </td>
            <td>
                <span className="fw-normal">{netAmount}</span>
            </td>
            <td>
                <span className="fw-normal">{fee}</span>
            </td>
            <td>
                <span className="fw-normal">{grossAmount}</span>
            </td>
            <td>
                <span className="fw-normal">{balance}</span>
            </td>
            <td>
                <span className="fw-normal">{currency}</span>
            </td>
            <td>
                <span className="fw-normal">{paymentReason}</span>
            </td>
            <td>
                <span className="fw-normal">{cashierName}</span>
            </td>
            <td>
                <span className="fw-normal">{customerName}</span>
            </td>
            <td>
                <span className="fw-normal">{nationalId}</span>
            </td>
            <td>
                <span className="fw-normal">{reference}</span>
            </td>
            <td>
                <span className="fw-normal">{country}</span>
            </td>
            <td>
                <span className="fw-normal">{localPaymentId}</span>
            </td>
            <td>
                <span className="fw-normal">{lastReconciliationDate}</span>
            </td>
        </tr>
    )

}
