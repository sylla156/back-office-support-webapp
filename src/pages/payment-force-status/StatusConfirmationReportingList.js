import { Card, Table, Button, Spinner } from '@themesberg/react-bootstrap';
import React, { useState } from 'react';
import { TablePagination } from '../../components/TablePagination';
import { ForceStatusTableListInfos } from '../../components/ForceStatusTableListInfos';
import { UpdateStatusConfirmation } from './UpdateStatusConfirmation';
import { NeedToUpdateLocalDate } from '../../components/statusConfirmation/NeedToUpdateLocalDate';
import { CandidateSuggestion } from './CandidateSuggestion';
import { DangerouslyForceStatus } from './DangerouslyForceStatus';
import { AddStatusConfirmation } from './AddStatusConfirmation';
import { REFRESH_PAYMENT_STATUS, APPKEY } from '../constante/Const';
import AxiosWebHelper from '../../utils/axios-helper';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { Routes } from '../../routes';

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
    <Card border='light' className='table-wrapper table-responsive shadow-sm'>
      <Card.Body className='pt-0'>
        <Table hover className='user-table align-items-center'>
          <thead>
            <tr>
              <th className='border-bottom'>Infos</th>
              <th className='border-bottom'>Status confirmation</th>
              <If condition={userCanForceStatus}>
                <th className='border-bottom'>Action</th>
              </If>
            </tr>
          </thead>

          <tbody>
            <For each='t' of={listInfo} index='idx'>
              <StatusConfirmationReportingList.TableRow
                key={t.transactionsInfos.transactionId}
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
        // count={count}
        />
      </Card.Body>
    </Card>
  );
}

StatusConfirmationReportingList.TableRow = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldLogin, setShouldLogin] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const axios = AxiosWebHelper.getAxios();
  const [cookies] = useCookies(['token']);

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
    extendSearchMessage,
  } = props;

  const {
    id,
    transactionId,
  } = transactionsInfos;

  const gatewaysIds = ['hub2_mm_ci_orange_live', 'hub2_mm_ci_mtn_live', 'hub2_mm_ci_moov_live', 'hub2_mm_ci_wave_live',];

  const actionButton = () => {
    if (canForceStatus) {
      return null;
    }

    if (canForceStatusMessage) {
      return (
        <p className='fw-normal font-small text-wrap bg-light rounded rounded-lg py-1 px-2 mb-2'>
          {canForceStatusMessage}
        </p>
      );
    }

    return null;
  };

  const refreshStatus = (transactionId) => {
    setIsLoading(true);
    setErrorData(null);
    axios.get(REFRESH_PAYMENT_STATUS, {
      params: {
        id: transactionId,
      },
      headers: {
        AppKey: APPKEY,
        authenticationtoken: cookies.token,
      }
    }).then(() => {
      setIsLoading(false);
      onRefresh();
    }).catch((error) => {
      setIsLoading(false);
      if (error.response) {
        if (error.response.status === 401) {
          setShouldLogin(true);
        } else {
          setErrorData(error.response.data.message);
        }
      }
    });
  }

  const getStatusVariant = (confirmedStatus) => {
    const s = confirmedStatus.toLowerCase();
    if (s === 'successful' || s === 'success') {
      return 'success'
    } else if (s === 'pending' || s === 'processing') {
      return 'warning'
    } else if (s === 'failed') {
      return 'danger';
    } else {
      return 'primary';
    }
  }

  if (shouldLogin) {
    return <Redirect to={Routes.Signin.path} />
  }

  return (
    <>
      <tr>
        <td>
          <ForceStatusTableListInfos transactionsInfos={transactionsInfos} />
        </td>
        <td>
          <For each='item' of={statusConfirmations} index='idx'>
            <UpdateStatusConfirmation
              key={idx}
              statusConfirmation={item}
              statusVariantColor={getStatusVariant(item)}
              onRefresh={onRefresh}
              userCanForceStatus={userCanForceStatus}
              payment={transactionsInfos}
            />
          </For>

          {actionButton()}

          <If condition={gatewaysIds.includes(transactionsInfos?.gatewayId)}>
            <>
              <div className='bg-dark m-auto mt-3' style={{ height: 1, width: '100%' }}></div>
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
                label={'SMS'}
                id={id}
                onRefresh={onRefresh}
                userCanForceStatus={userCanForceStatus}
                payment={transactionsInfos}
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
                    label={'RO'}
                    id={id}
                    onRefresh={onRefresh}
                    userCanForceStatus={userCanForceStatus}
                    payment={transactionsInfos}
                    messageLocalData={messageLocalData}
                  />
                </Otherwise>
              </Choose>
            </Otherwise>
          </Choose>
        </td>

        <If condition={userCanForceStatus}>
          <td>
            <span className='fw-normal text-wrap'>
              <If condition={canForceStatus}>
                <DangerouslyForceStatus
                  id={id}
                  onRefresh={onRefresh}
                  payment={transactionsInfos}
                />
              </If>

              <If condition={!canForceStatus}>
                <>
                  <AddStatusConfirmation
                    id={id}
                    onRefresh={onRefresh}
                    payment={transactionsInfos}
                  />
                  <Choose>
                    <When condition={isLoading}>
                      <div className='d-flex justify-content-center'>
                        <Spinner animation='border ' size='sm' role='status'>
                          <span className='visually-hidden'>Loading...</span>
                        </Spinner>
                      </div>
                    </When>
                    <Otherwise>
                      <Button className='mt-2' onClick={() => refreshStatus(transactionId)}>Refresh</Button>
                    </Otherwise>
                  </Choose>
                </>
              </If>
            </span>
          </td>
        </If>
      </tr>
    </>
  );
};
