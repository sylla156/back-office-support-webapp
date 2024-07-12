import {
    Card,
    Table,
} from "@themesberg/react-bootstrap";
import React from "react";
import {TablePagination} from "../TablePagination";

export const PaymentsReportingList = (props) => {

    const {listInfo, count, currentPage, onPageChange} = props;
    const listSize = listInfo.length;
    return (
        <>
            {/* Transfer table liste  */}
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">id</th>
                                <th className="border-bottom">type</th>
                                <th className="border-bottom">merchantId</th>
                                <th className="border-bottom">Référence du frs</th>
                                <th className="border-bottom">amount</th>
                                <th className="border-bottom">net</th>
                                <th className="border-bottom">fees</th>
                                <th className="border-bottom">currency</th>
                                <th className="border-bottom">Date</th>
                                <th className="border-bottom">time</th>
                                <th className="border-bottom">timezone</th>
                                <th className="border-bottom">transaction Reference</th>
                                <th className="border-bottom">status</th>
                                <th className="border-bottom">paymentStatus</th>
                                <th className="border-bottom">customer Reference</th>
                                <th className="border-bottom">method</th>
                                <th className="border-bottom">country</th>
                                <th className="border-bottom">provider</th>
                                <th className="border-bottom">fournisseur</th>
                                <th className="border-bottom">transaction Identifier</th>
                                <th className="border-bottom">description</th>
                                <th className="border-bottom">created date</th>
                                <th className="border-bottom">updated date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <PaymentsReportingList.TableRow key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination
                        size={listSize}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        // count={count}
                    />
                </Card.Body>
            </Card>
        </>
    );

};

PaymentsReportingList.TableRow = (props) => {

    let {
        transactionId,
        type,
        merchantId,
        referenceOfFrs,
        amount,
        net,
        fees,
        currency,
        date,
        time,
        timezone,
        transactionReference,
        status,
        paymentStatus,
        customerReference,
        method,
        country,
        provider,
        gatewayId,
        transactionIdentifier,
        description,
        createdAt,
        updatedAt
    } = props;

    return (
        <tr>
            <td>
                <Card.Link className="fw-normal">{transactionId}</Card.Link>
            </td>
            <td>
                <span className="fw-normal">{type}</span>
            </td>
            <td>
                <span className="fw-normal">{merchantId}</span>
            </td>
            <td>
                <span className="fw-normal">{referenceOfFrs}</span>
            </td>
            <td>
                <span className="fw-normal">
                    {amount} {"XOF"}{" "}
                </span>
            </td>
            <td>
                <span className="fw-normal">{net}</span>
            </td>
            <td>
                <span className="fw-normal">{fees}</span>
            </td>
            <td>
                <span className="fw-normal">{currency}</span>
            </td>
            <td>
                <span className="fw-normal">{date}</span>
            </td>
            <td>
                <span className="fw-normal">{time}</span>
            </td>
            <td>
                <span className="fw-normal">{timezone}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionReference}</span>
            </td>
            <td>
                <span className="fw-normal">{status}</span>
            </td>
            <td>
                <span className="fw-normal">{paymentStatus}</span>
            </td>
            <td>
                <span className="fw-normal">{customerReference}</span>
            </td>
            <td>
                <span className="fw-normal">{method}</span>
            </td>
            <td>
                <span className="fw-normal">{country}</span>
            </td>
            <td>
                <span className="fw-normal">{provider}</span>
            </td>
            <td>
                <span className="fw-normal">{gatewayId}</span>
            </td>
            <td>
                <span className="fw-normal">{transactionIdentifier}</span>
            </td>
  
  
            <td>
                <span className="fw-normal text-wrap">{description}</span>
            </td>
            <td>
                <span className="fw-normal">{createdAt}</span>
            </td>
            <td>
                <span className="fw-normal">{updatedAt}</span>
            </td>
        </tr>
    );

};
