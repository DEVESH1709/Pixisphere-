const User = require('../models/User');
const PartnerProfile = require('../models/PartnerProfile');
const Inquiry = require('../models/Inquiry');
const Category = require('../models/Category');
const Location = require('../models/Location');
const Review = require('../models/Review');


exports.getPendingPartners = async (req, res) => {
  try {
    const pending = await PartnerProfile.find({ status: 'pending' }).populate('user', 'email');
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approvePartner = async (req, res) => {
  try {
    const profile = await PartnerProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    profile.status = 'approved';
    await profile.save();
 
    await User.findByIdAndUpdate(profile.user, { isVerified: true });
    res.json({ message: "Partner approved", profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.rejectPartner = async (req, res) => {
  try {
    const profile = await PartnerProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    profile.status = 'rejected';
    await profile.save();

    await User.findByIdAndUpdate(profile.user, { isVerified: false });
    res.json({ message: "Partner rejected", profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getKPIs = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalPartners = await PartnerProfile.countDocuments({ status: 'approved' });
    const totalInquiries = await Inquiry.countDocuments();
    res.json({ totalUsers, totalClients, totalPartners, totalInquiries });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getReviews = async (req, res) => {
  const reviews = await Review.find().populate('user partner', 'name email');
  res.json(reviews);
};
exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};


exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
exports.createCategory = async (req, res) => {
  const cat = new Category({ name: req.body.name });
  await cat.save();
  res.status(201).json(cat);
};
exports.updateCategory = async (req, res) => {
  const cat = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(cat);
};
exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};


exports.getLocations = async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
};
exports.createLocation = async (req, res) => {
  const loc = new Location({ name: req.body.name });
  await loc.save();
  res.status(201).json(loc);
};
exports.updateLocation = async (req, res) => {
  const loc = await Location.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(loc);
};
exports.deleteLocation = async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res.json({ message: "Location deleted" });
};


exports.featurePartner = async (req, res) => {
  try {
    const { featured } = req.body;
    const profile = await PartnerProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    profile.featured = featured;
    await profile.save();
    res.json({ message: "Partner feature status updated", profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
