const mongoose = require('mongoose');

const sosAlertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rental: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental',
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    address: String,
    googleMapsLink: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'false_alarm'],
    default: 'active',
  },
  notifiedContacts: [{
    name: String,
    phone: String,
    relation: String,
    notifiedAt: Date,
  }],
  adminNotified: {
    type: Boolean,
    default: false,
  },
  adminNotifiedAt: Date,
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  resolutionNotes: String,
  resolvedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate Google Maps link before saving
sosAlertSchema.pre('save', function (next) {
  if (this.location.lat && this.location.lng) {
    this.location.googleMapsLink = `https://maps.google.com/?q=${this.location.lat},${this.location.lng}`;
  }
  next();
});

module.exports = mongoose.model('SosAlert', sosAlertSchema);