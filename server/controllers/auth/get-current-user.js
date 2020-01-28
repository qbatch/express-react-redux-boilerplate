import passport from 'passport';

const getCurrentUser = async (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if(!user)  return res.status(400).send(err?.message ?? 'Internal Server Error');

    return res.status(200).json({ user });
  })(req, res)
};

export default getCurrentUser;
