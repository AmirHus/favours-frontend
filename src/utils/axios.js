import axios from 'axios';

export const API = axios.create();

API.interceptors.response.use((value) => value, (error) => {
  if (error.response?.status === 401 || error.response?.status === 403) {
    window.location.href = `${window.location.protocol}//${
      window.location.host
    }/`;
  }
  return Promise.reject(error);
});