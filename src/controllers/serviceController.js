const { validationResult } = require('express-validator');
const { Service } = require('../models');
const { Op } = require('sequelize');

// Get all services
exports.getServices = async (req, res) => {
    try {
        const { type, status } = req.params;
        const { includeInactive } = req.query;
        
        const where = {};
        
        // Filter by type if provided
        if (type) {
            where.service_type = type;
        }
        
        // Filter by status
        if (!includeInactive) {
            where.active_status = true;
        } else if (status) {
            where.active_status = status === 'active';
        }

        const services = await Service.findAll({
            where,
            order: [['order_view', 'ASC']]
        });

        res.json({
            status: 'success',
            data: services
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching services'
        });
    }
};

// Get single service
exports.getSingleService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findOne({
            where: {
                id,
                active_status: true
            }
        });

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        res.json({
            status: 'success',
            data: service
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching service'
        });
    }
};

// Create service
exports.createService = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            ar_service_title,
            en_service_title,
            ar_service_text,
            en_service_text,
            service_type,
            main_image,
            order_view,
            home_status
        } = req.body;

        // If type is provided in URL, override the body
        const type = req.params.type || service_type;

        const service = await Service.create({
            ar_service_title,
            en_service_title,
            ar_service_text,
            en_service_text,
            service_type: type,
            main_image,
            order_view,
            home_status,
            active_status: true
        });

        res.status(201).json({
            status: 'success',
            data: service
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error creating service'
        });
    }
};

// Update service
exports.updateService = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const {
            ar_service_title,
            en_service_title,
            ar_service_text,
            en_service_text,
            service_type,
            main_image,
            order_view,
            home_status,
            active_status
        } = req.body;

        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        await service.update({
            ar_service_title: ar_service_title || service.ar_service_title,
            en_service_title: en_service_title || service.en_service_title,
            ar_service_text: ar_service_text || service.ar_service_text,
            en_service_text: en_service_text || service.en_service_text,
            service_type: service_type || service.service_type,
            main_image: main_image || service.main_image,
            order_view: order_view !== undefined ? order_view : service.order_view,
            home_status: home_status !== undefined ? home_status : service.home_status,
            active_status: active_status !== undefined ? active_status : service.active_status
        });

        res.json({
            status: 'success',
            data: service
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating service'
        });
    }
};

// Toggle service status
exports.toggleServiceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findByPk(id);
        
        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        // Toggle the active_status
        await service.update({
            active_status: !service.active_status
        });

        res.json({
            status: 'success',
            data: {
                message: service.active_status ? 'Service enabled successfully' : 'Service disabled successfully',
                service
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error toggling service status'
        });
    }
}; 