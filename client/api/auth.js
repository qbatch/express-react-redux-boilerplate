import request from './request';

export const registerUser = (data, successAction, failureAction) => dispatch => dispatch(
  request(
    '/register',
    {
      method: 'POST',
      data,
    },
    successAction,
    failureAction,
    { showLoading: true },
  ),
);

export const loginUser = (data, successAction, failureAction) => dispatch => dispatch(
  request(
    '/login',
    {
      method: 'POST',
      data,
    },
    successAction,
    failureAction,
    { showLoading: true },
  ),
);

export const getCurrentUser = (successAction, failureAction) => dispatch => dispatch(
  request(
    '/get-current-user',
    { method: 'GET' },
    successAction,
    failureAction,
  ),
);

export const forgotPassword = (data, successAction, failureAction) => dispatch => dispatch(
  request(
    '/forgot-password',
    {
      method: 'POST',
      data,
    },
    successAction,
    failureAction,
    { showLoading: true },
  ),
);

export const resetPassword = (data, successAction, failureAction) => dispatch => dispatch(
  request(
    '/update-password',
    {
      method: 'POST',
      data,
    },
    successAction,
    failureAction,
    { showLoading: true },
  ),
);

export const logoutUser = (successAction, failureAction) => dispatch => dispatch(
  request(
    '/logout',
    { method: 'DELETE' },
    successAction,
    failureAction,
  ),
);
