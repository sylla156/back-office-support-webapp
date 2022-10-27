import React from "react";
import {
    Dropdown,
    Nav,
    Navbar,
    Container,
} from "@themesberg/react-bootstrap";
import {useCookies} from "react-cookie";
import SplitString from "../utils/splitString";
import Logout from "../UserProfile/Logout";

export default (props) => {

    const {pageTitle = "HUB2 SUPPORT"} = props;
    // const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
    /* const areNotificationsRead = notifications.reduce(
        (acc, notif) => acc && notif.read,
        true
    );/

    /*const markNotificationsAsRead = () => {

        setTimeout(() => {

            setNotifications(notifications.map((n) => ({...n, read: true})));
        
        }, 300);
    
    };*/

    const [cookies, , ] = useCookies(["token", "id", "user"]);
    // console.log(cookies.user);

    /* const Notification = (props) => {

        const {link, sender, image, time, message, read = false} = props;
        const readClassName = read ? "" : "text-danger";

        return (
            <ListGroup.Item action href={link} className="border-bottom border-light">
                <Row className="align-items-center">
                    <Col className="col-auto">
                        <Image
                            src={image}
                            className="user-avatar lg-avatar rounded-circle"
                        />
                    </Col>
                    <Col className="ps-0 ms--2">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="h6 mb-0 text-small">{sender}</h4>
                            </div>
                            <div className="text-end">
                                <small className={readClassName}>{time}</small>
                            </div>
                        </div>
                        <p className="font-small mt-1 mb-0">{message}</p>
                    </Col>
                </Row>
            </ListGroup.Item>
        );
    
    };*/

    return (
        <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
            <Container fluid className="px-0">
                <div className="d-flex justify-content-between w-100">
                    <div className="media d-flex align-items-center">
                        <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                            <h2 className="h2 mb-0">{pageTitle}</h2>
                        </div>
                    </div>
                    <Nav className="align-items-center">
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                                <div className="media d-flex align-items-center">
                                    <div
                                        className=" text-ligth p-2 rounded-circle text-center border bg-dark border-primary"
                                        style={{width: 40, height: 40}}
                                    >
                                        {SplitString.takeFirstLetterOfEachString(cookies.user.name)}
                                    </div>
                                    <div className="media-body p-1 text-dark align-items-center d-none d-lg-block">
                                        <span className="mb-0 font-small fw-bold">
                                            {cookies.user.username}
                                        </span>
                                        <div
                                            className="bg-dark m-auto"
                                            style={{height: 1, width: "100%"}}
                                        ></div>
                                        <small className="text-primary d-block ">
                                            {cookies.user.email}
                                        </small>
                                    </div>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                                <Dropdown.Item className="fw-bold">
                                    {/* <UserProfileDialog/> */}
                                </Dropdown.Item>

                                <Dropdown.Divider />

                                <Dropdown.Item className="fw-bold">
                                    <Logout />
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </div>
            </Container>
        </Navbar>
    );

    // return (
    //   <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
    //     <Container fluid className="px-0">
    //       <div className="d-flex justify-content-between w-100">
    //         <div className="d-flex align-items-center">
    //           <Form className="navbar-search">
    //             <Form.Group id="topbarSearch">
    //               <InputGroup className="input-group-merge search-bar">
    //                 <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
    //                 <Form.Control type="text" placeholder="Search" />
    //               </InputGroup>
    //             </Form.Group>
    //           </Form>
    //         </div>
    //         <Nav className="align-items-center">
    //           <Dropdown as={Nav.Item} onToggle={markNotificationsAsRead} >
    //             <Dropdown.Toggle as={Nav.Link} className="text-dark icon-notifications me-lg-3">
    //               <span className="icon icon-sm">
    //                 <FontAwesomeIcon icon={faBell} className="bell-shake" />
    //                 {areNotificationsRead ? null : <span className="icon-badge rounded-circle unread-notifications" />}
    //               </span>
    //             </Dropdown.Toggle>
    //             <Dropdown.Menu className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-center mt-2 py-0">
    //               <ListGroup className="list-group-flush">
    //                 <Nav.Link href="#" className="text-center text-primary fw-bold border-bottom border-light py-3">
    //                   Notifications
    //                 </Nav.Link>

    //                 {notifications.map(n => <Notification key={`notification-${n.id}`} {...n} />)}

    //                 <Dropdown.Item className="text-center text-primary fw-bold py-3">
    //                   View all
    //                 </Dropdown.Item>
    //               </ListGroup>
    //             </Dropdown.Menu>
    //           </Dropdown>

    //           <Dropdown as={Nav.Item}>
    //             <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
    //               <div className="media d-flex align-items-center">
    //                 <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
    //                 <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
    //                   <span className="mb-0 font-small fw-bold">Dieu-Benit</span>
    //                 </div>
    //               </div>
    //             </Dropdown.Toggle>
    //             <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
    //               <Dropdown.Item className="fw-bold">
    //                 <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
    //               </Dropdown.Item>
    //               <Dropdown.Item className="fw-bold">
    //                 <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
    //               </Dropdown.Item>
    //               <Dropdown.Item className="fw-bold">
    //                 <FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" /> Messages
    //               </Dropdown.Item>
    //               <Dropdown.Item className="fw-bold">
    //                 <FontAwesomeIcon icon={faUserShield} className="me-2" /> Support
    //               </Dropdown.Item>

    //               <Dropdown.Divider />

    //               <Dropdown.Item className="fw-bold">
    //                 <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
    //               </Dropdown.Item>
    //             </Dropdown.Menu>
    //           </Dropdown>
    //         </Nav>
    //       </div>
    //     </Container>
    //   </Navbar>
    // );

};
