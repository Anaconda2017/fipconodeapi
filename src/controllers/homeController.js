const { validationResult } = require('express-validator');
const { Home } = require('../models');
const { 
    ChairmanMessage, 
    AboutUs, 
    Service, 
    WhyUs, 
    Partner, 
    ArregationSystem,
    Blog,
    ContactInformation,
    Features
} = require('../models');
const { Op } = require('sequelize');

// Get home content
exports.getHomeContent = async (req, res) => {
    try {
        const homeContent = await Home.findOne();
        
        if (!homeContent) {
            return res.status(404).json({
                status: 'error',
                message: 'Home content not found'
            });
        }

        res.json({
            status: 'success',
            data: homeContent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching home content'
        });
    }
};

// Update home content
exports.updateHomeContent = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            ar_title,
            en_title,
            ar_description,
            en_description,
            main_image
        } = req.body;

        let homeContent = await Home.findOne();
        
        if (!homeContent) {
            // Create if not exists
            homeContent = await Home.create({
                ar_title,
                en_title,
                ar_description,
                en_description,
                main_image
            });
        } else {
            // Update existing
            await homeContent.update({
                ar_title: ar_title || homeContent.ar_title,
                en_title: en_title || homeContent.en_title,
                ar_description: ar_description || homeContent.ar_description,
                en_description: en_description || homeContent.en_description,
                main_image: main_image || homeContent.main_image
            });
        }

        res.json({
            status: 'success',
            data: homeContent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating home content'
        });
    }
};

