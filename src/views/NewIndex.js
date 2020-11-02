import React, { useState } from 'react';
import {message,  Select,
      Row, Col, Button, Modal, Radio } from "antd";
import {API} from "../utils/axios";
import {loginRedirectUri, logout} from "../auth";
import * as ls from "local-storage";
import {TOKEN_NAME} from "../config";

// Introduce HomeContent content component
import HomeContent from '../Components/home';
// Introduce the PublicRequest content component
import PublicRequest from '../Components/favours';
// Introduce Favours content component
import Favours from '../Components/publicRequest';


// style
const container = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px',
    boxSizing: 'border-box',
    height: '80px',
    border: '1px solid #eee'
}

const topBtn = {
    width: '100%',
    boxSizing: 'border-box',
    height: '80px',
    lineHeight: '80px',
    border: '1px solid #eee'
}

const btn = {
    marginRight: '50px'
}



// react Component
export default class NewIndex extends React.Component {

    constructor(props, context) {
        super(props);

        // Component data
        this.state = {
            visible: '1',
            isLogin: false
        }
    }


    // sign out
    logUserOut = () => {
        window.localStorage.clear();
        logout();
    }

    // log in
    goToLogIn = () => {
        this.props.history.push('/login');
    }

    // registered
    goToSignUp = () => {
        this.props.history.push('/signup');
    }

    // Toggle tab navigation
    handleVisible = e => {
        this.setState({ visible: e.target.value.slice(0) });
    }

    componentDidMount() {
        // initialization
        if( window.localStorage.getItem("isLogin") === 'true'){
            this.setState({isLogin: true})
        }
    }

    render() {

        // Component content 
        return (
           <div>
                   <div style={container}>
                       <Col  style={{ fontSize: '24px', paddingLeft: '50px'}}>
                           Favtrack
                           <Button />
                       </Col>

                       <Col>
                           {
                            ls.get(TOKEN_NAME)? null : <Button style={btn}
                                onClick={this.goToLogIn}
                                variant="contained"
                                >Log in
                                </Button>
                          }
                           {
                               ls.get(TOKEN_NAME)? null : <Button style={btn}
                               onClick={this.goToSignUp}
                               variant="contained"
                               >Sign Up
                               </Button>
                           }
                           {
                               ls.get(TOKEN_NAME)? <Button
                                   style={btn}
                                   variant="contained"
                                   onClick={this.logUserOut}
                               >
                                   Log Out
                               </Button> : null
                           }

                       </Col>
                   </div>
                   <div  style={topBtn}>
                       <Radio.Group value={this.state.visible} onChange={this.handleVisible}>
                        <Radio.Button value="1">Home</Radio.Button>
                        <Radio.Button value="2" disabled={!this.state.isLogin}>Favours</Radio.Button>
                        <Radio.Button value="3">Public Request</Radio.Button>
                       </Radio.Group>
                   </div>
				
                    <div gutter={20} style={{padding: '100px 0'}}>,
                        {
                         this.state.visible == 1 ?
							(<HomeContent />)
                          : this.state.visible == 2 ?
							(<PublicRequest history={this.props.history}/>)
                          :
							(<Favours/>)
                        }
                   </div>
           </div>
        )
    }
}


