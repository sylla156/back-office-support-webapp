import React from "react";
import { Col,Row} from "@themesberg/react-bootstrap";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { OrangeCashInInfoList } from "../components/transferList/OrangeCashInInfoList";
import { OrangeReportInCandidateList } from "../components/transferList/OrangeReportInCandidateList";

export const OrangeReportContentGlobalCandidate = (props) => {
  const candidates = props.candidates;

  const [cookies, ] = useCookies(["token","user"]);

  if(!cookies.token) {
    return <Redirect to={Routes.Signin.path}/>
  }
  
  if(!cookies.user.isActive2FA) {
    return <Redirect to={Routes.Signin.path} />
  }

  return (
    <>
          <Row>
             <Col xs={12} xl={6}>
                <OrangeCashInInfoList candidates={candidates} />
              </Col>

              <Col xs={12} xl={6}>
                <OrangeReportInCandidateList candidates={candidates} />
              </Col>
          </Row>

      <div className="mt-2"></div>
    </>
  );
};
