import { Card, Table, Badge } from "@themesberg/react-bootstrap";
import React from "react";
import { TablePagination } from "../../../components/TablePagination";

export const IntouchReportPaymentList = (props) => {
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
                                <th className="border-bottom">Groupe Réseaux</th>
                                <th className="border-bottom">Pays</th>
                                <th className="border-bottom">Code agence</th>
                                <th className="border-bottom">Code de service</th>
                                <th className="border-bottom">N° transaction</th>
                                <th className="border-bottom">Transaction status</th>
                                <th className="border-bottom">N° destinataire</th>
                                <th className="border-bottom">Login agent</th>
                                <th className="border-bottom">Type agent</th>
                                <th className="border-bottom">Date de création</th>
                                <th className="border-bottom">Date d'envoi vers part</th>
                                <th className="border-bottom">Etat</th>
                                <th className="border-bottom">Action faite</th>
                                <th className="border-bottom">Status</th>
                                <th className="border-bottom">Message</th>
                                <th className="border-bottom">Montant</th>
                                <th className="border-bottom">Code recharger</th>
                                <th className="border-bottom">Motif/Identifiant</th>
                                <th className="border-bottom">Raw ID Partenaire DIST</th>
                                <th className="border-bottom">ID Partenaire DIST</th>
                                <th className="border-bottom">Local Payment Id</th>
                                <th className="border-bottom">Dernière date du Rapprochement</th>
                                <th className="border-bottom">CreatedAt</th>
                                <th className="border-bottom">UpdatedAt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <IntouchReportPaymentList.TableRow key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )
}

IntouchReportPaymentList.TableRow = (props) => {
    const {
        id, networkGroup, transactionId, transactionStatus, country, agency_code, serviceCode, numTransactionGu, recipient, loginAgent, agentType,rawPartnerDistTransactionId, partnerDistTransactionId, lastReconciliationDate, regularisationDate, createdAtDate, sendingDate, state, actionDone, statut, message, transactionMontant, reloadedCode, reason, customerCode, localPaymentId, createDate, updateDate
    } = props
    const transactionDateUtc = new Date(sendingDate);

    return(
        <tr>
            <td>
                <Card.Link className="fw-normal">{id}</Card.Link>
            </td>
           
            <td>
                <span className="fw-normal">{networkGroup}</span>
            </td>
            <td>
                <span className="fw-normal">{country}</span>
            </td>
            <td>
                <span className="fw-normal">{agency_code}</span>
            </td>
            <td>
                <span className="fw-normal">{serviceCode}</span>
            </td>
            <td>
                <span className="fw-normal">{numTransactionGu}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionStatus}</span>
            </td>
            <td>
                <span className="fw-normal">{recipient}</span>
            </td>
            <td>
                <span className="fw-normal">{loginAgent}</span>
            </td>
            <td>
                <span className="fw-normal">{agentType}</span>
            </td>
            <td>
                <span className="fw-normal">{createdAtDate}</span>
            </td>
            <td>
                <span className="fw-normal">{sendingDate}</span>
            </td>
            <td>
                <span className="fw-normal">{state}</span>
            </td>
            <td>
                <span className="fw-normal">{actionDone}</span>
            </td>
            <td>
                <span className="fw-normal">{statut}</span>
            </td>
            <td>
                <span className="fw-normal">{message}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionMontant}</span>
            </td>
            <td>
                <span className="fw-normal">{reloadedCode}</span>
            </td>
            <td>
                <span className="fw-normal">{reason}</span>
            </td>
            <td>
                <span className="fw-normal">{rawPartnerDistTransactionId}</span>
            </td>
            
            <td>
                <span className="fw-normal">{partnerDistTransactionId}</span>
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