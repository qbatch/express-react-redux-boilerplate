import mongoose from 'mongoose';

import {
  encrypt,
} from '../utils/hashing';

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  isAdmin: Boolean,
  authToken: String,
}, {
  toJSON: {
    transform: function(docs, _ret) {
      delete _ret.password;
      delete _ret.__v;
      delete _ret.authToken;
    }
  }
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
