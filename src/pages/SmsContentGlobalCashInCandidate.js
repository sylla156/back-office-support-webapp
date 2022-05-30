import React from "react";
import { Col,Row} from "@themesberg/react-bootstrap";
import { SmsOrangeCashInCandidateList } from "../components/sms/SmsOrangeCashInCandidateList";
import { OrangeCashInInfoList } from "../components/sms/OrangeCashInInfos";
export const SmsContentGlobalCashInCandidate = (props) => {
  const candidates = props.candidates;
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
