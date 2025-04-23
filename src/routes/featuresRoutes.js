const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const featuresController = require('../controllers/featuresController');
const { validateRequest } = require('../middleware/validateRequest');

// Validation middleware
const featureValidation = [
    body('ar_title').notEmpty().withMessage('Arabic title is required'),
    body('en_title').notEmpty().withMessage('English title is required'),
    body('ar_text').notEmpty().withMessage('Arabic text is required'),
    body('en_text').notEmpty().withMessage('English text is required'),
    body('main_image').notEmpty().withMessage('Main image is required'),
    validateRequest
];

// Routes
router.get('/', featuresController.getFeatures);
router.get('/:id', featuresController.getSingleFeature);
router.post('/', featureValidation, featuresController.createFeature);
router.put('/:id', featureValidation, featuresController.updateFeature);
router.patch('/:id/toggle-status', featuresController.toggleFeatureStatus);

module.exports = router; 