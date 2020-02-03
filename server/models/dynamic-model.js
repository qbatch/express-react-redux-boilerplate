import mongoose from 'mongoose';

const dynamicModel = (name, schema, options) => (suffix) => {
  return mongoose.model(`${name}-${suffix}`, schema, options);
};

export default dynamicModel;
