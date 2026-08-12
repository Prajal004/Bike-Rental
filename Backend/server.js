const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// ✅ Load .env with explicit path
dotenv.config({ path: path.join(__dirname, '.env') });

// ✅ Debug: Check if loaded
console.log('🔍 DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');
console.log('🔍 PORT:', process.env.PORT || '5000');

const { connectDB } = require('./config/database');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/motorcycles', require('./routes/motorcycleRoutes'));
app.use('/api/rentals', require('./routes/rentalRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/sos', require('./routes/sosRoutes'));
app.use('/api/referrals', require('./routes/referralRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running with PostgreSQL',
    features: ['payment', 'referral', 'nepali', 'sos', 'shops', 'locations']
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Motorcycle Rental API Nepal' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
