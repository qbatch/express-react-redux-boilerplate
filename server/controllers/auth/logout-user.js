const logoutUser = async (req, res) => {
  const { user } = req;

  user.authToken = null;
  await user.save();

  return res.status(200).json({ status: true });
};

export default logoutUser;
