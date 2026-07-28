const { Document } = require('../models/Document');
const { User } = require('../models/User');
const { uploadSingle } = require('../middleware/uploadMiddleware');
const { validation } = require('../utils/validation');

// Upload document
exports.uploadDocument = async (req, res) => {
  try {
    const { documentType, documentNumber } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    const allowedTypes = {
      shop_owner: ['shop_registration', 'pan_number', 'vat_number', 'business_license', 'shop_photo'],
      customer: ['citizenship_front', 'citizenship_back', 'driving_license_front', 'driving_license_back'],
      rider: ['rider_license', 'training_certificate', 'medical_certificate']
    };

    if (!allowedTypes[role]?.includes(documentType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid document type for this role'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a document file'
      });
    }

    const document = await Document.create({
      userId,
      role,
      documentType,
      documentNumber,
      documentImage: req.file.path,
      fileSize: req.file.size,
      fileType: req.file.mimetype
    });

    res.json({
      success: true,
      message: 'Document uploaded successfully',
      data: document
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user documents
exports.getUserDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    const documents = await Document.findAll({
      where: { userId, isActive: true }
    });

    res.json({ success: true, data: documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify document (Admin/Shop Owner)
exports.verifyDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { verified, rejectionReason } = req.body;

    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    document.verified = verified;
    document.verifiedBy = req.user.id;
    document.verifiedAt = new Date();
    if (!verified) {
      document.rejectionReason = rejectionReason;
    }

    await document.save();

    res.json({
      success: true,
      message: verified ? 'Document verified successfully' : 'Document rejected',
      data: document
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete document
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findByPk(id);

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    if (document.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    document.isActive = false;
    await document.save();

    res.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
