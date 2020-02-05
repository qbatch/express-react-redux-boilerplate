import Grant from '../../models/grant';

const updatePermissionInRole = async (req, res) => {
  const { params: { role, permissionId }, body: { resource, action, possession } } = req;

  const grant = await Grant.findOneAndUpdate({ role, permissions: {
    $elemMatch: { _id: permissionId },
  } }, {
    $set: {
      'permissions.$.resource': resource,
      'permissions.$.action': action,
      'permissions.$.possession': possession,
    },
  }, {
    new: true,
    runValidators: true,
    omitUndefined: true,
  });

  if (!grant) return res.status(404).json({ errors: ['Role or Permission not found'] });

  return res.status(200).json({ grant: grant.transform() });
};

export default updatePermissionInRole;
