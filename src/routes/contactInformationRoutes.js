const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactInformationController = require('../controllers/contactInformationController');
const { validateRequest } = require('../middleware/validateRequest');

// Validation middleware
const contactInfoValidation = [
    body('ar_address').notEmpty().withMessage('Arabic address is required'),
    body('en_address').notEmpty().withMessage('English address is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('facebook').optional().isURL().withMessage('Valid Facebook URL is required'),
    body('twitter').optional().isURL().withMessage('Valid Twitter URL is required'),
    body('instagram').optional().isURL().withMessage('Valid Instagram URL is required'),
    body('linkedin').optional().isURL().withMessage('Valid LinkedIn URL is required'),
    validateRequest
];

// Routes
router.get('/', contactInformationController.getContactInformation);
router.put('/', contactInfoValidation, contactInformationController.updateContactInformation);

module.exports = router; 