import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, withLayout: Layout, ...rest }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const renderRoute = () => <Route
    {...rest}
    render={
      props => isLoggedIn
        ? <Component {...props} />
        : <Redirect to='/login' />
      }
  />

  return (
    Layout
      ? <Layout>{ renderRoute() }</Layout>
      : renderRoute()
  )
};

export default PrivateRoute;
