import mongoose from 'mongoose';

import seedDB from './seeds';
import { setGrants } from '../middlewares/grants';

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

          setGrants()
            .then(() => console.log('Setup permissions'))
            .catch(err => console.log('ERROR - Unable to setup permissions', err));
        })
        .catch(err => console.log('ERROR - Unable to seed DB', err));
    })
    .catch(err => console.log('ERROR - Unable to connect to the database:', err));
};

export default setupDatabase;
