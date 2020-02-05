import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../api/auth';
import { logoutUserSuccess, logoutUserFailure } from '../../actions/auth';

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Dashboard Layout</h1>
      <Button type='primary' onClick={() => dispatch(logoutUser(logoutUserSuccess, logoutUserFailure))}>
        Logout
      </Button>
      { children }
    </div>
  )
};

export default DashboardLayout;
