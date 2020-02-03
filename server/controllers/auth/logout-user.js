import * as redisService from '../../services/redis';

const logoutUser = async (req, res) => {
  const { email } = req.user;

  await redisService.set(email, '');

  return res.status(200).json({ status: true });
};

export default logoutUser;
