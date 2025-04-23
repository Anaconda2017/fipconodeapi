const express = require('express');
const { body } = require('express-validator');
const blogController = require('../controllers/blogController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateBlog = [
    body('ar_title').notEmpty().withMessage('Arabic title is required'),
    body('en_title').notEmpty().withMessage('English title is required'),
    body('ar_text').notEmpty().withMessage('Arabic text is required'),
    body('en_text').notEmpty().withMessage('English text is required')
];

// Public routes
router.get('/', blogController.getBlogs); // Get all active blogs
router.get('/slug/:slug', blogController.getSingleBlog); // Get blog by slug
router.get('/:id', blogController.getSingleBlog); // Get blog by ID

// Protected routes (admin only)
router.use(protect);
router.use(restrictTo('admin'));

// Blog management routes
router.post('/', validateBlog, blogController.createBlog);
router.put('/:id', validateBlog, blogController.updateBlog);
router.patch('/:id/toggle-status', blogController.toggleBlogStatus);

// Additional admin routes
router.get('/all', blogController.getBlogs); // Get all blogs (including inactive)
router.get('/status/:status', blogController.getBlogs); // Get blogs by status

module.exports = router; 