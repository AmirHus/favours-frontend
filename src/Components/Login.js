import React from 'react';
import { login, loginRedirectUri } from '../auth/index';
import { LinearProgress } from '@material-ui/core';
import { API } from '../utils/axios';
import * as ls from 'local-storage';
import { TOKEN_NAME } from '../config';

export default class Login extends React.Component {

  // run this code after the component is done mounting
  componentDidMount() {
    // get the code from the rul
    const query = this.useQuery();
    const code = query.get('code');
    if (!code) {
      login();
    } else {
      // get the jwt token and set it
      this.getJWToken(code);
      localStorage.setItem("isLogin",true);
      this.props.history.push('/newIndex');
    }
  }

  // used to get url params
  useQuery = () => {
    return new URLSearchParams(this.props.location.search);
  }

  // server call to generate a jwt
  getJWToken = async (code) => {
    const response = await API.post('/auth/token', {
      code, redirectUri: loginRedirectUri
    });
    this.setToken(response.data.access_token);
  }

  // sets the jwt token
  setToken(token) {
    ls.set(TOKEN_NAME, token);
  }

  render() {
    return (
      <LinearProgress color={'primary'} ></LinearProgress>
    )
  }
}
