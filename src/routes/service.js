const express = require('express');
const { body } = require('express-validator');
const serviceController = require('../controllers/serviceController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateService = [
    body('ar_service_title').notEmpty().withMessage('Arabic service title is required'),
    body('en_service_title').notEmpty().withMessage('English service title is required'),
    body('ar_service_text').notEmpty().withMessage('Arabic service text is required'),
    body('en_service_text').notEmpty().withMessage('English service text is required'),
    body('service_type').isIn(['service', 'project']).withMessage('Invalid service type')
];

// Public routes
router.get('/', serviceController.getServices);
router.get('/type/:type', serviceController.getServices);
router.get('/:id', serviceController.getSingleService);

// Protected routes (admin only)
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', validateService, serviceController.createService);
router.put('/:id', validateService, serviceController.updateService);
router.patch('/:id/toggle-status', serviceController.toggleServiceStatus);

// Type-specific routes
router.get('/type/:type/all', serviceController.getServices);
router.post('/type/:type', validateService, serviceController.createService);

module.exports = router; 