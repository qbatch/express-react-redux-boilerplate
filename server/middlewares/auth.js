import passport from 'passport';
import { sign, verify } from 'jsonwebtoken'
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user';
import Grant from '../models/grant';
import {
  verify as verifyHash,
} from '../utils/hashing';

const { AUTH_SECRET } = process.env;

export const generateAuthToken = (payload) => sign(payload, AUTH_SECRET);

export const authenticateAuthToken = () => passport.authenticate('jwt', { session: false });

export const verifyToken = async (token) => verify(token, AUTH_SECRET);

export const SignupStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}, async (req, email, password, done) => {
  let { name, grant } = req.body;

  try {
    let user = await User.findOne({ email });

    if(user) return done({ message: 'Email already in use' }, false);

    if(!grant) {
      grant = (await Grant.findOne({ role: 'user' }))._id;
    }

    user = await User.create({
      email,
      name,
      password,
      grant,
    });

    return done(null, user);
  } catch (err) {
    done(err, false)
  }
});

export const LoginStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (email, password, done) => {
  User.findOne({
    email
  }).then((user) => {
    if (!user) {
      return done({ message: 'Invalid email or password!' }, false);
    }

    verifyHash(user.password, password).then((isVerified) => {
      if (!isVerified) {
        return done({ message: 'Invalid email or password!' }, false);
      }
      return done(null, user);
    });
  }).catch(err => done(err, false));
});

export const AuthenticationStrategy = new JWTstrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: AUTH_SECRET,
  passReqToCallback: true,
}, (req, email, done) => {
  const authToken = req.headers.authorization.split(' ')[1];

  User.findOne({ email }).populate('grant')
    .then((user) => {
      if (user) {
        if (authToken !== user.authToken) return done(null, false, { message: 'Unauthorized' });

        done(null, user);
      } else {
        done(null, false, { message: 'User not found!' });
      }
    })
    .catch(err => done(null, false, err));
});
