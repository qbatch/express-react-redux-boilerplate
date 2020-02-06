import mongoose from 'mongoose';
import { setGrants } from 'express-authorize-routes';

import seedDB from './seeds';
import Grant from '../models/grant';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

const setupDatabase = () => {
  mongoose.connect(process.env.DB_CONNECTION_URL, options)
    .then(() => {
      console.info('INFO - MongoDB Database connected.')

      seedDB()
        .then(() => {
          console.log('DB seed successful')

          Grant.find()
            .then((grants) => {
              grants = grants.map(grant => grant.transform()).flat();
              setGrants(grants);
              console.log('Setup permissions')
            })
            .catch(err => console.log('ERROR - Unable to setup permissions', err));
        })
        .catch(err => console.log('ERROR - Unable to seed DB', err));
    })
    .catch(err => console.log('ERROR - Unable to connect to the database:', err));
};

export default setupDatabase;
