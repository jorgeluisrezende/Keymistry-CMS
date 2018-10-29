import React from 'react';  
import { Redirect, Route } from 'react-router-dom';

const isAuth = localStorage.getItem('token');

const PrivateRoute = ({ component: Component, ...props }) => (  
  <Route {...props} render={props => (
   isAuth ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
        }}
      />
    )
  )} />
);

export default PrivateRoute;