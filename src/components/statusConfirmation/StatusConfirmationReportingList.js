import { Card, Table, Badge, Col, Button, Spinner } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { TablePagination } from "../TablePagination";
import { AddStatusConfirmation } from "./AddStatusConfirmation";
import { DangerouslyForceStatus } from "./DangerouslyForceStatus";
import { UpdateStatusConfirmation } from "./UpdateStatusConfirmation";
import { ForceStatusTableListInfos } from "../ForceStatusTableListInfos";
import { CandidateSuggestion } from "./CandidateSuggestion";
import { NeedToUpdateLocalDate } from "./NeedToUpdateLocalDate";
import AxiosWebHelper from "../../utils/axios-helper";
import { useCookies } from "react-cookie";
import { APPKEY, REFRESH_TRANSFER_STATUS } from "../../pages/constante/Const";
export const StatusConfirmationReportingList = (props) => {
  let {
    listInfo,
    count,
    currentPage,
    onPageChange,
    onRefresh,
    userCanForceStatus,
    userCanUpdateLocalData,
  } = props;
  const listSize = listInfo.length;
  return (
    <>
      {/* Transfer table liste  */}
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                {/* <th className="border-bottom">id</th> */}
                {/* <th className="border-bottom">type</th> */}
                <th className="border-bottom">Infos</th>
                {/* <th className="border-bottom">Référence du frs</th> */}
                {/* <th className="border-bottom">amount</th> */}
                {/* <th className="border-bottom">net</th> */}
                {/* <th className="border-bottom">fees</th> */}
                {/* <th className="border-bottom">currency</th> */}
                {/* <th className="border-bottom">Date</th> */}
                {/* <th className="border-bottom">time</th> */}
                {/* <th className="border-bottom">timezone</th> */}
                {/* <th className="border-bottom">reference</th> */}
                {/* <th className="border-bottom">status</th> */}
                {/* <th className="border-bottom">customer Reference</th> */}
                {/* <th className="border-bottom">method</th> */}
                {/* <th className="border-bottom">country</th> */}
                {/* <th className="border-bottom">provider</th>
                <th className="border-bottom">fournisseur</th>
                <th className="border-bottom">transaction Identifier</th>
                <th className="border-bottom">description</th> */}
                <th className="border-bottom">status confirmation</th>
                {userCanForceStatus && (
                  <th className="border-bottom">action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {listInfo.map((t, index) => {
                return (
                  <StatusConfirmationReportingList.TableRow
                    key={`transaction-${t.transactionsInfos.id}-${index}`}
                    onRefresh={onRefresh}
                    userCanForceStatus={userCanForceStatus}
                    userCanUpdateLocalData={userCanUpdateLocalData}
                    {...t}
                  />
                );
              })}
            </tbody>
          </Table>
          <TablePagination
            size={listSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
            count={count}
          />
        </Card.Body>
      </Card>
    </>
  );
};

StatusConfirmationReportingList.TableRow = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const axios = AxiosWebHelper.getAxios();
  const [cookies] = useCookies(["token"]);

  const {
    transactionsInfos,
    canForceStatus, // ok
    canForceStatusMessage, //ok
    statusConfirmations, // ok
    onRefresh, // ok
    userCanForceStatus, // ok
    smsContents, // ok
    smsContentMessage, // ok
    orangeReportTransfers, // ok
    orangeReportTransferMessage, // ok
    shouldUpdateLocalData,
    messageLocalData,
    userCanUpdateLocalData,
    messageReportLocalData,
    shouldUpdateReportLocalData,
    shouldExtendSearch,
    extendSearchMessage
  } = props;
  let {
    id,
    merchantId,
    amount,
    currency,
    createdAt,
    timezone,
    transactionReference,
    status,
    customerReference,
    method,
    country,
    provider,
    gatewayId,
    transactionIdentifier,
    description,
  } = transactionsInfos;
  const [gatewaysId, setGatewaysId] = useState([
    "hub2_mm_ci_orange_live",
    "hub2_mm_ci_mtn_live",
    "hub2_mm_ci_moov_live",
    "hub2_mm_ci_wave_live",
  ]);
  const actionButton = () => {
    if (canForceStatus) return;

    // Here we can not force status
    // If we have a message, display it instead of allowing to add
    if (canForceStatusMessage)
      return (
        <p className="fw-normal font-small text-wrap bg-light rounded rounded-lg py-1 px-2 mb-2">
          {canForceStatusMessage}
        </p>
      );
  };

  const RefreshStatus = (id) => {
    setIsLoaded(true)
    setErrorData(null)
    axios.get(REFRESH_TRANSFER_STATUS, {
      params:{
        tr_id:id
      },
      headers:{
        AppKey: APPKEY,
        authenticationtoken: cookies.token,
      }
    }).then((response) => {
      console.log("response", response);
      setIsLoaded(false)
      onRefresh()
    }).catch((error) => {
      setIsLoaded(true)
      if(error.response){
        if(error.response.status === 401){
          setShouldLogin(true);
        }else{
          setErrorData(error.response.data.message);
        }
      }
    })
  }

  return (
    <>
      <tr>
        <td>
          <ForceStatusTableListInfos transactionsInfos={transactionsInfos} />
        </td>
        <td>
          {statusConfirmations.map((item, index) => {
            const statusVariant =
              item.confirmedStatus === "successful" ||
              item.confirmedStatus === "success" ||
              item.confirmedStatus === "SUCCESSFUL" ||
              item.confirmedStatus === "SUCCESS"
                ? "success"
                : item.confirmedStatus === "pending" ||
                  item.confirmedStatus === "Pending" ||
                  item.confirmedStatus === "PENDING"
                ? "warning"
                : item.confirmedStatus === "FAILLED" ||
                  item.confirmedStatus === "failed" ||
                  item.confirmedStatus === "FAILED" ||
                  item.confirmedStatus === "failled"
                ? "danger"
                : "primary";
                const badgeColor = (status) => {
                  if(status === "successful" || status === "success" || status === "SUCCESSFUL" || status === "SUCCESS"){
                    return "success";
                  }
                  if(status === "pending" || status === "PENDING" || status === "processing" || status === "PROCESSING"){
                    return "warning";
                  }
                  if(status === "FAILLED" || status === "failed" || status === "FAILED" || status === "failled"){
                    return "danger";
                  }
                  return "primary";
                }
            return (
              <>
                <UpdateStatusConfirmation
                  statusConfirmation={item}
                  statusVariantColor={badgeColor(item.confirmedStatus)}
                  onRefresh={onRefresh}
                  userCanForceStatus={userCanForceStatus}
                  transfer={transactionsInfos}
                />
              </>
            );
          })}
          {actionButton()}
          {gatewaysId.includes(transactionsInfos?.gatewayId) && (
            <>
              <div
                className="bg-dark m-auto mt-3"
                style={{ height: 1, width: "100%" }}
              ></div>
              <p>Candidates suggestions</p>
            </>
          ) }
          {shouldUpdateLocalData ? (
            <NeedToUpdateLocalDate
              userCanUpdateLocalData={userCanUpdateLocalData}
              messageLocalData={messageLocalData}
            />
          ) : (
            <CandidateSuggestion
              candidates={smsContents}
              message={smsContentMessage}
              label={"SMS"}
              id={id}
              onRefresh={onRefresh}
              userCanForceStatus={userCanForceStatus}
              transfer={transactionsInfos}
              messageLocalData={messageLocalData}
            />
          )}
          {shouldUpdateLocalData ? (
            <NeedToUpdateLocalDate
              userCanUpdateLocalData={userCanUpdateLocalData}
              messageLocalData={messageLocalData}
            />
          ) : (
            shouldUpdateReportLocalData ? <NeedToUpdateLocalDate
            userCanUpdateLocalData={userCanUpdateLocalData}
            messageLocalData={messageReportLocalData}
          /> :<CandidateSuggestion
              candidates={orangeReportTransfers}
              message={orangeReportTransferMessage}
              shouldExtendSearch={shouldExtendSearch}
              extendSearchMessage={extendSearchMessage}
              label={"RO"}
              id={id}
              onRefresh={onRefresh}
              userCanForceStatus={userCanForceStatus}
              transfer={transactionsInfos}
              messageLocalData={messageLocalData}
            /> 
          )}
        </td>

        {userCanForceStatus && (
          <td>
            <span className="fw-normal text-wrap">
              {canForceStatus ? (
                <DangerouslyForceStatus
                  id={id}
                  onRefresh={onRefresh}
                  transfer={transactionsInfos}
                />
              ) : (
                <>
                  <AddStatusConfirmation
                    id={id}
                    onRefresh={onRefresh}
                    transfer={transactionsInfos}
                  />
                  {isLoaded === false ? (
                    <Button className="mt-2" onClick={() => RefreshStatus(id)}>Refresh</Button>
                  ) : (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border " size="sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                  )}
                </>
              )}
            </span>
          </td>
        )}
      </tr>
    </>
  );
};
