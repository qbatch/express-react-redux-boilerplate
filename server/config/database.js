import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const setupDatabase = () => {
  mongoose.connect(process.env.DB_CONNECTION_URL, options)
    .then(() => console.info('INFO - MongoDB Database connected.'))
    .catch(err => console.log('ERROR - Unable to connect to the database:', err));
};

export default setupDatabase;
