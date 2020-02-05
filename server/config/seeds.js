import User from '../models/user';
import Grant from '../models/grant';

const seedDB = async () => {
  let user = await User.findOne({ email: 'superadmin@domain.com' });
  let grant = await Grant.findOne({ role: 'super_admin' });

  if(!grant) {
    grant = await Grant.create({
      role: 'super_admin',
      permissions: [
        { resource: 'all', action: 'read', possession: 'any' },
        { resource: 'all', action: 'create', possession: 'any' },
        { resource: 'all', action: 'update', possession: 'any' },
        { resource: 'all', action: 'delete', possession: 'any' },
      ],
    });
  }

  if(!user) {
    user = await User.create({
      name: 'Super Admin',
      email: 'superadmin@domain.com',
      password: 'Pass1234',
      grant: grant._id,
    });
  }

  if(!(await Grant.findOne({ role: 'admin' }))) {
    await Grant.create({
      role: 'admin',
      permissions: [
        { resource: 'user', action: 'read', possession: 'any' },
        { resource: 'user', action: 'create', possession: 'any' },
        { resource: 'grant', action: 'read', possession: 'any' },
        { resource: 'grant', action: 'create', possession: 'any' },
        { resource: 'grant', action: 'update', possession: 'any' },
        { resource: 'grant', action: 'delete', possession: 'any' },
      ],
    });
  }

  if(!(await Grant.findOne({ role: 'user' }))) {
    await Grant.create({
      role: 'user',
      permissions: [
        { resource: 'user', action: 'read', possession: 'own' },
      ],
    })
  }
};

export default seedDB;
