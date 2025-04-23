const { validationResult } = require('express-validator');
const { AboutUs } = require('../models');

// Get about us information
exports.getAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findOne();
        
        if (!aboutUs) {
            return res.status(404).json({
                status: 'error',
                message: 'About us information not found'
            });
        }

        res.json({
            status: 'success',
            data: aboutUs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching about us information'
        });
    }
};

// Update about us information
exports.updateAboutUs = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            ar_stand_for_title,
            en_stand_for_title,
            ar_stand_for_text,
            en_stand_for_text,
            ar_mission_title,
            en_mission_title,
            ar_mission_text,
            en_mission_text,
            ar_vision_title,
            en_vision_title,
            ar_vision_text,
            en_vision_text,
            ar_main_text,
            en_main_text
        } = req.body;

        let aboutUs = await AboutUs.findOne();
        
        if (!aboutUs) {
            // Create if not exists
            aboutUs = await AboutUs.create({
                ar_stand_for_title,
                en_stand_for_title,
                ar_stand_for_text,
                en_stand_for_text,
                ar_mission_title,
                en_mission_title,
                ar_mission_text,
                en_mission_text,
                ar_vision_title,
                en_vision_title,
                ar_vision_text,
                en_vision_text,
                ar_main_text,
                en_main_text
            });
        } else {
            // Update existing
            await aboutUs.update({
                ar_stand_for_title: ar_stand_for_title || aboutUs.ar_stand_for_title,
                en_stand_for_title: en_stand_for_title || aboutUs.en_stand_for_title,
                ar_stand_for_text: ar_stand_for_text || aboutUs.ar_stand_for_text,
                en_stand_for_text: en_stand_for_text || aboutUs.en_stand_for_text,
                ar_mission_title: ar_mission_title || aboutUs.ar_mission_title,
                en_mission_title: en_mission_title || aboutUs.en_mission_title,
                ar_mission_text: ar_mission_text || aboutUs.ar_mission_text,
                en_mission_text: en_mission_text || aboutUs.en_mission_text,
                ar_vision_title: ar_vision_title || aboutUs.ar_vision_title,
                en_vision_title: en_vision_title || aboutUs.en_vision_title,
                ar_vision_text: ar_vision_text || aboutUs.ar_vision_text,
                en_vision_text: en_vision_text || aboutUs.en_vision_text,
                ar_main_text: ar_main_text || aboutUs.ar_main_text,
                en_main_text: en_main_text || aboutUs.en_main_text
            });
        }

        res.json({
            status: 'success',
            data: aboutUs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating about us information'
        });
    }
}; 