// Toggle home content status
exports.toggleHomeContentStatus = async (req, res) => {
    try {
        const homeContent = await Home.findOne();
        
        if (!homeContent) {
            return res.status(404).json({
                status: 'error',
                message: 'Home content not found'
            });
        }

        // Toggle the active_status
        await homeContent.update({
            active_status: !homeContent.active_status
        });

        res.json({
            status: 'success',
            data: {
                message: homeContent.active_status ? 'Home content enabled successfully' : 'Home content disabled successfully',
                homeContent
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error toggling home content status'
        });
    }
};

// Get home page data (Arabic)
exports.getHomeData = async (req, res) => {
    try {
        const chairMessage = await ChairmanMessage.findOne({
            attributes: ['ar_name', 'ar_small_title', 'ar_title', 'ar_text', 'main_image']
        });

        const aboutData = await AboutUs.findOne({
            attributes: [
                'ar_stand_for_title', 
                'ar_stand_for_text', 
                'ar_mission_title', 
                'ar_mission_text', 
                'ar_vision_title', 
                'ar_vision_text', 
                'ar_main_text'
            ]
        });

        const services = await Service.findAll({
            attributes: [
                'ar_service_title', 
                'ar_service_text', 
                'service_type', 
                'active_status', 
                'order_view', 
                'main_image'
            ],
            where: {
                service_type: 'service',
                active_status: true
            },
            order: [['order_view', 'ASC']]
        });

        const projects = await Service.findAll({
            attributes: [
                'ar_service_title', 
                'ar_service_text', 
                'service_type', 
                'active_status', 
                'order_view', 
                'home_status', 
                'main_image'
            ],
            where: {
                service_type: 'project',
                home_status: true,
                active_status: true
            },
            order: [['createdAt', 'DESC']]
        });

        const whyUs = await WhyUs.findAll({
            attributes: ['why_us_number', 'ar_why_us_title', 'ar_why_us_text']
        });

        const clients = await Partner.findAll({
            attributes: [
                'ar_partner_title', 
                'main_image', 
                'url_link', 
                'partner_type', 
                'active_status', 
                'new_counter'
            ],
            where: {
                partner_type: 'client',
                active_status: true
            },
            order: [['new_counter', 'ASC']]
        });

        const partners = await Partner.findAll({
            attributes: [
                'ar_partner_title', 
                'main_image', 
                'url_link', 
                'partner_type', 
                'active_status'
            ],
            where: {
                partner_type: 'partner',
                active_status: true
            },
            order: [['createdAt', 'DESC']]
        });

        const arrigationSystems = await ArregationSystem.findAll({
            attributes: ['ar_title', 'ar_text', 'active_status'],
            where: {
                active_status: true
            }
        });

        res.json({
            chairMessage,
            aboutData,
            services,
            projects,
            partners,
            clients,
            whyUs,
            arrigationSystems
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching home data'
        });
    }
};

// Get home page data (English)
exports.getHomeDataEn = async (req, res) => {
    try {
        const chairMessage = await ChairmanMessage.findOne({
            attributes: ['en_name', 'en_small_title', 'en_title', 'en_text', 'main_image']
        });

        const aboutData = await AboutUs.findOne({
            attributes: [
                'en_stand_for_title', 
                'en_stand_for_text', 
                'en_mission_title', 
                'en_mission_text', 
                'en_vision_title', 
                'en_vision_text', 
                'en_main_text'
            ]
        });

        const services = await Service.findAll({
            attributes: [
                'en_service_title', 
                'en_service_text', 
                'service_type', 
                'active_status', 
                'order_view', 
                'main_image'
            ],
            where: {
                service_type: 'service',
                active_status: true
            },
            order: [['order_view', 'ASC']]
        });

        const projects = await Service.findAll({
            attributes: [
                'en_service_title', 
                'en_service_text', 
                'service_type', 
                'active_status', 
                'order_view', 
                'home_status', 
                'main_image'
            ],
            where: {
                service_type: 'project',
                home_status: true,
                active_status: true
            },
            order: [['createdAt', 'DESC']]
        });

        const whyUs = await WhyUs.findAll({
            attributes: ['why_us_number', 'en_why_us_title', 'en_why_us_text']
        });

        const clients = await Partner.findAll({
            attributes: [
                'en_partner_title', 
                'main_image', 
                'url_link', 
                'partner_type', 
                'active_status', 
                'new_counter'
            ],
            where: {
                partner_type: 'client',
                active_status: true
            },
            order: [['new_counter', 'ASC']]
        });

        const partners = await Partner.findAll({
            attributes: [
                'en_partner_title', 
                'main_image', 
                'url_link', 
                'partner_type', 
                'active_status'
            ],
            where: {
                partner_type: 'partner',
                active_status: true
            },
            order: [['createdAt', 'DESC']]
        });

        const arrigationSystems = await ArregationSystem.findAll({
            attributes: ['en_title', 'en_text', 'active_status'],
            where: {
                active_status: true
            }
        });

        res.json({
            chairMessage,
            aboutData,
            services,
            projects,
            partners,
            clients,
            whyUs,
            arrigationSystems
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching home data'
        });
    }
};

// Get blogs with pagination
exports.getBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        const offset = (page - 1) * limit;

        const blogs = await Blog.findAndCountAll({
            where: {
                active_status: true
            },
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });

        res.json({
            rows: {
                data: blogs.rows,
                current_page: page,
                total: blogs.count,
                per_page: limit,
                last_page: Math.ceil(blogs.count / limit)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching blogs'
        });
    }
};

// Get single blog with related blogs
exports.getSingleBlog = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({
            where: {
                [Op.or]: [
                    { ar_slug: slug },
                    { en_slug: slug }
                ],
                active_status: true
            }
        });

        if (!blog) {
            return res.status(404).json({
                status: 'error',
                message: 'Blog not found'
            });
        }

        const relatedBlogs = await Blog.findAll({
            where: {
                id: {
                    [Op.ne]: blog.id
                },
                active_status: true
            },
            order: sequelize.literal('RAND()'),
            limit: 10
        });

        res.json({
            blog,
            blogs: relatedBlogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching blog'
        });
    }
};

// Get contact information
exports.getContact = async (req, res) => {
    try {
        const contact = await ContactInformation.findOne();
        res.json({ contact });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching contact information'
        });
    }
};

// Get projects page data
exports.getProjects = async (req, res) => {
    try {
        const features = await Features.findAll({
            where: {
                active_status: true
            }
        });

        const whyUs = await WhyUs.findAll();
        const projects = await Service.findAll({
            where: {
                service_type: 'project',
                active_status: true
            },
            order: [['createdAt', 'DESC']]
        });

        res.json({
            features,
            projects,
            whyUs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching projects data'
        });
    }
}; 