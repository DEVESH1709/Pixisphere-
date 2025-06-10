const PartnerProfile = require('../models/PartnerProfile');


exports.onboard = async (req, res) => {
  try {
    const userId = req.user.id;
    let profile = await PartnerProfile.findOne({ user: userId });
    if (!profile) {
      profile = new PartnerProfile({
        user: userId,
        bio: req.body.bio,
        serviceCategories: req.body.serviceCategories,
        city: req.body.city,
        documents: req.body.documents,
        status: 'pending',
        featured: false
      });
    } else {
      profile.bio = req.body.bio;
      profile.serviceCategories = req.body.serviceCategories;
      profile.city = req.body.city;
      profile.documents = req.body.documents;
      profile.status = 'pending';
    }
    await profile.save();
    res.json({ message: "Profile submitted for admin review", profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await PartnerProfile.findOne({ user: req.user.id }).populate('user', 'email name');
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
