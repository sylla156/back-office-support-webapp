import {Card, Table, Badge} from "@themesberg/react-bootstrap";
import React from "react";
import {TablePagination} from "../../../../../components/TablePagination";


export const MoovReportTransferList = (props) => {

    const {
        listInfo,
        count,
        currentPage,
        onPageChange,
        onRefresh,
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
                                <th className="border-bottom">N° origine</th>
                                <th className="border-bottom">N° destinataire</th>
                                <th className="border-bottom">Compte origine</th>
                                <th className="border-bottom">Compte destinataire</th>
                                <th className="border-bottom">Numéro de téléphone</th>
                                <th className="border-bottom">Profile compte origine</th>
                                <th className="border-bottom">Profile compte destinataire</th>
                                <th className="border-bottom">Date de la transaction</th>
                                <th className="border-bottom">Type de transaction</th>
                                <th className="border-bottom">Nom & Prénoms compte origine</th>
                                <th className="border-bottom">Nom & Prénoms compte destinataire</th>
                                <th className="border-bottom">Montant</th>
                                <th className="border-bottom">Solde avant compte origine</th>
                                <th className="border-bottom">Solde avant compte destinataire</th>
                                <th className="border-bottom">Solde apres compte origine</th>
                                <th className="border-bottom">Solde apres compte destinataire</th>
                                <th className="border-bottom">Status</th>
                                <th className="border-bottom">Commission</th>
                                <th className="border-bottom">Pays</th>
                                <th className="border-bottom">Operateur Transaction ID</th>
                                <th className="border-bottom">Local Transfert Id</th>
                                <th className="border-bottom">Dernière date du Rapprochement</th>
                                <th className="border-bottom">CreatedAt</th>
                                <th className="border-bottom">UpdatedAt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <MoovReportTransferList.TableRow key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )

}

MoovReportTransferList.TableRow = (props) => {

    const {
        transactionDate,
        id,
        transactionProcessorId,
        transactionNumber,
        status,
        commission,
        rawSourceNumber,
        rawRecipientNumber,
        recipientNumber,
        sourceAccount,
        recipientAccount,
        profileSourceAccount,
        profileRecipientAccount,
        transactionType,
        sourceAccountFullname,
        recipientAccountFullname, amount, sourceAccountBalanceBefore, recipientAccountBalanceBefore, sourceAccountBalanceAfter, country, recipientAccountBalanceAfter, localTransferId, lastReconciliationDate, createDate, updateDate
    } = props

    const transactionDateUtc = new Date(transactionDate);

    return(
        <tr>
            <td>
                <Card.Link className="fw-normal">{id}</Card.Link>
            </td>
           
            <td>
                <span className="fw-normal">{transactionNumber}</span>
            </td>
            <td>
                <span className="fw-normal">{rawSourceNumber}</span>
            </td>
            <td>
                <span className="fw-normal">{rawRecipientNumber}</span>
            </td>
            <td>
                <span className="fw-normal">{sourceAccount}</span>
            </td>
            <td>
                <span className="fw-normal">{recipientAccount}</span>
            </td>
            <td>
                <span className="fw-normal">{recipientNumber}</span>
            </td>
            <td>
                <span className="fw-normal">{profileSourceAccount}</span>
            </td>
            <td>
                <span className="fw-normal">{profileRecipientAccount}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionDate}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionType}</span>
            </td>
            <td>
                <span className="fw-normal">{sourceAccountFullname}</span>
            </td>
            <td>
                <span className="fw-normal">{recipientAccountFullname}</span>
            </td>
            <td>
                <span className="fw-normal">{amount}</span>
            </td>
            <td>
                <span className="fw-normal">{sourceAccountBalanceBefore}</span>
            </td>
            <td>
                <span className="fw-normal">{recipientAccountBalanceBefore}</span>
            </td>
            <td>
                <span className="fw-normal">{sourceAccountBalanceAfter}</span>
            </td>
            <td>
                <span className="fw-normal">{recipientAccountBalanceAfter}</span>
            </td>
            <td>
                <span className="fw-normal">{status}</span>
            </td>
            
            <td>
                <span className="fw-normal">{commission}</span>
            </td>
            <td>
                <span className="fw-normal">{country}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionProcessorId}</span>
            </td>
            <td>
                <span className="fw-normal">{localTransferId}</span>
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
