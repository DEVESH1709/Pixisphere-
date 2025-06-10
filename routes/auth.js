const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

router.post('/signup', authCtrl.signUp);
router.post('/login', authCtrl.login);
router.post('/request-otp', authCtrl.requestOtp);
router.post('/login-otp', authCtrl.loginOtp);

module.exports = router;
