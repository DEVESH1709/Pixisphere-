const express = require('express');
const router = express.Router();
const { verifyToken, isClient, isPartner } = require('../middlewares/authJwt');
const inquiryCtrl = require('../controllers/inquiryController');

router.post('/', verifyToken, isClient, inquiryCtrl.createInquiry);
router.get('/leads', verifyToken, isPartner, inquiryCtrl.getLeads);
router.put('/:id/status', verifyToken, isPartner, inquiryCtrl.updateStatus);

module.exports = router;
