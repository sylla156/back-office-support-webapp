import React, { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { Redirect } from "react-router-dom"
import { APPKEY, FIRST_PAGE_INDEX, PAGE_SIZE, GET_ALL_USERS } from "../constante/Const"
import { Row, Spinner } from "@themesberg/react-bootstrap"
import AxiosWebHelper from "../../utils/axios-helper"
import { Routes } from "../../routes"
import { ListUsers } from "./ListUsers"

export default () => {
    const [errorData, setErrorData] = useState(null);
    const [isLoadedCSV, setIsLoadedCSV] = useState(true);
    const [errorDataCSV, setErrorDataCSV] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [shouldLogin, setShouldLogin] = useState(false);
    const [count, setCount] = useState(undefined);
    const [usersList, setUsersList] = useState([]);
    const [currentPage, setCurrentPage] = useState(FIRST_PAGE_INDEX);
    const [version, setVersion] = useState(0);

    const [cookies] = useCookies(["token", "user"]);
    const axios = AxiosWebHelper.getAxios();

    const userCanUpdateRights = cookies.user.canUpdateUserRights;

    const onPageChange = (page = 0) => {
        setCurrentPage(page);
    };

    const incrementVersion = () =>
        setVersion((currentVersion) => {
            console;
            return currentVersion + 1;
        });
    
    const getAllUsers = () => {
        setIsLoaded(false)
        setErrorData(null)

        axios.get(GET_ALL_USERS,{
            headers:{
                AppKey: APPKEY,
                authenticationtoken: cookies.token
            }
        }).then((response) => {
            setUsersList(response.data)
            setCount(response.data.length)
            setIsLoaded(true)
        }).catch((error) => {
            setIsLoaded(true)
            if (error.response) {
                if (error.response.status === 401) {
                    setShouldLogin(true);
                } else {
                    setErrorData(error.response.data.message);
                }
            }
        });
    }

    useEffect(() => {
        getAllUsers()
    }, [currentPage, version]);

    if (!cookies.token) {
        return <Redirect to={Routes.Signin.path} />
    }
    if (shouldLogin) {
        return <Redirect to={Routes.Signin.path} />;
    }

    return (
        <div>
            {
                isLoaded ?
                    <Row>
                        <ListUsers
                            key={version}
                            listInfo={usersList}
                            count={count}
                            userCanUpdateRights={userCanUpdateRights}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                            onRefresh={incrementVersion}
                        />
                    </Row> :
                    <div className="d-flex justify-content-center">
                    <Spinner animation="border " size="sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
        </div>
    )
}