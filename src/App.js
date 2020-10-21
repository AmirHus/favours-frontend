import React from 'react';
import Router from './router/index';
import { Button } from 'antd';
import './App.css';

export default class App extends React.Component {
  render() {
    return(
      <div style={{height: '100%'}}>
        <Router/>
      </div>
    )
  }
};
