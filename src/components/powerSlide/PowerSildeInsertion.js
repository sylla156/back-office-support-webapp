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
        <>
      <div>
        <iframe
          src="https://app.powerslide.io/slide/headless/d5b2762b-5094-4a4c-97df-23320fccdacc"
          title="Weekly"
          style={{ margin: "30px 0", display: " block;" }}
          width="100%"
          height="800"
        ></iframe>
      </div>
      <div>
        <iframe
          src="https://app.powerslide.io/slide/headless/510bbce0-effc-411b-ab14-ab2fcfd3b8cc"
          title="Transfers"
          style={{ margin: "30px 0", display: "block" }}
          width="100%"
          height="800"
        ></iframe>
      </div>
    </>
    )
}
