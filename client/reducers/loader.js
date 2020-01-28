import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loader(state=initialState.loader, action) {
  switch(action.types) {
    case types.SHOW_LOADER:
      return { ...state, isLoading: true };

    case types.HIDE_LOADER:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}