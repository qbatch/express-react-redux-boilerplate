import mongoose from 'mongoose';

const Grant = new mongoose.Schema({
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'user'],
    default: 'user',
    unique: true,
  },
  permissions: [{
    resource: { type: String, required: true },
    action: {
      type: String,
      enum: ['create', 'read', 'update', 'delete'],
      required: true,
    },
    possession: {
      type: String,
      enum: ['own', 'any'],
      required: true,
    },
  }],
});

export const transform = function (grant) {
  const self = this || grant;
  const transformedGrant = [];

  self.permissions.forEach(permission => {
    transformedGrant.push({
      roleId: self._id,
      role: self.role,
      permissionId: permission._id,
      resource: permission.resource,
      action: permission.action,
      possession: permission.possession,
    });
  })

  return transformedGrant;
};

Grant.methods.transform = transform;

export default mongoose.model('Grant', Grant);
