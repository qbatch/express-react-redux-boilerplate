import axios from 'axios';

import {
  showLoader,
  hideLoader,
} from '../actions/loader';

const authToken = localStorage.getItem('AUTH_TOKEN') ? `JWT ${localStorage.getItem('AUTH_TOKEN')}` : null;

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
        ...authToken && { Authorization: authToken },
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
