
const mongoose = require('mongoose');
const PortfolioItemSchema = new mongoose.Schema({
  description: String,
  imageUrl: String
}, { _id: true });

const PartnerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: String,
  serviceCategories: [String],
  city: String,
  documents: [String],        
  portfolio: [PortfolioItemSchema],
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('PartnerProfile', PartnerProfileSchema);
