const mongoose = require('mongoose');
const LocationSchema = new mongoose.Schema({
  name: { type: String, unique: true }
});
module.exports = mongoose.model('Location', LocationSchema);
