const Partner = require('../models/Partner');

async function onboardPartner(partnerData) {
  const partner = new Partner(partnerData);
  return partner.save();
}

async function updatePartnerVerification(partnerId, verified) {
  return Partner.findByIdAndUpdate(
    partnerId,
    { verified: verified },
    { new: true }
  );
}

async function updateFeatureFlags(partnerId, featureFlags) {
  return Partner.findByIdAndUpdate(
    partnerId,
    { $set: { featureFlags } },
    { new: true }
  );
}

module.exports = {
  onboardPartner,
  updatePartnerVerification,
  updateFeatureFlags
};
