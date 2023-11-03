import {Card, Table, Badge} from "@themesberg/react-bootstrap";
import React from "react";
import {TablePagination} from "../../../components/TablePagination";

export const FreeReportPaymentList = (props) => {

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
                                <th className="border-bottom">Date de la transaction</th>
                                <th className="border-bottom">Numéro de téléphone</th>
                                <th className="border-bottom">Statut</th>
                                <th className="border-bottom">DWH_SERVICE_NAME</th>
                                <th className="border-bottom">PAYER_CATEGORY_CODE</th>
                                <th className="border-bottom">PAYER_FIRST_NAME</th>
                                <th className="border-bottom">PAYER_LAST_NAME</th>
                                <th className="border-bottom">PAYEE_MSISDN</th>
                                <th className="border-bottom">PAYEE_FIRST_NAME</th>
                                <th className="border-bottom">PAYEE_LAST_NAME</th>
                                <th className="border-bottom">PAYEE_CATEGORY_CODE</th>
                                <th className="border-bottom">PAYEE_GRADE_NAME</th>
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
                                <FreeReportPaymentList.TableRow key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )

}

FreeReportPaymentList.TableRow = (props) => {

    const {
        id,
        transactionId,
        transactionDate,
        phoneNumber,
        statut,
        dwhServiceName,
        payercategoryCode,
        payerFirstName,
        payerLastName,
        payeeMsisdn,
        payeeFirstName,
        payeeLastName,
        payeeCategoryCode,
        payeeGradeName,
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
                <span className="fw-normal">{dwhServiceName}</span>
            </td>
            <td>
                <span className="fw-normal">{payercategoryCode}</span>
            </td>
            <td>
                <span className="fw-normal">{payerFirstName}</span>
            </td>
            <td>
                <span className="fw-normal">{payerLastName}</span>
            </td>
            <td>
                <span className="fw-normal">{payeeMsisdn}</span>
            </td>
            <td>
                <span className="fw-normal">{payeeFirstName}</span>
            </td>
            <td>
                <span className="fw-normal">{payeeLastName}</span>
            </td>
            <td>
                <span className="fw-normal">{payeeCategoryCode}</span>
            </td>
            <td>
                <span className="fw-normal">{payeeGradeName}</span>
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
