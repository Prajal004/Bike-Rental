const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['shop_owner', 'customer', 'rider'],
    required: true
  },
  documentType: {
    type: String,
    enum: [
      // Shop Owner Documents
      'shop_registration',
      'pan_number',
      'vat_number',
      'business_license',
      'shop_photo',
      
      // Customer Documents
      'citizenship_front',
      'citizenship_back',
      'driving_license_front',
      'driving_license_back',
      'passport_photo',
      
      // Rider Documents
      'rider_license',
      'training_certificate',
      'medical_certificate'
    ],
    required: true
  },
  documentNumber: {
    type: String,
    trim: true
  },
  documentImage: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number
  },
  fileType: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  rejectionReason: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

DocumentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Document', DocumentSchema);