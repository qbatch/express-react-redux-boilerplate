import React from 'react';
import CanAccess, { useGrants } from '../../components/CanAccess';

const Dashboard = () => {
  const hasAccess = useGrants();

  return (
    <>
      <h1>Dashboard</h1>
      <CanAccess grant={{ resource: 'user', action: 'read', possession: 'any' }}>
        <div>User has access to view all users</div>
      </CanAccess>

      <CanAccess grant={{ resource: 'user', action: 'read', possession: 'own' }}>
        <div>User has access to view his information</div>
      </CanAccess>

      {
        hasAccess({ resource: 'user', action: 'read', possession: 'own' }) && <div>
          Showing user using useGrants hook
        </div>
      }
    </>
  );
};

export default Dashboard;
