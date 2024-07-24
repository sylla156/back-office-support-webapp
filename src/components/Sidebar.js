import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faWallet,
  faExchangeAlt,
  faChartPie,
  faMoneyCheck,
  faSms,
  faTimes,
  faCalendar,
  faHistory,
  faTools,
  faLock,
  faMoneyBill,
  faListAlt,
  faCheckCircle,
  faBan,
  faTruckMonster,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../routes";
import ReactHero from "../assets/img/technologies/hub2-logo.png";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

export default (props = {}) => {

  const [cookies] = useCookies(["token"]);

  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;

    return (
      <Accordion as={Nav.Item} defaultActiveKey={"0"}>
        <Accordion.Item eventKey={"0"}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      home,
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    let navItemClassName = link === pathname ? "active" : "";
    if (home) navItemClassName = "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">
              {" "}
              <small>{title}</small>{" "}
            </span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  if (!cookies.token) {
    return <Redirect to={Routes.Signin.path} />;
  }


  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary  px-4 d-md-none"
      >
        <Navbar.Brand
          className="me-lg-5"
          as={Link}
          to={Routes.DashboardOverview.path}
        >
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem
                home
                title="HUB2 SUPPORT"
                link={Routes.DashboardOverview.path}
                image={ReactHero}
              />
              <CollapsableNavItem title="Frais marchand" icon={faMoneyCheck}>
                <NavItem
                  title="Frais à appliquer"
                  link={Routes.MerchantListFees.path}
                  icon={faMoneyCheck}
                />
                <NavItem
                  title="Frais live"
                  link={Routes.MerchantListFeesLive.path}
                  icon={faMoneyCheck}
                />
              </CollapsableNavItem>

              <CollapsableNavItem title="Transfert" icon={faExchangeAlt}>
                <NavItem
                  title="Solde fournisseur"
                  icon={faWallet}
                  link={Routes.Solde.path}
                />
                <NavItem
                  title="Historique fournisseur"
                  icon={faHistory}
                  link={Routes.HistoryProviderBalanceTransfer.path}
                />
                <NavItem
                  title="Solde moov"
                  icon={faWallet}
                  link={Routes.MoovBalance.path}
                />
                <NavItem
                  title="Solde marchand"
                  icon={faWallet}
                  link={Routes.MerchantTransferBalance.path}
                />
                <NavItem
                  title="Historique marchand"
                  icon={faHistory}
                  link={Routes.HistoryMerchantBalanceTransfer.path}
                />
                <NavItem
                  title="Vérification du statut"
                  icon={faCheck}
                  link={Routes.CheckStatus.path}
                />
                <NavItem
                  title="Rapport journalier"
                  icon={faCalendar}
                  link={Routes.DailyReport.path}
                />
                <NavItem
                  title="Rapport journalier L"
                  icon={faCalendar}
                  link={Routes.TransfersLocalDailyReport.path}
                />
                <NavItem
                  title="Relevé"
                  icon={faCalendar}
                  link={Routes.TransferReporting.path}
                />
                <NavItem
                  title="Relevé Local"
                  icon={faCalendar}
                  link={Routes.LocalTransferReporting.path}
                />
                <NavItem
                  title="Force status"
                  icon={faCheck}
                  link={Routes.TransferForceStatus.path}
                />
                <NavItem
                  title="Local stats"
                  icon={faChartPie}
                  link={Routes.TransferLocalStats.path}
                />
                <NavItem
                  title="Régularisation orange"
                  icon={faChartPie}
                  link={Routes.MarkOrangeTransferLikeRegularised.path}
                />
                <NavItem
                  title="Rapports opérateurs"
                  icon={faCalendar}
                  link={Routes.ChooseOperatorTransfer.path}
                />

              </CollapsableNavItem>

              <CollapsableNavItem title="Paiement" icon={faMoneyCheck}>
                <NavItem
                  title="Solde fournisseur"
                  icon={faWallet}
                  link={Routes.ProviderPaymentBalance.path}
                />
                <NavItem
                  title="Historique Fournisseur"
                  icon={faHistory}
                  link={Routes.HistoryProviderBalanceCollection.path}
                />
                <NavItem
                  title="Solde marchand"
                  icon={faWallet}
                  link={Routes.MerchantCollectionBalance.path}
                />
                <NavItem
                  title="Historique marchand"
                  icon={faHistory}
                  link={Routes.HistoryMerchantBalanceCollection.path}
                />
                <NavItem
                  title="Rapport journalier"
                  icon={faCalendar}
                  link={Routes.CollectionDailyReport.path}
                />
                <NavItem
                  title="Rapport journalier L"
                  icon={faCalendar}
                  link={Routes.CollectionsLocalDailyReport.path}
                />
                <NavItem
                  title="Relevé"
                  icon={faCalendar}
                  link={Routes.PaymentReporting.path}
                />
                <NavItem
                  title="Relevé Local"
                  icon={faCalendar}
                  link={Routes.LocalPaymentReporting.path}
                />
                <NavItem
                  title="Force status"
                  icon={faCheck}
                  link={Routes.PaymentForceStatus.path}
                />
                <NavItem
                  title="Local stats"
                  icon={faChartPie}
                  link={Routes.PaymentLocalStats.path}
                />
                <NavItem
                  title="Rapports opérateurs"
                  icon={faCalendar}
                  link={Routes.ChooseOperator.path}
                />
              </CollapsableNavItem>

              <CollapsableNavItem title="Jobs" icon={faTruckMonster}>
                <NavItem
                  title="Liste des jobs"
                  icon={faListAlt}
                  link={Routes.JobList.path}
                >
                </NavItem>
                <NavItem
                  title="Bulk Check Status"
                  icon={faCheckCircle}
                  link={Routes.BulkCheckStatusForm.path}
                >
                </NavItem>
                <NavItem
                  title="Blacklist"
                  icon={faBan}
                  link={Routes.TransactionBlacklistPage.path}
                >
                </NavItem>
              </CollapsableNavItem>

              <CollapsableNavItem title="Sms" icon={faSms}>
                <NavItem
                  title="Orange Cash in"
                  icon={faSms}
                  link={Routes.SmsContentOrangeCashIn.path}
                />
                <NavItem
                  title="Orange candidates"
                  icon={faSms}
                  link={Routes.SmsOrangeCashInCandidate.path}
                />
              </CollapsableNavItem>

              <CollapsableNavItem title="RO en Transfert" icon={faCalendar}>
                <NavItem
                  title="Rapport orange"
                  icon={faCalendar}
                  link={Routes.OrangeReportTransfer.path}
                />
                <NavItem
                  title="Candidates"
                  icon={faCalendar}
                  link={Routes.OrangeReportTransferCandidate.path}
                />
              </CollapsableNavItem>

              <CollapsableNavItem title="RO en Paiement" icon={faCalendar}>
                <NavItem
                  title="Rapport orange"
                  icon={faCalendar}
                  link={Routes.OrangeReportPayment.path}
                />
                <NavItem
                  title="Candidates"
                  icon={faCalendar}
                  link={Routes.OrangeReportPaymentCandidate.path}
                />
              </CollapsableNavItem>

              <NavItem
                title="Réglage balance"
                link={Routes.BalanceSetting.path}
                icon={faTools}
              />
              <NavItem
                title="Gestion des droits"
                link={Routes.RightsManagement.path}
                icon={faLock}
              />
              <NavItem
                title="Retour de fonds"
                link={Routes.RetourDeFonds.path}
                icon={faMoneyBill}
              />

              <Dropdown.Divider className="my-3 border-indigo" />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
