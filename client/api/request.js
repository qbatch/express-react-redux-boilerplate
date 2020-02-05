import axios from 'axios';

import authHeaders from './auth-headers'
import {
  showLoader,
  hideLoader,
} from '../actions/loader';

export default function request(
  url,
  reqOptions={},
  successAction,
  failureAction,
  options={},
  ) {
  return dispatch => {
    if(options.showLoading) dispatch(showLoader());

    axios({
      url: `/api/v1${url}`,
      headers: {
        ...reqOptions.headers,
        ...authHeaders(),
      },
      ...reqOptions
    }).then(res => {
      dispatch(successAction(res.data))
    }).catch(err => {
      dispatch(failureAction(err?.response?.data));
    }).finally(() => {
      if(options.showLoading) dispatch(hideLoader());
    })
  }
}
