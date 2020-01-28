import {
  generateAuthToken,
} from '../../middlewares/auth';

const createUserSession = (req, res, user) => {
  req.login(user, { session: false }, (err) => {
    if (err) return res.status(500).send(err?.message ?? 'Internal Server Error');

    return res.json({ user, token: generateAuthToken(user.email) })
  });
};

export default createUserSession;
