const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactUsFormController = require('../controllers/contactUsFormController');
const { validateRequest } = require('../middleware/validateRequest');

// Validation middleware
const contactFormValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('message').notEmpty().withMessage('Message is required'),
    validateRequest
];

const statusValidation = [
    body('status').isIn(['pending', 'in_progress', 'completed']).withMessage('Invalid status'),
    validateRequest
];

// Routes
router.get('/', contactUsFormController.getContactForms);
router.get('/:id', contactUsFormController.getSingleContactForm);
router.post('/', contactFormValidation, contactUsFormController.submitContactForm);
router.patch('/:id/status', statusValidation, contactUsFormController.updateContactFormStatus);

module.exports = router; 