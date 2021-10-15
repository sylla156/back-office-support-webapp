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
import TransferList from './TransferList';


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

const RouteWithSidebar = ({component: Component, ...rest}) => {

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
                    <Navbar />
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

        <RouteWithSidebar exact path={Routes.Solde.path} component={Solde} />

        {/* pages */}
        <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />

        <RouteWithSidebar exact path={Routes.CheckStatus.path} component={CheckStatus} />

        <RouteWithSidebar exact path={Routes.TransferList.path} component={TransferList} />
    
        <Redirect to={Routes.NotFound.path} />
    </Switch>
);
