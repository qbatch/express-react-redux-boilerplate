import mongoose from 'mongoose';

const Grant = new mongoose.Schema({
  role: { type: String, required: true },
  resource: { type: String, required: true },
  action: String,
  possession: { type: String, default: 'any' },
  attributes: [String],
  userId: { type: String, required: true },
});

export default mongoose.model('Grant', Grant);
