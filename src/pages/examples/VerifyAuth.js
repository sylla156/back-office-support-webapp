import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt, faHouseUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Spinner, Container, InputGroup } from '@themesberg/react-bootstrap';

import { useCookies } from 'react-cookie';
import { APPKEY, URL_2FA_VERIFICATION } from "../constante/Const";
import AxiosWebHelper from "../../utils/axios-helper";
import { Redirect } from "react-router-dom";
import { Routes } from "../../routes";
import AlertDismissable from "../../components/AlertDismissable";
import QRCode from 'qrcode';

export default function VerifyAuth(props) {
    const [token, setToken] = useState('');
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const [tOptUrl, setTOptUrl] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState(null);
    const [cookies, setCookie] = useCookies(['token', 'id', 'user']);
    const [, , removeCookie] = useCookies(['token', 'id', 'user']);
    const [isLoading, setIsLoading] = useState(false)

    const handleOnTokenChange = (event) => {
        setToken(event.target.value);
    }
    const axios = AxiosWebHelper.getAxios();

    const logo = require('../../assets/img/technologies/logo_o.png')

    const generateQR = (is2FAActive) => {
        if(is2FAActive === false){
            let str = props.location.state.tOtpAuthUrl
            QRCode.toCanvas(document.getElementById('canvas'), str, function (error) {
                if (error) console.error(error)
                //console.log('success!')
            })
        }
    }

    const buttonStyle = {
        backgroundColor: "white"
    };

    const logout = ()=>{

        removeCookie("token");
        removeCookie("id");
        removeCookie("user");
    
    }

    const getText = (isActive2FA) => {
        if(isActive2FA === false){
            setText("Veuillez scanner le code QR ci-dessous à partir de votre application Authenticator et saissisez le code dans la zone ci-dessous")
        }else{
            setText("Veuillez saisir le code OTP depuis votre application Authenticator")
        }
    }

    const showQrCode = (isActive2FA) => {
        if(isActive2FA === false){
            return(
                <div style={{display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <canvas id="canvas" align="center" />
                </div>
            )
        }
    }

    const VerifyHub2Support2FAToken = () => {
        setError(null)
        setIsLoading(true)
        axios.post(
            URL_2FA_VERIFICATION,
            {
                "twoFactorAuthenticationCode": token,
            },
            {
                headers: {
                    AppKey: APPKEY,
                    authenticationtoken: cookies.token
                }
            }
        )
            .then((result) => {
                if (result.data.status === 200) {
                    setCookie("user",result.data.user);
                    setIsLoginSuccess(true)
                }
            }).catch((error) => {
                setIsLoading(false)
                console.log(error.response);
                setError(error.response.data.message)
            })
    }

    useEffect(() => {
        if(cookies.user){
            getText(cookies.user.isActive2FA)
            generateQR(cookies.user.isActive2FA)
        }
    }, [])

    if (!cookies.token) {
        return <Redirect to={Routes.Signin.path} />
    }

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container className="">

                    <Row className="justify-content-center form-bg-image " >
                        <Col xs={12} className="d-flex align-items-center justify-content-center ">
                            <div className="bg-white shadow-soft border rounded border-warning p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center">
                                    <img className="mb-2 " src={logo} width="100" height="" />
                                </div>
                                <div className="text-center  text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Support HUB2</h3>
                                </div>
                                <div>
                                    <p className="text-center">{text}</p>
                                </div>
                                {showQrCode(cookies.user.isActive2FA)}
                                <Form className="mt-4" >
                                    <Form.Group id="token" className="mb-1">
                                        <Form.Label></Form.Label>
                                        <InputGroup className="border border-warning">
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt} />
                                            </InputGroup.Text>
                                            <Form.Control required type="text" placeholder="Token" onChange={handleOnTokenChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    {isLoginSuccess ? <div className="d-flex justify-content-center">
                                        <Spinner animation="border " size="sm" role="status"></Spinner>
                                    </div> : <Button type="button" className="w-100 btn-primary" onClick={VerifyHub2Support2FAToken}>
                                        Vérifier
                                    </Button>}

                                    <div style={{marginTop: "1rem"}}>
                                        <Button type="button" style={buttonStyle} onClick={logout} className="btn btn-outline-danger" > <FontAwesomeIcon icon={faArrowLeft} />  Deconnexion</Button>
                                    </div>

                                    <div className="mt-3">
                                        <AlertDismissable message={error} variant="danger" show={!!error} onClose={() => setError(null)} isLoading={isLoading} />
                                    </div>

                                    {isLoginSuccess ? <Redirect to={Routes.DashboardOverview.path} /> : ""}
                                </Form>
                                <div className="d-flex justify-content-center my-4">

                                </div>
                                <div className="d-flex justify-content-center align-items-center mt-4">

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )

}