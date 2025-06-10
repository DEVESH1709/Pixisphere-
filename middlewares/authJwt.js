const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });
  const token = authHeader.split(' ')[1]; 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: " + err.message });
  }
};


exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Require Admin role" });
  }
  next();
};
exports.isPartner = (req, res, next) => {
  if (req.user.role !== 'partner') {
    return res.status(403).json({ message: "Require Partner role" });
  }
  next();
};
exports.isClient = (req, res, next) => {
  if (req.user.role !== 'client') {
    return res.status(403).json({ message: "Require Client role" });
  }
  next();
};
