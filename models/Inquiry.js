const mongoose = require('mongoose');
const InquirySchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: String,
  city: String,
  date: Date,
  budget: Number,
  imageUrl: String,
  status: { type: String, enum: ['new','responded','booked','closed'], default: 'new' },
  assignedPartners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
module.exports = mongoose.model('Inquiry', InquirySchema);
