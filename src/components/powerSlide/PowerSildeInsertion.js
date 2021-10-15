import React, {useState, useEffect} from "react";
import AxiosWebHelper from "../../utils/axios-helper";
import {useCookies} from 'react-cookie';
import { Redirect } from "react-router-dom";
import {Routes} from "../../routes";
import { POWERSLIDEFIRSTTRYNGAPIID, POWERSLIDEFIRSTTRYNGTOKEN, POWERSLIDEFIRSTTRYNGURL, POWERSLIDETRYINGACCESSSLIDEURL } from "../../pages/constante/Const";

export default function PowerSildeInsertion() {

    const [cookies] = useCookies(['token']);

    const axios = AxiosWebHelper.getAxios();

    const [isLoading, setIsLoading] = useState(true);

    const [errorData, setErrorData] = useState('');

    const [powerSlideData, setPowerSlideData] = useState([]);

    const powerSlideAPi = ()=>{
        console.log("in powerSlideAPi");
        setIsLoading(true);
        axios.post(
            POWERSLIDEFIRSTTRYNGURL,
            {
                "username":"tiahadoua@gmail.com"
            },
            {
                headers:{
                    appId: POWERSLIDEFIRSTTRYNGAPIID,
                    Authorization: `Bearer ${POWERSLIDEFIRSTTRYNGTOKEN}`
                }
            }
        )
        .then((result) =>{
            console.log("in powerSlideAPi result ");
            setIsLoading(false);
            console.log(result);
        })
        .catch(error =>{
            console.log("in powerSlideAPi catch error ");
            console.log(error);
        })

    };




    useEffect(() => {

        powerSlideAPi();
    
    }, []);

    if(!cookies.token){
        <Redirect  to={Routes.Signin.path}/>
    }

    return (
        <div>
            <iframe src="https://app.powerslide.io/slide/headless/fb0a604d-e6e8-44c4-86b8-b1d638239c30" width="100%" height="500" ></iframe>        
        </div>
    )
}
