import axios from 'axios';
import {APPKEY} from '../pages/constante/Const';

export default class AxiosWebHelper {

    static getAxios() {

        const apiURL = process.env.REACT_APP_API_URL; // Defined at build time so don't forget to define the env var
       
        const instance = axios.create({
            baseURL: apiURL,
            headers: {
                'Content-Type': 'application/json',
                'AppKey': APPKEY
            },
            responseType: 'json',
        });
        return instance;
    
    }

}
