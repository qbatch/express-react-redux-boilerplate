import Grant from '../../models/grant';

const getGrants = async (req, res) => {
  const grants = await Grant.find();

  return res.status(200).json({ grants });
};

export default getGrants;
