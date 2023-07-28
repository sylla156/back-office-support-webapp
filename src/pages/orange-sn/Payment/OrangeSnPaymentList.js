import { Card, Table, Badge } from "@themesberg/react-bootstrap";
import React from "react";
import { TablePagination } from "../../../components/TablePagination";

export const OrangeSnPaymentList = (props) => {
    const {
        listInfo,
        count,
        currentPage,
        onPageChange,
    } = props

    const listSize = listInfo.length

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">id</th>
                                <th className="border-bottom">Sender Msisdn</th>
                                <th className="border-bottom">Receiver Msisdn</th>
                                <th className="border-bottom">Montant</th>
                                <th className="border-bottom">Type de service</th>
                                <th className="border-bottom">Statut</th>
                                <th className="border-bottom">Numéro de référence</th>
                                <th className="border-bottom">N° transaction</th>
                                <th className="border-bottom">Date de la transaction</th>
                                <th className="border-bottom">Tag de la transaction</th>
                                <th className="border-bottom">TNO Msisdn</th>
                                <th className="border-bottom">Nom du portefeuille de l'expéditeur</th>
                                <th className="border-bottom">Nom du portefeuille du récepteur</th>
                                <th className="border-bottom">Local Payment Id</th>
                                <th className="border-bottom">Dernière date du Rapprochement</th>
                                <th className="border-bottom">rawData</th>
                                <th className="border-bottom">CreatedAt</th>
                                <th className="border-bottom">UpdatedAt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <OrangeSnPaymentList.TableRow key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )
}

OrangeSnPaymentList.TableRow = (props) => {
    const {
        transactionDate,
        id,
        transactionId,
        status,
        serviceType,
        transactionTag,
        senderMsisdn,
        receiverMsisdn,
        transactionAmount,
        referenceNumber,
        tno_msisdn,
        senderWalletName,
        receiverWalletName,
        localPaymentId,
        lastReconciliationDate,
        createDate,
        updateDate,
        rawData
    } = props

    return (
        <>
            <tr>
                <td>
                    <Card.Link className="fw-normal">{id}</Card.Link>
                </td>
                <td>
                    <span className="fw-normal">{senderMsisdn}</span>
                </td>
                <td>
                    <span className="fw-normal">{receiverMsisdn}</span>
                </td>
                <td>
                    <span className="fw-normal">{transactionAmount}</span>
                </td>
                <td>
                    <span className="fw-normal">{serviceType}</span>
                </td>
                <td>
                    <span className="fw-normal">{status}</span>
                </td>
                <td>
                    <span className="fw-normal">{referenceNumber}</span>
                </td>
                <td>
                    <span className="fw-normal">{transactionId}</span>
                </td>
                <td>
                    <span className="fw-normal">{transactionDate}</span>
                </td>
                <td>
                    <span className="fw-normal">{transactionTag}</span>
                </td>
                <td>
                    <span className="fw-normal">{tno_msisdn}</span>
                </td>
                <td>
                    <span className="fw-normal">{senderWalletName}</span>
                </td>
                <td>
                    <span className="fw-normal">{receiverWalletName}</span>
                </td>
                <td>
                    <span className="fw-normal">{localPaymentId}</span>
                </td>
                <td>
                    <span className="fw-normal">{lastReconciliationDate}</span>
                </td>
                <td>
                    <span className="fw-normal">{rawData}</span>
                </td>
                <td>
                    <span className="fw-normal">{createDate}</span>
                </td>
                <td>
                    <span className="fw-normal">{updateDate}</span>
                </td>
            </tr>
        </>
    )
}