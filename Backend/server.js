const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/database');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Register all routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));  // ✅ Changed to 'locations'
app.use('/api/motorcycles', require('./routes/motorcycleRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/referrals', require('./routes/referralRoutes'));
app.use('/api/rentals', require('./routes/rentalRoutes'));
app.use('/api/sos', require('./routes/sosRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running with PostgreSQL',
    features: ['payment', 'referral', 'nepali', 'sos', 'shops', 'locations'],
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Motorcycle Rental API Nepal' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
