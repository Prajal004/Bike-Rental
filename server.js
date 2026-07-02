const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Database connected successfully to MongoDB');
    console.log('Database:', mongoose.connection.name);
  })
  .catch(err => {
    console.error('Database connection error:', err.message);
    console.error('Please make sure MongoDB is running');
    process.exit(1);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Motorcycle Rental API Nepal' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    features: ['payment', 'referral', 'nepali', 'sos']
  });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/motorcycles', require('./routes/motorcycleRoutes'));
app.use('/api/rentals', require('./routes/rentalRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/referrals', require('./routes/referralRoutes'));
app.use('/api/sos', require('./routes/sosRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));

app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route ${req.originalUrl} not found' 
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
  console.log('API URL: http://localhost:' + PORT + '/api');
  console.log('Health check: http://localhost:' + PORT + '/api/health');
});
