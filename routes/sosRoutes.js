const express = require('express');
const router = express.Router();
const {
  triggerSOS,
  getActiveSOS,
  cancelSOS,
  getSOSHistory,
  getEmergencyContacts,
  updateEmergencyContacts,
} = require('../controllers/sosController');
const { protect } = require('../middleware/authMiddleware');
const { validateSOS, checkValidation } = require('../middleware/validationMiddleware');

// Protected routes (FEATURE 4)
router.post('/trigger', protect, validateSOS, checkValidation, triggerSOS);
router.get('/active', protect, getActiveSOS);
router.post('/cancel', protect, cancelSOS);
router.get('/history', protect, getSOSHistory);
router.get('/emergency-contacts', protect, getEmergencyContacts);
router.put('/emergency-contacts', protect, updateEmergencyContacts);

module.exports = router;