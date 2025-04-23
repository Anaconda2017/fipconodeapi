const { validationResult } = require('express-validator');
const { Partner } = require('../models');
const { Op } = require('sequelize');

// Get all partners
exports.getPartners = async (req, res) => {
    try {
        const { type, status } = req.params;
        const { includeInactive } = req.query;
        
        const where = {};
        
        // Filter by type if provided
        if (type) {
            where.partner_type = type;
        }
        
        // Filter by status
        if (!includeInactive) {
            where.active_status = true;
        } else if (status) {
            where.active_status = status === 'active';
        }

        const partners = await Partner.findAll({
            where,
            order: [['new_counter', 'ASC']]
        });

        res.json({
            status: 'success',
            data: partners
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching partners'
        });
    }
};

// Get single partner
exports.getSinglePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const partner = await Partner.findOne({
            where: {
                id,
                active_status: true
            }
        });

        if (!partner) {
            return res.status(404).json({
                status: 'error',
                message: 'Partner not found'
            });
        }

        res.json({
            status: 'success',
            data: partner
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching partner'
        });
    }
};

// Create partner
exports.createPartner = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            ar_partner_title,
            en_partner_title,
            main_image,
            url_link,
            partner_type,
            new_counter
        } = req.body;

        // If type is provided in URL, override the body
        const type = req.params.type || partner_type;

        const partner = await Partner.create({
            ar_partner_title,
            en_partner_title,
            main_image,
            url_link,
            partner_type: type,
            new_counter,
            active_status: true
        });

        res.status(201).json({
            status: 'success',
            data: partner
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error creating partner'
        });
    }
};

// Update partner
exports.updatePartner = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const {
            ar_partner_title,
            en_partner_title,
            main_image,
            url_link,
            partner_type,
            new_counter,
            active_status
        } = req.body;

        const partner = await Partner.findByPk(id);
        if (!partner) {
            return res.status(404).json({
                status: 'error',
                message: 'Partner not found'
            });
        }

        await partner.update({
            ar_partner_title: ar_partner_title || partner.ar_partner_title,
            en_partner_title: en_partner_title || partner.en_partner_title,
            main_image: main_image || partner.main_image,
            url_link: url_link || partner.url_link,
            partner_type: partner_type || partner.partner_type,
            new_counter: new_counter !== undefined ? new_counter : partner.new_counter,
            active_status: active_status !== undefined ? active_status : partner.active_status
        });

        res.json({
            status: 'success',
            data: partner
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating partner'
        });
    }
};

// Toggle partner status
exports.togglePartnerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const partner = await Partner.findByPk(id);
        
        if (!partner) {
            return res.status(404).json({
                status: 'error',
                message: 'Partner not found'
            });
        }

        // Toggle the active_status
        await partner.update({
            active_status: !partner.active_status
        });

        res.json({
            status: 'success',
            data: {
                message: partner.active_status ? 'Partner enabled successfully' : 'Partner disabled successfully',
                partner
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error toggling partner status'
        });
    }
}; 