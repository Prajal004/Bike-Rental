const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/location', require('./routes/locationRoutes'));
app.use('/api/motorcycles', require('./routes/motorcycleRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/referrals', require('./routes/referralRoutes'));
app.use('/api/rentals', require('./routes/rentalRoutes'));
app.use('/api/sos', require('./routes/sosRoutes'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', features: ['payment', 'referral', 'nepali', 'sos'] });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Motorcycle Rental API Nepal' });
});

app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
