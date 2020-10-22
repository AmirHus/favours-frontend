import axios from 'axios';
import { getToken } from '../auth/index';

let token = getToken();
export const API = axios.create({baseURL: 'http://localhost:8080', headers: {'Authorization': token}}, );

API.interceptors.response.use((value) => value, (error) => {
  // if (error.response?.status === 401 || error.response?.status === 403) {
  //   window.location.href = `${window.location.protocol}//${
  //     window.location.host
  //   }/`;
  // }
  return Promise.reject(error);
});
