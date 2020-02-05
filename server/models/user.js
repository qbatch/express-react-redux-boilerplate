import mongoose, { Schema } from 'mongoose';

import {
  encrypt,
} from '../utils/hashing';
import { transform } from './grant';

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  authToken: String,
  grant: { type: Schema.Types.ObjectId, ref: 'Grant' },
}, {
  toJSON: {
    transform(_docs, _ret) {
      delete _ret.password;
      delete _ret.__v;
      delete _ret.authToken;

      if (typeof _ret.grant !== 'string') {
        _ret.grant = transform(_ret.grant);
      }
    },
  },
});

User.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await encrypt(this.password);

    next();
  } catch(err) {
    next(err);
  }
});

export default mongoose.model('User', User);
