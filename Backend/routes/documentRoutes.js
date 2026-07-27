const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

router.post('/upload', protect, uploadSingle('document'), documentController.uploadDocument);
router.get('/my-documents', protect, documentController.getUserDocuments);
router.put('/:id/verify', protect, isAdmin, documentController.verifyDocument);
router.delete('/:id', protect, documentController.deleteDocument);

module.exports = router;
