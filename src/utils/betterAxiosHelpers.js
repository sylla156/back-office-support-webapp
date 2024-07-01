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
  // TODO: when doing a rebase, keep this. It is a fix.
  const { onRequestError, onError } = handlers;

  if (error.response) {
    handleResponseError(error, handlers);
  } else if (error.request && onRequestError) {
    // TODO: when doing a rebase, keep this. It is a fix.
    onRequestError();
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
  } else if (status >= 500 && status <= 599 && onServerError) {
    onServerError();
  } else {
    console.error(error.toJSON());
  }
}
