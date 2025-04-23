const express = require('express');
const { body } = require('express-validator');
const partnerController = require('../controllers/partnerController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validatePartner = [
    body('ar_partner_title').notEmpty().withMessage('Arabic partner title is required'),
    body('en_partner_title').notEmpty().withMessage('English partner title is required'),
    body('partner_type').isIn(['partner', 'client']).withMessage('Invalid partner type')
];

// Public routes
router.get('/', partnerController.getPartners); // Get all active partners
router.get('/type/:type', partnerController.getPartners); // Get partners by type (partner/client)
router.get('/:id', partnerController.getSinglePartner); // Get single partner

// Protected routes (admin only)
router.use(protect);
router.use(restrictTo('admin'));

// Partner management routes
router.post('/', validatePartner, partnerController.createPartner);
router.put('/:id', validatePartner, partnerController.updatePartner);
router.patch('/:id/toggle-status', partnerController.togglePartnerStatus);

// Type-specific routes
router.get('/type/:type/all', partnerController.getPartners); // Get all partners of specific type (including inactive)
router.post('/type/:type', validatePartner, partnerController.createPartner); // Create partner of specific type

module.exports = router; 