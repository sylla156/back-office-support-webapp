
import React from "react";

import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";
import { useCookies } from 'react-cookie';
import { Dropdown, Button, Col, Row, ButtonGroup } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { CounterDasboardWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import PowerSildeInsertion from "../../components/powerSlide/PowerSildeInsertion";


export default () => {

    const [cookies] = useCookies(['token']);

    if (!cookies.token) {

        return <Redirect to={Routes.Signin.path} />

    }


    return (
        <>
            <Row className="">

                <Col xs={12}>
                    <PowerSildeInsertion />
                </Col>

            </Row>
        </>
    );

};
