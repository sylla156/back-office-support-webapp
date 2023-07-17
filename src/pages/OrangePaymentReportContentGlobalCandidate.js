import React from "react";
import { Col,Row} from "@themesberg/react-bootstrap";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { Routes } from "../routes";
import { OrangeLocalPaymentInfoList } from "../components/PaymentList/OrangeLocalPaymentInfoList";
import { OrangeReportPaymentInCandidateList } from "../components/PaymentList/OrangeReportPaymentInCandidateList";

export const OrangePaymentReportContentGlobalCandidate = (props) => {
  const candidates = props.candidates;

  const [cookies, ] = useCookies(["token","user"]);

  if(!cookies.token) {
    return <Redirect to={Routes.Signin.path}/>
  }
  

  return (
    <>
          <Row>
             <Col xs={12} xl={6}>
                <OrangeLocalPaymentInfoList candidates={candidates} />
              </Col>

              <Col xs={12} xl={6}>
                <OrangeReportPaymentInCandidateList candidates={candidates} />
              </Col>
          </Row>

      <div className="mt-2"></div>
    </>
  );
};
