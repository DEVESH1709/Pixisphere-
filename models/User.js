const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  role: { type: String, enum: ['client','partner','admin'], default: 'client' },
  isVerified: { type: Boolean, default: false }, 
  otpCode: { type: String },
  otpExpire: { type: Date }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
