import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {Routes} from "../routes";
import {useCookies} from 'react-cookie';
// pages

import DashboardOverview from "./dashboard/DashboardOverview";

// import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";


import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

import CheckStatus from "./CheckStatus";


// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";

import Solde from './Solde';
import MerchantBalance from './MerchantBalance';
import MoovBalance from './MoovBalance';
import DailyReport from './DailyReport';
import MerchantCollection from './MerchantCollection';
import HistoryMerchantBalanceCollection from './HistoryMerchantBalanceCollection';
import HistoryMerchantBalanceTransfer from './HistoryMerchantBalanceTransfer';
import HistoryProviderBalanceTransfer from './HistoryProviderBalanceTransfer';
import BalanceSetting from './BalanceSetting';
import GlobalReport from './GlobalReport';
import SmsContentOrangeCashIn from './SmsContentOrangeCashIn';
import SmsOrangeCashInCandidate from './SmsOrangeCashInCandidate';

const RouteWithLoader = ({component: Component, ...rest}) => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);

    }, []);

    return (
        <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true} /> <Component {...props} /> </>)} />
    );

};

const RouteWithSidebar = ({component: Component, title, ...rest}) => {

    const [loaded, setLoaded] = useState(false);

    const [cookies, ] = useCookies(['token']);

    useEffect(() => {

        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);

    }, []);

    if (!cookies.token) {

        return <Redirect to={Routes.Signin.path} />;

    }
    return (

        <Route {...rest} render={props => (
            <>
                <Preloader show={loaded ? false : true} />
                <Sidebar />

                <main className="content">
                    <Navbar pageTitle={title} />
                    <Component {...props} />
                    {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
                </main>
            </>
        )}
        />

    );

};

export default () => (
    <Switch>
        <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />

        <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
        <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

        <RouteWithSidebar exact path={Routes.Solde.path} title={'Solde fournisseur HUB2'} component={Solde} />

        {/* pages */}
        <RouteWithSidebar exact path={Routes.DashboardOverview.path} title={'Tableau de bord'} component={DashboardOverview} />

        <RouteWithSidebar exact path={Routes.CheckStatus.path} title={'Vérification du statut'} component={CheckStatus} />
        <RouteWithSidebar exact path={Routes.MechantBalance.path} title={'Transfert - solde marchand HUB2'} component={MerchantBalance} />
        <RouteWithSidebar exact path={Routes.MoovBalance.path} title={'Solde moov'} component={MoovBalance} />
        <RouteWithSidebar exact path={Routes.DailyReport.path} title={'Rapport journalier'} component={DailyReport} />
        <RouteWithSidebar exact path={Routes.MerchantCollection.path} title={'Paiement - solde marchand HUB2'} component={MerchantCollection} />

        <RouteWithSidebar exact path={Routes.HistoryMerchantBalanceTransfer.path} title={'Transfert - Historique solde marchand'} component={HistoryMerchantBalanceTransfer} />
        <RouteWithSidebar exact path={Routes.HistoryProviderBalanceTransfer.path} title={'Transfert - Historique solde fournisseur'} component={HistoryProviderBalanceTransfer} />
        <RouteWithSidebar exact path={Routes.HistoryMerchantBalanceCollection.path} title={'Paiement - Historique solde marchand HUB2'} component={HistoryMerchantBalanceCollection} />
        <RouteWithSidebar exact path={Routes.BalanceSetting.path} title={'Réglage de la balance'} component={BalanceSetting} />
        <RouteWithSidebar exact path={Routes.GlobalReport.path} title={'Rapport global'} component={GlobalReport} />
        <RouteWithSidebar exact path={Routes.SmsContentOrangeCashIn.path} title={'Orange Cash in'} component={SmsContentOrangeCashIn} />
        <RouteWithSidebar exact path={Routes.SmsOrangeCashInCandidate.path} title={'Orange cash in candidates'} component={SmsOrangeCashInCandidate} />
        {/* <RouteWithSidebar exact path={Routes.TransferList.path} component={TransferList} /> */}
    
        <Redirect to={Routes.NotFound.path} />
    </Switch>
);
