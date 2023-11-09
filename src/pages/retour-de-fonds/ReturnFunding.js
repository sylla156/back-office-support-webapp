import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { FIRST_PAGE_INDEX, APPKEY, PAGE_SIZE, etatDesRetourDeFonds, RETOUR_DE_FONDS } from "../constante/Const";
import { Col, Spinner, Row, Form, Button, InputGroup } from "@themesberg/react-bootstrap";
import AxiosWebHelper from "../../utils/axios-helper";
import { Routes } from "../../routes";
import { format } from "date-fns";
import { AddReturnFunding } from "./components/AddReturnFunding";
import { RetourDeFondsList } from "./components/RetourDeFondsList";

export default () => {
    const currentDate = new Date()

    const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
    const defaultStartDate = `${formattedCurrentDate}T00:00:00Z`

    const defaultEndDate = `${formattedCurrentDate}T23:59:59Z`
    const [errorData, setErrorData] = useState(null)
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [isLoaded, setIsLoaded] = useState(true);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [count, setCount] = useState(undefined);
    const [returnFundingList, setReturnFundingList] = useState([]);
    const [refMarchand, setRefMarchand] = useState(undefined);
    const [refHub2, setRefHub2] = useState(undefined);
    const [refOperateur, setRefOperateur] = useState();
    const [numero, setNumero] = useState(undefined);
    const [etat, setEtat] = useState("Tous");
    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);
    const [errorDataCSV, setErrorDataCSV] = useState(null);
    const [isLoadedCSV, setIsLoadedCSV] = useState(true);

    const handleStartDate = (value) => {
        setStartDate(value);
    };

    const handleEndDate = (value) => {
        setEndDate(value);
    };

    const [cookies] = useCookies(["token", "user"]);
    const axios = AxiosWebHelper.getAxios();

    const userCanMakeReturnFunding = cookies.user.canMakeReturnFunding
    const returnFundingGroup1 = cookies.user.returnFundingGroup1
    const returnFundingGroup2 = cookies.user.returnFundingGroup2
    const returnFundingGroup3 = cookies.user.returnFundingGroup3

    const onPageChange = (page = 0) => {
        setCurrentPage(page)
    }

    const incrementVersion = () => {
        setVersion((currentVersion) => {
            return currentVersion + 1;
        })
    }
    const getReturnFundingList = () => {
        setIsLoaded(false)
        setErrorData(null)

        axios.get(RETOUR_DE_FONDS, {
            params: {
                ref_marchand: refMarchand,
                ref_hub2:refHub2,
                ref_operateur:refOperateur,
                numero,
                etat,
                from: startDate,
                to: endDate,
                page: currentPage,
                perPage: PAGE_SIZE
            },
            headers:{
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            }
        }).then((result) => {
            setIsLoaded(true)
            // console.log(result.data.result);
            setReturnFundingList(result.data.result)
            setCount(result.data.count)
        }).catch((error) => {
            setIsLoaded(true)
            if (error.response) {
                if (error.response.status === 401) {
                    setShouldLogin(true);
                } else {
                    setErrorData(error.response.data.message);
                }
            }
        })
    }

    const filename = "retours-de-fonds-export";
    const exportData = () => {
        setErrorDataCSV(null)
        setIsLoadedCSV(false)

        axios.get("edfedfed",{
            params:{
                from: startDate,
                to: endDate,
            },
            headers:{
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            }
        }).then((result) => {
            setIsLoadedCSV(true)
            setErrorDataCSV(null)
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename + ".csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
        }).catch((error) => {
            setIsLoaded(true)
            console.log("une erreur s'est produite", error);
        })
    }

    useEffect(() => {
        getReturnFundingList()
    }, [currentPage, version])

    if (!cookies.token) {
        return <Redirect to={Routes.Signin.path} />
    }
    if (shouldLogin) {
        return <Redirect to={Routes.Signin.path} />;
    }

    return (
        <div>
            {userCanMakeReturnFunding && <AddReturnFunding onRefresh={incrementVersion} />}
            <div className="mb-3"></div>
            <div className="align-items-center d-flex flex-wrap">
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Date début</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Date début"
                            value={startDate}
                            onChange={(event) => handleStartDate(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Date fin</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Date fin"
                            value={endDate}
                            onChange={(event) => handleEndDate(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Reférence Marchand</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="reference marchand"
                            value={refMarchand}
                            onChange={(event) => setRefMarchand(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Reférence HUB2</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="reference hub2"
                            value={refHub2}
                            onChange={(event) => setRefHub2(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Reférence Opérateur</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="reference opérateur"
                            value={refOperateur}
                            onChange={(event) => setRefOperateur(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Group id="etat">
                        <Form.Label>État</Form.Label>
                        <Form.Select
                            value={etat}
                            onChange={(event) => {
                                setEtat(event.target.value)
                            }}
                        >
                            {etatDesRetourDeFonds.map((item) => (
                                <option key={item.id} value={item.etat}>
                                    {item.etat}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={3} className="mb-2 px-2">
                    <Form.Label>Numéro de téléphone</Form.Label>
                    <InputGroup>
                        <InputGroup.Text></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="numéro"
                            value={numero}
                            onChange={(event) => setNumero(event.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs={12} md={3} lg={6} className="px-2 mt-4">
                    <div className="mt-3 mb-4">
                        <Button
                            className="mx-2"
                            variant="primary"
                            type="button"
                            onClick={() => getReturnFundingList()}
                        >
                            Filtrer
                        </Button>
                        <Button
                            variant="outline-primary"
                            type="button"
                            onClick={()=> exportData()}
                        >
                            Exporter
                        </Button>
                    </div>
                </Col>
            </div>
            {
                isLoaded ? <Row>
                    <RetourDeFondsList
                        key={version}
                        listInfo={returnFundingList}
                        count={count}
                        userCanMakeReturnFunding={userCanMakeReturnFunding}
                        returnFundingGroup1={returnFundingGroup1}
                        returnFundingGroup2={returnFundingGroup2}
                        returnFundingGroup3={returnFundingGroup3}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        onRefresh={incrementVersion}
                    />
                </Row> : <div className="d-flex justify-content-center">
                    <Spinner animation="border " size="sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </div>
    )
}