import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function auth(state=initialState.auth, action) {
  switch(action.type) {
    case types.REGISTER_USER_SUCCESS: {
      const { user, token } = action.payload;

      localStorage.setItem('AUTH_TOKEN', token);

      return { ...state, currentUser: user, isLoggedIn: true, grants: user.grant };
    }

    case types.REGISTER_USER_FAILURE:
      return state;

    case types.LOGIN_USER_SUCCESS: {
      const { user, token } = action.payload;

      localStorage.setItem('AUTH_TOKEN', token);

      return { ...state, currentUser: user, isLoggedIn: true, grants: user.grant };
    }

    case types.LOGIN_USER_FAILURE:
      return state;

    case types.GET_CURRENT_USER_SUCCESS: {
      const { user } = action.payload;

      return { ...state, currentUser: user, isLoggedIn: true, isFetching: false, grants: user.grant };
    }

    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, isFetching: false };

    case types.SET_IS_FETCHING_USER:
      return { ...state, isFetching: action.payload };

    case types.LOGOUT_USER_SUCCESS:
      localStorage.removeItem('AUTH_TOKEN');

      return { ...state, isLoggedIn: false };

    case types.LOGOUT_USER_FAILURE:
      return state;

    default:
      return state;
  }
}
