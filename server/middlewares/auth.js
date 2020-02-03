import passport from 'passport';
import { sign, verify } from 'jsonwebtoken'
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user';
import {
  verify as verifyHash
} from '../utils/hashing';
import { setCurrentTenantId } from './storage';

const { AUTH_SECRET } = process.env;

export const generateAuthToken = payload => sign(payload, AUTH_SECRET);

export const authenticateAuthToken = () => passport.authenticate('jwt', { session: false });

export const verifyToken = async (token) => verify(token, AUTH_SECRET);

export const SignupStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
}, (req, email, password, done) => {
  const { name } = req.body;

  User.findOne({
    email,
  }).then((dbUser) => {
    if (dbUser) return done({ message: 'Email already in use' }, false);

    const user = new User({
      email,
      name,
      password,
    });

    user.save().then((newUser) => {
      return done(null, newUser);
    }).catch((err) => {
      done(err, false);
    });
  }).catch((err) => {
    done(err, false);
  });
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
  secretOrKey: AUTH_SECRET
}, (email, done) => {
  User.findOne({ email })
    .then((user) => {
      if (user) {
        setCurrentTenantId(user._id);
        done(null, user);
      } else {
        done({ message: 'User not found!' }, false);
      }
    })
    .catch(err => done(err));
});
