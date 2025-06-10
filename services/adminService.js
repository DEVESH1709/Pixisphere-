const User = require('../models/User');
const Partner = require('../models/Partner');
const Inquiry = require('../models/Inquiry');
const Category = require('../models/Category');
const Location = require('../models/Location');

async function getKPIs() {
  const totalClients = await User.countDocuments();
  const totalPartners = await Partner.countDocuments();
  const totalInquiries = await Inquiry.countDocuments();
  return { totalClients, totalPartners, totalInquiries };
}


async function createCategory(data) {
  const cat = new Category(data);
  return cat.save();
}
async function getCategories() {
  return Category.find();
}
async function updateCategory(id, data) {
  return Category.findByIdAndUpdate(id, data, { new: true });
}
async function deleteCategory(id) {
  return Category.findByIdAndDelete(id);
}


async function createLocation(data) {
  const loc = new Location(data);
  return loc.save();
}
async function getLocations() {
  return Location.find();
}
async function updateLocation(id, data) {
  return Location.findByIdAndUpdate(id, data, { new: true });
}
async function deleteLocation(id) {
  return Location.findByIdAndDelete(id);
}

module.exports = {
  getKPIs,
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation
};
