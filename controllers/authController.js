const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateOTP } = require('../utils/otp'); 


exports.signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const hashed = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashed, role });
 
    await user.save();
    res.status(201).json({ message: "Registered successfully"   });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isValid = await bcrypt.compare(password, user.password || '');
    if (!isValid) return res.status(401).json({ message: "Invalid password" });

    if (user.role === 'partner' && !user.isVerified) {
      return res.status(403).json({ message: "Partner not verified by admin" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token,user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.requestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, role: 'client' });
    }
   
    const code = generateOTP();
    user.otpCode = code;
    user.otpExpire = Date.now() + 10 * 60 * 1000; 
    await user.save();
    console.log(`Mock OTP for ${email}: ${code}`); 
    res.json({ message: "OTP generated (check console)", otp: code });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.loginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.otpCode !== otp || Date.now() > user.otpExpire) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }
    
    user.otpCode = undefined;
    user.otpExpire = undefined;
    await user.save();
   
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
