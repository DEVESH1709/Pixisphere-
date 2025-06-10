const express = require('express');
const router = express.Router();
const { verifyToken, isPartner } = require('../middlewares/authJwt');
const partnerCtrl = require('../controllers/partnerController');

router.post('/onboard', verifyToken, isPartner, partnerCtrl.onboard);
router.get('/profile', verifyToken, isPartner, partnerCtrl.getProfile);

module.exports = router;
