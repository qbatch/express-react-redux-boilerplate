import Grant from '../../models/grant';

const createGrant = async (req, res) => {
  const { role, resource, action, userId, attributes } = req.body;

  const grant = await Grant.create({
    role,
    resource,
    action,
    attributes,
    userId,
  });

  return res.status(200).json({ grant });
};

export default createGrant;
