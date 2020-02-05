import AccessControl from 'accesscontrol';

import Grant from '../models/grant';

const ac = new AccessControl();

export const setGrants = async () => {
  let grants = await Grant.find();

  const plainGrants = grants.map(grant => grant.transform()).flat();

  ac.setGrants(plainGrants);
};

export const canAccess = (resource, action, possession='any') => (req, res, next) => {
  const userRole = req.user.grant?.role;

  if(userRole === 'super_admin') next();

  try {
    const permission = ac.can(userRole)[`${action}${possession.capitalize()}`](resource);

    if(!permission.granted) {
      return res.status(401).send('Unauthorized');
    }

    next();
  } catch(err) {
    console.error('Authorization error', err);
    return res.status(401).send('Unauthorized');
  }
};
