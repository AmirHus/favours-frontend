import axios from 'axios';
import { AUTH0, TOKEN_NAME } from '../config';
import * as ls from 'local-storage';

export const loginRedirectUri = `${window.location.protocol}//${
    window.location.host
}/login/`;

const logoutRedirectUri = `${window.location.protocol}//${
    window.location.host}/`

export const login = () => {
  window.open(
      `${AUTH0.BASE_URL}/authorize?response_type=code&client_id=${AUTH0.CLIENT_ID}&scope=openid%20email%20profile&audience=${AUTH0.AUDIENCE}&redirect_uri=${loginRedirectUri}`,
      '_self'
  );
  getAuth0Token()
};

export const logout = () => {
  ls.remove(TOKEN_NAME);
  console.log('beng called');
  window.open(
      `${AUTH0.BASE_URL}/v2/logout?client_id=${AUTH0.CLIENT_ID}&returnTo=${logoutRedirectUri}`,
      '_self'
  );
};

export const getAuth0Token = async (code) => {
  return await axios.post('localhost:8080/auth/token', {
    code,
    redirect_uri: loginRedirectUri,
  });
};

export const getToken = () => {
  return ls.get(TOKEN_NAME);
};

export const clearToken = () => {
  ls.remove(TOKEN_NAME);
};

export const isUserSet = () => {
  const token = ls.get(TOKEN_NAME);
  return (!!token);
};
