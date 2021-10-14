import { useState } from 'react';

export default function useToken() {

  const JWT = 'jwt';
  const getToken = () => {

    const tokenString = sessionStorage.getItem(JWT);

    const dataToken = JSON.parse(tokenString); 
    
    return dataToken.token; // dataToken?.token;

  };

  const [token, setToken] = useState(getToken() || null); // initialisation

  const saveToken = dataToken => {

    localStorage.setItem(JWT, JSON.stringify(dataToken));

    setToken(dataToken.token);

  };

  return {
    setToken: saveToken,
    token
  }
}