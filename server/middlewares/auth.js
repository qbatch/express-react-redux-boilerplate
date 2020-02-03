import passport from 'passport';
import { sign, verify } from 'jsonwebtoken'
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user';
import {
  verify as verifyHash,
} from '../utils/hashing';
import redisService from '../services/redis';

const { AUTH_SECRET } = process.env;

export const generateAuthToken = async (payload) => {
  const authToken = sign(payload, AUTH_SECRET);
  await redisService.set(payload, authToken);
  return authToken;
}

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
  secretOrKey: AUTH_SECRET,
  passReqToCallback: true,
}, (req, email, done) => {
  const authToken = req.headers.authorization.split(' ')[1];

  redisService.get(email)
    .then((storedAuthToken) => {
      if (authToken !== storedAuthToken) return done(null, false, { message: 'Unauthorized' });

      User.findOne({ email })
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false, { message: 'User not found!' });
          }
        })
        .catch(err => done(null, false, err));
    })
    .catch(err => done(null, false, err));
});
