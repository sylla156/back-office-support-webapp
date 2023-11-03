import {
    Card,
    Table,
} from "@themesberg/react-bootstrap";
import React from "react";
import {TablePagination} from "../TablePagination";
import {format, addMinutes, parseISO} from "date-fns";

export const LocalTransferReportingList = (props) => {

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
                                <th className="border-bottom">merchantId</th>
                                <th className="border-bottom">processorReference</th>
                                <th className="border-bottom">transaction Reference</th>
                                <th className="border-bottom">amount</th>
                                <th className="border-bottom">net</th>
                                <th className="border-bottom">fees</th>
                                <th className="border-bottom">currency</th>
                                <th className="border-bottom">Date</th>
                                <th className="border-bottom">time</th>
                                <th className="border-bottom">timezone</th>
                                <th className="border-bottom">status</th>
                                <th className="border-bottom">customer Reference</th>
                                <th className="border-bottom">method</th>
                                <th className="border-bottom">country</th>
                                <th className="border-bottom">provider</th>
                                <th className="border-bottom">fournisseur</th>
                                <th className="border-bottom">transaction Identifier</th>
                                <th className="border-bottom">description</th>
                                <th className="border-bottom">Created Date</th>
                                <th className="border-bottom">Updated Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listInfo.map((t) => (
                                <LocalTransferReportingList.TableRow key={`transaction-${t.id}`} {...t} />
                            ))}
                        </tbody>
                    </Table>
                    <TablePagination size={listSize} currentPage={currentPage} onPageChange={onPageChange} count={count} />
                </Card.Body>
            </Card>
        </>
    );

};

LocalTransferReportingList.TableRow = (props) => {

    let {
        id,
        merchantId,
        processorReference,
        reference,
        amount,
        fees,
        currency,
        updatedAt,
        createdAt,
        status,
        country,
        provider,
        gatewayId,
        phoneNumber,
        description
    } = props;

    const parseDate = parseISO(updatedAt);
    const date = format(parseDate, "dd/MM/yyyy");
    const time = format(parseDate, 'HH:mm:ss');

    return (
        <tr>
            <td>
                <Card.Link className="fw-normal">{id}</Card.Link>
            </td>
            <td>
                <span className="fw-normal">{merchantId}</span>
            </td>
            <td>
                <span className="fw-normal">{processorReference}</span>
            </td>
            <td>
                <span className="fw-normal">{reference}</span>
            </td>
            <td>
                <span className="fw-normal">
                    {amount} {"XOF"}{" "}
                </span>
            </td>
            <td>
                <span className="fw-normal">{}</span>
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
                <span className="fw-normal">{"Z"}</span>
            </td>
            <td>
                <span className="fw-normal">{status}</span>
            </td>
            <td>
                <span className="fw-normal">{}</span>
            </td>
            <td>
                <span className="fw-normal">{}</span>
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
                <span className="fw-normal">{phoneNumber}</span>
            </td>
            <td>
                <span className="fw-normal">{description}</span>
            </td>
            <td>
                <span className="fw-normal">{createdAt}</span>
            </td>
            <td>
                <span className="fw-normal">{updatedAt}</span>
            </td>
  
  
            <td>
                <span className="fw-normal text-wrap">{}</span>
            </td>
        </tr>
    );

};
