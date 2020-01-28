import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const switchRoutes = (routes) => {
  return (
    <Switch>
      {
        routes.map(route => (
          route.isPrivate
            ? <PrivateRoute key={route.path} {...route} />
            : <PublicRoute key={route.path} {...route} />
        ))
      }
      <Redirect from='*' to='/not-found' />
    </Switch>
  )
};

export default switchRoutes;
