import passport from 'passport';

const getCurrentUser = async (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if(!user)  return res.status(401).send(err?.message ?? 'Unauthorized');

    return res.status(200).json({ user });
  })(req, res)
};

export default getCurrentUser;
