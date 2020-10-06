import React from 'react';
import { Route } from 'react-router-dom';
import { isUserSet } from '../auth/index';
import { Redirect } from 'react-router-dom';

export default function PrivateRoute({ component, ...options }) {

  let finalComponent;
  if (!isUserSet() && options.private) {
    finalComponent = () => {return (<Redirect to="/"></Redirect>)} ;
  } else {
    finalComponent = component
  }
  return <Route {...options} component={finalComponent} />;
}
