import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props}></Component>
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        ></Redirect>
      )
    }
  ></Route>
);

export default PrivateRoute;
