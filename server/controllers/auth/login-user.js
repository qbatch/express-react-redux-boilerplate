import passport from 'passport';

import createUserSession from './create-user-session';

const loginUser = async (req, res) => {
  passport.authenticate('login', { session: false }, (err, user) => {
    if(!user)  return res.status(400).send(err?.message ?? 'Bad request');

    return createUserSession(req, res, user);
  })(req, res);
};

export default loginUser;
