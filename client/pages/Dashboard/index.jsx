import React from 'react';
import CanAccess, { canRoleAccess } from '../../components/CanAccess';

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <CanAccess role='user' grant={{ resource: 'user', action: 'read', possession: 'any' }}>
        <div>User has access to view all users</div>
      </CanAccess>

      <CanAccess role='user' grant={{ resource: 'user', action: 'read', possession: 'own' }}>
        <div>User has access to view his information</div>
      </CanAccess>

      {
        canRoleAccess('user', { resource: 'user', action: 'read', possession: 'own' }) && <div>
          Showing user using useGrants hook
        </div>
      }
    </>
  );
};

export default Dashboard;
