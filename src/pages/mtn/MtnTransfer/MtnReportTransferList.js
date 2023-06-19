import { Card, Table, Badge } from "@themesberg/react-bootstrap";
import React from "react";
import { TablePagination } from "../../../components/TablePagination";


export const MtnReportTransferList = (props) => {
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
                                <th className="border-bottom">N° transaction</th>
                                <th className="border-bottom">Date de la transaction</th>
                                <th className="border-bottom">Statut</th>
                                <th className="border-bottom">Type de transaction</th>
                                <th className="border-bottom">Note/Message</th>
                                <th className="border-bottom">De</th>
                                <th className="border-bottom">Nom de l'emetteur</th>
                                <th className="border-bottom">Nom du gestionnaire</th>
                                <th className="border-bottom">À</th>
                                <th className="border-bottom">Numéro du destinataire</th>
                                <th className="border-bottom">Nom du destinataire</th>
                                <th className="border-bottom">Initié Par</th>
                                <th className="border-bottom">Pour le compte de</th>
                                <th className="border-bottom">Raw Montant</th>
                                <th className="border-bottom">Montant</th>
                                <th className="border-bottom">Devise</th>
                                <th className="border-bottom">Frais</th>
                                <th className="border-bottom">Devise 2</th>
                                <th className="border-bottom">Pays</th>
                                <th className="border-bottom">Local Transfert Id</th>
                                <th className="border-bottom">Dernière date du Rapprochement</th>
                                <th className="border-bottom">CreatedAt</th>
                                <th className="border-bottom">UpdatedAt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <MtnReportTransferList.TableRow key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )
}

MtnReportTransferList.TableRow = (props) => {
    const { 
        transactionDate,
        id,
        identifiant,
        transactionId,
        statut,
        typeOperation,
        country,
        infos,
        message,
        rawFromNumber,
        fromName,
        fromHandlerName,
        rawTo,
        toName,
        toHandlerName,
        toNumber,
        initiedBy,
        rawAmount,
        amount,
        currency,
        currency_2,
        fees,
        localTransferId,
        lastReconciliationDate,
        createDate,
        updateDate,
        rawToNumber
    } = props

    return (
        <>
            <tr>
                <td>
                    <Card.Link className="fw-normal">{id}</Card.Link>
                </td>
                <td>
                    <span className="fw-normal">{identifiant}</span>
                </td>
                <td>
                    <span className="fw-normal">{transactionDate}</span>
                </td>
                <td>
                    <span className="fw-normal">{statut}</span>
                </td>
                <td>
                    <span className="fw-normal">{typeOperation}</span>
                </td>
                <td>
                    <span className="fw-normal">{message}</span>
                </td>
                <td>
                    <span className="fw-normal">{rawFromNumber}</span>
                </td>
                <td>
                    <span className="fw-normal">{fromName}</span>
                </td>
                <td>
                    <span className="fw-normal">{fromHandlerName}</span>
                </td>
                <td>
                    <span className="fw-normal">{rawTo}</span>
                </td>
                <td>
                    <span className="fw-normal">{toNumber}</span>
                </td>
                <td>
                    <span className="fw-normal">{toName}</span>
                </td>
                <td>
                    <span className="fw-normal">{initiedBy}</span>
                </td>
                <td>
                    <span className="fw-normal">{rawToNumber}</span>
                </td>
                <td>
                    <span className="fw-normal">{rawAmount}</span>
                </td>
                <td>
                    <span className="fw-normal">{amount}</span>
                </td>
                <td>
                    <span className="fw-normal">{currency}</span>
                </td>

                <td>
                    <span className="fw-normal">{fees}</span>
                </td>
                <td>
                    <span className="fw-normal">{currency_2}</span>
                </td>
                <td>
                    <span className="fw-normal">{country}</span>
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
        </>
    )
}