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
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/motorcycles', require('./routes/motorcycleRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/rentals', require('./routes/rentalRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/sos', require('./routes/sosRoutes'));
app.use('/api/referrals', require('./routes/referralRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
