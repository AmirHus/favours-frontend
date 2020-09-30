import React from 'react';
import { login, loginRedirectUri } from '../auth/index';
import { LinearProgress } from '@material-ui/core';
import { API } from '../utils/axios';
import * as ls from 'local-storage';
import { TOKEN_NAME } from '../config';

export default class Login extends React.Component {

  useQuery = () => {
    return new URLSearchParams(this.props.location.search);
  }

  getJWToken = async (code) => {
    const response = await API.post('http://localhost:8080/auth/token', {
      code, redirectUri: loginRedirectUri
    });
    this.setToken(response.data.access_token);
  }

  setToken(token) {
    ls.set(TOKEN_NAME, token);
  }

  render() {
    const query = this.useQuery();
    const code = query.get('code');
    if (!code) {
      login();
    }
    this.getJWToken(code);
    this.props.history.push('/');
    return (
      <LinearProgress color={'primary'} ></LinearProgress>
    )
  }
}