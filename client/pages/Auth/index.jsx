import React from 'react';
import { Route } from 'react-router-dom';

import AuthLayout from '../../layouts/AuthLayout';
import { appRoutes, switchRoutes } from '../../routes';

const Auth = () => {
  return (
    <AuthLayout>
      { switchRoutes(appRoutes.auth.childRoutes) }
      <Route from='*' to='/not-found' />
    </AuthLayout>
  )
};

export default Auth;
