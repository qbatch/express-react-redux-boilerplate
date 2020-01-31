import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import { push } from 'redux-first-history';

import AuthLayout from '../../layouts/AuthLayout';
import PublicRoute from '../PublicRoute';
import RegistrationPage from '../../pages/Auth/RegistrationPage'
import LoginPage from '../../pages/Auth/LoginPage';
import { getCurrentUser } from '../../api/auth';
import {
  getCurrentUserSuccess,
  getCurrentUserFailure,
  setIsFetchingUser,
} from '../../actions/auth';
import ForgotPassword from '../../pages/Auth/ForgotPassword';
import ResetPassword from '../../pages/Auth/ResetPassword';

const AuthRoute = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(
    () => {
      const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');

      if(AUTH_TOKEN && !isLoggedIn) {
        dispatch(setIsFetchingUser(true));
        dispatch(getCurrentUser(getCurrentUserSuccess, getCurrentUserFailure));
      }

      if(isLoggedIn) {
        dispatch(push('/dashboard'));
      }
    },
    [isLoggedIn],
  );

  return (
    <Switch>
      <PublicRoute exact path='/auth/register' component={RegistrationPage} withLayout={AuthLayout} />
      <PublicRoute exact path='/auth/login' component={LoginPage} withLayout={AuthLayout} />
      <PublicRoute exact path='/auth/forgot-password' component={ForgotPassword} withLayout={AuthLayout} />
      <PublicRoute exact path='/auth/reset-password/:resetPasswordToken' component={ResetPassword} withLayout={AuthLayout} />
      <Redirect from='*' to='/not-found' />
    </Switch>
  )
};

export default AuthRoute;
