import React from 'react';
import { useSelector } from 'react-redux';
import useGrants from 'use-accesscontrol-grants';

export const canAccess = (role) => ({ resource, action, possession }) => {
  const grants = useSelector(state => state.auth.grants);

  return useGrants(grants)(role)(resource, action, possession);
};

export const canRoleAccess = (role, { resource, action, possession }) => {
  return canAccess(role)({resource, action, possession});
};

const CanAccess = ({ role, grant: { resource, action, possession }, children }) => (
  <>
    {
      canRoleAccess(role, { resource, action, possession }) ? children : null
    }
  </>
);

export default CanAccess;
