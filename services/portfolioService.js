const PortfolioItem = require('../models/PortfolioItem');

async function addPortfolioItem(partnerId, itemData) {
  const newItem = new PortfolioItem({ ...itemData, partner: partnerId });
  return newItem.save();
}


async function editPortfolioItem(itemId, updateData) {
  return PortfolioItem.findByIdAndUpdate(itemId, updateData, { new: true });
}

async function deletePortfolioItem(itemId) {
  return PortfolioItem.findByIdAndDelete(itemId);
}


async function reorderPortfolioItems(partnerId, orderedIds) {

  const bulkOps = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { order: index } }
    }
  }));
  await PortfolioItem.bulkWrite(bulkOps);
  
  return PortfolioItem.find({ partner: partnerId }).sort('order');
}


async function uploadPortfolioImage(file) {
  console.log(`Mock upload for file: ${file.originalname}`);
  return Promise.resolve(`https://fake-bucket.example.com/${file.originalname}`);
}

module.exports = {
  addPortfolioItem,
  editPortfolioItem,
  deletePortfolioItem,
  reorderPortfolioItems,
  uploadPortfolioImage
};
