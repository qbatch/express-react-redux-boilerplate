import { push } from 'redux-first-history';

import * as types from './actionTypes';
import { successNotifcation, errorNotification } from './notifications';

export const registerUserSuccess = payload => {
  return dispatch => {
    dispatch({
      type: types.REGISTER_USER_SUCCESS,
      payload,
    });

    dispatch(push('/dashboard'));

    successNotifcation('Registration Success', 'Successfully registered user');
  }
};

export const registerUserFailure = payload => {
  return dispatch => {
    dispatch({
      type: types.REGISTER_USER_FAILURE,
      payload,
    });

    errorNotification('Registration Failed', payload);
  }
};

export const loginUserSuccess = payload => {
  return dispatch => {
    dispatch({
      type: types.LOGIN_USER_SUCCESS,
      payload,
    });

    dispatch(push('/dashboard'))
  }
};

export const loginUserFailure = payload => {
  return dispatch => {
    dispatch({
      type: types.LOGIN_USER_FAILURE,
      payload,
    });

    errorNotification('Login Failed', payload);
  }
};

export const getCurrentUserSuccess = payload => ({
  type: types.GET_CURRENT_USER_SUCCESS,
  payload,
});

export const getCurrentUserFailure = payload => ({
  type: types.GET_CURRENT_USER_FAILURE,
  payload,
});

export const setIsFetchingUser = payload => ({
  type: types.SET_IS_FETCHING_USER,
  payload,
});

export const forgotPasswordSuccess = () => {
  successNotifcation('Reset Password', 'Reset password link sent to give email');
};

export const forgotPasswordFailure = payload => {
  errorNotification('Forgot Password', payload);
};

export const resetPasswordSuccess = () => {
  return dispatch => {
    successNotifcation('Update Password', 'Successfully updated your password');

    dispatch(push('/auth/login'));
  }
};

export const resetPasswordFailure = payload => {
  errorNotification('Update Password', payload);
};
