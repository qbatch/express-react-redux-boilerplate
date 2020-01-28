import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, isRedirect, isAuthRoute, ...rest}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
      <Route
        {...rest}
        render={
          props => isRedirect
            ? <Redirect to={rest.to} />
            : isLoggedIn && isAuthRoute
              ? <Redirect to='/dashboard' />
              : <Component {...props} />
        }
      />
  );
};

export default PublicRoute;
