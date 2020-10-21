import React from 'react';
import { Link } from "react-router-dom";
import { logout } from '../../auth';
import {
    Card,
    CardContent,
    CardActions,
    Grid,
    TextField,
    Container,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText
} from '@material-ui/core';

const container = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px',
    boxSizing: 'border-box',
    backgroundImage: "url(" + require("../../img/homepage.jpg") + ")",
    backgroundSize: '100% 100%'
}

const btn = {
    marginRight: '50px',
    backgroundColor: '#fff',
}


const left = {
    marginLeft: '40px',
    padding: '10px'
}

export default class Index extends React.Component {

    constructor(props, context) {
        super(props);
    }

  goToLogin = () => {
      this.props.history.push('/homeIndex');
  }

  logUserOut = () => {
    logout();
  }

  goToSignUp = () => {
    this.props.history.push('/signup');
  }

  render() {
    return (
        <div style={container}>
            <div>
                <Button
                    style={left}
                    variant="contained" color="primary"
                    onClick={this.goToLogin}
                >IOU tracking system
                </Button>
            </div>
            <div>
                <Button style={btn}
                    onClick={this.goToSignUp}
                    variant="contained"
                >Loogin
                </Button>
                <Button
                    style={btn}
                    variant="contained"
                    onClick={this.logUserOut}
                >Sign Up
                </Button>
            </div>
        </div>
    )
  }
}
