const PartnerProfile = require('../models/PartnerProfile');

exports.getAll = async (req, res) => {
  try {
    const profile = await PartnerProfile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile.portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.addItem = async (req, res) => {
  try {
    const { description, imageUrl } = req.body;
    const profile = await PartnerProfile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    profile.portfolio.push({ description, imageUrl });
    await profile.save();
    res.json(profile.portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const profile = await PartnerProfile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    const item = profile.portfolio.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (req.body.description !== undefined) item.description = req.body.description;
    if (req.body.imageUrl !== undefined) item.imageUrl = req.body.imageUrl;
    await profile.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteItem = async (req, res) => {
  try {
    const profile = await PartnerProfile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    profile.portfolio.id(req.params.itemId).remove();
    await profile.save();
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.reorderItems = async (req, res) => {
  try {
    const { order } = req.body;
    const profile = await PartnerProfile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    
    profile.portfolio.sort((a, b) => order.indexOf(a._id.toString()) - order.indexOf(b._id.toString()));
    await profile.save();
    res.json(profile.portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
