import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, withLayout: Layout, isRedirect, isAuthRoute, ...rest}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const renderRoute = () => <Route
    {...rest}
    render={
      props => isRedirect
        ? <Redirect to={rest.to} />
        : isLoggedIn && isAuthRoute
          ? <Redirect to='/dashboard' />
          : <Component {...props} />
    }
  />

  return (
    Layout
      ? <Layout>{ renderRoute() }</Layout>
      : renderRoute()
  );
};

export default PublicRoute;
