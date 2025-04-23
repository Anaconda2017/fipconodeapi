const express = require('express');
const router = express.Router();

const featuresRoutes = require('./featuresRoutes');
const contactInformationRoutes = require('./contactInformationRoutes');
const contactUsFormRoutes = require('./contactUsFormRoutes');

// Mount routes
router.use('/features', featuresRoutes);
router.use('/contact-information', contactInformationRoutes);
router.use('/contact-forms', contactUsFormRoutes);

module.exports = router; 