import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { useCookies } from 'react-cookie';

// Components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";

// Pages
import Signin from "./examples/Signin";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

import DashboardOverview from "./dashboard/DashboardOverview";

import CheckStatus from "./CheckStatus";
import Solde from './Solde';
import MoovBalance from './MoovBalance';
import DailyReport from './DailyReport';
import MerchantCollectionBalance from './MerchantCollectionBalance';
import HistoryMerchantBalanceCollection from './HistoryMerchantBalanceCollection';
import HistoryMerchantBalanceTransfer from './HistoryMerchantBalanceTransfer';
import HistoryProviderBalanceTransfer from './HistoryProviderBalanceTransfer';
import BalanceSetting from './BalanceSetting';
import GlobalReport from './GlobalReport';
import SmsContentOrangeCashIn from './SmsContentOrangeCashIn';
import SmsOrangeCashInCandidate from './SmsOrangeCashInCandidate';
import TransferReporting from './TransferReporting';
import CollectionDailyReport from './CollectionDailyReport';
import ProviderPaymentBalance from './ProviderPaymentBalance';
import HistoryProviderBalanceCollection from './HistoryProviderBalanceCollection';
import PaymentReporting from './PaymentReporting';
import TransferForceStatus from './TransferForceStatus';
import PaymentLocalStats from './PaymentLocalStats';
import TransferLocalStats from './TransferLocalStats'
import MerchantTransferBalance from './MerchantTransferBalance';
import OrangeReportTransfer from './OrangeReportTransfer';
import OrangeReportTransferCandidate from './OrangeReportTransferCandidate';
import OrangeReportPayment from './OrangeReportPayment';
import OrangeReportPaymentCandidate from './OrangeReportPaymentCandidate';
import MarkOrangePaymentLikeRegularised from './MarkOrangePaymentLikeRegularised';
import LocalTransferReporting from './LocalTransferReporting';
import LocalPaymentReporting from './LocalPaymentReporting';
import TransfersLocalDailyReport from './TransfersLocalDailyReport';
import CollectionsLocalDailyReport from './CollectionsLocalDailyReport';
import MarkOrangeTransferLikeRegularised from './MarkOrangeTransferLikeRegularised';
import ChooseOperator from './ChooseOperator';
import WaveReportPayment from './wave/waveci/WaveReportPayment';
import MarkWavePaymentLikeRegularised from './wave/waveci/components/MarkWavePaymentLikeRegularised';
import WaveReportTransfer from './wave/waveci/WaveReportTransfer';
import ChooseOperatorTransfer from './ChooseOperatorTransfer';
import MarkWaveTransferLikeRegularised from './wave/waveci/components/WaveTranfert/MarkWaveTransferLikeRegularised';
import MoovReportPayment from './moov/moovci/MoovReportPayment';
import MarkMoovPaymentLikeRegularised from './moov/moovci/components/MoovPayment/MarkMoovPaymentLikeRegularised';
import MoovReportTransfer from './moov/moovci/MoovReportTransfer';
import MarkMoovTransferLikeRegularised from './moov/moovci/components/MoovTransfer/MarkMoovTransferLikeRegularised';
import IntouchReportTransfer from './intouch/IntouchReportTransfer';
import MarkIntouchTransferLikeRegularised from './intouch/IntouchTransfer/MarkIntouchTransferLikeRegularised';
import IntouchReportPayment from './intouch/IntouchReportPayment';
import MarkIntouchPaymentLikeRegularised from './intouch/IntouchPayment/MarkIntouchPaymentLikeRegularised';
import MtnReportTransfer from './mtn/MtnReportTransfer';
import MarkMtnTransferLikeRegularised from './mtn/MtnTransfer/MarkMtnTransferLikeRegularised';
import MtnReportPayment from './mtn/MtnReportPayment';
import MarkMtnPaymentLikeRegularised from './mtn/MtnPayment/MarkMtnPaymentLikeRegularised';
import OrangeSnPayment from './orange-sn/OrangeSnPayment';
import MarkOrangeSnPaymentLikeRegularised from './orange-sn/Payment/MarkOrangeSnPaymentLikeRegularised';
import FreeReportPayment from './free-sn/FreeReportPayment';
import MarkFreePaymentLikeRegularised from './free-sn/components/MarkFreePaymentLikeRegularised';
import FreeReportTransfer from './free-sn/FreeReportTransfer';
import MarkFreeTransferLikeRegularised from './free-sn/components/Transfer/MarkFreeTransferLikeRegularised';
import ListFees from './merchant-fees/ListFees';
import VerifyAuth from './examples/VerifyAuth';
import RightManagement from './right-management/RightManagement';
import ListFeesLive from './merchant-fees/ListFeesLive';
import FedapayReportPayment from './fedapay-bj/FedapayReportPayment';
import MarkFedapayPaymentLikeRegularised from './fedapay-bj/FedapayPayments/MarkFedapayPaymentLikeRegularised';
import FedapayReportTransfer from './fedapay-bj/FedapayReportTransfer';
import MarkFedapayTransferLikeRegularised from './fedapay-bj/FedapayTransferts/MarkFedapayTransferLikeRegularised';
import PaymentForceStatus from './payment-force-status/PaymentForceStatus';
import ReturnFunding from './retour-de-fonds/ReturnFunding';
import RetourDeFondsLogs from './retour-de-fonds/RetourDeFondsLogs';
import JobList from './jobs/JobList';
import BulkCheckStatusForm from './jobs/BulkCheckStatusForm';
import { TransactionBlacklistPage } from './jobs/TransactionBlacklistPage';


