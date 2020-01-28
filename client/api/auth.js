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
  )
);
