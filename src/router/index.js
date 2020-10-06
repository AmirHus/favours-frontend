import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { routes } from './routes';
import PrivateRoute from './privateRoute';

export default class Router extends React.Component{
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {routes.map((route, key) => (
            <PrivateRoute
            key={`${route.name}(${key})`}
            path={route.path}
            private={route.private}
            component={route.component}
          />
          ))}
        </Switch>
      </BrowserRouter>
    ) 
  }
}