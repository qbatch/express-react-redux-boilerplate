import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function auth(state=initialState.auth, action) {
  switch(action.type) {
    case types.REGISTER_USER_SUCCESS:
      const { user, token } = action.payload;

      localStorage.setItem('AUTH_TOKEN', token);

      return { ...state, currentUser: user, isLoggedIn: true };

    case types.REGISTER_USER_FAILURE:
      return state;

    default:
      return state;
  }
}
