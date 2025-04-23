const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const homeController = require('../controllers/homeController');
const { validateRequest } = require('../middleware/validateRequest');

// Validation middleware
const homeValidation = [
    body('ar_title').notEmpty().withMessage('Arabic title is required'),
    body('en_title').notEmpty().withMessage('English title is required'),
    body('ar_description').notEmpty().withMessage('Arabic description is required'),
    body('en_description').notEmpty().withMessage('English description is required'),
    body('main_image').notEmpty().withMessage('Main image is required'),
    validateRequest
];

// Home page routes
router.get('/ar', homeController.getHomeData);
router.get('/en', homeController.getHomeDataEn);

// Blog routes
router.get('/blogs', homeController.getBlogs);
router.get('/blogs/:slug', homeController.getSingleBlog);

// Contact route
router.get('/contact', homeController.getContact);

// Projects route
router.get('/projects', homeController.getProjects);

// Routes
router.get('/', homeController.getHomeContent);
router.put('/', homeValidation, homeController.updateHomeContent);

module.exports = router; 