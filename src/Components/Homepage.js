import React from 'react';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import { logout } from '../auth/index';

export default class Homepage extends React.Component {
  
  goToLogin = () => {    
    this.props.history.push('/login/invalid');
  }

  logUserOut = () => {
    logout();
  }

  goToSignUp = () => {
    this.props.history.push('/signup');
  }

  render() {
    return (
      <div>
        <li> <Link to="/create">Create Owe other </Link></li>
        <li> <Link to="/createOther">Create other Owe me</Link></li>
        <Button 
          variant="contained"
          onClick={this.goToLogin}
          >Login
        </Button>
        <Button
          variant="contained"
          onClick={this.logUserOut}
          >Logout
        </Button>
        <Button
          variant="contained"
          onClick={this.goToSignUp}
          >Sign Up
        </Button>
      </div>
    )
  }
}