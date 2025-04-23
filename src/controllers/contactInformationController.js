const { validationResult } = require('express-validator');
const { ContactInformation } = require('../models');

// Get contact information
exports.getContactInformation = async (req, res) => {
    try {
        const contactInfo = await ContactInformation.findOne();
        
        if (!contactInfo) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact information not found'
            });
        }

        res.json({
            status: 'success',
            data: contactInfo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching contact information'
        });
    }
};

// Update contact information
exports.updateContactInformation = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            ar_address,
            en_address,
            phone,
            email,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        let contactInfo = await ContactInformation.findOne();
        
        if (!contactInfo) {
            // Create if not exists
            contactInfo = await ContactInformation.create({
                ar_address,
                en_address,
                phone,
                email,
                facebook,
                twitter,
                instagram,
                linkedin
            });
        } else {
            // Update existing
            await contactInfo.update({
                ar_address: ar_address || contactInfo.ar_address,
                en_address: en_address || contactInfo.en_address,
                phone: phone || contactInfo.phone,
                email: email || contactInfo.email,
                facebook: facebook || contactInfo.facebook,
                twitter: twitter || contactInfo.twitter,
                instagram: instagram || contactInfo.instagram,
                linkedin: linkedin || contactInfo.linkedin
            });
        }

        res.json({
            status: 'success',
            data: contactInfo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating contact information'
        });
    }
}; 