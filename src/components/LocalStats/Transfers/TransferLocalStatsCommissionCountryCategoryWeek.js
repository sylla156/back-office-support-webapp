import React, { useState, PureComponent } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import {
  ChooseCountry,
} from "../../../pages/constante/Const";
import TransferLocalStatsCommissionCountryCategory from "./TransferLocalStatsCommissionCountryCategory";


export default (props) => {
  const week = props.week;
  const order = props.order;
  const [visibleTab, setVisibleTab] = useState(ChooseCountry[0].id);

  return (
    <>
      {/* make all countries  */}
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={12} md={6} lg={12} className="mb-2 px-2">
            <InputGroup>
              {ChooseCountry.map((item) => (
                <Button
                  variant="outline-primary"
                  key={item.id}
                  onClick={() => {
                    setVisibleTab(item.id);
                  }}
                  className="mx-2"
                  active={visibleTab === item.id}
                  type="button"
                >
                  {item.name}
                </Button>
              ))}
            </InputGroup>
          </Col>
        </Row>
      </div>
      {
        ChooseCountry.map((item)=> (
          <>
            {
              visibleTab === item.id && <TransferLocalStatsCommissionCountryCategory week={week} country={item.country} order={order} />
            }
          </>
        ))
      }
    </>
  );
};
