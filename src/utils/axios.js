import axios from 'axios';
import * as ls from "local-storage";
import {TOKEN_NAME} from "../config";

let token = ls.get(TOKEN_NAME)
export const API = axios.create({baseURL: 'http://localhost:8080', headers: {'authorization': token}}, );

API.interceptors.response.use((value) => value, (error) => {
  // if (error.response?.status === 401 || error.response?.status === 403) {
  //   window.location.href = `${window.location.protocol}//${
  //     window.location.host
  //   }/`;
  // }
  return Promise.reject(error);
});
