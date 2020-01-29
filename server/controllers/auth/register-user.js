import passport from 'passport';

import createUserSession from './create-user-session';

const registerUser = async (req, res) => {
  return passport.authenticate('signup', { session: false }, (err, user) => {
    if(!user) return res.status(400).send(err?.message ?? 'Bad request');

    return createUserSession(req, res, user);
  })(req, res);
};

export default registerUser;
