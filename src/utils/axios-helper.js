import axios from 'axios';
import {APPKEY} from '../pages/constante/Const';

export default class AxiosWebHelper {

    static getAxios() {

        // let baseURLToUse = 'http://' + window.location.hostname + ':4000/';
        let baseURLToUse = "http://localhost" + ":3090/"; 
        const apiURL = process.env.REACT_APP_API_URL; // Defined at build time so don't forget to define the env var
        // console.log(apiURL);
        if (apiURL) {

            baseURLToUse = apiURL;
        
        }

        const instance = axios.create({
            baseURL: baseURLToUse,
            headers: {
                'Content-Type': 'application/json',
                'AppKey': APPKEY
            },
            responseType: 'json',
        });
        return instance;
    
    }

}
