import axios from 'axios';
import { APPKEY } from '../pages/constante/Const';

export const apiBaseUrl = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'AppKey': APPKEY
  }
});

export const getAxiosInstance = () => instance;

export const handleAxiosError = (error, handlers) => {
  const { onNetworkError, onError } = handlers;

  if (error.response) {
    handleResponseError(error, handlers);
  } else if (error.request && onNetworkError) {
    onNetworkError();
  } else {
    onError(error);
  }
};

function handleResponseError(error, { onForbidden, onClientError, onServerError }) {
  const status = error.response.status;
  if (status === 401 && onForbidden) {
    onForbidden();
  } else if (status >= 400 && status <= 499 && onClientError) {
    onClientError();
  } else if (status >= 500 && status <= 599 && onClientError) {
    onServerError();
  } else {
    console.error(error.toJSON());
  }
}
