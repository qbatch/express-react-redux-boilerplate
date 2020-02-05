import {
  generateAuthToken,
} from '../../middlewares/auth';
import User from '../../models/user';

const createUserSession = (req, res, user) => {
  req.login(user, { session: false }, async (err) => {
    if (err) return res.status(500).send(err?.message ?? 'Internal Server Error');

    try {
      user.authToken = generateAuthToken(user.email);
      await user.save()

      user = await User.findOne({ _id: user._id }).populate('grant');

      return res.status(200).json({ user, token: user.authToken });
    } catch(err) {
      console.log('Error', err);
      return res.status(500).send('Internal Server Error');
    }
  });
};

export default createUserSession;
