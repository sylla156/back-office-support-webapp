import React from "react";
import { Col, Row } from "@themesberg/react-bootstrap";
import { DailyReportCollectionList } from "./DailyReportCollectionList";
export const DateWidgetCollectionList = (props) => {
  const merchantList = props.merchantList;
  const version = props.version;
  const date = props.date;

  if (!merchantList) {
    return <DailyReportCollectionList version={version} date={date} />;
  }
  return (
    <>
      <Row>
        <Col xs={12} className="">
          <h2 className="h3"></h2>
          <p className="h5 text-gray"></p>
          {merchantList.map((item) => {
            return (
              <DailyReportCollectionList
                merchantId={item.value}
                version={version}
                date={date}
              />
            );
          })}
          <DailyReportCollectionList version={version} date={date} />
        </Col>
      </Row>
    </>
  );
};
