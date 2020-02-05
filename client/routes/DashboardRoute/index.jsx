import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';
import DashboardLayout from '../../layouts/DashboardLayout';
import Dashboard from '../../pages/Dashboard';
import Users from '../../pages/Dashboard/users';

const DashboardRoute = () => {
  return (
    <Switch>
      <PrivateRoute exact path='/dashboard' component={Dashboard} withLayout={DashboardLayout} />
      <PrivateRoute exact path='/dashboard/users' component={Users} withLayout={DashboardLayout} />
      <Redirect from='*' to='/not-found' />
    </Switch>
  )
}

export default DashboardRoute;