const RouteWithLoader = ({ Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Preloader show={loaded ? false : true} />
          <Component {...props} />
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ Component, title, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!cookies.token) {
    return (
      <Redirect to={Routes.Signin.path} />
    );
  }

  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />
          <main className="content">
            <Navbar pageTitle={title} />
            <Component {...props} />
          </main>
        </>
      )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} Component={Signin} />
    <RouteWithLoader exact path={Routes.VerifyAuth.path} Component={VerifyAuth} />

    <RouteWithLoader exact path={Routes.NotFound.path} Component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} Component={ServerError} />

    <RouteWithSidebar exact path={Routes.Solde.path} title={'Transfert - Solde fournisseur HUB2'} Component={Solde} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} title={'Accueil'} Component={DashboardOverview} />

    <RouteWithSidebar exact path={Routes.CheckStatus.path} title={'Vérification du statut'} Component={CheckStatus} />
    <RouteWithSidebar exact path={Routes.MerchantTransferBalance.path} title={'Transfert - Solde marchand HUB2'} Component={MerchantTransferBalance} />
    <RouteWithSidebar exact path={Routes.MoovBalance.path} title={'Solde moov'} Component={MoovBalance} />
    <RouteWithSidebar exact path={Routes.DailyReport.path} title={'Rapport journalier'} Component={DailyReport} />
    <RouteWithSidebar exact path={Routes.CollectionDailyReport.path} title={'Rapport journalier'} Component={CollectionDailyReport} />
    <RouteWithSidebar exact path={Routes.MerchantCollectionBalance.path} title={'Paiement - Solde marchand HUB2'} Component={MerchantCollectionBalance} />

    <RouteWithSidebar exact path={Routes.HistoryMerchantBalanceTransfer.path} title={'Transfert - Historique solde marchand'} Component={HistoryMerchantBalanceTransfer} />
    <RouteWithSidebar exact path={Routes.HistoryProviderBalanceTransfer.path} title={'Transfert - Historique solde fournisseur'} Component={HistoryProviderBalanceTransfer} />
    <RouteWithSidebar exact path={Routes.HistoryMerchantBalanceCollection.path} title={'Paiement - Historique solde marchand HUB2'} Component={HistoryMerchantBalanceCollection} />
    <RouteWithSidebar exact path={Routes.BalanceSetting.path} title={'Réglage de la balance'} Component={BalanceSetting} />
    {/* <RouteWithSidebar exact path={Routes.GlobalReport.path} title={'Rapport global'} Component={GlobalReport} /> */}
    <RouteWithSidebar exact path={Routes.SmsContentOrangeCashIn.path} title={'Orange Cash in'} Component={SmsContentOrangeCashIn} />
    <RouteWithSidebar exact path={Routes.SmsOrangeCashInCandidate.path} title={'Orange cash in candidates'} Component={SmsOrangeCashInCandidate} />
    <RouteWithSidebar exact path={Routes.TransferReporting.path} title={'Relevé transfert'} Component={TransferReporting} />
    <RouteWithSidebar exact path={Routes.ProviderPaymentBalance.path} title={'Paiement - Solde fournisseur'} Component={ProviderPaymentBalance} />
    <RouteWithSidebar exact path={Routes.HistoryProviderBalanceCollection.path} title={'Paiement - Historique solde Fournisseur HUB2'} Component={HistoryProviderBalanceCollection} />
    <RouteWithSidebar exact path={Routes.PaymentReporting.path} title={'Relevé paiement'} Component={PaymentReporting} />
    <RouteWithSidebar exact path={Routes.TransferForceStatus.path} title={'Transfer - Force status'} Component={TransferForceStatus} />
    <RouteWithSidebar exact path={Routes.PaymentLocalStats.path} title={'Chiffre d\'affaire hebdomadaire'} Component={PaymentLocalStats} />
    <RouteWithSidebar exact path={Routes.TransferLocalStats.path} title={'Chiffre d\'affaire hebdomadaire'} Component={TransferLocalStats} />
    <RouteWithSidebar exact path={Routes.OrangeReportTransfer.path} title={'Rapport orange transfert'} Component={OrangeReportTransfer} />
    <RouteWithSidebar exact path={Routes.OrangeReportPayment.path} title={'Rapport orange paiement'} Component={OrangeReportPayment} />
    <RouteWithSidebar exact path={Routes.OrangeReportTransferCandidate.path} title={'Rapport orange in candidates'} Component={OrangeReportTransferCandidate} />
    <RouteWithSidebar exact path={Routes.OrangeReportPaymentCandidate.path} title={'Rapport orange paiment in candidates'} Component={OrangeReportPaymentCandidate} />
    <RouteWithSidebar exact path={Routes.MarkOrangePaymentLikeRegularised.path} title={'Paiement Orange - À marquer comme régularisé'} Component={MarkOrangePaymentLikeRegularised} />
    <RouteWithSidebar exact path={Routes.LocalPaymentReporting.path} title={'Relevé paiement en local'} Component={LocalPaymentReporting} />
    <RouteWithSidebar exact path={Routes.LocalTransferReporting.path} title={'Relevé transfert en local'} Component={LocalTransferReporting} />
    <RouteWithSidebar exact path={Routes.TransfersLocalDailyReport.path} title={'Rapport journalier en local'} Component={TransfersLocalDailyReport} />
    <RouteWithSidebar exact path={Routes.CollectionsLocalDailyReport.path} title={'Rapport journalier en local'} Component={CollectionsLocalDailyReport} />
    <RouteWithSidebar exact path={Routes.MarkOrangeTransferLikeRegularised.path} title={'Transfert Orange - À marquer comme régularisé'} Component={MarkOrangeTransferLikeRegularised} />
    <RouteWithSidebar exact path={Routes.ChooseOperator.path} title={'Importer les rapports opérateurs'} Component={ChooseOperator} />
    <RouteWithSidebar exact path={Routes.ChooseOperatorTransfer.path} title={'Importer les rapports opérateurs'} Component={ChooseOperatorTransfer} />
    <RouteWithSidebar exact path={Routes.WaveReportPayment.path} title={"Rapport wave paiement"} Component={WaveReportPayment} />
    <RouteWithSidebar exact path={Routes.WaveReportTransfer.path} title={"Rapport wave transfert"} Component={WaveReportTransfer} />
    <RouteWithSidebar exact path={Routes.MarkWavePaymentLikeRegularised.path} title={'Paiement Wave - À marquer comme régularisé'} Component={MarkWavePaymentLikeRegularised} />
    <RouteWithSidebar exact path={Routes.MarkWaveTransferLikeRegularised.path} title={'Transfert Wave - À marquer comme régularisé'} Component={MarkWaveTransferLikeRegularised} />
    <RouteWithSidebar exact path={Routes.MoovReportPayment.path} title={'Rapport moov paiement'} Component={MoovReportPayment} />
    <RouteWithSidebar exact path={Routes.MarkMoovPaymentLikeRegularised.path} title={'Paiement Moov - À marquer comme régularisé'} Component={MarkMoovPaymentLikeRegularised} />
    <RouteWithSidebar exact path={Routes.MoovReportTransfer.path} title={'Rapport moov transfert'} Component={MoovReportTransfer} />
    <RouteWithSidebar exact path={Routes.MarkMoovTransferLikeRegularised.path} title={'Transfert Moov - À marquer comme régularisé'} Component={MarkMoovTransferLikeRegularised} />
    <RouteWithSidebar exact path={Routes.MarkIntouchTransferLikeRegularised.path} title={'Transfert Intouch - À marquer comme régularisé'} Component={MarkIntouchTransferLikeRegularised} />
    <RouteWithSidebar exact path={Routes.IntouchReportTransfer.path} title={'Rapport intouch transfert'} Component={IntouchReportTransfer} />
    <RouteWithSidebar exact path={Routes.IntouchReportPayment.path} title={'Rapport intouch paiement'} Component={IntouchReportPayment} />
    <RouteWithSidebar exact path={Routes.MarkIntouchPaymentLikeRegularised.path} title={'Paiement Intouch - À marquer comme régularisé'} Component={MarkIntouchPaymentLikeRegularised} />
    <RouteWithSidebar exact path={Routes.MtnReportTransfer.path} title={'Rapport mtn transfert'} Component={MtnReportTransfer} />
    <RouteWithSidebar exact path={Routes.MarkMtnTransferLikeRegularised.path} title={'Transfert Mtn - À marquer comme régularisé'} Component={MarkMtnTransferLikeRegularised} />
    <RouteWithSidebar exact path={Routes.MtnReportPayment.path} title={'Rapport MTN paiement'} Component={MtnReportPayment} />
    <RouteWithSidebar exact path={Routes.MarkMtnPaymentLikeRegularised.path} title={'Paiement MTN - À marquer comme régularisé'} Component={MarkMtnPaymentLikeRegularised} />
    <RouteWithSidebar exact path={Routes.OrangeSnPayment.path} title={'Rapport Orange SN paiement'} Component={OrangeSnPayment} />
    <RouteWithSidebar exact path={Routes.MarkOrangeSnPaymentLikeRegularised.path} title={'Paiement Orange - À marquer comme régularisé'} Component={MarkOrangeSnPaymentLikeRegularised} />

    <RouteWithSidebar exact path={Routes.FreeReportPayment.path} title={'Rapport Free paiement'} Component={FreeReportPayment} />
    <RouteWithSidebar exact path={Routes.MarkFreePaymentLikeRegularised.path} title={'Paiement Free - À marquer comme régularisé'} Component={MarkFreePaymentLikeRegularised} />
    <RouteWithSidebar exact path={Routes.FreeReportTransfer.path} title={'Rapport Free transfert'} Component={FreeReportTransfer} />
    <RouteWithSidebar exact path={Routes.MarkFreeTransferLikeRegularised.path} title={'Paiement Free - À marquer comme régularisé'} Component={MarkFreeTransferLikeRegularised} />
    <RouteWithSidebar exact path={Routes.MerchantListFees.path} title={'Liste des frais marchand à appliquer'} Component={ListFees} />
    <RouteWithSidebar exact path={Routes.RightsManagement.path} title={'Gestion des droits des utilisateurs'} Component={RightManagement} />
    <RouteWithSidebar exact path={Routes.MerchantListFeesLive.path} title={'Liste des frais marchand en live'} Component={ListFeesLive} />
    <RouteWithSidebar exact path={Routes.FedapayReportPayment.path} title={'Rapport Fedapay paiement'} Component={FedapayReportPayment} />
    <RouteWithSidebar exact path={Routes.MarkFedapayPaymentLikeRegularised.path} title={'Paiement Fedapay - À marquer comme régularisé'} Component={MarkFedapayPaymentLikeRegularised} />
    <RouteWithSidebar exact path={Routes.FedapayReportTransfer.path} title={'Rapport fedapay transfert'} Component={FedapayReportTransfer} />
    <RouteWithSidebar exact path={Routes.MarkFedapayTransferLikeRegularised.path} title={'Transferts Fedapay - À marquer comme régularisé'} Component={MarkFedapayTransferLikeRegularised} />
    <RouteWithSidebar exact path={Routes.PaymentForceStatus.path} title={'Payments - Force status'} Component={PaymentForceStatus} />
    <RouteWithSidebar exact path={Routes.RetourDeFonds.path} title={'Retour de fonds'} Component={ReturnFunding} />
    <RouteWithSidebar exact path={Routes.RetourDeFondsLogs.path} title={"Logs de l'opération de retour de fonds"} Component={RetourDeFondsLogs} />

    <RouteWithSidebar exact path={Routes.JobList.path} title={"Index des jobs"} Component={JobList} />
    <RouteWithSidebar exact path={Routes.BulkCheckStatusForm.path} title={"Check Status"} Component={BulkCheckStatusForm} />
    <RouteWithSidebar
      exact
      path={Routes.TransactionBlacklistPage.path}
      title={"Blacklist"}
      Component={TransactionBlacklistPage}
    />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
