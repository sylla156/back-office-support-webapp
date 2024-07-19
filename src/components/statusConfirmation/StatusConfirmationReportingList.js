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
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";

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

  return (
    <>
      {/* Transfer list  */}
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Infos</th>
                <th className="border-bottom">status confirmation</th>
                <If condition={userCanForceStatus}>
                  <th className="border-bottom">action</th>
                </If>
              </tr>
            </thead>
            <tbody>
              <For each="t" of={listInfo}>
                <StatusConfirmationReportingList.TableRow
                  key={t.transactionsInfos.id}
                  onRefresh={onRefresh}
                  userCanForceStatus={userCanForceStatus}
                  userCanUpdateLocalData={userCanUpdateLocalData}
                  {...t}
                />
              </For>
            </tbody>
          </Table>
          <TablePagination
            size={listInfo.length}
            currentPage={currentPage}
            onPageChange={onPageChange}
          // FIXME: Uncomment later. It solves the problem of api not returning the total number of items.
          // See https://www.notion.so/hub2-re/457710ed1a044b28b957394838e1d5f3?v=aa874f8444f24385a68eb3aa8cfaf059&pvs=4
          // count={count}
          />
        </Card.Body>
      </Card>
    </>
  );
};

StatusConfirmationReportingList.TableRow = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const axios = AxiosWebHelper.getAxios();
  const [cookies] = useCookies(["token"]);

  const {
    transactionsInfos,
    canForceStatus,
    canForceStatusMessage,
    statusConfirmations,
    onRefresh,
    userCanForceStatus,
    smsContents,
    smsContentMessage,
    orangeReportTransfers,
    orangeReportTransferMessage,
    shouldUpdateLocalData,
    messageLocalData,
    userCanUpdateLocalData,
    messageReportLocalData,
    shouldUpdateReportLocalData,
    shouldExtendSearch,
    extendSearchMessage
  } = props;

  const { id } = transactionsInfos;

  const gatewaysIds = [
    'hub2_mm_ci_orange_live',
    'hub2_mm_ci_mtn_live',
    'hub2_mm_ci_moov_live',
    'hub2_mm_ci_wave_live',
  ];

  const actionButton = () => {
    if (canForceStatus) {
      return null;
    }

    // Here we can not force status
    // If we cannot force status and have a message, we display it.
    if (canForceStatusMessage)
      return (
        <p className="fw-normal font-small text-wrap bg-light rounded rounded-lg py-1 px-2 mb-2">
          {canForceStatusMessage}
        </p>
      );
  };

  const refreshStatus = (id) => {
    setIsLoaded(true);
    setErrorData(null);
    axios.get(REFRESH_TRANSFER_STATUS, {
      params: {
        id,
      },
      headers: {
        AppKey: APPKEY,
        authenticationtoken: cookies.token,
      }
    }).then(() => {
      setIsLoaded(false);
      onRefresh();
    }).catch((error) => {
      setIsLoaded(true)
      if (error.response) {
        if (error.response.status === 401) {
          setShouldLogin(true);
        } else {
          setErrorData(error.response.data.message);
        }
      }
    });
  };

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />;
  }

  const badgeColor = (status) => {
    const s = status.toLowerCase();
    const colorMap = {
      'successful': 'succes',
      'pending': 'warning',
      'failed': 'danger',
    };

    return colorMap[s] || 'primary';
  };

  return (
    <>
      <tr>
        <td>
          <ForceStatusTableListInfos transactionsInfos={transactionsInfos} />
        </td>
        <td>
          <For each='item' of={statusConfirmations}>
            <UpdateStatusConfirmation
              statusConfirmation={item}
              statusVariantColor={badgeColor(item.confirmedStatus)}
              onRefresh={onRefresh}
              userCanForceStatus={userCanForceStatus}
              transfer={transactionsInfos}
            />
          </For>

          {actionButton()}

          <If condition={gatewaysIds.includes(transactionsInfos?.gatewayId)}>
            <>
              <div className="bg-dark m-auto mt-3" style={{ height: 1, width: "100%" }}></div>
              <p>Candidates suggestions</p>
            </>
          </If>

          <Choose>
            <When condition={shouldUpdateLocalData}>
              <NeedToUpdateLocalDate
                userCanUpdateLocalData={userCanUpdateLocalData}
                messageLocalData={messageLocalData}
              />
            </When>
            <Otherwise>
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
            </Otherwise>
          </Choose>

          <Choose>
            <When condition={shouldUpdateLocalData}>
              <NeedToUpdateLocalDate
                userCanUpdateLocalData={userCanUpdateLocalData}
                messageLocalData={messageLocalData}
              />
            </When>
            <Otherwise>
              <Choose>
                <When condition={shouldUpdateReportLocalData}>
                  <NeedToUpdateLocalDate
                    userCanUpdateLocalData={userCanUpdateLocalData}
                    messageLocalData={messageReportLocalData}
                  />
                </When>
                <Otherwise>
                  <CandidateSuggestion
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
                </Otherwise>
              </Choose>
            </Otherwise>
          </Choose>
        </td>

        <If condition={userCanForceStatus}>
          <td>
            <span className="fw-normal text-wrap">
              <Choose>
                <When condition={canForceStatus}>
                  <DangerouslyForceStatus
                    id={id}
                    onRefresh={onRefresh}
                    transfer={transactionsInfos}
                  />
                </When>
                <Otherwise>
                  <>
                    <AddStatusConfirmation
                      id={id}
                      onRefresh={onRefresh}
                      transfer={transactionsInfos}
                    />
                    <Choose>
                      <When condition={isLoaded}>
                        <div className="d-flex justify-content-center">
                          <Spinner animation="border " size="sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </div>
                      </When>
                      <Otherwise>
                        <Button className="mt-2" onClick={() => refreshStatus(id)}>Refresh</Button>
                      </Otherwise>
                    </Choose>
                  </>
                </Otherwise>
              </Choose>
            </span>
          </td>
        </If>
      </tr>
    </>
  );
};
