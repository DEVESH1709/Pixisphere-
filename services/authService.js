const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const OTP_LENGTH = 6;
const OTP_EXPIRATION_MINUTES = 5;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


function generateOTP() {
  let otp = '';
  for (let i = 0; i < OTP_LENGTH; i++) {
    otp += crypto.randomInt(0, 10).toString();
  }
  const expiresAt = new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60000);
  return { otp, expiresAt };
}

function isOtpExpired(expiresAt) {
  return new Date() > expiresAt;
}

async function sendOTPMock(contactInfo, otp) {
  console.log(`Mock OTP sent to ${contactInfo}: ${otp}`);
  return Promise.resolve();
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function comparePasswords(plainText, hash) {
  return bcrypt.compare(plainText, hash);
}

function createJWT(payload, expiresIn = '1h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

function verifyJWT(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateOTP,
  isOtpExpired,
  sendOTPMock,
  hashPassword,
  comparePasswords,
  createJWT,
  verifyJWT
};
