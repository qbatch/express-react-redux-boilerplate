import mongoose from 'mongoose';

import dynamicModel from './dynamic-model';

const Product = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export default dynamicModel('Products', Product);
