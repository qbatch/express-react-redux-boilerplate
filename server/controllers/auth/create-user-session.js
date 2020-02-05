import {
  generateAuthToken,
} from '../../middlewares/auth';

const createUserSession = (req, res, user) => {
  req.login(user, { session: false }, async (err) => {
    if (err) return res.status(500).send(err?.message ?? 'Internal Server Error');

    user.authToken = generateAuthToken(user.email);

    user.save()
      .then(() => {
        return res.status(200).json({ user, token: user.authToken });
      })
      .catch((err) => {
        console.log('Error', err);
        return res.status(500).send('Internal Server Error');
      })
  });
};

export default createUserSession;
