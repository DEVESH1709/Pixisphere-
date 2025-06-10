const express = require('express');
const router = express.Router();
const { verifyToken, isPartner } = require("../middlewares/authJwt")
const portfolioCtrl = require('../controllers/portfolioController');

router.get('/', verifyToken, isPartner, portfolioCtrl.getAll);
router.post('/', verifyToken, isPartner, portfolioCtrl.addItem);
router.put('/:itemId', verifyToken, isPartner, portfolioCtrl.updateItem);
router.delete('/:itemId', verifyToken, isPartner, portfolioCtrl.deleteItem);
router.put('/reorder', verifyToken, isPartner, portfolioCtrl.reorderItems);

module.exports = router;
