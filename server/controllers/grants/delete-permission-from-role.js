import Grant from '../../models/grant';

const deletePermissionFromRole = async (req, res) => {
  const { role, permissionId } = req.params;

  const grant = await Grant.findOneAndDelete({ role, permissions: {
    $elemMatch: { _id: permissionId },
  } });

  if (!grant) return res.status(404).json({ errors: ['Role or Permission not found'] });

  return res.status(200).json({ grant: grant.transform() });
};

export default deletePermissionFromRole;
