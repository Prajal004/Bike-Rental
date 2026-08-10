const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/database');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/location', require('./routes/locationRoutes'));
app.use('/api/motorcycles', require('./routes/motorcycleRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/referrals', require('./routes/referralRoutes'));
app.use('/api/rentals', require('./routes/rentalRoutes'));
app.use('/api/sos', require('./routes/sosRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));

// ✅ Health check for Render
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running with PostgreSQL',
    features: ['payment', 'referral', 'nepali', 'sos', 'shops', 'locations']
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
