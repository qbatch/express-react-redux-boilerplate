import Grant from '../../models/grant';

const deleteGrant = async (req, res) => {
  const { id: _id } = req.params;

  const grant = await Grant.findOneAndDelete({ _id });

  if (!grant) return res.status(404).json({ errors: ['Grant not found'] });

  return res.status(200).json({ _id });
};

export default deleteGrant;
