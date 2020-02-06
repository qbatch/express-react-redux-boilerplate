import React from 'react';
import { useSelector } from 'react-redux';
import AccessControl from 'accesscontrol';

const CanAccess = ({ grant: { resource, action, possession }, children }) => {
  const grants = useSelector(state => state.auth.grants);

  const ac = new AccessControl(grants);

  const canAccess = (res, act, pos) => (
    ac.can(grants[0].role)[`${act}${pos.capitalize()}`](res).granted
  );

  return (
    <>
      {
        canAccess(resource, action, possession) ? children : null
      }
    </>
  )
};

export default CanAccess;
