require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Import database
const { sequelize, testConnection } = require('./config/database');

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Register all routes directly
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
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
    database: 'PostgreSQL',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Motorcycle Rental API Nepal',
    version: '1.0.0'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

// Start server
const startServer = async () => {
  try {
    const connected = await testConnection();
    if (!connected) {
      console.log('⚠️ Database connection failed. Starting without DB...');
    } else if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database synced successfully');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🗄️  Database: PostgreSQL`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (without DB)`);
    });
  }
};

startServer();
