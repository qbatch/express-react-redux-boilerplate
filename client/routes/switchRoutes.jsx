import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const switchRoutes = (routes) => {

  return (
    <Switch>
      {
        Object.keys(routes).map(routeKey => (
          routes[routeKey].isPrivate
            ? <PrivateRoute key={routes[routeKey].path} {...routes[routeKey]} />
            : <PublicRoute key={routes[routeKey].path} {...routes[routeKey]} />
        ))
      }
      <Redirect from='*' to='/not-found' />
    </Switch>
  )
};

export default switchRoutes;
