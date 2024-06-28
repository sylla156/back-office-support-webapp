import React from "react";
import { Dropdown, Nav, Navbar, Container, Row, Col } from "@themesberg/react-bootstrap";
import { useCookies } from "react-cookie";
import SplitString from "../utils/splitString";
import Logout from "../UserProfile/Logout";
import { useHistory } from "react-router-dom";

export default (props) => {
  const {
    pageTitle = "HUB2 SUPPORT"
  } = props;

  const history = useHistory();
  const goBack = () => history.goBack();

  const [cookies, ,] = useCookies(["token", "id", "user"]);

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="media d-flex">
            <Row className="d-flex flex-fill">
              <Col className="flex-grow-0 pe-0">
                <button className="btn btn-outline-custom" onClick={goBack}>
                  <i className="fas fa-arrow-left"></i>
                </button>
              </Col>
              <Col className="flex-grow-1 ps-0">
                <div className="media-body ms-2 text-dark">
                  <h2 className="h3 mb-0 my-0">
                    {pageTitle}
                  </h2>
                </div>
              </Col>
            </Row>
          </div>

          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <div
                    className=" text-ligth p-2 rounded-circle text-center border bg-dark border-primary"
                    style={{ width: 40, height: 40 }}
                  >
                    {SplitString.takeFirstLetterOfEachString(cookies.user.name)}
                  </div>
                  <div className="media-body p-1 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">
                      {cookies.user.username}
                    </span>
                    <div
                      className="bg-dark m-auto"
                      style={{ height: 1, width: "100%" }}
                    ></div>
                    <small className="text-primary d-block ">
                      {cookies.user.email}
                    </small>
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-0">
                <Dropdown.Item className="fw-bold p-2">
                  <Logout />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
