import React from 'react';

import './styles.less';

const AuthLayout = ({ children }) => {
  return (
    <div className='auth-layout'>
      { children }
    </div>
  )
};

export default AuthLayout;
