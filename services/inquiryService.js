const Inquiry = require('../models/Inquiry');
const Partner = require('../models/Partner');

async function createInquiry(inquiryData) {
  const inquiry = new Inquiry(inquiryData);
  return inquiry.save();
}

async function matchPartners(inquiry) {
  return Partner.find({
    $or: [
      { categories: inquiry.category },
      { city: inquiry.city }
    ],
    status: 'approved'
  });
}

async function assignLead(inquiryId, partnerId) {
  return Inquiry.findByIdAndUpdate(
    inquiryId,
    { assignedPartner: partnerId },
    { new: true }
  );
}

module.exports = {
  createInquiry,
  matchPartners,
  assignLead
};
