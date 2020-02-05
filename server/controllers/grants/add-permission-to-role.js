import Grant from '../../models/grant';

const addPermissionToRole = async (req, res) => {
  const { params: { role }, body: { resource, action, possession } } = req;

  const grant = await Grant.findOne({ role });

  if(!grant) return res.status(404).json({ errors: ['Role not found'] });

  grant.permissions.push({ resource, action, possession });

  await grant.save();

  return res.status(200).json({ grant: grant.transform() });
};

export default addPermissionToRole;
