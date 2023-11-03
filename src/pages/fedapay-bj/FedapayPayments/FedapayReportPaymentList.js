import {Card, Table, Badge} from "@themesberg/react-bootstrap";
import React from "react";
import {TablePagination} from "../../../components/TablePagination";


export const FedapayReportPaymentList = (props) => {

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
                                <th className="border-bottom">Reference</th>
                                <th className="border-bottom">Status</th>
                                <th className="border-bottom">Mode</th>
                                <th className="border-bottom">Description</th>
                                <th className="border-bottom">Montant</th>
                                <th className="border-bottom">Commission</th>
                                <th className="border-bottom">Comission fixe</th>
                                <th className="border-bottom">Frais</th>
                                <th className="border-bottom">Montant Transféré</th>
                                <th className="border-bottom">Montant debité</th>
                                <th className="border-bottom">CallbackUrl</th>
                                <th className="border-bottom">Customer</th>
                                <th className="border-bottom">Customer Email</th>
                                <th className="border-bottom">paymentMethodNumber</th>
                                <th className="border-bottom">Date de la transaction</th>
                                <th className="border-bottom">UpdatedAt</th>
                                <th className="border-bottom">ApprovedAt</th>
                                <th className="border-bottom">CanceledAt</th>
                                <th className="border-bottom">DeclinedAt</th>
                                <th className="border-bottom">RefundedAt</th>
                                <th className="border-bottom">TransferredAt</th>
                                <th className="border-bottom">Reference Marchand</th>
                                <th className="border-bottom">TransferStatement</th>
                                <th className="border-bottom">Local Transfer Id</th>
                                <th className="border-bottom">Dernière date du Rapprochement</th>
                                <th className="border-bottom">CreateDate</th>
                                <th className="border-bottom">UpdateDate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <FedapayReportPaymentList.TableRow key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )

}

FedapayReportPaymentList.TableRow = (props) => {

    const {
        id,
        transactionKey,
        reference,
        status,
        mode,
        description,
        amount,
        commission,
        commissionFixed,
        fees,
        amountTransferred,
        amountDebited,
        callbackUrl,
        customer,
        customerEmail,
        paymentMethodNumber,
        transactionDate,
        updatedAt,
        approvedAt,
        canceledAt,
        declinedAt,
        refundedAt,
        transferredAt,
        referenceMerchant,
        transferStatement,
        localPaymentId,
        lastReconciliationDate,
        createDate,
        updateDate
    } = props;

    return(
        <tr>
            <td>
                <Card.Link className="fw-normal">{id}</Card.Link>
            </td>
            <td>
                <span className="fw-normal">{transactionKey}</span>
            </td>
            <td>
                <span className="fw-normal">{reference}</span>
            </td>
            <td>
                <span className="fw-normal">{status}</span>
            </td>
            <td>
                <span className="fw-normal">{mode}</span>
            </td>
            <td>
                <span className="fw-normal">{description}</span>
            </td>
            <td>
                <span className="fw-normal">{amount}</span>
            </td>
            <td>
                <span className="fw-normal">{commission}</span>
            </td>
            <td>
                <span className="fw-normal">{commissionFixed}</span>
            </td>
            <td>
                <span className="fw-normal">{fees}</span>
            </td>
            <td>
                <span className="fw-normal">{amountTransferred}</span>
            </td>
            <td>
                <span className="fw-normal">{amountDebited}</span>
            </td>
            <td>
                <span className="fw-normal">{callbackUrl}</span>
            </td>
            <td>
                <span className="fw-normal">{customer}</span>
            </td>
            <td>
                <span className="fw-normal">{customerEmail}</span>
            </td>
            <td>
                <span className="fw-normal">{paymentMethodNumber}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionDate}</span>
            </td>
            <td>
                <span className="fw-normal">{updatedAt}</span>
            </td>
            <td>
                <span className="fw-normal">{approvedAt}</span>
            </td>
            <td>
                <span className="fw-normal">{canceledAt}</span>
            </td>
            <td>
                <span className="fw-normal">{declinedAt}</span>
            </td>
            <td>
                <span className="fw-normal">{refundedAt}</span>
            </td>
            <td>
                <span className="fw-normal">{transferredAt}</span>
            </td>
            <td>
                <span className="fw-normal">{referenceMerchant}</span>
            </td>
            <td>
                <span className="fw-normal">{transferStatement}</span>
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
