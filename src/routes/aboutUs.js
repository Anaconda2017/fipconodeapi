const express = require('express');
const { body } = require('express-validator');
const aboutUsController = require('../controllers/aboutUsController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateAboutUs = [
    body('ar_stand_for_title').notEmpty().withMessage('Arabic stand for title is required'),
    body('en_stand_for_title').notEmpty().withMessage('English stand for title is required'),
    body('ar_stand_for_text').notEmpty().withMessage('Arabic stand for text is required'),
    body('en_stand_for_text').notEmpty().withMessage('English stand for text is required'),
    body('ar_mission_title').notEmpty().withMessage('Arabic mission title is required'),
    body('en_mission_title').notEmpty().withMessage('English mission title is required'),
    body('ar_mission_text').notEmpty().withMessage('Arabic mission text is required'),
    body('en_mission_text').notEmpty().withMessage('English mission text is required'),
    body('ar_vision_title').notEmpty().withMessage('Arabic vision title is required'),
    body('en_vision_title').notEmpty().withMessage('English vision title is required'),
    body('ar_vision_text').notEmpty().withMessage('Arabic vision text is required'),
    body('en_vision_text').notEmpty().withMessage('English vision text is required'),
    body('ar_main_text').notEmpty().withMessage('Arabic main text is required'),
    body('en_main_text').notEmpty().withMessage('English main text is required')
];

// Public routes
router.get('/', aboutUsController.getAboutUs);

// Protected routes (admin only)
router.use(protect);
router.use(restrictTo('admin'));

// About us management routes
router.put('/', validateAboutUs, aboutUsController.updateAboutUs);

module.exports = router; 