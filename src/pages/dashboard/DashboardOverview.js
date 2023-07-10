
import React from "react";

import {Redirect} from "react-router-dom";
import {Routes} from "../../routes";
import {useCookies} from 'react-cookie';
import {Col, Row} from "@themesberg/react-bootstrap";

import PowerSildeInsertion from "../../components/powerSlide/PowerSildeInsertion";


export default () => {

    const [cookies] = useCookies(['token', 'user']);

    if (!cookies.token) {
        return <Redirect to={Routes.Signin.path} />
    }

    if(!cookies.user.isActive2FA) {
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
