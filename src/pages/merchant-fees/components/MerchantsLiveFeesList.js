import { Card, Table, Badge, Button, Spinner } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { TablePagination } from "../../../components/TablePagination";

export const MerchantsLiveFees = (props) => {
    const {
        listInfo,
        count,
        currentPage,
        onPageChange,
        onRefresh
    } = props;

    const listSize = 15;
    const startIndex = (currentPage - 1) * listSize;
    const endIndex = startIndex + listSize;

    const pageItemsToDisplay = listInfo.slice(startIndex, endIndex);

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Identifiant marchant</th>
                                <th className="border-bottom">Pays</th>
                                <th className="border-bottom">Provider</th>
                                <th className="border-bottom">Méthode</th>
                                <th className="border-bottom">Type de la transaction</th>
                                <th className="border-bottom">Type</th>
                                <th className="border-bottom">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageItemsToDisplay.map((t) => (
                                <MerchantsLiveFees.TableRow onRefresh={onRefresh} key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    )
}

MerchantsLiveFees.TableRow = (props) => {
    const {
        id,
        type,
        merchantId,
        value,
        method,
        country,
        transactionType,
        provider,
    } = props;

    return(
        <tr>
            <td>
                <span className="fw-normal">{merchantId}</span>
            </td>
            <td>
                <span className="fw-normal">{country}</span>
            </td>
            <td>
                <span className="fw-normal">{provider}</span>
            </td>
            <td>
                <span className="fw-normal">{method}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionType}</span>
            </td>
            <td>
                <span className="fw-normal">{type}</span>
            </td>
            <td>
                <span className="fw-normal">{value}</span>
            </td>
        </tr>
    )
}