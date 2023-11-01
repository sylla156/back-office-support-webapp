import { Col, Row, Form, InputGroup, Button, Spinner, Modal, Card } from "@themesberg/react-bootstrap"
import React, { useState } from "react"
import AlertDismissable from "../../../components/AlertDismissable"
import { Routes } from "../../../routes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPaperclip, faStop, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { APPKEY, ADD_APPLY_MERCHANT_FEES_URL, MerchantFeeType, MerchantFeeTransactionType, MerchantFeeMethod, MerchantsCountry, merchantFeeProviders } from "../../constante/Const"
import { useCookies } from "react-cookie"
import AxiosWebHelper from "../../../utils/axios-helper";
import { Redirect } from "react-router-dom";

export const AddMerchantsFees = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [show, setShow] = useState(false);
    const [type, setType] = useState("percent");
    const [merchantId, setMerchantId] = useState(undefined);
    const [value, setValue] = useState(undefined);
    const [valueErrorMessage, setValueErrorMessage] = useState("");
    const [transactionType, setTransactionType] = useState("payment");
    const [country, setCountry] = useState("CI");
    const [method, setMethod] = useState("mm");
    const [provider, setProvider] = useState("orange");
    const [hasBeenApplied, setHasBeenApplied] = useState(false);

    const [cookies] = useCookies(["token","user"])
    const axios = AxiosWebHelper.getAxios();
    const onRefresh = props.onRefresh

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setErrorData(null);
        setShow(false);
        setValue(undefined);
        setType("percent");
        setMerchantId(undefined);
        setTransactionType("payment");
        setCountry("CI");
        setMethod("mm");
        setIsLoading(false);
    };

    const addFeesData = () => {
        if (!value) {
            setValueErrorMessage("Veuillez saisir un montant");
        } else {
            setIsLoading(true)
            setErrorData(null)
            const dataToPost = {
                value: value,
                type: type,
                transactionType: transactionType,
                merchantId: merchantId,
                method: method,
                country: country,
                createdBy: cookies.user.name,
                provider: provider
            }

            axios.post(ADD_APPLY_MERCHANT_FEES_URL, dataToPost, {
                headers: {
                    "Content-Type": "application/json",
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token
                },
            }).then((result) => {
                if (result.data === "merchant fees created successfully") {
                    setIsLoading(false)
                    handleClose()
                    onRefresh()
                }
            }).catch((error) => {
                setIsLoading(false)
                if (error.response) {
                    if (error.response.status === 401) {
                        setShouldLogin(true)
                    } else {
                        setErrorData(error.response.data.message)
                    }
                }
            })
        }

    }

    const handlePostData = () => {
        addFeesData()
    }

    if (!cookies.token) {
        return <Redirect to={Routes.Signin.path} />
    }

    if (shouldLogin) {
        return <Redirect to={Routes.Signin.path} />;
    }

    return (
        <>
            <Col xs={12} md={3} lg={8}>
                <Button variant="outline-primary" size="sm" onClick={handleShow}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    <span className=""> Ajouter des frais marchand </span>
                </Button>
            </Col>
            <Modal
                size="lg"
                show={show}
                onHide={() => {
                    handleClose(false);
                }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton closeVariant="white" className="bg-primary">
                    <Modal.Title className="text-white">
                        Ajouter les frais d'un marchand
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Value <span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Control value={value} required onChange={(e) => setValue(e.target.value)} type="text" placeholder="Value" />
                        <p style={{ color: "red" }}>{valueErrorMessage}</p>
                        <div className="mb-2"></div>
                        <Form.Label>Type</Form.Label>
                        <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                            {MerchantFeeType.map((item) => (
                                <option key={item.id} value={item.type}>
                                    {item.label}
                                </option>
                            ))}
                        </Form.Select>
                        <div className="mb-2"></div>
                        <Form.Label>Type de transaction</Form.Label>
                        <Form.Select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                            {MerchantFeeTransactionType.map((item) => (
                                <option key={item.id} value={item.type}>
                                    {item.label}
                                </option>
                            ))}
                        </Form.Select>
                        <div className="mb-2"></div>
                        <Form.Label>Identifiant du marchand</Form.Label>
                        <Form.Control value={merchantId} onChange={(e) => setMerchantId(e.target.value)} type="text" placeholder="Identifiant du marchand" />
                        <div className="mb-2"></div>
                        <Form.Label>Methode</Form.Label>
                        <Form.Select value={method} onChange={(e) => setMethod(e.target.value)}>
                        {MerchantFeeMethod.map((item) => (
                                <option key={item.id} value={item.type}>
                                    {item.label}
                                </option>
                            ))}
                        </Form.Select>
                        <div className="mb-2"></div>
                        <Form.Label>Pays</Form.Label>
                        <Form.Select value={country} onChange={(e) => setCountry(e.target.value)}>
                        {MerchantsCountry.map((item) => (
                                <option key={item.id} value={item.country}>
                                    {item.name}
                                </option>
                            ))}
                        </Form.Select>
                        <div className="mb-2"></div>
                        <Form.Label>Provider</Form.Label>
                        <Form.Select value={provider} onChange={(e) => setProvider(e.target.value)}>
                        {merchantFeeProviders.map((item) => (
                                <option key={item.id} value={item.type}>
                                    {item.label}
                                </option>
                            ))}
                        </Form.Select>
                        <div className="mb-2"></div>
                        <div className="mb-2"></div>
                        <p> <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" /> Le signe <span style={{ color: "red" }}>* </span>signifie que ce champ est obligatoire</p>
                        <Col xs={12} md={3} lg={6} className="px-2 mt-4">
                            <div className="mt-3 mb-4">
                                <Button
                                    variant="outline-primary"
                                    type="button"
                                    onClick={() => {
                                        console.log("okokok")
                                    }}
                                >
                                    Effacer
                                </Button>
                                {
                                    !isLoading ?
                                        <Button
                                            className="mx-2"
                                            variant="primary"
                                            type="button"
                                            onClick={() => handlePostData()}
                                        >
                                            Ajouter
                                        </Button> :
                                        <div className="d-flex justify-content-center">
                                            <Spinner animation="border " size="sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        </div>
                                }
                            </div>
                        </Col>
                    </Form.Group>
                </Modal.Body>
            </Modal>
        </>
    )
}