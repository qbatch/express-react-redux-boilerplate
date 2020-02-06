import React from 'react';
import { useSelector } from 'react-redux';
import AccessControl from 'accesscontrol';

const canAccess = (res, act, pos) => {
  const grants = useSelector(state => state.auth.grants);

  const ac = new AccessControl(grants);

  return ac.can(grants[0].role)[`${act}${pos.capitalize()}`](res).granted
};

const CanAccess = ({ grant: { resource, action, possession }, children }) => {
  // const grants = useSelector(state => state.auth.grants);

  // const ac = new AccessControl(grants);

  return (
    <>
      {
        canAccess(resource, action, possession) ? children : null
      }
    </>
  )
};

export const useGrants = () => ({ resource, action, possession }) => {
  return canAccess(resource, action, possession);
};

export default CanAccess;
