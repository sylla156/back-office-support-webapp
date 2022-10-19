import React from "react";
import { Col,Row} from "@themesberg/react-bootstrap";
import { SmsOrangeCashInCandidateList } from "../components/sms/SmsOrangeCashInCandidateList";
import { OrangeCashInInfoList } from "../components/sms/OrangeCashInInfos";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
export const SmsContentGlobalCashInCandidate = (props) => {
  const candidates = props.candidates;

  const [cookies] = useCookies(["token"]);

  if(!cookies) {
    return <Redirect to={Routes.Signin.path}/>
  }

  return (
    <>
          <Row>
             <Col xs={12} xl={6}>
                <OrangeCashInInfoList candidates={candidates} />
              </Col>

              <Col xs={12} xl={6}>
                <SmsOrangeCashInCandidateList candidates={candidates} />
              </Col>
          </Row>

      <div className="mt-2"></div>
    </>
  );
};
