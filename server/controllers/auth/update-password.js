import User from '../../models/user';

const updatePassword = async (req, res) => {
  const { resetPasswordToken, password } = req.body;

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiresAt: {
      $gt: Date.now(),
    },
  });

  if (!user) return res.status(400).json({ errors: ['Invalid reset link or reset link expired!'] });

  // pre save hook won't work in case of update
  user.password = password;
  user.set('resetPasswordExpiresAt', undefined);
  user.set('resetPasswordToken', undefined);

  await user.save();

  return res.status(200).json({ status: true });
};

export default updatePassword;
