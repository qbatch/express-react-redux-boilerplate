import logger from 'morgan';
import passport from 'passport';
import bodyParser from 'body-parser';

import { SignupStrategy, LoginStrategy, AuthenticationStrategy } from './auth';

const applyMiddlewares = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(logger('common'));

  app.use(passport.initialize());

  passport.use('signup', SignupStrategy);
  passport.use('login', LoginStrategy);
  passport.use('jwt', AuthenticationStrategy);
}

export default applyMiddlewares;
