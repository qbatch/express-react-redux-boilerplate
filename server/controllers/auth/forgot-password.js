import crypto from 'crypto';

import User from '../../models/user';
import { sendResetPasswordMail } from '../../services/mailer';


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ errors: ['Email not found'] });

  const recoveryToken = crypto.randomBytes(20).toString('hex');
  const tokenExpiryTime = 3600000;

  await sendResetPasswordMail(user.email, recoveryToken);

  await User.updateOne({ _id: user._id }, {
    resetPasswordToken: recoveryToken,
    resetPasswordExpiresAt: (Date.now() + tokenExpiryTime),
  });

  return res.status(200).json({ status: true });
};

export default forgotPassword;
