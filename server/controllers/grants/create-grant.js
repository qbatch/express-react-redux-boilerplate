import Grant from '../../models/grant';

const createGrant = async (req, res) => {
  const { role, permissions } = req.body;

  const grant = await Grant.create({
    role,
    permissions,
  });

  return res.status(200).json({ grant });
};

export default createGrant;
