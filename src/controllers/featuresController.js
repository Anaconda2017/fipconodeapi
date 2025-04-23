const { validationResult } = require('express-validator');
const { Features } = require('../models');

// Get all features
exports.getFeatures = async (req, res) => {
    try {
        const { status } = req.query;
        const where = {};
        
        if (status) {
            where.active_status = status === 'active';
        } else {
            where.active_status = true;
        }

        const features = await Features.findAll({
            where,
            order: [['createdAt', 'ASC']]
        });

        res.json({
            status: 'success',
            data: features
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching features'
        });
    }
};

// Get single feature
exports.getSingleFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const feature = await Features.findOne({
            where: {
                id,
                active_status: true
            }
        });

        if (!feature) {
            return res.status(404).json({
                status: 'error',
                message: 'Feature not found'
            });
        }

        res.json({
            status: 'success',
            data: feature
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching feature'
        });
    }
};

// Create feature
exports.createFeature = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            ar_title,
            en_title,
            ar_text,
            en_text,
            main_image
        } = req.body;

        const feature = await Features.create({
            ar_title,
            en_title,
            ar_text,
            en_text,
            main_image,
            active_status: true
        });

        res.status(201).json({
            status: 'success',
            data: feature
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error creating feature'
        });
    }
};

// Update feature
exports.updateFeature = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const {
            ar_title,
            en_title,
            ar_text,
            en_text,
            main_image,
            active_status
        } = req.body;

        const feature = await Features.findByPk(id);
        if (!feature) {
            return res.status(404).json({
                status: 'error',
                message: 'Feature not found'
            });
        }

        await feature.update({
            ar_title: ar_title || feature.ar_title,
            en_title: en_title || feature.en_title,
            ar_text: ar_text || feature.ar_text,
            en_text: en_text || feature.en_text,
            main_image: main_image || feature.main_image,
            active_status: active_status !== undefined ? active_status : feature.active_status
        });

        res.json({
            status: 'success',
            data: feature
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating feature'
        });
    }
};

// Toggle feature status
exports.toggleFeatureStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const feature = await Features.findByPk(id);
        
        if (!feature) {
            return res.status(404).json({
                status: 'error',
                message: 'Feature not found'
            });
        }

        // Toggle the active_status
        await feature.update({
            active_status: !feature.active_status
        });

        res.json({
            status: 'success',
            data: {
                message: feature.active_status ? 'Feature enabled successfully' : 'Feature disabled successfully',
                feature
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error toggling feature status'
        });
    }
}; 