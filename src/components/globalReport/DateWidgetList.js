import React from "react";
import { DailyReportList } from "./DailyReportList";
import { Col, Row } from "@themesberg/react-bootstrap";
export const DateWidgetList = (props) => {
  const merchantList = props.merchantList;
  const version = props.version;
  const date = props.date;

  if (!merchantList) {
    return <DailyReportList version={version} date={date} />;
  }
  return (
    <>
      <Row>
        <Col xs={12} className="">
          <h2 className="h3"></h2>
          <p className="h5 text-gray"></p>
          {merchantList.map((item) => {
            return (
              <DailyReportList
                merchantId={item.value}
                version={version}
                date={date}
              />
            );
          })}
          <DailyReportList version={version} date={date} />
        </Col>
      </Row>
    </>
  );
};
