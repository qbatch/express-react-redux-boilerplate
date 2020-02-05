import Grant from '../../models/grant';

const getGrants = async (req, res) => {
  let grants = await Grant.find();

  grants = grants.map(grant => grant.transform()).flat();

  return res.status(200).json({ grants });
};

export default getGrants;
