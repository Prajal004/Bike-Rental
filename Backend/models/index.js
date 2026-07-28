const sequelize = require('../config/database').sequelize;

// Import all models
const User = require('./User');
const Shop = require('./Shop');
const Motorcycle = require('./Motorcycle');
const Booking = require('./Booking');
const Payment = require('./Payment');
const Location = require('./Location');
const Review = require('./Review');
const Notification = require('./Notification');
const Document = require('./Document');
const Referral = require('./Referral');
const SosAlert = require('./SosAlert');
const Rental = require('./Rental');
const Rider = require('./Rider');

// Create associations
const models = {
  User,
  Shop,
  Motorcycle,
  Booking,
  Payment,
  Location,
  Review,
  Notification,
  Document,
  Referral,
  SosAlert,
  Rental,
  Rider
};

// Setup associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
