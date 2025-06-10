const Inquiry = require('../models/Inquiry');
const PartnerProfile = require('../models/PartnerProfile');

exports.createInquiry = async (req, res) => {
  try {
    const { category, city, date, budget, imageUrl } = req.body;
    const inquiry = new Inquiry({
      client: req.user.id,
      category, city, date, budget, imageUrl,
      status: 'new'
    });
    await inquiry.save();
   
    const matches = await PartnerProfile.find({
      status: 'approved',
      $or: [
        { serviceCategories: category },
        { city: city }
      ]
    });
    inquiry.assignedPartners = matches.map(p => p.user);
    await inquiry.save();
    res.status(201).json({ message: "Inquiry created", inquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getLeads = async (req, res) => {
  try {
    const leads = await Inquiry.find({ assignedPartners: req.user.id });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateStatus = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });

    if (!inquiry.assignedPartners.includes(req.user.id)) {
      return res.status(403).json({ message: "Not authorized to update this inquiry" });
    }
    const { status } = req.body;
    if (!['new','responded','booked','closed'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    inquiry.status = status;
    await inquiry.save();
    res.json({ message: "Status updated", inquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
