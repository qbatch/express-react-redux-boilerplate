import * as types from './actionTypes';

export const registerUserSuccess = payload => ({
  type: types.REGISTER_USER_SUCCESS,
  payload,
});

export const registerUserFailure = payload => ({
  type: types.REGISTER_USER_FAILURE,
  payload,
});
