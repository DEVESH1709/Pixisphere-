require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const partnerRoutes = require('./routes/partner');
const portfolioRoutes = require('./routes/portfolio');
const inquiryRoutes = require('./routes/inquiry');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

      
const connectDB = require('./config/db'); 
connectDB();                   


app.use('/auth', authRoutes);
app.use('/partners', partnerRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/inquiries', inquiryRoutes);
app.use('/admin', adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
