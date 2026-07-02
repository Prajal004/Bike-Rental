const SosAlert = require('../models/SosAlert');
const User = require('../models/User');
const Rental = require('../models/Rental');
const { sendSOSAlert } = require('../utils/sendSMS');

// @desc    Trigger SOS alert (FEATURE 4)
// @route   POST /api/sos/trigger
// @access  Private
const triggerSOS = async (req, res) => {
  try {
    const { location, rentalId } = req.body;
    
    // Get user with emergency contacts
    const user = await User.findById(req.user._id);
    
    if (!user.emergencyContacts || user.emergencyContacts.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please add emergency contacts first',
      });
    }
    
    // Check if active SOS exists
    const activeSOS = await SosAlert.findOne({
      user: req.user._id,
      status: 'active',
    });
    
    if (activeSOS) {
      return res.status(400).json({
        success: false,
        message: 'An active SOS alert already exists',
        sosId: activeSOS._id,
      });
    }
    
    // Create SOS alert
    const sosAlert = await SosAlert.create({
      user: req.user._id,
      rental: rentalId || null,
      location: {
        lat: location.lat,
        lng: location.lng,
        address: location.address || 'Unknown location',
      },
      status: 'active',
    });
    
    // Get rental details if active
    let rentalDetails = null;
    if (rentalId) {
      rentalDetails = await Rental.findById(rentalId).populate('motorcycle');
    }
    
    // Notify emergency contacts
    const notifiedContacts = [];
    for (const contact of user.emergencyContacts) {
      const mapsLink = sosAlert.location.googleMapsLink;
      const userName = user.fullName;
      const locationAddress = sosAlert.location.address;
      
      await sendSOSAlert(
        contact.name,
        contact.phone,
        userName,
        locationAddress,
        mapsLink
      );
      
      notifiedContacts.push({
        name: contact.name,
        phone: contact.phone,
        relation: contact.relation,
        notifiedAt: new Date(),
      });
    }
    
    // Update SOS with notified contacts
    sosAlert.notifiedContacts = notifiedContacts;
    await sosAlert.save();
    
    // Update rental if exists
    if (rentalId) {
      await Rental.findByIdAndUpdate(rentalId, {
        sosTriggered: true,
        $push: { sosAlerts: sosAlert._id },
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'SOS alert triggered. Emergency contacts notified.',
      sosId: sosAlert._id,
      location: sosAlert.location,
      notifiedContacts: notifiedContacts.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get active SOS status
// @route   GET /api/sos/active
// @access  Private
const getActiveSOS = async (req, res) => {
  try {
    const activeSOS = await SosAlert.findOne({
      user: req.user._id,
      status: 'active',
    });
    
    res.status(200).json({
      success: true,
      hasActiveSOS: !!activeSOS,
      sos: activeSOS,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Cancel SOS alert
// @route   POST /api/sos/cancel
// @access  Private
const cancelSOS = async (req, res) => {
  try {
    const { sosId } = req.body;
    
    const sosAlert = await SosAlert.findOne({
      _id: sosId,
      user: req.user._id,
      status: 'active',
    });
    
    if (!sosAlert) {
      return res.status(404).json({
        success: false,
        message: 'No active SOS alert found',
      });
    }
    
    sosAlert.status = 'false_alarm';
    sosAlert.resolutionNotes = 'User cancelled the alert';
    sosAlert.resolvedAt = new Date();
    await sosAlert.save();
    
    res.status(200).json({
      success: true,
      message: 'SOS alert cancelled',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get SOS history
// @route   GET /api/sos/history
// @access  Private
const getSOSHistory = async (req, res) => {
  try {
    const sosAlerts = await SosAlert.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.status(200).json({
      success: true,
      sosAlerts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get emergency contacts
// @route   GET /api/sos/emergency-contacts
// @access  Private
const getEmergencyContacts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.status(200).json({
      success: true,
      emergencyContacts: user.emergencyContacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update emergency contacts
// @route   PUT /api/sos/emergency-contacts
// @access  Private
const updateEmergencyContacts = async (req, res) => {
  try {
    const { emergencyContacts } = req.body;
    
    // Validate contacts (max 5)
    if (emergencyContacts.length > 5) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 5 emergency contacts allowed',
      });
    }
    
    // Validate each contact has name and phone
    for (const contact of emergencyContacts) {
      if (!contact.name || !contact.phone) {
        return res.status(400).json({
          success: false,
          message: 'Each contact must have name and phone number',
        });
      }
    }
    
    const user = await User.findById(req.user._id);
    user.emergencyContacts = emergencyContacts;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Emergency contacts updated successfully',
      emergencyContacts: user.emergencyContacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  triggerSOS,
  getActiveSOS,
  cancelSOS,
  getSOSHistory,
  getEmergencyContacts,
  updateEmergencyContacts,
};